import type { ScaffoldOptions } from '../options.js'
import { text } from '../tree.js'
import { V } from '../versions.js'
import type { OrmLayer } from './orm.js'

export function drizzleLayer(o: ScaffoldOptions): OrmLayer {
  const pg = o.database === 'postgres'
  const schema = pg
    ? text`
        import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

        export const todos = pgTable('todos', {
          id: uuid('id').primaryKey().defaultRandom(),
          title: varchar('title', { length: 200 }).notNull(),
          done: boolean('done').notNull().default(false),
          createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
        })
      `
    : text`
        import { randomUUID } from 'node:crypto'

        import { boolean, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

        export const todos = mysqlTable('todos', {
          id: varchar('id', { length: 36 })
            .primaryKey()
            .$defaultFn(() => randomUUID()),
          title: varchar('title', { length: 200 }).notNull(),
          done: boolean('done').notNull().default(false),
          createdAt: timestamp('created_at', { fsp: 3 }).notNull().defaultNow(),
        })
      `
  const client = pg
    ? text`
        import { drizzle } from 'drizzle-orm/node-postgres'
        import { Pool } from 'pg'

        export const createDb = (url: string) => drizzle({ client: new Pool({ connectionString: url }) })
      `
    : text`
        import { drizzle } from 'drizzle-orm/mysql2'
        import { createPool } from 'mysql2/promise'

        export const createDb = (url: string) => drizzle({ client: createPool({ uri: url }) })
      `
  // MySQL has no RETURNING: the id is generated in the app, the row read back after the insert
  const create = pg
    ? text`
        async create(title: string) {
          const [row] = await this.db.insert(todos).values({ title }).returning()
          return toTodo(row!)
        }
      `
    : text`
        async create(title: string) {
          const id = randomUUID()
          await this.db.insert(todos).values({ id, title })
          const [row] = await this.db.select().from(todos).where(eq(todos.id, id))
          return toTodo(row!)
        }
      `
  return {
    dependencies: {
      'drizzle-orm': V.drizzleOrm,
      ...(pg ? { pg: V.pg } : { mysql2: V.mysql2 }),
    },
    devDependencies: {
      'drizzle-kit': V.drizzleKit,
      dotenv: V.dotenv,
      ...(pg ? { '@types/pg': V.typesPg } : {}),
    },
    scripts: {
      'db:generate': 'drizzle-kit generate',
      'db:migrate': 'drizzle-kit migrate',
      'db:push': 'drizzle-kit push',
    },
    env: [],
    files: {
      'drizzle.config.ts': text`
        import 'dotenv/config'

        import { defineConfig } from 'drizzle-kit'

        export default defineConfig({
          dialect: '${pg ? 'postgresql' : 'mysql'}',
          schema: './src/db/schema.ts',
          out: './drizzle',
          dbCredentials: { url: process.env.DATABASE_URL! },
        })
      `,
      'src/db/schema.ts': schema,
      'src/db/client.ts': client,
      'src/database/drizzle-todos.repository.ts': [
        "import { Inject, Injectable } from '@nestjs/common'",
        ...(pg ? [] : ["import { randomUUID } from 'node:crypto'"]),
        "import { desc, eq } from 'drizzle-orm'",
        '',
        "import type { Todo, UpdateTodo } from '@app/types'",
        '',
        "import type { createDb } from '../db/client'",
        "import { todos } from '../db/schema'",
        "import { TodosRepository } from '../todos/todos.repository'",
        '',
        "export const DRIZZLE = Symbol('DRIZZLE')",
        'type Db = ReturnType<typeof createDb>',
        'type Row = typeof todos.$inferSelect',
        'const toTodo = (row: Row): Todo => ({ ...row, createdAt: row.createdAt.toISOString() })',
        '/** Ids the column accepts; anything else is "not found" instead of a driver error. */',
        pg
          ? 'const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i'
          : 'const ID = /^[0-9a-f-]{36}$/i',
        '',
        '@Injectable()',
        'export class DrizzleTodosRepository extends TodosRepository {',
        '  constructor(@Inject(DRIZZLE) private readonly db: Db) {',
        '    super()',
        '  }',
        '',
        '  async list() {',
        '    const rows = await this.db.select().from(todos).orderBy(desc(todos.createdAt))',
        '    return rows.map(toTodo)',
        '  }',
        '',
        create.replace(/^/gm, '  ').trimEnd(),
        '',
        '  async update(id: string, changes: UpdateTodo) {',
        '    if (!ID.test(id)) return null',
        '    const [existing] = await this.db.select().from(todos).where(eq(todos.id, id))',
        '    if (!existing) return null',
        '    if (Object.keys(changes).length) await this.db.update(todos).set(changes).where(eq(todos.id, id))',
        '    const [row] = await this.db.select().from(todos).where(eq(todos.id, id))',
        '    return toTodo(row!)',
        '  }',
        '',
        '  async remove(id: string) {',
        '    if (!ID.test(id)) return false',
        '    const [existing] = await this.db.select({ id: todos.id }).from(todos).where(eq(todos.id, id))',
        '    if (!existing) return false',
        '    await this.db.delete(todos).where(eq(todos.id, id))',
        '    return true',
        '  }',
        '}',
        '',
      ].join('\n'),
      'src/database/database.module.ts': text`
        import { Global, Module } from '@nestjs/common'

        import { createDb } from '../db/client'
        import { TodosRepository } from '../todos/todos.repository'
        import { DRIZZLE, DrizzleTodosRepository } from './drizzle-todos.repository'

        @Global()
        @Module({
          providers: [
            { provide: DRIZZLE, useFactory: () => createDb(process.env.DATABASE_URL!) },
            { provide: TodosRepository, useClass: DrizzleTodosRepository },
          ],
          exports: [TodosRepository],
        })
        export class DatabaseModule {}
      `,
    },
  }
}
