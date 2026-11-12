import type { ScaffoldOptions } from '../options.js'
import { type FileTree, json, text } from '../tree.js'
import { V } from '../versions.js'
import { DATABASE_PROFILES } from './database.js'
import type { OrmLayer } from './orm.js'

/**
 * apps/api with NestJS 12: ESM, built by the Nest CLI with SWC (keeps decorator metadata for
 * dependency injection), type-checked by tsc. The ORM layer supplies the DatabaseModule that
 * provides `TodosRepository`.
 */
export function nestLayer(o: ScaffoldOptions, orm: OrmLayer): FileTree {
  return {
    ...Object.fromEntries(
      Object.entries(orm.files).map(([path, content]) => [
        `apps/api/${path}`,
        content,
      ]),
    ),
    'apps/api/package.json': json({
      name: 'api',
      version: '0.1.0',
      private: true,
      type: 'module',
      scripts: {
        build: 'nest build',
        dev: 'nest start --watch --env-file .env',
        start:
          'node --enable-source-maps --env-file-if-exists=.env dist/main.js',
        'check-types': 'tsc --noEmit',
        ...orm.scripts,
      },
      dependencies: sortKeys({
        '@app/types': 'workspace:*',
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
    'apps/api/nest-cli.json': json({
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
    'apps/api/.swcrc': json({ jsc: { baseUrl: './' } }),
    'apps/api/tsconfig.json': json({
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
      },
      include: ['src', '*.config.ts'],
    }),
    'apps/api/.env.example': [
      'PORT=3001',
      '# Browser origin allowed by CORS (the web app)',
      'WEB_ORIGIN=http://localhost:3000',
      `DATABASE_URL=${DATABASE_PROFILES[o.database].url(o.name)}`,
      ...orm.env,
      '',
    ].join('\n'),
    'apps/api/src/main.ts': text`
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
    'apps/api/src/app.module.ts': text`
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
    'apps/api/src/health.controller.ts': text`
      import { Controller, Get } from '@nestjs/common'

      @Controller('health')
      export class HealthController {
        @Get()
        check() {
          return { status: 'ok' }
        }
      }
    `,
    'apps/api/src/todos/todos.repository.ts': text`
      import type { Todo, UpdateTodo } from '@app/types'

      /**
       * Storage of todos. The ORM layer implements it (src/database); the rest of the app only
       * sees this class, so the ORM can change without touching controllers or services.
       */
      export abstract class TodosRepository {
        abstract list(): Promise<Todo[]>
        abstract create(title: string): Promise<Todo>
        /** null when there is no such todo. */
        abstract update(id: string, changes: UpdateTodo): Promise<Todo | null>
        /** false when there is no such todo. */
        abstract remove(id: string): Promise<boolean>
      }
    `,
    'apps/api/src/todos/todo.dto.ts': text`
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
    'apps/api/src/todos/todos.controller.ts': text`
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
    'apps/api/src/todos/todos.module.ts': text`
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
