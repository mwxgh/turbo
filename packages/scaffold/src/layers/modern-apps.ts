import type { ScaffoldOptions } from '../options.js'
import { type FileTree, json, text } from '../tree.js'
import { V } from '../versions.js'

/**
 * App-level files of the monorepo setup (layers/modern.ts): each function returns the files that
 * replace or extend the plain app (paths relative to the app), plus package.json additions.
 */
export interface AppUpgrade {
  files: FileTree
  scripts: Record<string, string>
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

const tooling = {
  '@app/eslint-config': 'workspace:*',
  '@app/typescript-config': 'workspace:*',
  eslint: V.eslint,
}

/** `pre`: code generation the lint needs first (`prisma generate &&`), like build and check-types. */
const lintScript = (pre = '') => ({ lint: `${pre}eslint . --max-warnings 0` })

// --- NestJS ------------------------------------------------------------------------------------

export function nestUpgrade(o: ScaffoldOptions, pre: string): AppUpgrade {
  return {
    scripts: lintScript(pre),
    dependencies: {
      '@nestjs/swagger': V.nestSwagger,
      '@nestjs/throttler': V.nestThrottler,
      helmet: V.helmet,
      'nestjs-pino': V.nestjsPino,
      pino: V.pino,
      'pino-http': V.pinoHttp,
    },
    devDependencies: {
      ...tooling,
      'pino-pretty': V.pinoPretty,
    },
    files: {
      'tsconfig.json': json({
        extends: '@app/typescript-config/nestjs.json',
        compilerOptions: { types: ['node'] },
        include: ['src', '*.config.ts'],
      }),
      'eslint.config.mjs': text`
        import { config } from '@app/eslint-config/nest'

        export default config
      `,
      'src/env.ts': text`
        import { Type, plainToInstance } from 'class-transformer'
        import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min, validateSync } from 'class-validator'

        const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const

        /**
         * Environment variables. Property initializers are the defaults. Numbers need \`@Type\`: process.env
         * only holds strings, and SWC emits no type metadata for an inferred property type.
         */
        class Env {
          @IsIn(['development', 'production', 'test'])
          NODE_ENV: 'development' | 'production' | 'test' = 'development'

          @Type(() => Number)
          @IsInt()
          @Min(1)
          @Max(65535)
          PORT = 3001

          @IsString()
          HOST = '0.0.0.0'

          @IsString()
          @IsNotEmpty()
          DATABASE_URL: string

          /** Browser origin allowed by CORS (the web app). */
          @IsString()
          WEB_ORIGIN = 'http://localhost:3000'

          @IsIn(LOG_LEVELS)
          LOG_LEVEL: (typeof LOG_LEVELS)[number] = 'info'

          /** Requests per client IP and window. */
          @Type(() => Number)
          @IsInt()
          @Min(1)
          RATE_LIMIT = 100

          @Type(() => Number)
          @IsInt()
          @Min(1)
          RATE_LIMIT_TTL_SECONDS = 60
        }

        /** Checked once at start: a missing or wrong value stops the api with the reason. */
        function validateEnv(): Env {
          const env = plainToInstance(Env, process.env, {
            enableImplicitConversion: true,
            exposeDefaultValues: true,
          })
          const errors = validateSync(env)
          if (errors.length)
            throw new Error(
              \`Invalid environment:\\n\${errors
                .map((e) => \`- \${e.property}: \${Object.values(e.constraints ?? {}).join(', ')}\`)
                .join('\\n')}\`,
            )
          return env
        }

        export const env = validateEnv()
      `,
      'src/main.ts': text`
        import 'reflect-metadata'

        import { Logger, ValidationPipe } from '@nestjs/common'
        import { NestFactory } from '@nestjs/core'
        import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

        import helmet from 'helmet'
        import { Logger as PinoLogger } from 'nestjs-pino'

        import { AppModule } from './app.module'
        import { env } from './env'

        async function bootstrap() {
          const app = await NestFactory.create(AppModule, { bufferLogs: true })
          // Nest's own logs go through pino
          app.useLogger(app.get(PinoLogger))
          app.setGlobalPrefix('api')
          // Security headers; CSP off outside production, where Swagger UI serves inline assets
          app.use(helmet({ contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false }))
          app.enableCors({ origin: env.WEB_ORIGIN })
          app.useGlobalPipes(
            new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
          )
          app.enableShutdownHooks()

          // API docs, never in production
          if (env.NODE_ENV !== 'production') {
            const config = new DocumentBuilder().setTitle('${o.name} API').setVersion('1.0').build()
            SwaggerModule.setup('api/docs', app, () => SwaggerModule.createDocument(app, config))
          }

          await app.listen(env.PORT, env.HOST)
          Logger.log(\`API on http://localhost:\${env.PORT}/api (docs: /api/docs)\`, 'Bootstrap')
        }

        void bootstrap()
      `,
      'src/app.module.ts': text`
        import { Module } from '@nestjs/common'
        import { APP_GUARD } from '@nestjs/core'
        import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

        import { LoggerModule } from 'nestjs-pino'

        import { DatabaseModule } from './database/database.module'
        import { env } from './env'
        import { HealthController } from './health.controller'
        import { TodosModule } from './todos/todos.module'

        @Module({
          imports: [
            LoggerModule.forRoot({
              pinoHttp: {
                level: env.LOG_LEVEL,
                // Readable lines in development, JSON in production
                transport:
                  env.NODE_ENV === 'production'
                    ? undefined
                    : { target: 'pino-pretty', options: { singleLine: true } },
                // Probes every few seconds would drown the request log
                autoLogging: { ignore: (req) => req.url?.startsWith('/api/health') ?? false },
              },
            }),
            ThrottlerModule.forRoot([
              { ttl: env.RATE_LIMIT_TTL_SECONDS * 1000, limit: env.RATE_LIMIT },
            ]),
            DatabaseModule,
            TodosModule,
          ],
          controllers: [HealthController],
          // Rate limit on every route (health opts out)
          providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
        })
        export class AppModule {}
      `,
      'src/health.controller.ts': text`
        import { Controller, Get, Inject, ServiceUnavailableException } from '@nestjs/common'
        import { SkipThrottle } from '@nestjs/throttler'

        import { DATABASE } from './database/database.module'
        import type { Database } from './todos/todos.repository'

        const TIMEOUT_MS = 2_000

        @SkipThrottle()
        @Controller('health')
        export class HealthController {
          constructor(@Inject(DATABASE) private readonly db: Database) {}

          /** Liveness: the process serves HTTP. Never touches the database. */
          @Get('live')
          live() {
            return { status: 'ok', uptime: process.uptime() }
          }

          /** Readiness: 200 when the database answers, 503 otherwise. */
          @Get(['', 'ready'])
          async ready() {
            const timeout = new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS).unref(),
            )
            try {
              await Promise.race([this.db.ping(), timeout])
            } catch {
              throw new ServiceUnavailableException({ status: 'error', database: 'down' })
            }
            return { status: 'ok', database: 'up' }
          }
        }
      `,
      'src/todos/todo.dto.ts': text`
        import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

        import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

        import type { CreateTodo, UpdateTodo } from '@app/types'

        export class CreateTodoDto implements CreateTodo {
          @ApiProperty({ maxLength: 200, example: 'Buy milk' })
          @IsString()
          @IsNotEmpty()
          @MaxLength(200)
          title: string
        }

        export class UpdateTodoDto implements UpdateTodo {
          @ApiPropertyOptional({ maxLength: 200 })
          @IsOptional()
          @IsString()
          @IsNotEmpty()
          @MaxLength(200)
          title?: string

          @ApiPropertyOptional()
          @IsOptional()
          @IsBoolean()
          done?: boolean
        }
      `,
    },
  }
}

// --- Express -----------------------------------------------------------------------------------

export function expressUpgrade(o: ScaffoldOptions, pre: string): AppUpgrade {
  return {
    // tsconfig.json type-checks and lints (src + config files); tsconfig.build.json compiles src
    scripts: { ...lintScript(pre), build: `${pre}tsc -p tsconfig.build.json` },
    dependencies: {
      'express-rate-limit': V.expressRateLimit,
      helmet: V.helmet,
      pino: V.pino,
      'pino-http': V.pinoHttp,
      'swagger-ui-express': V.swaggerUiExpress,
    },
    devDependencies: {
      ...tooling,
      '@types/swagger-ui-express': V.typesSwaggerUiExpress,
      'pino-pretty': V.pinoPretty,
    },
    files: {
      'tsconfig.json': json({
        extends: '@app/typescript-config/express.json',
        compilerOptions: { noEmit: true, types: ['node'] },
        include: ['src', '*.config.ts'],
      }),
      'tsconfig.build.json': json({
        extends: './tsconfig.json',
        compilerOptions: { noEmit: false, rootDir: 'src', outDir: 'dist' },
        include: ['src'],
      }),
      'eslint.config.mjs': text`
        import { config } from '@app/eslint-config/node'

        export default config
      `,
      'src/env.ts': text`
        const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const
        type LogLevel = (typeof LOG_LEVELS)[number]

        const errors: string[] = []

        function int(name: string, fallback: number, min: number, max = Number.MAX_SAFE_INTEGER) {
          const raw = process.env[name]
          if (raw === undefined || raw === '') return fallback
          const value = Number(raw)
          if (!Number.isInteger(value) || value < min || value > max)
            errors.push(\`- \${name}: an integer from \${min} to \${max}\`)
          return value
        }

        function oneOf<T extends string>(name: string, values: readonly T[], fallback: T): T {
          const raw = process.env[name] ?? fallback
          if (!values.includes(raw as T)) errors.push(\`- \${name}: one of \${values.join(', ')}\`)
          return raw as T
        }

        function required(name: string) {
          const raw = process.env[name]
          if (!raw) errors.push(\`- \${name}: required\`)
          return raw ?? ''
        }

        /** Environment variables, checked once at start: a wrong value stops the api with the reason. */
        export const env = {
          NODE_ENV: oneOf('NODE_ENV', ['development', 'production', 'test'], 'development'),
          PORT: int('PORT', 3001, 1, 65535),
          HOST: process.env.HOST ?? '0.0.0.0',
          DATABASE_URL: required('DATABASE_URL'),
          /** Browser origin allowed by CORS (the web app). */
          WEB_ORIGIN: process.env.WEB_ORIGIN ?? 'http://localhost:3000',
          LOG_LEVEL: oneOf<LogLevel>('LOG_LEVEL', LOG_LEVELS, 'info'),
          /** Requests per client IP and window. */
          RATE_LIMIT: int('RATE_LIMIT', 100, 1),
          RATE_LIMIT_TTL_SECONDS: int('RATE_LIMIT_TTL_SECONDS', 60, 1),
        }

        if (errors.length) throw new Error(\`Invalid environment:\\n\${errors.join('\\n')}\`)
      `,
      'src/logger.ts': text`
        import pino from 'pino'

        import { env } from './env.js'

        /** Readable lines in development, JSON in production. */
        export const logger = pino({
          level: env.LOG_LEVEL,
          transport:
            env.NODE_ENV === 'production'
              ? undefined
              : { target: 'pino-pretty', options: { singleLine: true } },
        })
      `,
      'src/main.ts': text`
        import { createApp } from './app.js'
        import { connectDatabase } from './database/database.js'
        import { env } from './env.js'
        import { logger } from './logger.js'

        const db = await connectDatabase(env.DATABASE_URL)
        const server = createApp(db).listen(env.PORT, env.HOST, () => {
          logger.info(\`API on http://localhost:\${env.PORT}/api (docs: /api/docs)\`)
        })

        // Stop accepting requests, then close the database
        for (const signal of ['SIGINT', 'SIGTERM'] as const)
          process.once(signal, () => server.close(() => void db.close()))
      `,
      'src/openapi.ts': text`
        /** OpenAPI document served by Swagger UI at /api/docs (outside production). */
        const todo = {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string', maxLength: 200 },
            done: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        }
        const json = (schema: object) => ({ content: { 'application/json': { schema } } })
        const idParam = [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }]

        export const openapi = {
          openapi: '3.0.3',
          info: { title: '${o.name} API', version: '1.0' },
          servers: [{ url: '/api' }],
          paths: {
            '/health': { get: { tags: ['health'], responses: { 200: { description: 'Ready' }, 503: { description: 'Database down' } } } },
            '/todos': {
              get: { tags: ['todos'], responses: { 200: { description: 'Todos', ...json({ type: 'array', items: todo }) } } },
              post: {
                tags: ['todos'],
                requestBody: { required: true, ...json({ type: 'object', required: ['title'], properties: { title: { type: 'string', maxLength: 200 } } }) },
                responses: { 201: { description: 'Created', ...json(todo) }, 400: { description: 'Invalid body' } },
              },
            },
            '/todos/{id}': {
              patch: {
                tags: ['todos'],
                parameters: idParam,
                requestBody: { required: true, ...json({ type: 'object', properties: { title: { type: 'string' }, done: { type: 'boolean' } } }) },
                responses: { 200: { description: 'Updated', ...json(todo) }, 404: { description: 'Not found' } },
              },
              delete: { tags: ['todos'], parameters: idParam, responses: { 204: { description: 'Deleted' }, 404: { description: 'Not found' } } },
            },
          },
        }
      `,
      'src/app.ts': text`
        import cors from 'cors'
        import express, { type ErrorRequestHandler } from 'express'
        import { rateLimit } from 'express-rate-limit'
        import helmet from 'helmet'
        import { pinoHttp } from 'pino-http'
        import swaggerUi from 'swagger-ui-express'

        import { env } from './env.js'
        import { logger } from './logger.js'
        import { openapi } from './openapi.js'
        import type { Database } from './todos/todos.repository.js'
        import { todosRouter } from './todos/todos.router.js'

        const TIMEOUT_MS = 2_000

        export function createApp(db: Database) {
          const app = express()
          // Security headers; CSP off outside production, where Swagger UI serves inline assets
          app.use(helmet({ contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false }))
          app.use(cors({ origin: env.WEB_ORIGIN }))
          app.use(
            pinoHttp({
              logger,
              // Probes every few seconds would drown the request log
              autoLogging: { ignore: (req) => req.url?.startsWith('/api/health') ?? false },
            }),
          )
          app.use(express.json())

          /** Liveness: the process serves HTTP. Never touches the database. */
          app.get('/api/health/live', (_req, res) => {
            res.json({ status: 'ok', uptime: process.uptime() })
          })
          /** Readiness: 200 when the database answers, 503 otherwise. */
          app.get(['/api/health', '/api/health/ready'], async (_req, res) => {
            const timeout = new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS).unref(),
            )
            try {
              await Promise.race([db.ping(), timeout])
              res.json({ status: 'ok', database: 'up' })
            } catch {
              res.status(503).json({ status: 'error', database: 'down' })
            }
          })

          if (env.NODE_ENV !== 'production')
            app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapi))

          // Rate limit per client IP on the API routes
          app.use(
            '/api/todos',
            rateLimit({ windowMs: env.RATE_LIMIT_TTL_SECONDS * 1000, limit: env.RATE_LIMIT }),
            todosRouter(db.todos),
          )

          app.use((_req, res) => {
            res.status(404).json({ statusCode: 404, message: 'Not Found' })
          })
          // Bad JSON body → 400; anything else → 500 (Express 5 forwards rejected promises here)
          const onError: ErrorRequestHandler = (error: { status?: number }, req, res, _next) => {
            const status = error.status === 400 ? 400 : 500
            if (status === 500) req.log.error(error)
            res.status(status).json({ statusCode: status, message: status === 400 ? 'Bad Request' : 'Internal Server Error' })
          }
          app.use(onError)
          return app
        }
      `,
    },
  }
}

// --- Web ---------------------------------------------------------------------------------------

export function webUpgrade(o: ScaffoldOptions): AppUpgrade {
  const next = o.frontend === 'next'
  return {
    scripts: lintScript(),
    dependencies: {},
    devDependencies: {
      ...tooling,
    },
    files: {
      'tsconfig.json': json(
        next
          ? {
              extends: '@app/typescript-config/nextjs.json',
              include: [
                'next-env.d.ts',
                '**/*.ts',
                '**/*.tsx',
                '.next/types/**/*.ts',
              ],
              exclude: ['node_modules'],
            }
          : {
              extends: '@app/typescript-config/vite.json',
              include: ['src', '*.config.ts'],
            },
      ),
      'eslint.config.mjs': text`
        import { config } from '@app/eslint-config/${next ? 'next' : 'react'}'

        export default config
      `,
      ...(next
        ? {
            'next.config.ts': text`
              import type { NextConfig } from 'next'

              const config: NextConfig = {
                // Self-contained server for the Docker image (deploy/web.Dockerfile sets NEXT_OUTPUT)
                output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
              }

              export default config
            `,
          }
        : {}),
    },
  }
}

/** Merges an upgrade into an app's files (package.json scripts / dependencies included). */
export function applyUpgrade(files: FileTree, upgrade: AppUpgrade): FileTree {
  const pkg = JSON.parse(files['package.json']!) as {
    scripts: Record<string, string>
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }
  const sorted = (record: Record<string, string>) =>
    Object.fromEntries(
      Object.entries(record).sort(([a], [b]) => a.localeCompare(b)),
    )
  return {
    ...files,
    ...upgrade.files,
    'package.json': json({
      ...pkg,
      scripts: { ...pkg.scripts, ...upgrade.scripts },
      dependencies: sorted({ ...pkg.dependencies, ...upgrade.dependencies }),
      devDependencies: sorted({
        ...pkg.devDependencies,
        ...upgrade.devDependencies,
      }),
    }),
  }
}
