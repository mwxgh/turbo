import type { ScaffoldOptions } from '../options.js'
import { type FileTree, json, text } from '../tree.js'
import { V } from '../versions.js'

/**
 * The monorepo setup (repo `turbo` or `nx`), taken from this repository's own decisions:
 * shared tooling packages, one pnpm catalog for versions, Prettier + ESLint (type-aware),
 * Git hooks with Conventional Commits, Dockerfiles and CI. Separate folders stay minimal.
 */
export const isModern = (o: ScaffoldOptions) => o.repo !== 'single'

/** `pnpm --filter`-style runner of a task in every package: turbo or nx. */
export const runAll = (o: ScaffoldOptions, tasks: string) =>
  o.repo === 'turbo'
    ? `turbo run ${tasks}`
    : `nx run-many -t ${tasks.split(' ').join(' ')}`

// --- packages/tooling/typescript-config ------------------------------------------------------

const tsBase = {
  $schema: 'https://json.schemastore.org/tsconfig',
  compilerOptions: {
    declaration: true,
    declarationMap: true,
    esModuleInterop: true,
    incremental: false,
    isolatedModules: true,
    lib: ['es2023'],
    module: 'NodeNext',
    moduleDetection: 'force',
    moduleResolution: 'NodeNext',
    noUncheckedIndexedAccess: true,
    resolveJsonModule: true,
    skipLibCheck: true,
    strict: true,
    target: 'ES2023',
  },
}

const decorators = {
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  strictPropertyInitialization: false,
}

function typescriptConfig(): FileTree {
  const dir = 'packages/tooling/typescript-config'
  const extend = (compilerOptions: Record<string, unknown>) =>
    json({
      $schema: 'https://json.schemastore.org/tsconfig',
      compilerOptions,
      extends: './base.json',
    })
  return {
    [`${dir}/package.json`]: json({
      name: '@app/typescript-config',
      version: '0.0.0',
      private: true,
    }),
    [`${dir}/base.json`]: json(tsBase),
    // Workspace libraries built by tsc (packages/types)
    [`${dir}/library.json`]: extend({}),
    // Nest: built by the Nest CLI with SWC, type-checked by tsc (ADR: SWC build, separate type-check)
    [`${dir}/nestjs.json`]: extend({
      ...decorators,
      module: 'ESNext',
      moduleResolution: 'Bundler',
      declaration: false,
      declarationMap: false,
      noEmit: true,
    }),
    // Express: compiled by tsc (NodeNext), decorators for TypeORM entities
    [`${dir}/express.json`]: extend({
      ...decorators,
      declaration: false,
      declarationMap: false,
      sourceMap: true,
    }),
    [`${dir}/nextjs.json`]: extend({
      plugins: [{ name: 'next' }],
      lib: ['es2023', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      moduleResolution: 'Bundler',
      allowJs: true,
      jsx: 'preserve',
      declaration: false,
      declarationMap: false,
      noEmit: true,
    }),
    [`${dir}/vite.json`]: extend({
      lib: ['es2023', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      moduleResolution: 'Bundler',
      jsx: 'react-jsx',
      declaration: false,
      declarationMap: false,
      noEmit: true,
      types: ['vite/client'],
    }),
  }
}

// --- packages/tooling/eslint-config ----------------------------------------------------------

function eslintConfig(o: ScaffoldOptions): FileTree {
  const dir = 'packages/tooling/eslint-config'
  const turbo = o.repo === 'turbo'
  return {
    [`${dir}/package.json`]: json({
      name: '@app/eslint-config',
      version: '0.0.0',
      type: 'module',
      private: true,
      exports: {
        './base': './base.js',
        './nest': './nest.js',
        './node': './node.js',
        './next': './next.js',
        './react': './react.js',
      },
      dependencies: {
        '@eslint/js': V.eslintJs,
        '@next/eslint-plugin-next': V.nextEslintPlugin,
        eslint: V.eslint,
        'eslint-config-prettier': V.eslintConfigPrettier,
        'eslint-plugin-only-warn': V.eslintPluginOnlyWarn,
        'eslint-plugin-react-hooks': V.eslintPluginReactHooks,
        ...(turbo ? { 'eslint-plugin-turbo': V.eslintPluginTurbo } : {}),
        globals: V.globals,
        typescript: V.typescript,
        'typescript-eslint': V.typescriptEslint,
      },
    }),
    [`${dir}/base.js`]: [
      "import js from '@eslint/js'",
      "import eslintConfigPrettier from 'eslint-config-prettier'",
      "import onlyWarn from 'eslint-plugin-only-warn'",
      ...(turbo ? ["import turboPlugin from 'eslint-plugin-turbo'"] : []),
      "import tseslint from 'typescript-eslint'",
      '',
      '/**',
      ' * Type-aware rules (floating promises, unsafe `any`, …) need the TypeScript program of each',
      ' * package: slower, so `ESLINT_TYPE_CHECK=0 pnpm lint` gives a quick syntax-level lint.',
      ' */',
      "const typeCheck = process.env.ESLINT_TYPE_CHECK !== '0'",
      '',
      '/** @type {import("eslint").Linter.Config[]} */',
      'const typeScriptConfigs = typeCheck',
      '  ? [',
      '      ...tseslint.configs.recommendedTypeChecked,',
      '      // Each file is checked with the nearest tsconfig.json',
      '      { languageOptions: { parserOptions: { projectService: true } } },',
      '      // Plain JS config files are in no tsconfig',
      "      { files: ['**/*.{js,mjs,cjs}'], ...tseslint.configs.disableTypeChecked },",
      '    ]',
      '  : tseslint.configs.recommended',
      '',
      '/** @type {import("eslint").Linter.Config[]} */',
      'export const config = [',
      '  js.configs.recommended,',
      '  ...typeScriptConfigs,',
      '  eslintConfigPrettier,',
      '  {',
      ...(turbo
        ? [
            '    plugins: { turbo: turboPlugin },',
            '    rules: {',
            "      'turbo/no-undeclared-env-vars': 'warn',",
          ]
        : ['    rules: {']),
      "      '@typescript-eslint/no-unused-vars': [",
      "        'warn',",
      "        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },",
      '      ],',
      '    },',
      '  },',
      '  // Every finding is a warning; `--max-warnings 0` fails the lint',
      '  { plugins: { onlyWarn } },',
      "  { ignores: ['dist/**', 'src/generated/**'] },",
      ']',
      '',
    ].join('\n'),
    [`${dir}/node.js`]: text`
      import globals from 'globals'

      import { config as baseConfig } from './base.js'

      /** Node.js servers (Express). @type {import("eslint").Linter.Config[]} */
      export const config = [...baseConfig, { languageOptions: { globals: globals.node } }]
    `,
    [`${dir}/nest.js`]: text`
      import { config as nodeConfig } from './node.js'

      /** NestJS apps. @type {import("eslint").Linter.Config[]} */
      export const config = [
        ...nodeConfig,
        // Nest modules are often empty classes decorated with @Module()
        { rules: { '@typescript-eslint/no-extraneous-class': 'off' } },
      ]
    `,
    [`${dir}/react.js`]: text`
      import pluginReactHooks from 'eslint-plugin-react-hooks'
      import globals from 'globals'

      import { config as baseConfig } from './base.js'

      /** React apps and libraries. @type {import("eslint").Linter.Config[]} */
      export const config = [
        ...baseConfig,
        { languageOptions: { globals: globals.browser } },
        // Config files (vite.config.ts, …) run in Node
        { files: ['*.config.{js,mjs,cjs,ts,mts}'], languageOptions: { globals: globals.node } },
        pluginReactHooks.configs.flat.recommended,
      ]
    `,
    [`${dir}/next.js`]: text`
      import pluginNext from '@next/eslint-plugin-next'
      import { globalIgnores } from 'eslint/config'

      import { config as reactConfig } from './react.js'

      /** Next.js apps. @type {import("eslint").Linter.Config[]} */
      export const config = [
        ...reactConfig,
        globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
        {
          plugins: { '@next/next': pluginNext },
          rules: {
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs['core-web-vitals'].rules,
          },
        },
      ]
    `,
  }
}

// --- Root: formatting, Git hooks, Docker, CI ---------------------------------------------------

function rootQuality(o: ScaffoldOptions): FileTree {
  return {
    '.prettierrc': json({
      printWidth: 80,
      semi: false,
      singleQuote: true,
      tabWidth: 2,
      overrides: [
        {
          files: ['*.js', '*.mjs', '*.ts', '*.tsx'],
          options: {
            plugins: ['@trivago/prettier-plugin-sort-imports'],
            importOrder: [
              '^node:(.*)$',
              '^(react|react-dom)(/.*)?$',
              '^next(/.*)?$',
              '^@nestjs/(.*)$',
              '<THIRD_PARTY_MODULES>',
              '^@app/(.*)$',
              '^[.]',
            ],
            importOrderParserPlugins: [
              'typescript',
              'jsx',
              'decorators-legacy',
            ],
            importOrderSeparation: true,
            importOrderSortSpecifiers: true,
          },
        },
        {
          files: ['*.json'],
          options: { plugins: ['prettier-plugin-sort-json'] },
        },
      ],
    }),
    '.prettierignore': text`
      pnpm-lock.yaml
      **/next-env.d.ts
      dist
      .next
      .nx
      .turbo
      **/src/generated
      **/drizzle
      **/prisma/migrations
    `,
    'lint-staged.config.mjs': text`
      /** Format only what is being committed (honours .prettierignore). */
      export default {
        '*.{ts,tsx,js,mjs,css,json,md,yml,yaml}': 'prettier --write',
      }
    `,
    'commitlint.config.mjs': text`
      /**
       * Conventional Commits, e.g. \`feat(api): add todo due dates\`.
       * Scopes are the workspaces plus a few repo-wide areas (a warning only).
       */
      export default {
        extends: ['@commitlint/config-conventional'],
        rules: {
          'header-max-length': [2, 'always', 72],
          'scope-enum': [1, 'always', ['api', 'web', 'types', 'tooling', 'deploy', 'deps', 'ci']],
        },
      }
    `,
    '.husky/pre-commit': 'pnpm exec lint-staged\n',
    '.husky/commit-msg': 'pnpm exec commitlint --edit "$1"\n',
    '.husky/pre-push': text`
      # Same checks as CI before anything leaves this machine (cached)
      pnpm exec ${runAll(o, 'lint check-types')}
    `,
  }
}

function dockerAndCi(o: ScaffoldOptions): FileTree {
  const turbo = o.repo === 'turbo'
  // Turborepo prunes the workspace to one app (smaller build context); Nx builds the whole workspace
  const prepare = (app: string) =>
    turbo
      ? [
          '# --- Prune the monorepo down to the app and its workspace dependencies',
          'FROM base AS prepare',
          `RUN npm install -g turbo@${V.turbo}`,
          'COPY . .',
          `RUN turbo prune ${app} --docker`,
          '',
          '# --- Install dependencies, then build',
          'FROM base AS builder',
          'COPY --from=prepare /app/out/json/ .',
          'RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \\',
          '    pnpm install --frozen-lockfile',
          'COPY --from=prepare /app/out/full/ .',
        ]
      : [
          '# --- Install dependencies, then build',
          'FROM base AS builder',
          'COPY . .',
          'RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \\',
          '    pnpm install --frozen-lockfile',
        ]
  const build = (app: string) =>
    turbo
      ? `RUN pnpm turbo run build --filter=${app}`
      : `RUN pnpm nx run ${app}:build`
  const header = (app: string, extra: string[] = []) => [
    '# syntax=docker/dockerfile:1',
    `# Build from the repository root: docker build -f deploy/${app}.Dockerfile -t ${o.name}-${app} .`,
    ...extra,
    '',
    `ARG NODE_VERSION=${V.node}-alpine`,
    '',
    'FROM node:${NODE_VERSION} AS base',
    'RUN apk add --no-cache libc6-compat',
    `RUN npm install -g pnpm@${V.pnpm}`,
    '# Git hooks are for local development only',
    'ENV HUSKY=0',
    'WORKDIR /app',
    '',
  ]
  const slimNode = [
    '# Runtime needs only `node`: drop npm / npx / corepack (they show up in image scans)',
    'RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \\',
    '    /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack',
  ]
  const api = [
    ...header('api'),
    ...prepare('api'),
    build('api'),
    '# Production node_modules for the api alone (workspace packages ship their dist/)',
    'RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \\',
    '    pnpm --filter=api deploy --prod --legacy /prod/api',
    '',
    '# --- Runtime',
    'FROM node:${NODE_VERSION} AS runner',
    'WORKDIR /app',
    ...slimNode,
    'ENV NODE_ENV=production',
    'COPY --from=builder --chown=node:node /prod/api/package.json ./package.json',
    'COPY --from=builder --chown=node:node /prod/api/node_modules ./node_modules',
    'COPY --from=builder --chown=node:node /app/apps/api/dist ./dist',
    'USER node',
    'EXPOSE 3001',
    'CMD ["node", "--enable-source-maps", "dist/main.js"]',
    '',
  ]
  const webNext = [
    ...header('web', [
      '#   --build-arg NEXT_PUBLIC_API_URL=https://api.example.com/api',
    ]),
    ...prepare('web'),
    '# NEXT_PUBLIC_* are inlined into the browser bundle at build time',
    'ARG NEXT_PUBLIC_API_URL',
    'ENV NEXT_OUTPUT=standalone \\',
    '    NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \\',
    '    NEXT_TELEMETRY_DISABLED=1',
    build('web'),
    '',
    '# --- Runtime (Next.js standalone output)',
    'FROM node:${NODE_VERSION} AS runner',
    'WORKDIR /app',
    ...slimNode,
    'ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0',
    'COPY --from=builder --chown=node:node /app/apps/web/.next/standalone ./',
    'COPY --from=builder --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static',
    'USER node',
    'EXPOSE 3000',
    'CMD ["node", "apps/web/server.js"]',
    '',
  ]
  const webVite = [
    ...header('web', [
      '#   --build-arg VITE_API_URL=https://api.example.com/api',
    ]),
    ...prepare('web'),
    '# VITE_* are inlined into the bundle at build time',
    'ARG VITE_API_URL',
    'ENV VITE_API_URL=${VITE_API_URL}',
    build('web'),
    '',
    '# --- Runtime: static files behind nginx',
    'FROM nginx:1.29-alpine AS runner',
    'COPY --from=builder /app/apps/web/dist /usr/share/nginx/html',
    'EXPOSE 80',
    '',
  ]
  return {
    'deploy/api.Dockerfile': api.join('\n'),
    'deploy/web.Dockerfile': (o.frontend === 'next' ? webNext : webVite).join(
      '\n',
    ),
    '.dockerignore': text`
      **/node_modules
      **/dist
      **/.next
      **/.turbo
      .nx
      .git
      **/.env
      **/.env.*
      !**/.env.example
    `,
    '.github/workflows/ci.yml': text`
      name: ci

      on:
        push:
          branches: [main]
        pull_request:

      concurrency:
        group: ci-\${{ github.ref }}
        cancel-in-progress: \${{ github.event_name == 'pull_request' }}

      permissions:
        contents: read

      jobs:
        check:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v5
            # Version comes from "packageManager" in package.json
            - uses: pnpm/action-setup@v4
            - uses: actions/setup-node@v5
              with:
                node-version-file: .node-version
                cache: pnpm
            - run: pnpm install --frozen-lockfile
            - run: pnpm format:check
            - run: pnpm ${runAll(o, 'lint check-types build')}

        images:
          needs: check
          runs-on: ubuntu-latest
          strategy:
            matrix:
              app: [api, web]
          steps:
            - uses: actions/checkout@v5
            - uses: docker/setup-buildx-action@v3
            - uses: docker/build-push-action@v6
              with:
                context: .
                file: deploy/\${{ matrix.app }}.Dockerfile
                push: false
    `,
  }
}

/** Root and packages/tooling files of the monorepo setup. */
export function modernRoot(o: ScaffoldOptions): FileTree {
  return {
    ...typescriptConfig(),
    ...eslintConfig(o),
    ...rootQuality(o),
    ...dockerAndCi(o),
  }
}

/** Root devDependencies of the monorepo setup. */
export const modernRootDevDependencies = {
  '@commitlint/cli': V.commitlint,
  '@commitlint/config-conventional': V.commitlint,
  '@trivago/prettier-plugin-sort-imports': V.prettierSortImports,
  husky: V.husky,
  'lint-staged': V.lintStaged,
  prettier: V.prettier,
  'prettier-plugin-sort-json': V.prettierSortJson,
}

/**
 * pnpm catalog: every exact version in the workspace's package.json files moves to one list in
 * pnpm-workspace.yaml and the packages say `"catalog:"` (one version per dependency).
 */
export function applyCatalog(tree: FileTree): FileTree {
  const catalog = new Map<string, string>()
  const out: FileTree = { ...tree }
  for (const [path, content] of Object.entries(tree)) {
    if (!path.endsWith('package.json')) continue
    const pkg = JSON.parse(content) as Record<string, unknown>
    for (const field of [
      'dependencies',
      'devDependencies',
      'peerDependencies',
    ]) {
      const deps = pkg[field] as Record<string, string> | undefined
      if (!deps) continue
      for (const [name, version] of Object.entries(deps)) {
        if (!/^\d/.test(version)) continue
        const known = catalog.get(name)
        if (known && known !== version)
          throw new Error(`Two versions of ${name}: ${known} and ${version}`)
        catalog.set(name, version)
        deps[name] = 'catalog:'
      }
    }
    out[path] = json(pkg)
  }
  const lines = [...catalog.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, version]) => `  '${name}': ${version}`)
  out['pnpm-workspace.yaml'] = out['pnpm-workspace.yaml']!.replace(
    '\n# Packages allowed',
    `\n# Shared versions: one flat list, referenced as \`"<pkg>": "catalog:"\`\ncatalog:\n${lines.join('\n')}\n\n# Packages allowed`,
  )
  return out
}
