import type { FileTree } from '../tree.js'

/** What an ORM adds to the api: files, dependencies, scripts, env. */
export interface OrmLayer {
  files: FileTree
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  /** Merged into apps/api/package.json scripts (may override build / check-types). */
  scripts: Record<string, string>
  /** Extra lines for apps/api/.env.example. */
  env: string[]
}
