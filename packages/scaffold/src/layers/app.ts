import type { ScaffoldOptions } from '../options.js'
import { text } from '../tree.js'

/**
 * Where an app sits and how it gets the shared types.
 * - Monorepo: `apps/<app>`, types from the `@app/types` workspace package.
 * - Single: `<app>/` on its own, types in a local file that `@app/types` points to (tsconfig
 *   `paths`). Every import of it is `import type`, erased at build: no runtime resolution needed.
 */
export interface AppContext {
  dir: string
  monorepo: boolean
  /** The monorepo setup (layers/modern.ts): tooling packages, lint, tests, API infrastructure. */
  modern: boolean
  /** package.json dependencies for the types (monorepo only). */
  typesDependency: Record<string, string>
  /** tsconfig `compilerOptions.paths` (single only). */
  typesPaths?: Record<string, string[]>
  /** The local types file, relative to the app (single only). */
  typesFile?: string
}

export function appContext(
  o: ScaffoldOptions,
  app: 'api' | 'web',
  typesFile: string,
): AppContext {
  if (o.repo === 'single')
    return {
      dir: app,
      monorepo: false,
      modern: false,
      typesDependency: {},
      typesPaths: { '@app/types': [`./${typesFile}`] },
      typesFile,
    }
  return {
    dir: `apps/${app}`,
    monorepo: true,
    modern: true,
    typesDependency: { '@app/types': 'workspace:*' },
  }
}

/** Shapes shared by api and web (packages/types, or a copy in each app). */
export const TYPES = text`
  /** A todo as the API returns it (JSON: dates are ISO strings). */
  export interface Todo {
    id: string
    title: string
    done: boolean
    createdAt: string
  }

  export interface CreateTodo {
    title: string
  }

  export interface UpdateTodo {
    title?: string
    done?: boolean
  }
`

/**
 * Storage port, framework-free: the ORM layer implements it (src/database) and both backends use
 * it (NestJS through a provider, Express directly).
 */
export const TODOS_REPOSITORY = text`
  import type { Todo, UpdateTodo } from '@app/types'

  /**
   * Storage of todos. The ORM layer implements it (src/database); the rest of the app only sees
   * this class, so the ORM can change without touching the routes.
   */
  export abstract class TodosRepository {
    abstract list(): Promise<Todo[]>
    abstract create(title: string): Promise<Todo>
    /** null when there is no such todo. */
    abstract update(id: string, changes: UpdateTodo): Promise<Todo | null>
    /** false when there is no such todo. */
    abstract remove(id: string): Promise<boolean>
  }

  /** What \`connectDatabase()\` (src/database/database.ts) returns. */
  export interface Database {
    todos: TodosRepository
    /** Rejects when the database does not answer (health checks). */
    ping(): Promise<void>
    close(): Promise<void>
  }
`
