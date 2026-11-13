import { type AppContext, TYPES, appContext } from './layers/app.js'
import { expressLayer } from './layers/backend-express.js'
import { nestLayer } from './layers/backend-nest.js'
import { allowBuilds, appDirs, baseLayer } from './layers/base.js'
import { frontendLayer } from './layers/frontend.js'
import { applyCatalog, isModern, modernRoot } from './layers/modern.js'
import { drizzleLayer } from './layers/orm-drizzle.js'
import { mongodbLayer } from './layers/orm-mongodb.js'
import { mongooseLayer } from './layers/orm-mongoose.js'
import { prismaLayer } from './layers/orm-prisma.js'
import { typeormLayer } from './layers/orm-typeorm.js'
import type { OrmLayer } from './layers/orm.js'
import {
  BACKENDS,
  DATABASES,
  FRONTENDS,
  REPOS,
  type ScaffoldOptions,
  incompatibilities,
  ormIdsFor,
} from './options.js'
import { type FileTree, json, sortedPaths } from './tree.js'
import { V } from './versions.js'

export class ScaffoldError extends Error {
  constructor(readonly reasons: string[]) {
    super(reasons.join(' '))
  }
}

/** The ORMs generated today (TypeScript); the others are planned (options.ts). */
const ORM_LAYERS: Partial<
  Record<ScaffoldOptions['orm'], (o: ScaffoldOptions) => OrmLayer>
> = {
  prisma: prismaLayer,
  drizzle: drizzleLayer,
  typeorm: typeormLayer,
  mongoose: mongooseLayer,
  // No ORM in TypeScript: only MongoDB offers it today (ORMS_BY_STACK)
  none: mongodbLayer,
}

/**
 * An app's files under its folder. Single repo: the app also gets its types file, its own
 * pnpm-workspace.yaml (install-script settings) and the pnpm version, like any standalone project.
 */
function inApp(o: ScaffoldOptions, ctx: AppContext, files: FileTree) {
  const app: FileTree = { ...files }
  if (!ctx.monorepo) {
    app[ctx.typesFile!] = TYPES
    app['pnpm-workspace.yaml'] = [...allowBuilds(o), ''].join('\n')
    const pkg = JSON.parse(app['package.json']!) as Record<string, unknown>
    app['package.json'] = json({
      ...pkg,
      packageManager: `pnpm@${V.pnpm}`,
      engines: { node: `>=${V.node}` },
    })
  }
  return Object.fromEntries(
    Object.entries(app).map(([path, content]) => [
      `${ctx.dir}/${path}`,
      content,
    ]),
  )
}

/** The files of a new project for these options (throws ScaffoldError when they do not fit). */
export function generate(options: ScaffoldOptions): FileTree {
  const reasons = incompatibilities(options)
  if (reasons.length) throw new ScaffoldError(reasons)
  const orm = ORM_LAYERS[options.orm]!(options)
  const api = appContext(options, 'api', 'src/types.ts')
  const web = appContext(
    options,
    'web',
    options.frontend === 'next' ? 'types.ts' : 'src/types.ts',
  )
  const backend = options.backend === 'express' ? expressLayer : nestLayer
  let tree: FileTree = {
    ...baseLayer(options),
    ...inApp(options, api, backend(options, orm, api)),
    ...inApp(options, web, frontendLayer(options, web)),
  }
  // Monorepo: shared tooling, hooks, Docker, CI, and every version in the pnpm catalog
  if (isModern(options))
    tree = applyCatalog({ ...tree, ...modernRoot(options) })
  return Object.fromEntries(
    sortedPaths(tree).map((path) => [path, tree[path]!]),
  )
}

/** Every combination that can be generated: repo, database, backend, its ORMs, frontend. */
export function supportedCombinations(): ScaffoldOptions[] {
  const all: ScaffoldOptions[] = []
  for (const { value: repo } of REPOS)
    for (const { value: database } of DATABASES)
      for (const { value: backend } of BACKENDS.filter((b) => !b.planned))
        for (const orm of ormIdsFor(backend, database))
          for (const { value: frontend } of FRONTENDS) {
            const options: ScaffoldOptions = {
              name: `app-${repo}-${backend}-${database}-${orm}-${frontend}`,
              repo,
              backend,
              database,
              orm,
              frontend,
            }
            if (!incompatibilities(options).length) all.push(options)
          }
  return all
}

export { appDirs }
