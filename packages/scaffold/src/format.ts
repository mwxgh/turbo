import * as sortImportsModule from '@trivago/prettier-plugin-sort-imports'
import { type Options, type Plugin, format } from 'prettier'
import * as sortJsonModule from 'prettier-plugin-sort-json'

import type { FileTree } from './tree.js'

/**
 * Node only (`@repo/scaffold/format`, kept out of the browser bundle): formats a generated tree
 * with the project's own `.prettierrc`, so a downloaded project passes `pnpm format:check` from the
 * first commit. Trees without a `.prettierrc` (separate folders) are returned as they are.
 */

interface PrettierRc extends Options {
  overrides?: {
    files: string[]
    options: Omit<Options, 'plugins'> & { plugins?: string[] }
  }[]
}

// CommonJS plugins: their parsers and option defaults are on the default export (the namespace
// alone misses the defaults, e.g. importOrderSideEffects); the typings do not declare it
const cjs = (module: object) =>
  ((module as { default?: Plugin }).default ?? module) as Plugin
const sortImports = cjs(sortImportsModule)
const sortJson = cjs(sortJsonModule)

const PLUGINS: Record<string, Plugin> = {
  '@trivago/prettier-plugin-sort-imports': sortImports,
  'prettier-plugin-sort-json': sortJson,
}

// .prettierrc itself is JSON (Prettier checks it too)
const FORMATTED = /(\.(ts|tsx|js|mjs|json|md|ya?ml|css)|\.prettierrc)$/

/** `*.ts`-style globs of the .prettierrc overrides, on the file name. */
const matches = (globs: string[], path: string) => {
  const name = path.split('/').at(-1)!
  return globs.some(
    (glob) => glob.startsWith('*') && name.endsWith(glob.slice(1)),
  )
}

/** Lines of `.prettierignore` that apply to generated files (no negations, `**` prefixes). */
function ignored(tree: FileTree) {
  const patterns = (tree['.prettierignore'] ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.replace(/^\*\*\//, ''))
  return (path: string) =>
    patterns.some(
      (pattern) =>
        path === pattern ||
        path.endsWith(`/${pattern}`) ||
        path.startsWith(`${pattern}/`) ||
        path.includes(`/${pattern}/`),
    )
}

export async function formatTree(tree: FileTree): Promise<FileTree> {
  const rc = tree['.prettierrc']
  if (!rc) return tree
  const { overrides = [], ...base } = JSON.parse(rc) as PrettierRc
  const skip = ignored(tree)
  const out: FileTree = {}
  for (const [path, content] of Object.entries(tree)) {
    if (!FORMATTED.test(path) || skip(path)) {
      out[path] = content
      continue
    }
    const options: Options = {
      ...base,
      filepath: path,
      plugins: [],
      ...(path.endsWith('.prettierrc') ? { parser: 'json' } : {}),
    }
    for (const override of overrides)
      if (matches(override.files, path)) {
        const { plugins = [], ...rest } = override.options
        Object.assign(options, rest)
        options.plugins = [
          ...(options.plugins ?? []),
          ...plugins.map((name) => {
            const plugin = PLUGINS[name]
            if (!plugin) throw new Error(`Unknown Prettier plugin ${name}`)
            return plugin
          }),
        ]
      }
    // Prettier keeps some layout of its input (expanded objects): format until it is stable, as
    // `prettier --check` sees the result
    let formatted = await format(content, options)
    for (let pass = 0; pass < 3; pass++) {
      const again = await format(formatted, options)
      if (again === formatted) break
      formatted = again
    }
    out[path] = formatted
  }
  return out
}
