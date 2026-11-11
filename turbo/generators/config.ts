import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

import type { PlopTypes } from '@turbo/gen'

/**
 * Code generators: `pnpm gen` (pick one) or `pnpm gen <name>`.
 *
 *   package   new workspace package in packages/ (compiled Node lib or React source lib)
 *   resource  CRUD resource: Prisma model + Nest module (api) + list/form page (web)
 *
 * Templates live next to this file and follow the reference code in the repo
 * (`apps/api/src/hellos`, `apps/web/app/hellos`, `packages/socket-events`, `packages/ui`).
 * Generated files are formatted with Prettier (import order included).
 */

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/
const PASCAL = /^[A-Z][A-Za-z0-9]*$/

type Answers = Record<string, unknown> & {
  turbo: { paths: { root: string } }
}

/** Runs a command at the repo root and reports its outcome as the action result. */
function run(
  label: string,
  command: string,
  args: string[],
): PlopTypes.CustomActionFunction {
  return (answers) => {
    const { root } = (answers as Answers).turbo.paths
    try {
      execFileSync(command, args, { cwd: root, stdio: 'pipe' })
      return label
    } catch (error) {
      const stderr = (error as { stderr?: Buffer }).stderr?.toString().trim()
      throw new Error(
        `${label} failed: ${command} ${args.join(' ')}\n${stderr ?? ''}`,
      )
    }
  }
}

/** Prettier on the generated paths (relative to the repo root, globs allowed). */
const format = (...paths: string[]): PlopTypes.CustomActionFunction =>
  function formatGenerated(answers, config, plop) {
    const rendered = paths.map((p) => plop!.renderString(p, answers))
    return run('Formatted with Prettier', 'pnpm', [
      'exec',
      'prettier',
      '--write',
      '--log-level=warn',
      ...rendered,
    ])(answers, config, plop)
  }

/** A follow-up hint printed after the actions (rendered with the answers). */
const note =
  (text: string): PlopTypes.CustomActionFunction =>
  (answers, _config, plop) =>
    plop!.renderString(text, answers)

/** Fails early instead of overwriting or duplicating existing code. */
const assertAbsent =
  (
    file: string,
    needle: (answers: Answers) => string | RegExp,
  ): PlopTypes.CustomActionFunction =>
  (raw, _config, plop) => {
    const answers = raw as Answers
    const target = path.join(
      answers.turbo.paths.root,
      plop!.renderString(file, answers),
    )
    if (!existsSync(target)) return `${file} not found yet`
    const content = readFileSync(target, 'utf8')
    const search = needle(answers)
    const found =
      typeof search === 'string'
        ? content.includes(search)
        : search.test(content)
    if (found) throw new Error(`${target} already contains ${String(search)}`)
    return `Checked ${path.relative(answers.turbo.paths.root, target)}`
  }

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  /** "OrderItem" → "order item" (UI labels, comments). */
  plop.setHelper('words', (text: string) =>
    text
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[-_]+/g, ' ')
      .toLowerCase(),
  )

  plop.setGenerator('package', {
    description: 'Workspace package in packages/ (@repo/<name>)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Package name (kebab-case, without @repo/):',
        validate: (value: string) =>
          KEBAB.test(value) || 'Use kebab-case, e.g. "mailer"',
      },
      {
        type: 'list',
        name: 'kind',
        message: 'Kind:',
        choices: [
          {
            name: 'node   – compiled with tsc to dist/ (server + browser code, like @repo/utils)',
            value: 'node',
          },
          {
            name: 'react  – TypeScript/TSX source, no build step (like @repo/ui)',
            value: 'react',
          },
        ],
      },
      {
        type: 'input',
        name: 'description',
        message: 'One-line description:',
        default: '',
        validate: (value: string) =>
          !/["\\]/.test(value) ||
          'No quotes or backslashes (goes into package.json)',
      },
    ],
    actions: (data) => {
      const answers = data as { name: string; kind: 'node' | 'react' }
      const actions: PlopTypes.ActionType[] = [
        {
          type: 'addMany',
          destination: '{{ turbo.paths.root }}/packages/{{ kebabCase name }}',
          base: `templates/package/${answers.kind}`,
          templateFiles: `templates/package/${answers.kind}/**`,
          globOptions: { dot: true },
          abortOnFail: true,
        },
        {
          // Conventional Commits scope for the new package (commitlint.config.mjs)
          type: 'modify',
          path: '{{ turbo.paths.root }}/commitlint.config.mjs',
          pattern: /(\n(\s+)'e2e',)/,
          template: "\n$2'{{ kebabCase name }}',$1",
        },
        run('Installed dependencies (pnpm install)', 'pnpm', [
          'install',
          '--prefer-offline',
        ]),
        format('packages/{{ kebabCase name }}'),
      ]
      if (answers.kind === 'react') {
        actions.push(
          note(
            '⚠ Source package: add "@repo/{{ kebabCase name }}" to transpilePackages in apps/web/next.config.js before using it in web.',
          ),
        )
      }
      actions.push(
        note(
          'Next: add "@repo/{{ kebabCase name }}": "workspace:*" to the app that uses it, then pnpm install. Add a row to the package table in README.md.',
        ),
      )
      return actions
    },
  })

  plop.setGenerator('resource', {
    description:
      'CRUD resource: Prisma model + api module (list/filter/sort, Swagger, tests) + web page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'Resource (plural, kebab-case; route + folder), e.g. "order-items":',
        validate: (value: string) =>
          KEBAB.test(value) || 'Use kebab-case, e.g. "order-items"',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Prisma model (singular, PascalCase):',
        default: (answers: { name: string }) =>
          answers.name
            .replace(/ies$/, 'y')
            .replace(/s$/, '')
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(''),
        validate: (value: string) =>
          PASCAL.test(value) || 'Use PascalCase, e.g. "OrderItem"',
      },
      {
        type: 'checkbox',
        name: 'layers',
        message: 'Generate:',
        choices: [
          {
            name: 'db   – model in packages/db/prisma/schema.prisma',
            value: 'db',
            checked: true,
          },
          {
            name: 'api  – apps/api/src/<resource> (module, controller, service, DTOs, list spec, tests)',
            value: 'api',
            checked: true,
          },
          {
            name: 'web  – apps/web/app/<resource> (table, form, server actions) + lib/queries',
            value: 'web',
            checked: true,
          },
        ],
        validate: (value: string[]) =>
          value.length > 0 || 'Pick at least one layer',
      },
    ],
    actions: (data) => {
      const layers = (data as { layers: string[] }).layers
      const actions: PlopTypes.ActionType[] = []

      if (layers.includes('db')) {
        actions.push(
          assertAbsent(
            'packages/db/prisma/schema.prisma',
            (a) => new RegExp(`^model ${String(a.model)} \\{`, 'm'),
          ),
          {
            type: 'append',
            path: '{{ turbo.paths.root }}/packages/db/prisma/schema.prisma',
            templateFile: 'templates/resource/db/model.prisma.hbs',
            separator: '\n',
          },
          run('Prisma client generated (pnpm db:generate)', 'pnpm', [
            'db:generate',
          ]),
          run('@repo/types regenerated (pnpm db:types)', 'pnpm', ['db:types']),
          format('packages/types/src/generated'),
        )
      }

      if (layers.includes('api')) {
        actions.push(
          assertAbsent(
            'apps/api/src/app.module.ts',
            (a) => `./${plop.renderString('{{ kebabCase name }}', a)}/`,
          ),
          {
            type: 'addMany',
            destination:
              '{{ turbo.paths.root }}/apps/api/src/{{ kebabCase name }}',
            base: 'templates/resource/api',
            templateFiles: 'templates/resource/api/**',
            abortOnFail: true,
          },
          {
            type: 'modify',
            path: '{{ turbo.paths.root }}/apps/api/src/app.module.ts',
            pattern: /(\n\n@Module\()/,
            template:
              "\nimport { {{ pascalCase name }}Module } from './{{ kebabCase name }}/{{ kebabCase name }}.module'$1",
          },
          {
            type: 'modify',
            path: '{{ turbo.paths.root }}/apps/api/src/app.module.ts',
            pattern: /(\n {2}\],\n\}\)\nexport class AppModule)/,
            template: '\n    {{ pascalCase name }}Module,$1',
          },
          format(
            'apps/api/src/{{ kebabCase name }}',
            'apps/api/src/app.module.ts',
          ),
        )
      }

      if (layers.includes('web')) {
        actions.push(
          {
            type: 'addMany',
            destination: '{{ turbo.paths.root }}/apps/web',
            base: 'templates/resource/web',
            templateFiles: 'templates/resource/web/**',
            abortOnFail: true,
          },
          format(
            'apps/web/app/{{ kebabCase name }}',
            'apps/web/lib/queries/{{ kebabCase name }}*.ts',
          ),
        )
      }

      if (layers.includes('db')) {
        actions.push(
          note(
            'Next: pnpm infra:up && pnpm db:migrate --name add_{{ snakeCase name }} (creates the migration), then commit packages/types/src/generated.',
          ),
        )
      }
      actions.push(
        note(
          'Then: pnpm turbo run build lint check-types test --filter=api --filter=web',
        ),
      )
      return actions
    },
  })
}
