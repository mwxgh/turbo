import type { ScaffoldOptions } from '../options.js'
import { text } from '../tree.js'
import { V } from '../versions.js'
import type { OrmLayer } from './orm.js'

const PROVIDER = { postgres: 'postgresql', mysql: 'mysql', mongodb: 'mongodb' }

function schema(o: ScaffoldOptions) {
  const id =
    o.database === 'mongodb'
      ? 'String   @id @default(auto()) @map("_id") @db.ObjectId'
      : o.database === 'postgres'
        ? 'String   @id @default(uuid()) @db.Uuid'
        : 'String   @id @default(uuid()) @db.VarChar(36)'
  const title =
    o.database === 'mongodb' ? 'String' : 'String   @db.VarChar(200)'
  return text`
    generator client {
      provider            = "prisma-client"
      output              = "../src/generated/prisma"
      moduleFormat        = "esm"
      importFileExtension = "js"
    }

    datasource db {
      provider = "${PROVIDER[o.database]}"
    }

    model Todo {
      id        ${id}
      title     ${title}
      done      Boolean  @default(false)
      createdAt DateTime @default(now()) @map("created_at")

      @@map("todos")
    }
  `
}

function adapter(o: ScaffoldOptions): {
  imports: string
  expr: string
  dependency: Record<string, string>
} {
  if (o.database === 'postgres')
    return {
      imports: "import { PrismaPg } from '@prisma/adapter-pg'",
      expr: 'new PrismaPg({ connectionString: process.env.DATABASE_URL })',
      dependency: { '@prisma/adapter-pg': V.prisma },
    }
  if (o.database === 'mysql')
    return {
      imports: "import { PrismaMariaDb } from '@prisma/adapter-mariadb'",
      expr: 'mariadbAdapter(process.env.DATABASE_URL)',
      dependency: { '@prisma/adapter-mariadb': V.prisma },
    }
  return { imports: '', expr: '', dependency: {} }
}

/** Ids the database column accepts; anything else is "not found" instead of a driver error. */
const ID_PATTERN = {
  postgres: '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i',
  mysql: '/^[0-9a-f-]{36}$/i',
  mongodb: '/^[0-9a-f]{24}$/i',
}

export function prismaLayer(o: ScaffoldOptions): OrmLayer {
  const a = adapter(o)
  const mariadbHelper =
    o.database === 'mysql'
      ? [
          '',
          '/** mysql://user:pass@host:port/db → options of the MariaDB driver (also speaks MySQL 8). */',
          "function mariadbAdapter(databaseUrl = '') {",
          '  const url = new URL(databaseUrl)',
          '  return new PrismaMariaDb({',
          '    host: url.hostname,',
          '    port: Number(url.port || 3306),',
          '    user: decodeURIComponent(url.username),',
          '    password: decodeURIComponent(url.password),',
          '    database: url.pathname.slice(1),',
          '    allowPublicKeyRetrieval: true,',
          '    connectionLimit: 5,',
          '  })',
          '}',
        ].join('\n')
      : ''
  const push = o.database === 'mongodb'
  return {
    dependencies: { '@prisma/client': V.prisma, ...a.dependency },
    devDependencies: { prisma: V.prisma, dotenv: V.dotenv },
    scripts: {
      build: 'prisma generate && nest build',
      'check-types': 'prisma generate && tsc --noEmit',
      'db:generate': 'prisma generate',
      // MongoDB has no migrations in Prisma: the schema is pushed
      'db:migrate': push ? 'prisma db push' : 'prisma migrate dev',
      ...(push ? {} : { 'db:deploy': 'prisma migrate deploy' }),
    },
    env: [],
    files: {
      'prisma/schema.prisma': schema(o),
      'prisma.config.ts': text`
        import 'dotenv/config'

        import { defineConfig } from 'prisma/config'

        export default defineConfig({
          schema: 'prisma/schema.prisma',
          migrations: { path: 'prisma/migrations' },
          datasource: { url: process.env.DATABASE_URL },
        })
      `,
      'src/database/prisma.service.ts': [
        "import { Injectable, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common'",
        ...(a.imports ? [a.imports] : []),
        '',
        "import { PrismaClient } from '../generated/prisma/client.js'",
        '',
        '@Injectable()',
        'export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {',
        '  constructor() {',
        a.expr ? `    super({ adapter: ${a.expr} })` : '    super()',
        '  }',
        '',
        '  async onModuleInit() {',
        '    await this.$connect()',
        '  }',
        '',
        '  async onModuleDestroy() {',
        '    await this.$disconnect()',
        '  }',
        '}',
        mariadbHelper,
        '',
      ].join('\n'),
      'src/database/prisma-todos.repository.ts': text`
        import { Inject, Injectable } from '@nestjs/common'

        import type { Todo, UpdateTodo } from '@app/types'

        import { TodosRepository } from '../todos/todos.repository'
        import { PrismaService } from './prisma.service'

        type Row = { id: string; title: string; done: boolean; createdAt: Date }
        const toTodo = (row: Row): Todo => ({ ...row, createdAt: row.createdAt.toISOString() })
        const ID = ${ID_PATTERN[o.database]}

        @Injectable()
        export class PrismaTodosRepository extends TodosRepository {
          constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {
            super()
          }

          async list() {
            const rows = await this.prisma.todo.findMany({ orderBy: { createdAt: 'desc' } })
            return rows.map(toTodo)
          }

          async create(title: string) {
            return toTodo(await this.prisma.todo.create({ data: { title } }))
          }

          async update(id: string, changes: UpdateTodo) {
            if (!ID.test(id)) return null
            const { count } = await this.prisma.todo.updateMany({ where: { id }, data: changes })
            if (count === 0) return null
            const row = await this.prisma.todo.findUnique({ where: { id } })
            return row ? toTodo(row) : null
          }

          async remove(id: string) {
            if (!ID.test(id)) return false
            const { count } = await this.prisma.todo.deleteMany({ where: { id } })
            return count > 0
          }
        }
      `,
      'src/database/database.module.ts': text`
        import { Global, Module } from '@nestjs/common'

        import { TodosRepository } from '../todos/todos.repository'
        import { PrismaTodosRepository } from './prisma-todos.repository'
        import { PrismaService } from './prisma.service'

        @Global()
        @Module({
          providers: [PrismaService, { provide: TodosRepository, useClass: PrismaTodosRepository }],
          exports: [TodosRepository],
        })
        export class DatabaseModule {}
      `,
    },
  }
}
