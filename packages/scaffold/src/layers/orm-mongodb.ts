import type { ScaffoldOptions } from '../options.js'
import { text } from '../tree.js'
import { V } from '../versions.js'
import type { OrmLayer } from './orm.js'

/** No ORM: the official MongoDB driver, queries written by hand (ORMS_BY_DATABASE: MongoDB only). */
export function mongodbLayer(_o: ScaffoldOptions): OrmLayer {
  return {
    dependencies: { mongodb: V.mongodb },
    devDependencies: {},
    scripts: {},
    env: [],
    files: {
      'src/database/mongo-todos.repository.ts': text`
        import { type Collection, ObjectId } from 'mongodb'

        import type { Todo, UpdateTodo } from '@app/types'

        import { TodosRepository } from '../todos/todos.repository.js'

        export interface TodoDoc {
          _id: ObjectId
          title: string
          done: boolean
          createdAt: Date
        }

        const toTodo = (row: TodoDoc): Todo => ({
          id: row._id.toHexString(),
          title: row.title,
          done: row.done,
          createdAt: row.createdAt.toISOString(),
        })
        /** 24 hex characters, else null ("not found" instead of a BSON error). */
        const objectId = (id: string) => (/^[0-9a-f]{24}$/i.test(id) ? new ObjectId(id) : null)

        export class MongoTodosRepository extends TodosRepository {
          constructor(private readonly todos: Collection<TodoDoc>) {
            super()
          }

          async list() {
            const rows = await this.todos.find().sort({ createdAt: -1 }).toArray()
            return rows.map(toTodo)
          }

          async create(title: string) {
            const doc: TodoDoc = { _id: new ObjectId(), title, done: false, createdAt: new Date() }
            await this.todos.insertOne(doc)
            return toTodo(doc)
          }

          async update(id: string, changes: UpdateTodo) {
            const _id = objectId(id)
            if (!_id) return null
            const row = await this.todos.findOneAndUpdate(
              { _id },
              { $set: changes },
              { returnDocument: 'after' },
            )
            return row ? toTodo(row) : null
          }

          async remove(id: string) {
            const _id = objectId(id)
            if (!_id) return false
            const { deletedCount } = await this.todos.deleteOne({ _id })
            return deletedCount > 0
          }
        }
      `,
      'src/database/database.ts': text`
        import { MongoClient } from 'mongodb'

        import type { Database } from '../todos/todos.repository.js'
        import { MongoTodosRepository, type TodoDoc } from './mongo-todos.repository.js'

        /** One MongoClient (it pools connections) for the whole app; close() on shutdown. */
        export async function connectDatabase(url = process.env.DATABASE_URL ?? ''): Promise<Database> {
          const client = await new MongoClient(url).connect()
          // the database named in the URL
          const todos = client.db().collection<TodoDoc>('todos')
          await todos.createIndex({ createdAt: -1 })
          return {
            todos: new MongoTodosRepository(todos),
            ping: async () => {
              await client.db().command({ ping: 1 })
            },
            close: () => client.close(),
          }
        }
      `,
    },
  }
}
