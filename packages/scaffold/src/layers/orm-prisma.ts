import type { ScaffoldOptions } from '../options.js'
import { text } from '../tree.js'
import { V } from '../versions.js'
import type { OrmLayer } from './orm.js'

/** Prisma is offered for SQL databases only (ORMS_BY_DATABASE). */
type SqlDatabase = 'postgres' | 'mysql'

const PROVIDER: Record<SqlDatabase, string> = {
  postgres: 'postgresql',
  mysql: 'mysql',
}
const sql = (o: ScaffoldOptions) => o.database as SqlDatabase

function schema(o: ScaffoldOptions) {
  const id =
    o.database === 'postgres'
      ? 'String   @id @default(uuid()) @db.Uuid'
      : 'String   @id @default(uuid()) @db.VarChar(36)'
  const title = 'String   @db.VarChar(200)'
  return text`
    generator client {
      provider            = "prisma-client"
      output              = "../src/generated/prisma"
      moduleFormat        = "esm"
      importFileExtension = "js"
    }

    datasource db {
      provider = "${PROVIDER[sql(o)]}"
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
      expr: 'new PrismaPg({ connectionString: url })',
      dependency: { '@prisma/adapter-pg': V.prisma },
    }
  return {
    imports: "import { PrismaMariaDb } from '@prisma/adapter-mariadb'",
    expr: 'mariadbAdapter(url)',
    dependency: { '@prisma/adapter-mariadb': V.prisma },
  }
}

/** Ids the database column accepts; anything else is "not found" instead of a driver error. */
const ID_PATTERN: Record<SqlDatabase, string> = {
  postgres: '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i',
  mysql: '/^[0-9a-f-]{36}$/i',
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
  return {
    dependencies: { '@prisma/client': V.prisma, ...a.dependency },
    devDependencies: { prisma: V.prisma, dotenv: V.dotenv },
    generate: 'prisma generate',
    scripts: {
      'db:generate': 'prisma generate',
      'db:migrate': 'prisma migrate dev',
      'db:deploy': 'prisma migrate deploy',
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
      'src/database/database.ts': [
        a.imports,
        '',
        "import type { Database } from '../todos/todos.repository.js'",
        "import { PrismaClient } from '../generated/prisma/client.js'",
        "import { PrismaTodosRepository } from './prisma-todos.repository.js'",
        '',
        '/** Opens the connection pool; close() on shutdown. */',
        "export async function connectDatabase(url = process.env.DATABASE_URL ?? ''): Promise<Database> {",
        `  const prisma = new PrismaClient({ adapter: ${a.expr} })`,
        '  await prisma.$connect()',
        '  return {',
        '    todos: new PrismaTodosRepository(prisma),',
        '    ping: async () => {',
        '      await prisma.$queryRaw`SELECT 1`',
        '    },',
        '    close: () => prisma.$disconnect(),',
        '  }',
        '}',
        mariadbHelper,
        '',
      ].join('\n'),
      'src/database/prisma-todos.repository.ts': text`
        import type { Todo, UpdateTodo } from '@app/types'

        import type { PrismaClient } from '../generated/prisma/client.js'
        import { TodosRepository } from '../todos/todos.repository.js'

        type Row = { id: string; title: string; done: boolean; createdAt: Date }
        const toTodo = (row: Row): Todo => ({ ...row, createdAt: row.createdAt.toISOString() })
        const ID = ${ID_PATTERN[sql(o)]}

        export class PrismaTodosRepository extends TodosRepository {
          constructor(private readonly prisma: PrismaClient) {
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
    },
  }
}
