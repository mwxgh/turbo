import type { ScaffoldOptions } from '../options.js'
import { text } from '../tree.js'
import { V } from '../versions.js'
import type { OrmLayer } from './orm.js'

export function typeormLayer(o: ScaffoldOptions): OrmLayer {
  const mongo = o.database === 'mongodb'
  const driver: Record<string, string> =
    o.database === 'postgres'
      ? { pg: V.pg }
      : o.database === 'mysql'
        ? { mysql2: V.mysql2 }
        : { mongodb: V.mongodb }
  const entity = mongo
    ? text`
        import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn } from 'typeorm'

        @Entity('todos')
        export class TodoEntity {
          @ObjectIdColumn()
          _id: ObjectId

          @Column({ type: 'string' })
          title: string

          @Column({ type: 'boolean', default: false })
          done: boolean

          @CreateDateColumn({ name: 'created_at' })
          createdAt: Date
        }
      `
    : text`
        import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

        @Entity('todos')
        export class TodoEntity {
          @PrimaryGeneratedColumn('uuid')
          id: string

          @Column({ type: 'varchar', length: 200 })
          title: string

          @Column({ type: 'boolean', default: false })
          done: boolean

          @CreateDateColumn({ name: 'created_at', type: ${o.database === 'postgres' ? "'timestamptz'" : "'timestamp'"} })
          createdAt: Date
        }
      `
  const repository = mongo
    ? text`
        import { Inject, Injectable } from '@nestjs/common'
        import { getRepositoryToken } from '@nestjs/typeorm'
        import { ObjectId } from 'mongodb'
        import type { MongoRepository } from 'typeorm'

        import type { Todo, UpdateTodo } from '@app/types'

        import { TodosRepository } from '../todos/todos.repository'
        import { TodoEntity } from './todo.entity'

        const toTodo = (row: TodoEntity): Todo => ({
          id: row._id.toHexString(),
          title: row.title,
          done: row.done,
          createdAt: row.createdAt.toISOString(),
        })
        const objectId = (id: string) => (ObjectId.isValid(id) ? new ObjectId(id) : null)

        @Injectable()
        export class TypeormTodosRepository extends TodosRepository {
          constructor(
            @Inject(getRepositoryToken(TodoEntity)) private readonly repo: MongoRepository<TodoEntity>,
          ) {
            super()
          }

          async list() {
            const rows = await this.repo.find({ order: { createdAt: 'DESC' } })
            return rows.map(toTodo)
          }

          async create(title: string) {
            return toTodo(await this.repo.save(this.repo.create({ title, done: false })))
          }

          async update(id: string, changes: UpdateTodo) {
            const _id = objectId(id)
            if (!_id) return null
            const row = await this.repo.findOneBy({ _id })
            if (!row) return null
            return toTodo(await this.repo.save(Object.assign(row, changes)))
          }

          async remove(id: string) {
            const _id = objectId(id)
            if (!_id) return false
            const { deletedCount } = await this.repo.deleteOne({ _id })
            return deletedCount > 0
          }
        }
      `
    : text`
        import { Inject, Injectable } from '@nestjs/common'
        import { getRepositoryToken } from '@nestjs/typeorm'
        import type { Repository } from 'typeorm'

        import type { Todo, UpdateTodo } from '@app/types'

        import { TodosRepository } from '../todos/todos.repository'
        import { TodoEntity } from './todo.entity'

        const toTodo = (row: TodoEntity): Todo => ({ ...row, createdAt: row.createdAt.toISOString() })
        const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

        @Injectable()
        export class TypeormTodosRepository extends TodosRepository {
          constructor(
            @Inject(getRepositoryToken(TodoEntity)) private readonly repo: Repository<TodoEntity>,
          ) {
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
      '@nestjs/typeorm': V.nestTypeorm,
      typeorm: V.typeorm,
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
      'src/database/database.module.ts': text`
        import { Global, Module } from '@nestjs/common'
        import { TypeOrmModule } from '@nestjs/typeorm'

        import { TodosRepository } from '../todos/todos.repository'
        import { TodoEntity } from './todo.entity'
        import { TypeormTodosRepository } from './typeorm-todos.repository'

        @Global()
        @Module({
          imports: [
            TypeOrmModule.forRoot({
              type: '${o.database === 'postgres' ? 'postgres' : o.database === 'mysql' ? 'mysql' : 'mongodb'}',
              url: process.env.DATABASE_URL,
              entities: [TodoEntity],
              synchronize: process.env.DB_SYNCHRONIZE === 'true',
            }),
            TypeOrmModule.forFeature([TodoEntity]),
          ],
          providers: [{ provide: TodosRepository, useClass: TypeormTodosRepository }],
          exports: [TodosRepository],
        })
        export class DatabaseModule {}
      `,
    },
  }
}
