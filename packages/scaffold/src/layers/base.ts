import {
  BACKENDS,
  DATABASES,
  FRONTENDS,
  ORMS,
  REPOS,
  type ScaffoldOptions,
} from '../options.js'
import { type FileTree, json, text } from '../tree.js'
import { V } from '../versions.js'
import { TYPES } from './app.js'
import { DATABASE_PROFILES, dockerCompose } from './database.js'
import { modernRootDevDependencies, runAll } from './modern.js'

const labelOf = <T extends string>(list: { value: T; label: string }[], v: T) =>
  list.find((c) => c.value === v)!.label

/** Folders of the two apps for these options. */
export const appDirs = (o: ScaffoldOptions) =>
  o.repo === 'single'
    ? { api: 'api', web: 'web' }
    : { api: 'apps/api', web: 'apps/web' }

/** ORMs with a migration step (`db:migrate`); the others build the schema on start. */
const migrates = (o: ScaffoldOptions) =>
  o.orm === 'prisma' || o.orm === 'drizzle'

/** `pnpm-workspace.yaml` settings: the packages allowed to run install scripts (pnpm 11). */
export function allowBuilds(o: ScaffoldOptions) {
  return [
    '# Packages allowed to run install scripts',
    'allowBuilds:',
    "  '@swc/core': true",
    "  'esbuild': true",
    "  'prisma': true",
    "  '@prisma/engines': true",
    ...(o.repo === 'nx' ? ["  'nx': true"] : []),
    // Swagger UI's download analytics (monorepo setup): not needed
    ...(o.repo !== 'single' ? ["  '@scarf/scarf': false"] : []),
    ...(o.database === 'oracle'
      ? [
          '  # its install script only prints a notice; thin mode needs no build',
          "  'oracledb': false",
        ]
      : []),
  ]
}

/**
 * Project root: README, local database, editor settings; for a monorepo also the pnpm workspace,
 * the tool's config (turbo.json / nx.json) and packages/types. Kept to what `create-turbo` /
 * `nx init` would give: no lint, hooks or custom tooling.
 */
export function baseLayer(o: ScaffoldOptions): FileTree {
  const dirs = appDirs(o)
  const monorepo = o.repo !== 'single'
  const init = DATABASE_PROFILES[o.database].init

  return {
    ...(monorepo ? monorepoFiles(o) : {}),
    '.gitignore': text`
      node_modules
      dist
      .next
      .turbo
      .nx
      .env
      .env.local
      *.tsbuildinfo
      **/src/generated
    `,
    '.node-version': `${V.node}\n`,
    '.editorconfig': text`
      root = true

      [*]
      charset = utf-8
      end_of_line = lf
      indent_size = 2
      indent_style = space
      insert_final_newline = true
      trim_trailing_whitespace = true
    `,
    'docker-compose.yml': dockerCompose(o),
    ...(init ? { [init.path]: init.content } : {}),
    'README.md': readme(o, dirs, monorepo),
  }
}

/** Env read at runtime by the apps: passed through to tasks (turbo) without changing cache keys. */
const RUNTIME_ENV = [
  'NODE_ENV',
  'PORT',
  'HOST',
  'DATABASE_URL',
  'DB_SYNCHRONIZE',
  'WEB_ORIGIN',
  'LOG_LEVEL',
  'RATE_LIMIT',
  'RATE_LIMIT_TTL_SECONDS',
]

/** Files that never change a build output (tests, docs, lint config). */
const NOT_BUILD_INPUTS = ['!**/*.md', '!eslint.config.mjs']

function monorepoFiles(o: ScaffoldOptions): FileTree {
  const run = (task: string) => runAll(o, task)
  return {
    'package.json': json({
      name: o.name,
      private: true,
      packageManager: `pnpm@${V.pnpm}`,
      engines: { node: `>=${V.node}` },
      scripts: {
        dev: run('dev'),
        build: run('build'),
        lint: run('lint'),
        'check-types': run('check-types'),
        format: 'prettier --write .',
        'format:check': 'prettier --check .',
        prepare: 'husky',
        'db:up': 'docker compose up -d --wait',
        'db:down': 'docker compose down',
        ...(migrates(o)
          ? {
              'db:migrate': 'pnpm --filter api db:migrate',
              ...(o.orm === 'drizzle'
                ? { 'db:generate': 'pnpm --filter api db:generate' }
                : {}),
            }
          : {}),
      },
      devDependencies: {
        ...modernRootDevDependencies,
        ...(o.repo === 'turbo' ? { turbo: V.turbo } : { nx: V.nx }),
        typescript: V.typescript,
      },
    }),
    'pnpm-workspace.yaml': [
      'packages:',
      "  - 'apps/*'",
      "  - 'packages/*'",
      "  - 'packages/tooling/*'",
      '',
      ...allowBuilds(o),
      '',
    ].join('\n'),
    ...(o.repo === 'turbo'
      ? {
          'turbo.json': json({
            $schema: 'https://turborepo.dev/schema.json',
            globalPassThroughEnv: RUNTIME_ENV,
            tasks: {
              build: {
                dependsOn: ['^build'],
                inputs: ['$TURBO_DEFAULT$', ...NOT_BUILD_INPUTS],
                // Inlined into the browser bundle / change the output
                env: ['NEXT_PUBLIC_*', 'VITE_*', 'NEXT_OUTPUT'],
                outputs: ['dist/**', '.next/**', '!.next/cache/**'],
              },
              lint: { dependsOn: ['^build'] },
              'check-types': { dependsOn: ['^build'] },
              dev: { dependsOn: ['^build'], cache: false, persistent: true },
            },
          }),
        }
      : {
          // Package-based Nx: projects are the workspace packages, targets their package.json scripts
          'nx.json': json({
            $schema: './node_modules/nx/schemas/nx-schema.json',
            namedInputs: {
              default: ['{projectRoot}/**/*'],
              production: [
                'default',
                ...NOT_BUILD_INPUTS.map((glob) =>
                  glob.replace('!', '!{projectRoot}/'),
                ),
              ],
            },
            targetDefaults: {
              build: {
                dependsOn: ['^build'],
                inputs: ['production', '^production'],
                outputs: ['{projectRoot}/dist', '{projectRoot}/.next'],
                cache: true,
              },
              lint: { dependsOn: ['^build'], cache: true },
              'check-types': { dependsOn: ['^build'], cache: true },
              dev: { dependsOn: ['^build'], continuous: true },
            },
          }),
        }),
    'packages/types/package.json': json({
      name: '@app/types',
      version: '0.0.0',
      private: true,
      type: 'module',
      exports: {
        '.': { types: './dist/index.d.ts', default: './dist/index.js' },
      },
      scripts: {
        build: 'tsc',
        dev: 'tsc --watch --preserveWatchOutput',
        'check-types': 'tsc --noEmit',
      },
      devDependencies: {
        '@app/typescript-config': 'workspace:*',
        typescript: V.typescript,
      },
    }),
    'packages/types/tsconfig.json': json({
      extends: '@app/typescript-config/library.json',
      compilerOptions: { outDir: 'dist', rootDir: 'src' },
      include: ['src'],
    }),
    'packages/types/src/index.ts': TYPES,
  }
}

/** README section of the monorepo setup (layers/modern.ts). */
function toolingDocs(o: ScaffoldOptions) {
  const tool = o.repo === 'turbo' ? 'Turborepo' : 'Nx'
  return [
    '## Tooling',
    '',
    '```bash',
    `pnpm lint            # ESLint, type-aware (${tool}, every package)`,
    'pnpm check-types     # tsc',
    'pnpm format          # Prettier, imports sorted',
    '```',
    '',
    '- Versions: one list in `pnpm-workspace.yaml` (`catalog:`); packages refer to it with `"catalog:"`.',
    '- Shared config: `packages/tooling/` (`@app/typescript-config`, `@app/eslint-config`).',
    '- Tests: no unit tests per file; end-to-end tests (Playwright) come as a separate package.',
    '- Git hooks (husky): format staged files, Conventional Commits (`feat(api): …`), the checks above before a push.',
    '- api: validated env (`src/env.ts`), pino logs, helmet, rate limit, `/api/health` (database ping), Swagger at `/api/docs` outside production.',
    '- Docker: `docker build -f deploy/api.Dockerfile .` and `deploy/web.Dockerfile`. CI: `.github/workflows/ci.yml`.',
    '',
  ]
}

function readme(
  o: ScaffoldOptions,
  dirs: { api: string; web: string },
  monorepo: boolean,
) {
  const api = dirs.api
  // The ORMs generated today; the planned ones never reach generate()
  const ormDocs: Partial<Record<ScaffoldOptions['orm'], string>> = {
    prisma: `Schema: \`${api}/prisma/schema.prisma\`. After a change: \`pnpm db:migrate\` (creates and applies a migration, regenerates the client).`,
    drizzle: `Schema: \`${api}/src/db/schema.ts\`. After a change: \`pnpm db:generate\` (writes a migration in \`${api}/drizzle/\`), then \`pnpm db:migrate\`.`,
    typeorm: `Entities: \`${api}/src/database/todo.entity.ts\`. In development the schema is synchronised on start (\`DB_SYNCHRONIZE=true\`); turn it off and add migrations before production.`,
    mongoose: `Schema: \`${api}/src/database/todo.schema.ts\` (Mongoose). MongoDB has no migrations: collections and indexes are created by the api on start.`,
    none: `No ORM: the official MongoDB driver (\`${api}/src/database/database.ts\`), queries in \`mongo-todos.repository.ts\`. Collections and indexes are created by the api on start.`,
  }
  const migrate =
    o.orm === 'typeorm'
      ? '# the api creates the tables on start (DB_SYNCHRONIZE=true)'
      : !migrates(o)
        ? '# no migration: the api creates the collection and indexes on start'
        : o.orm === 'drizzle'
          ? 'pnpm db:generate && pnpm db:migrate'
          : 'pnpm db:migrate      # first migration'
  const db = DATABASE_PROFILES[o.database]
  const run = monorepo
    ? [
        'pnpm install',
        'cp apps/api/.env.example apps/api/.env',
        'cp apps/web/.env.example apps/web/.env',
        `pnpm db:up            # ${db.label} on localhost:${db.port}`,
        migrate,
        'pnpm dev              # web http://localhost:3000, api http://localhost:3001/api',
      ]
    : [
        `docker compose up -d --wait   # ${db.label} on localhost:${db.port}`,
        '',
        '# api (terminal 1)',
        'cd api && pnpm install && cp .env.example .env',
        migrate,
        'pnpm dev              # http://localhost:3001/api',
        '',
        '# web (terminal 2)',
        'cd web && pnpm install && cp .env.example .env',
        'pnpm dev              # http://localhost:3000',
      ]
  const stack = [
    `- Repository: **${labelOf(REPOS, o.repo)}**${monorepo ? ' (pnpm workspace)' : ': `api/` and `web/` are independent projects'}`,
    `- Backend: **${labelOf(BACKENDS, o.backend)}** (\`${api}\`, port 3001)`,
    `- Database: **${labelOf(DATABASES, o.database)}** (\`docker-compose.yml\`)`,
    `- ORM: **${labelOf(ORMS, o.orm)}**`,
    `- Frontend: **${labelOf(FRONTENDS, o.frontend)}** (\`${dirs.web}\`, port 3000)`,
    monorepo
      ? '- Shared types: `packages/types` (used by api and web)'
      : '- Types: a copy in each app (`types.ts`), imported as `@app/types`',
  ].join('\n')

  return [
    `# ${o.name}`,
    '',
    'Generated by Turbo Studio.',
    '',
    '## Stack',
    '',
    stack,
    '',
    '## Run it',
    '',
    '```bash',
    ...run,
    '```',
    '',
    ...(monorepo ? toolingDocs(o) : []),
    '## Database',
    '',
    ormDocs[o.orm],
    '',
    '## API',
    '',
    '| Method | Path | Body |',
    '| --- | --- | --- |',
    '| GET | `/api/health` | |',
    '| GET | `/api/todos` | |',
    '| POST | `/api/todos` | `{ "title": "…" }` |',
    '| PATCH | `/api/todos/:id` | `{ "title"?: "…", "done"?: true }` |',
    '| DELETE | `/api/todos/:id` | |',
    '',
  ].join('\n')
}
