import type { FileTree } from '../tree.js'

/**
 * What an ORM adds to the api, whatever the backend: files (paths relative to the api), deps,
 * scripts, env. Its `src/database/database.ts` exports `connectDatabase(): Promise<Database>`
 * (`Database` from src/todos/todos.repository.ts); the backend layer wires it. Relative imports
 * in these files end in `.js`: both the Nest SWC build and the Express tsc (NodeNext) build accept it.
 */
export interface OrmLayer {
  files: FileTree
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  /** Merged into apps/api/package.json scripts (database commands). */
  scripts: Record<string, string>
  /** Code generation to run before build and check-types (`prisma generate`). */
  generate?: string
  /** Extra lines for the api's .env.example. */
  env: string[]
}
