/**
 * Workspace consistency check: `pnpm lint:workspace` (CI + pre-commit on package.json).
 *
 *   - every workspace package is private
 *   - packages in packages/ are named <scope>/<folder>, one scope for all
 *   - internal deps use "workspace:*"
 *   - a dependency used by two or more workspaces comes from the catalog
 *   - every "catalog:" ref exists in pnpm-workspace.yaml, every catalog entry is used
 *   - no dependency is declared twice in one package (dependencies + devDependencies)
 *
 * No dependencies: reads package.json files and the flat `catalog:` block.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const DEP_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
] as const

type Manifest = { name?: string; private?: boolean } & Partial<
  Record<(typeof DEP_FIELDS)[number], Record<string, string>>
>
type Workspace = { dir: string; manifest: Manifest }

function readWorkspaceYaml(): {
  globs: string[]
  catalog: Map<string, string>
} {
  const lines = readFileSync(path.join(root, 'pnpm-workspace.yaml'), 'utf8')
    .split('\n')
    .map((line) => line.replace(/\s+#.*$/, ''))
  const globs: string[] = []
  const catalog = new Map<string, string>()
  let section = ''
  for (const line of lines) {
    if (/^\S/.test(line)) section = line.replace(/:.*$/, '').trim()
    else if (section === 'packages') {
      const glob = /^\s+-\s+'?([^']+)'?$/.exec(line)?.[1]
      if (glob) globs.push(glob)
    } else if (section === 'catalog') {
      const entry = /^\s+'?([^':]+)'?:\s*(\S+)$/.exec(line)
      if (entry) catalog.set(entry[1]!, entry[2]!)
      else if (line.trim() && !line.trim().startsWith('#'))
        throw new Error(`Unrecognised catalog line: ${line}`)
    }
  }
  return { globs, catalog }
}

function listWorkspaces(globs: string[]): Workspace[] {
  const dirs = ['.']
  for (const glob of globs) {
    if (!glob.endsWith('/*')) throw new Error(`Unsupported glob: ${glob}`)
    const parent = glob.slice(0, -2)
    for (const entry of readdirSync(path.join(root, parent), {
      withFileTypes: true,
    })) {
      const dir = `${parent}/${entry.name}`
      if (
        entry.isDirectory() &&
        existsSync(path.join(root, dir, 'package.json'))
      )
        dirs.push(dir)
    }
  }
  return dirs.map((dir) => ({
    dir,
    manifest: JSON.parse(
      readFileSync(path.join(root, dir, 'package.json'), 'utf8'),
    ) as Manifest,
  }))
}

const { globs, catalog } = readWorkspaceYaml()
const workspaces = listWorkspaces(globs)
const names = new Set(workspaces.map((w) => w.manifest.name))
const errors: string[] = []
const usedCatalog = new Set<string>()
/** dependency → workspaces that declare it outside the catalog */
const pinned = new Map<string, string[]>()
const users = new Map<string, Set<string>>()

const scopes = new Set<string>()
for (const { dir, manifest } of workspaces) {
  const where = `${dir}/package.json`
  if (manifest.private !== true)
    errors.push(`${where}: missing "private": true`)

  if (dir.startsWith('packages/')) {
    const [scope, name] = (manifest.name ?? '').split('/')
    if (!name || name !== path.basename(dir))
      errors.push(`${where}: name should be <scope>/${path.basename(dir)}`)
    else scopes.add(scope!)
  }

  const seen = new Map<string, string>()
  for (const field of DEP_FIELDS) {
    for (const [dep, range] of Object.entries(manifest[field] ?? {})) {
      // peer + dev of the same package is the documented pattern (AGENTS.md)
      const previous = seen.get(dep)
      if (
        previous &&
        field !== 'peerDependencies' &&
        previous !== 'peerDependencies'
      )
        errors.push(`${where}: "${dep}" in both ${previous} and ${field}`)
      seen.set(dep, field)

      if (names.has(dep)) {
        if (range !== 'workspace:*')
          errors.push(`${where}: internal "${dep}" should be "workspace:*"`)
        continue
      }
      if (!users.has(dep)) users.set(dep, new Set())
      users.get(dep)!.add(dir)
      if (range === 'catalog:') {
        usedCatalog.add(dep)
        if (!catalog.has(dep))
          errors.push(`${where}: "${dep}" is "catalog:" but not in the catalog`)
      } else if (range.startsWith('catalog:')) {
        errors.push(
          `${where}: named catalogs are not used ("${dep}": "${range}")`,
        )
      } else {
        pinned.set(dep, [...(pinned.get(dep) ?? []), dir])
      }
    }
  }
}

if (scopes.size > 1)
  errors.push(`packages use several scopes: ${[...scopes].join(', ')}`)

for (const [dep, dirs] of pinned) {
  if ((users.get(dep)?.size ?? 0) > 1)
    errors.push(
      `"${dep}" is used by ${[...users.get(dep)!].join(', ')}: move it to the catalog (pinned in ${dirs.join(', ')})`,
    )
}

for (const dep of catalog.keys()) {
  if (!usedCatalog.has(dep))
    errors.push(`pnpm-workspace.yaml: catalog entry "${dep}" is not used`)
}

if (errors.length > 0) {
  console.error(
    `✖ ${errors.length} workspace issue(s):\n  ${errors.join('\n  ')}`,
  )
  process.exit(1)
}
console.log(
  `✔ ${workspaces.length} workspaces, ${catalog.size} catalog entries consistent`,
)
