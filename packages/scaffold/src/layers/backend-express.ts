import type { ScaffoldOptions } from '../options.js'
import { type FileTree, json, text } from '../tree.js'
import { V } from '../versions.js'
import { type AppContext, TODOS_REPOSITORY } from './app.js'
import { DATABASE_PROFILES } from './database.js'
import { applyUpgrade, expressUpgrade } from './modern-apps.js'
import type { OrmLayer } from './orm.js'

/**
 * api with Express 5: ESM, compiled by tsc (NodeNext, so relative imports end in `.js`), run in
 * development by tsx. Same routes and status codes as the NestJS api. Paths are relative to the
 * api folder.
 */
export function expressLayer(
  o: ScaffoldOptions,
  orm: OrmLayer,
  ctx: AppContext,
): FileTree {
  const files = plainExpressLayer(o, orm, ctx)
  const pre = orm.generate ? `${orm.generate} && ` : ''
  return ctx.modern ? applyUpgrade(files, expressUpgrade(o, pre)) : files
}

function plainExpressLayer(
  o: ScaffoldOptions,
  orm: OrmLayer,
  ctx: AppContext,
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
        cors: V.cors,
        express: V.express,
        ...orm.dependencies,
      }),
      devDependencies: sortKeys({
        '@types/cors': V.typesCors,
        '@types/express': V.typesExpress,
        '@types/node': V.typesNode,
        tsx: V.tsx,
        typescript: V.typescript,
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
    'src/main.ts': text`
      import { createApp } from './app.js'
      import { connectDatabase } from './database/database.js'

      const db = await connectDatabase()
      const port = Number(process.env.PORT ?? 3001)
      const server = createApp(db).listen(port, () => {
        console.log(\`api on http://localhost:\${port}/api\`)
      })

      // Stop accepting requests, then close the database
      for (const signal of ['SIGINT', 'SIGTERM'] as const)
        process.once(signal, () => server.close(() => void db.close()))
    `,
    'src/app.ts': text`
      import cors from 'cors'
      import express, { type ErrorRequestHandler } from 'express'

      import type { Database } from './todos/todos.repository.js'
      import { todosRouter } from './todos/todos.router.js'

      export function createApp(db: Database) {
        const app = express()
        app.use(cors({ origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000' }))
        app.use(express.json())

        app.get('/api/health', (_req, res) => {
          res.json({ status: 'ok' })
        })
        app.use('/api/todos', todosRouter(db.todos))

        app.use((_req, res) => {
          res.status(404).json({ statusCode: 404, message: 'Not Found' })
        })
        // Bad JSON body → 400; anything else → 500 (Express 5 forwards rejected promises here)
        const onError: ErrorRequestHandler = (error: { status?: number }, _req, res, _next) => {
          const status = error.status === 400 ? 400 : 500
          if (status === 500) console.error(error)
          res.status(status).json({ statusCode: status, message: status === 400 ? 'Bad Request' : 'Internal Server Error' })
        }
        app.use(onError)
        return app
      }
    `,
    'src/todos/todos.repository.ts': TODOS_REPOSITORY,
    'src/todos/todo.validation.ts': text`
      import type { CreateTodo, UpdateTodo } from '@app/types'

      export type Parsed<T> = { ok: true; value: T } | { ok: false; errors: string[] }

      const isObject = (body: unknown): body is Record<string, unknown> =>
        typeof body === 'object' && body !== null && !Array.isArray(body)

      function title(value: unknown, errors: string[]) {
        if (typeof value !== 'string' || !value.trim()) errors.push('title must be a non-empty string')
        else if (value.length > 200) errors.push('title must be at most 200 characters')
      }

      function unknownKeys(body: Record<string, unknown>, allowed: string[], errors: string[]) {
        for (const key of Object.keys(body))
          if (!allowed.includes(key)) errors.push(\`property \${key} should not exist\`)
      }

      export function parseCreateTodo(body: unknown): Parsed<CreateTodo> {
        if (!isObject(body)) return { ok: false, errors: ['body must be a JSON object'] }
        const errors: string[] = []
        unknownKeys(body, ['title'], errors)
        title(body.title, errors)
        return errors.length ? { ok: false, errors } : { ok: true, value: { title: (body.title as string).trim() } }
      }

      export function parseUpdateTodo(body: unknown): Parsed<UpdateTodo> {
        if (!isObject(body)) return { ok: false, errors: ['body must be a JSON object'] }
        const errors: string[] = []
        unknownKeys(body, ['title', 'done'], errors)
        if (body.title !== undefined) title(body.title, errors)
        if (body.done !== undefined && typeof body.done !== 'boolean') errors.push('done must be a boolean')
        if (errors.length) return { ok: false, errors }
        const value: UpdateTodo = {}
        if (typeof body.title === 'string') value.title = body.title.trim()
        if (typeof body.done === 'boolean') value.done = body.done
        return { ok: true, value }
      }
    `,
    'src/todos/todos.router.ts': text`
      import { type Response, Router } from 'express'

      import { parseCreateTodo, parseUpdateTodo } from './todo.validation.js'
      import type { TodosRepository } from './todos.repository.js'

      const badRequest = (res: Response, errors: string[]) =>
        res.status(400).json({ statusCode: 400, message: errors, error: 'Bad Request' })
      const notFound = (res: Response) => res.status(404).json({ statusCode: 404, message: 'Not Found' })

      export function todosRouter(todos: TodosRepository) {
        const router = Router()

        router.get('/', async (_req, res) => {
          res.json(await todos.list())
        })

        router.post('/', async (req, res) => {
          const body = parseCreateTodo(req.body)
          if (!body.ok) return void badRequest(res, body.errors)
          res.status(201).json(await todos.create(body.value.title))
        })

        router.patch('/:id', async (req, res) => {
          const body = parseUpdateTodo(req.body)
          if (!body.ok) return void badRequest(res, body.errors)
          const todo = await todos.update(req.params.id, body.value)
          if (!todo) return void notFound(res)
          res.json(todo)
        })

        router.delete('/:id', async (req, res) => {
          if (!(await todos.remove(req.params.id))) return void notFound(res)
          res.status(204).end()
        })

        return router
      }
    `,
  }
}

function sortKeys(record: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(record).sort(([a], [b]) => a.localeCompare(b)),
  )
}
