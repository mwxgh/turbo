import type { ScaffoldOptions } from '../options.js'
import { text } from '../tree.js'
import { V } from '../versions.js'
import type { OrmLayer } from './orm.js'

/** oracle://user:pass@host:port/service → the credentials TypeORM's Oracle driver takes (no url option). */
const ORACLE_CONNECTION = text`
  /** oracle://user:pass@host:port/service (DATABASE_URL) → TypeORM's Oracle credentials. */
  function oracleConnection(databaseUrl = '') {
    const url = new URL(databaseUrl)
    return {
      username: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      connectString: \`\${url.hostname}:\${url.port || 1521}\${url.pathname}\`,
    }
  }
`

export function typeormLayer(o: ScaffoldOptions): OrmLayer {
  // TypeORM is offered for SQL databases only (ORMS_BY_DATABASE)
  const driver: Record<string, string> =
    o.database === 'postgres'
      ? { pg: V.pg }
      : o.database === 'oracle'
        ? { oracledb: V.oracledb }
        : { mysql2: V.mysql2 }
  const oracle = o.database === 'oracle'
  // Oracle: no varchar / boolean types; TypeORM stores a JS Boolean column as number(1)
  const titleColumn = oracle
    ? "{ type: 'varchar2', length: 200 }"
    : "{ type: 'varchar', length: 200 }"
  const doneColumn = oracle
    ? '{ type: Boolean, default: false }'
    : "{ type: 'boolean', default: false }"
  const createdType =
    o.database === 'postgres'
      ? "'timestamptz'"
      : oracle
        ? "'timestamp with time zone'"
        : "'timestamp'"
  const entity = text`
        import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

        @Entity('todos')
        export class TodoEntity {
          @PrimaryGeneratedColumn('uuid')
          id: string

          @Column(${titleColumn})
          title: string

          @Column(${doneColumn})
          done: boolean

          @CreateDateColumn({ name: 'created_at', type: ${createdType} })
          createdAt: Date
        }
      `
  const repository = text`
        import type { Repository } from 'typeorm'

        import type { Todo, UpdateTodo } from '@app/types'

        import { TodosRepository } from '../todos/todos.repository.js'
        import type { TodoEntity } from './todo.entity.js'

        const toTodo = (row: TodoEntity): Todo => ({ ...row, createdAt: row.createdAt.toISOString() })
        const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

        export class TypeormTodosRepository extends TodosRepository {
          constructor(private readonly repo: Repository<TodoEntity>) {
            super()
          }

          async list() {
            const rows = await this.repo.find({ order: { createdAt: 'DESC' } })
            return rows.map(toTodo)
          }

          async create(title: string) {
            return toTodo(await this.repo.save(this.repo.create({ title })))
          }

          async update(id: string, changes: UpdateTodo) {
            if (!UUID.test(id)) return null
            const row = await this.repo.findOneBy({ id })
            if (!row) return null
            return toTodo(await this.repo.save(Object.assign(row, changes)))
          }

          async remove(id: string) {
            if (!UUID.test(id)) return false
            const { affected } = await this.repo.delete({ id })
            return (affected ?? 0) > 0
          }
        }
      `
  return {
    dependencies: {
      typeorm: V.typeorm,
      'reflect-metadata': V.reflectMetadata,
      ...driver,
    },
    devDependencies: {},
    scripts: {},
    env: [
      '# Development only: TypeORM creates / alters tables from the entities on start.',
      '# Set to false and use migrations before production.',
      'DB_SYNCHRONIZE=true',
    ],
    files: {
      'src/database/todo.entity.ts': entity,
      'src/database/typeorm-todos.repository.ts': repository,
      'src/database/database.ts':
        text`
        import 'reflect-metadata'

        import { DataSource } from 'typeorm'

        import type { Database } from '../todos/todos.repository.js'
        import { TodoEntity } from './todo.entity.js'
        import { TypeormTodosRepository } from './typeorm-todos.repository.js'

        /** Opens the connection pool; close() on shutdown. */
        export async function connectDatabase(url = process.env.DATABASE_URL ?? ''): Promise<Database> {
          const dataSource = new DataSource({
            type: '${o.database}',
            ${oracle ? '...oracleConnection(url),' : 'url,'}
            entities: [TodoEntity],
            synchronize: process.env.DB_SYNCHRONIZE === 'true',
          })
          await dataSource.initialize()
          return {
            todos: new TypeormTodosRepository(dataSource.getRepository(TodoEntity)),
            ping: async () => {
              await dataSource.query('${oracle ? 'SELECT 1 FROM DUAL' : 'SELECT 1'}')
            },
            close: () => dataSource.destroy(),
          }
        }
      ` + (oracle ? `\n${ORACLE_CONNECTION}` : ''),
    },
  }
}
