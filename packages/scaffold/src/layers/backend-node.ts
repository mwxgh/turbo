import type { ScaffoldOptions } from '../options.js'
import { type FileTree, json } from '../tree.js'
import { V } from '../versions.js'
import { type AppContext, TODOS_REPOSITORY } from './app.js'
import { DATABASE_PROFILES } from './database.js'
import type { OrmLayer } from './orm.js'

/**
 * What the Express and Fastify apis share: ESM, compiled by tsc (NodeNext, so relative imports end
 * in `.js`), run in development by tsx. Each backend adds its framework dependencies and its
 * `src/main.ts`, `src/app.ts` and routes. Paths are relative to the api folder.
 */
export function nodeApiBase(
  o: ScaffoldOptions,
  orm: OrmLayer,
  ctx: AppContext,
  deps: {
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
  },
): FileTree {
  const pre = orm.generate ? `${orm.generate} && ` : ''
  return {
    ...orm.files,
    'package.json': json({
      name: 'api',
      version: '0.1.0',
      private: true,
      type: 'module',
      scripts: {
        build: `${pre}tsc`,
        dev: 'tsx watch --env-file=.env src/main.ts',
        start:
          'node --enable-source-maps --env-file-if-exists=.env dist/main.js',
        'check-types': `${pre}tsc --noEmit`,
        ...orm.scripts,
      },
      dependencies: sortKeys({
        ...ctx.typesDependency,
        ...deps.dependencies,
        ...orm.dependencies,
      }),
      devDependencies: sortKeys({
        '@types/node': V.typesNode,
        tsx: V.tsx,
        typescript: V.typescript,
        ...deps.devDependencies,
        ...orm.devDependencies,
      }),
    }),
    'tsconfig.json': json({
      compilerOptions: {
        target: 'ES2023',
        lib: ['es2023'],
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        strict: true,
        // TypeORM entities
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        strictPropertyInitialization: false,
        esModuleInterop: true,
        skipLibCheck: true,
        sourceMap: true,
        rootDir: 'src',
        outDir: 'dist',
        types: ['node'],
        ...(ctx.typesPaths ? { paths: ctx.typesPaths } : {}),
      },
      include: ['src'],
    }),
    '.env.example': [
      'PORT=3001',
      '# Browser origin allowed by CORS (the web app)',
      'WEB_ORIGIN=http://localhost:3000',
      `DATABASE_URL=${DATABASE_PROFILES[o.database].url(o.name)}`,
      ...orm.env,
      '',
    ].join('\n'),
    'src/todos/todos.repository.ts': TODOS_REPOSITORY,
  }
}

function sortKeys(record: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(record).sort(([a], [b]) => a.localeCompare(b)),
  )
}
