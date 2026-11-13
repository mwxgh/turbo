import type { ScaffoldOptions } from '../options.js'
import { text } from '../tree.js'
import { V } from '../versions.js'
import type { OrmLayer } from './orm.js'

/** Mongoose (MongoDB only, ORMS_BY_DATABASE). No migrations: the schema lives in code. */
export function mongooseLayer(_o: ScaffoldOptions): OrmLayer {
  return {
    dependencies: { mongoose: V.mongoose },
    devDependencies: {},
    scripts: {},
    env: [],
    files: {
      'src/database/todo.schema.ts': text`
        import { Schema } from 'mongoose'

        export interface TodoDoc {
          title: string
          done: boolean
          createdAt: Date
        }

        export const todoSchema = new Schema<TodoDoc>(
          {
            title: { type: String, required: true, maxlength: 200 },
            done: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now },
          },
          { collection: 'todos', versionKey: false },
        )
        todoSchema.index({ createdAt: -1 })
      `,
      'src/database/mongoose-todos.repository.ts': text`
        import { type Model, type Types, isObjectIdOrHexString } from 'mongoose'

        import type { Todo, UpdateTodo } from '@app/types'

        import { TodosRepository } from '../todos/todos.repository.js'
        import type { TodoDoc } from './todo.schema.js'

        type Row = TodoDoc & { _id: Types.ObjectId }
        const toTodo = (row: Row): Todo => ({
          id: row._id.toHexString(),
          title: row.title,
          done: row.done,
          createdAt: row.createdAt.toISOString(),
        })
        /** 24 hex characters; anything else is "not found" instead of a cast error. */
        const isId = (id: string) => /^[0-9a-f]{24}$/i.test(id) && isObjectIdOrHexString(id)

        export class MongooseTodosRepository extends TodosRepository {
          constructor(private readonly model: Model<TodoDoc>) {
            super()
          }

          async list() {
            const rows = await this.model.find().sort({ createdAt: -1 }).lean<Row[]>()
            return rows.map(toTodo)
          }

          async create(title: string) {
            const doc = await this.model.create({ title })
            return toTodo(doc.toObject<Row>())
          }

          async update(id: string, changes: UpdateTodo) {
            if (!isId(id)) return null
            const row = await this.model
              .findByIdAndUpdate(id, { $set: changes }, { returnDocument: 'after', runValidators: true })
              .lean<Row>()
            return row ? toTodo(row) : null
          }

          async remove(id: string) {
            if (!isId(id)) return false
            const { deletedCount } = await this.model.deleteOne({ _id: id })
            return deletedCount > 0
          }
        }
      `,
      'src/database/database.ts': text`
        import mongoose from 'mongoose'

        import type { Database } from '../todos/todos.repository.js'
        import { MongooseTodosRepository } from './mongoose-todos.repository.js'
        import { type TodoDoc, todoSchema } from './todo.schema.js'

        /** Opens the connection (the collection and its index are created on first use); close() on shutdown. */
        export async function connectDatabase(url = process.env.DATABASE_URL ?? ''): Promise<Database> {
          const connection = await mongoose.createConnection(url).asPromise()
          // typed as the repository expects (Mongoose would add an \`id\` virtual to the inferred type)
          const model = connection.model<TodoDoc>('Todo', todoSchema)
          await model.init()
          return {
            todos: new MongooseTodosRepository(model),
            ping: async () => {
              await connection.db!.admin().ping()
            },
            close: () => connection.close(),
          }
        }
      `,
    },
  }
}
