import type { ScaffoldOptions } from '../options.js'
import { type FileTree, json, text } from '../tree.js'
import { V } from '../versions.js'
import { type AppContext, TODOS_REPOSITORY } from './app.js'
import { DATABASE_PROFILES } from './database.js'
import { applyUpgrade, nestUpgrade } from './modern-apps.js'
import type { OrmLayer } from './orm.js'

/**
 * apps/api with NestJS 12: ESM, built by the Nest CLI with SWC (keeps decorator metadata for
 * dependency injection), type-checked by tsc. The ORM layer supplies `connectDatabase()`; the
 * DatabaseModule here provides its `TodosRepository`. Paths are relative to the api folder.
 */
export function nestLayer(
  o: ScaffoldOptions,
  orm: OrmLayer,
  ctx: AppContext,
): FileTree {
  const files = plainNestLayer(o, orm, ctx)
  const pre = orm.generate ? `${orm.generate} && ` : ''
  return ctx.modern ? applyUpgrade(files, nestUpgrade(o, pre)) : files
}

function plainNestLayer(
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
        build: `${pre}nest build`,
        dev: 'nest start --watch --env-file .env',
        start:
          'node --enable-source-maps --env-file-if-exists=.env dist/main.js',
        'check-types': `${pre}tsc --noEmit`,
        ...orm.scripts,
      },
      dependencies: sortKeys({
        ...ctx.typesDependency,
        '@nestjs/common': V.nestCommon,
        '@nestjs/core': V.nestCore,
        '@nestjs/platform-express': V.nestPlatformExpress,
        'class-transformer': V.classTransformer,
        'class-validator': V.classValidator,
        'reflect-metadata': V.reflectMetadata,
        rxjs: V.rxjs,
        ...orm.dependencies,
      }),
      devDependencies: sortKeys({
        '@nestjs/cli': V.nestCli,
        '@swc/cli': V.swcCli,
        '@swc/core': V.swcCore,
        '@types/node': V.typesNode,
        typescript: V.typescript,
        ...orm.devDependencies,
      }),
    }),
    'nest-cli.json': json({
      $schema: 'https://json.schemastore.org/nest-cli',
      collection: '@nestjs/schematics',
      sourceRoot: 'src',
      compilerOptions: {
        // .swcrc sets jsc.baseUrl: with it the Nest CLI's SWC config adds the ".js" extensions
        // Node's ESM loader needs (TypeScript 6 dropped baseUrl from tsconfig)
        builder: { type: 'swc', options: { swcrcPath: '.swcrc' } },
        deleteOutDir: true,
      },
    }),
    '.swcrc': json({ jsc: { baseUrl: './' } }),
    'tsconfig.json': json({
      compilerOptions: {
        target: 'ES2023',
        lib: ['es2023'],
        module: 'ESNext',
        moduleResolution: 'Bundler',
        strict: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        strictPropertyInitialization: false,
        skipLibCheck: true,
        noEmit: true,
        types: ['node'],
        ...(ctx.typesPaths ? { paths: ctx.typesPaths } : {}),
      },
      include: ['src', '*.config.ts'],
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
      import 'reflect-metadata'

      import { ValidationPipe } from '@nestjs/common'
      import { NestFactory } from '@nestjs/core'

      import { AppModule } from './app.module'

      async function bootstrap() {
        const app = await NestFactory.create(AppModule)
        app.setGlobalPrefix('api')
        app.enableCors({ origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000' })
        app.useGlobalPipes(
          new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
        )
        app.enableShutdownHooks()
        await app.listen(Number(process.env.PORT ?? 3001))
      }

      void bootstrap()
    `,
    'src/app.module.ts': text`
      import { Module } from '@nestjs/common'

      import { DatabaseModule } from './database/database.module'
      import { HealthController } from './health.controller'
      import { TodosModule } from './todos/todos.module'

      @Module({
        imports: [DatabaseModule, TodosModule],
        controllers: [HealthController],
      })
      export class AppModule {}
    `,
    'src/health.controller.ts': text`
      import { Controller, Get } from '@nestjs/common'

      @Controller('health')
      export class HealthController {
        @Get()
        check() {
          return { status: 'ok' }
        }
      }
    `,
    'src/todos/todos.repository.ts': TODOS_REPOSITORY,
    'src/database/database.module.ts': text`
      import { Global, Inject, Module, type OnApplicationShutdown } from '@nestjs/common'

      import { type Database, TodosRepository } from '../todos/todos.repository'
      import { connectDatabase } from './database'

      /** The connection itself (health checks ping it). */
      export const DATABASE = Symbol('DATABASE')

      /** Connects once (src/database/database.ts) and provides the repositories to every module. */
      @Global()
      @Module({
        providers: [
          { provide: DATABASE, useFactory: () => connectDatabase() },
          { provide: TodosRepository, useFactory: (db: Database) => db.todos, inject: [DATABASE] },
        ],
        exports: [DATABASE, TodosRepository],
      })
      export class DatabaseModule implements OnApplicationShutdown {
        constructor(@Inject(DATABASE) private readonly db: Database) {}

        onApplicationShutdown() {
          return this.db.close()
        }
      }
    `,
    'src/todos/todo.dto.ts': text`
      import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

      import type { CreateTodo, UpdateTodo } from '@app/types'

      export class CreateTodoDto implements CreateTodo {
        @IsString()
        @IsNotEmpty()
        @MaxLength(200)
        title: string
      }

      export class UpdateTodoDto implements UpdateTodo {
        @IsOptional()
        @IsString()
        @IsNotEmpty()
        @MaxLength(200)
        title?: string

        @IsOptional()
        @IsBoolean()
        done?: boolean
      }
    `,
    'src/todos/todos.controller.ts': text`
      import {
        Body,
        Controller,
        Delete,
        Get,
        HttpCode,
        Inject,
        NotFoundException,
        Param,
        Patch,
        Post,
      } from '@nestjs/common'

      import { CreateTodoDto, UpdateTodoDto } from './todo.dto'
      import { TodosRepository } from './todos.repository'

      @Controller('todos')
      export class TodosController {
        constructor(@Inject(TodosRepository) private readonly todos: TodosRepository) {}

        @Get()
        list() {
          return this.todos.list()
        }

        @Post()
        create(@Body() dto: CreateTodoDto) {
          return this.todos.create(dto.title.trim())
        }

        @Patch(':id')
        async update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
          const todo = await this.todos.update(id, dto)
          if (!todo) throw new NotFoundException()
          return todo
        }

        @Delete(':id')
        @HttpCode(204)
        async remove(@Param('id') id: string) {
          if (!(await this.todos.remove(id))) throw new NotFoundException()
        }
      }
    `,
    'src/todos/todos.module.ts': text`
      import { Module } from '@nestjs/common'

      import { TodosController } from './todos.controller'

      @Module({ controllers: [TodosController] })
      export class TodosModule {}
    `,
  }
}

function sortKeys(record: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(record).sort(([a], [b]) => a.localeCompare(b)),
  )
}
