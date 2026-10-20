import {
  type FilterCondition,
  type ListQuery,
  type ListSpec,
  normalizeKeyword,
  paginationArgs,
  parseListFilter,
  parseListSort,
} from '@repo/utils'

type Json = Record<string, unknown>

/** `'author.name'` + leaf → `{ author: { name: leaf } }` (to-one relations). */
function nest(path: string, leaf: unknown): Json {
  return path
    .split('.')
    .reduceRight<unknown>((acc, key) => ({ [key]: acc }), leaf) as Json
}

const TEXT_OPS = new Set([
  'contains',
  'startsWith',
  'endsWith',
  'eq',
  'in',
  'notIn',
])
const PATTERN_OPS = new Set(['contains', 'startsWith', 'endsWith'])

/**
 * Prisma builds LIKE/ILIKE patterns for contains/startsWith/endsWith without
 * escaping, so a user typing `%` or `_` would match every row. Escape them
 * (Postgres' default LIKE escape character is the backslash).
 */
export const escapeLike = (value: string): string =>
  value.replace(/[\\%_]/g, (char) => `\\${char}`)

function toPrismaCondition({
  op,
  value,
  caseInsensitive,
}: FilterCondition): unknown {
  if (value === null) return op === 'not' ? { not: null } : null // IS (NOT) NULL
  const mode =
    caseInsensitive && TEXT_OPS.has(op) && isText(value)
      ? { mode: 'insensitive' }
      : {}
  const key = op === 'eq' ? 'equals' : op
  const safe =
    PATTERN_OPS.has(op) && typeof value === 'string' ? escapeLike(value) : value
  return { [key]: safe, ...mode }
}

const isText = (value: unknown) =>
  typeof value === 'string' ||
  (Array.isArray(value) && value.every((v) => typeof v === 'string'))

export interface PrismaListArgs<TWhere, TOrderBy> {
  where: TWhere
  orderBy: TOrderBy[]
  skip: number
  take: number
}

/**
 * Turn a validated list query into Prisma `findMany` args:
 *
 *   const { where, ...args } = toPrismaListArgs<Prisma.HelloWhereInput,
 *     Prisma.HelloOrderByWithRelationInput>(helloListSpec, query)
 *   const [items, total] = await prisma.$transaction([
 *     prisma.hello.findMany({ where, ...args }), prisma.hello.count({ where })])
 *
 * Throws `ListQueryError` (→ 400) for filters/sorts the spec does not allow.
 */
export function toPrismaListArgs<TWhere = Json, TOrderBy = Json>(
  spec: ListSpec,
  query: ListQuery,
): PrismaListArgs<TWhere, TOrderBy> {
  const and: Json[] = parseListFilter(spec, query.filter).map((condition) =>
    nest(condition.path, toPrismaCondition(condition)),
  )

  const keyword = normalizeKeyword(query.keyword)
  if (keyword && spec.keywordFields?.length) {
    and.push({
      OR: spec.keywordFields.map((path) =>
        nest(path, { contains: escapeLike(keyword), mode: 'insensitive' }),
      ),
    })
  }

  const sort = parseListSort(spec, query.sortBy, query.sortDir)
  const tieBreaker = spec.tieBreaker ?? 'id'
  // `orderBy` is Prisma's argument name; the public API only says sortBy/sortDir
  const orderBy = [
    ...(sort ? [nest(sort.path, sort.dir)] : []),
    // Stable pages when sort values are equal
    ...(sort?.path === tieBreaker
      ? []
      : [{ [tieBreaker]: sort?.dir ?? 'asc' }]),
  ]

  return {
    where: (and.length ? { AND: and } : {}) as TWhere,
    orderBy: orderBy as TOrderBy[],
    ...paginationArgs(query),
  }
}
