import type { ScaffoldOptions } from '../options.js'
import { type FileTree, text } from '../tree.js'
import { V } from '../versions.js'
import type { AppContext } from './app.js'
import { nodeApiBase } from './backend-node.js'
import { applyUpgrade, fastifyUpgrade } from './modern-apps.js'
import type { OrmLayer } from './orm.js'

/**
 * api with Fastify 5 (build and layout: backend-node.ts). Bodies are validated by JSON schemas on
 * the routes. Same routes and status codes as the NestJS api. Paths are relative to the api folder.
 */
export function fastifyLayer(
  o: ScaffoldOptions,
  orm: OrmLayer,
  ctx: AppContext,
): FileTree {
  const files = plainFastifyLayer(o, orm, ctx)
  const pre = orm.generate ? `${orm.generate} && ` : ''
  return ctx.modern ? applyUpgrade(files, fastifyUpgrade(o, pre)) : files
}

function plainFastifyLayer(
  o: ScaffoldOptions,
  orm: OrmLayer,
  ctx: AppContext,
): FileTree {
  return {
    ...nodeApiBase(o, orm, ctx, {
      dependencies: { '@fastify/cors': V.fastifyCors, fastify: V.fastify },
      devDependencies: {},
    }),
    'src/main.ts': text`
      import { createApp } from './app.js'
      import { connectDatabase } from './database/database.js'

      const app = await createApp(await connectDatabase())
      await app.listen({ port: Number(process.env.PORT ?? 3001), host: '0.0.0.0' })

      // Stop accepting requests, then close the database (onClose hook in app.ts)
      for (const signal of ['SIGINT', 'SIGTERM'] as const) process.once(signal, () => void app.close())
    `,
    'src/app.ts': text`
      import cors from '@fastify/cors'
      import Fastify from 'fastify'

      import { AJV_OPTIONS, jsonApi } from './http.js'
      import type { Database } from './todos/todos.repository.js'
      import { todosRoutes } from './todos/todos.routes.js'

      export async function createApp(db: Database) {
        const app = Fastify({ logger: true, ajv: AJV_OPTIONS })
        app.addHook('onClose', () => db.close())
        jsonApi(app)
        await app.register(cors, { origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000' })

        app.get('/api/health', () => ({ status: 'ok' }))
        await app.register(todosRoutes, { prefix: '/api/todos', todos: db.todos })
        return app
      }
    `,
    'src/http.ts': HTTP,
    'src/todos/todos.routes.ts': ROUTES,
  }
}

/** JSON parsing and error replies, shared by the plain and the monorepo api. */
const HTTP = text`
  import type { FastifyError, FastifyInstance } from 'fastify'

  /** Reject what the schemas do not allow instead of coercing or dropping it (as NestJS does). */
  export const AJV_OPTIONS = { customOptions: { coerceTypes: false, removeAdditional: false } } as const

  /** Call before registering routes: plugins registered later inherit the error handler. */
  export function jsonApi(app: FastifyInstance) {
    // The web app sends Content-Type: application/json on DELETE too, without a body
    const parseJson = app.getDefaultJsonParser('error', 'error')
    app.removeContentTypeParser('application/json')
    app.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
      if (body === '') done(null, undefined)
      // typed as possibly async; the default parser calls done itself
      else void parseJson(req, body as string, done)
    })

    app.setNotFoundHandler((_req, reply) => reply.code(404).send({ statusCode: 404, message: 'Not Found' }))
    // Schema errors → 400 with the reasons; other client errors (bad JSON, rate limit) as they are; else 500
    app.setErrorHandler((error: FastifyError, req, reply) => {
      if (error.validation)
        return reply.code(400).send({
          statusCode: 400,
          message: error.validation.map((v) => \`\${v.instancePath.slice(1) || 'body'} \${v.message ?? 'is invalid'}\`),
          error: 'Bad Request',
        })
      const status = error.statusCode !== undefined && error.statusCode < 500 ? error.statusCode : 500
      if (status === 500) req.log.error(error)
      return reply.code(status).send({ statusCode: status, message: status === 500 ? 'Internal Server Error' : error.message })
    })
  }
`

const ROUTES = text`
  import type { CreateTodo, UpdateTodo } from '@app/types'
  import type { FastifyPluginCallback } from 'fastify'

  import type { TodosRepository } from './todos.repository.js'

  /** Request schemas: Fastify checks each request against them before the handler runs. */
  const title = { type: 'string', minLength: 1, maxLength: 200, pattern: '\\\\S' } as const
  const createTodo = {
    type: 'object',
    required: ['title'],
    additionalProperties: false,
    properties: { title },
  } as const
  const updateTodo = {
    type: 'object',
    additionalProperties: false,
    properties: { title, done: { type: 'boolean' } },
  } as const
  const idParams = { type: 'object', required: ['id'], properties: { id: { type: 'string' } } } as const

  const notFound = { statusCode: 404, message: 'Not Found' }

  interface IdParams {
    id: string
  }

  export const todosRoutes: FastifyPluginCallback<{ todos: TodosRepository }> = (app, { todos }, done) => {
    app.get('/', () => todos.list())

    app.post<{ Body: CreateTodo }>('/', { schema: { body: createTodo } }, async (req, reply) =>
      reply.code(201).send(await todos.create(req.body.title.trim())),
    )

    app.patch<{ Params: IdParams; Body: UpdateTodo }>(
      '/:id',
      { schema: { params: idParams, body: updateTodo } },
      async (req, reply) => {
        const { title, done: isDone } = req.body
        const todo = await todos.update(req.params.id, {
          ...(title !== undefined && { title: title.trim() }),
          ...(isDone !== undefined && { done: isDone }),
        })
        return todo ? reply.send(todo) : reply.code(404).send(notFound)
      },
    )

    app.delete<{ Params: IdParams }>('/:id', { schema: { params: idParams } }, async (req, reply) =>
      (await todos.remove(req.params.id)) ? reply.code(204).send() : reply.code(404).send(notFound),
    )

    done()
  }
`
