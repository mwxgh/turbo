import { nestLayer } from './layers/backend-nest.js'
import { baseLayer } from './layers/base.js'
import { frontendLayer } from './layers/frontend.js'
import { drizzleLayer } from './layers/orm-drizzle.js'
import { prismaLayer } from './layers/orm-prisma.js'
import { typeormLayer } from './layers/orm-typeorm.js'
import type { OrmLayer } from './layers/orm.js'
import { type ScaffoldOptions, incompatibilities } from './options.js'
import { type FileTree, sortedPaths } from './tree.js'

export class ScaffoldError extends Error {
  constructor(readonly reasons: string[]) {
    super(reasons.join(' '))
  }
}

const ORM_LAYERS: Record<
  ScaffoldOptions['orm'],
  (o: ScaffoldOptions) => OrmLayer
> = {
  prisma: prismaLayer,
  drizzle: drizzleLayer,
  typeorm: typeormLayer,
}

/** The files of a new project for these options (throws ScaffoldError when they do not fit). */
export function generate(options: ScaffoldOptions): FileTree {
  const reasons = incompatibilities(options)
  if (reasons.length) throw new ScaffoldError(reasons)
  const tree: FileTree = {
    ...baseLayer(options),
    ...nestLayer(options, ORM_LAYERS[options.orm](options)),
    ...frontendLayer(options),
  }
  return Object.fromEntries(
    sortedPaths(tree).map((path) => [path, tree[path]!]),
  )
}

/** Every combination that can be generated (verification, previews). */
export function supportedCombinations(): ScaffoldOptions[] {
  const all: ScaffoldOptions[] = []
  for (const orm of ['prisma', 'drizzle', 'typeorm'] as const)
    for (const database of ['postgres', 'mysql', 'mongodb'] as const)
      for (const frontend of ['next', 'react'] as const) {
        const options: ScaffoldOptions = {
          name: `app-${orm}-${database}-${frontend}`,
          backend: 'nest',
          orm,
          database,
          frontend,
        }
        if (!incompatibilities(options).length) all.push(options)
      }
  return all
}
