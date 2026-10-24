/**
 * List query contract (keyword search, filters, sorting, pagination) shared by
 * the API and its clients – same shape as btp-backoffice-web's list queries:
 *
 *   GET /items?page=1&pageSize=20&keyword=abc&sortBy=createdAt&sortDir=desc
 *             &filter={"status":["A","B"],"price":{"gte":10},"createdAt":{"from":"2026-10-01"}}
 *   (or bracket syntax: filter[status][]=A&filter[status][]=B)
 *
 * Each resource declares what may be filtered/sorted with `defineListSpec`;
 * anything else is rejected with a `ListQueryError` (→ HTTP 400).
 * This module is ORM-agnostic: @repo/db turns the parsed result into Prisma args.
 */
import {
  DEFAULT_TIME_ZONE,
  ISO_DATE_FORMAT,
  dayRange,
  parseDate,
  toDate,
} from './date.js'
import type { PaginationQuery } from './pagination.js'

export const SortDirection = { Asc: 'asc', Desc: 'desc' } as const
export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection]

/** Everything a list endpoint accepts. */
export interface ListQuery extends PaginationQuery {
  /** Free-text search over the spec's `keywordFields`. */
  keyword?: string
  /** One of the spec's `sortable` fields. */
  sortBy?: string
  sortDir?: SortDirection
  /** `{ field: value | value[] | null | { operator: value } }` */
  filter?: Record<string, unknown>
}

export type FilterFieldType =
  | 'string'
  | 'uuid'
  | 'enum'
  | 'int'
  | 'float'
  | 'boolean'
  /** Exact instants (ISO date-times). */
  | 'datetime'
  /** Calendar days in the spec's time zone: `eq`, `from`, `to` cover whole days. */
  | 'date'

export type FilterOperator =
  | 'eq'
  | 'not'
  | 'in'
  | 'notIn'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'from'
  | 'to'

/** Operators each field type accepts. */
export const FILTER_OPERATORS: Record<
  FilterFieldType,
  readonly FilterOperator[]
> = {
  string: ['eq', 'not', 'in', 'notIn', 'contains', 'startsWith', 'endsWith'],
  uuid: ['eq', 'not', 'in', 'notIn'],
  enum: ['eq', 'not', 'in', 'notIn'],
  int: ['eq', 'not', 'in', 'notIn', 'gt', 'gte', 'lt', 'lte'],
  float: ['eq', 'not', 'in', 'notIn', 'gt', 'gte', 'lt', 'lte'],
  boolean: ['eq', 'not'],
  datetime: ['eq', 'not', 'gt', 'gte', 'lt', 'lte'],
  date: ['eq', 'gt', 'gte', 'lt', 'lte', 'from', 'to'],
}

/**
 * Field names a spec may use for a model: its own columns (checked) plus
 * relation paths with a dot (`author.name`, not checked – model types have no relations).
 */
export type ListField<TModel> =
  Extract<keyof TModel, string> | `${string}.${string}`

export interface FilterFieldSpec<F extends string = string> {
  type: FilterFieldType
  /** Database path when it differs from the filter key; dots go through relations (`author.name`). */
  path?: F
  /** Allowed values for `enum` fields (e.g. `Object.values(Status)` of a Prisma enum). */
  values?: readonly string[]
  /** `null` (IS NULL) / `{ not: null }` (IS NOT NULL) allowed. */
  nullable?: boolean
  /** `string` comparisons ignore case. Default `true` (other types are exact). */
  caseInsensitive?: boolean
}

/** `F`: allowed field names – `string`, or `ListField<Model>` via `defineListSpecFor`. */
export interface ListSpec<F extends string = string> {
  /** Fields searched (OR, contains, case-insensitive) by `keyword`. */
  keywordFields?: readonly F[]
  /** Fields `sortBy` may use (filter keys or database paths). */
  sortable?: readonly F[]
  defaultSort?: { field: F; dir: SortDirection }
  /** Unique field appended to every sort so pages are stable. Default `id`. */
  tieBreaker?: F
  filters?: { readonly [K in F]?: FilterFieldSpec<F> }
  /** Time zone of `date` filters. Default Asia/Ho_Chi_Minh. */
  timeZone?: string
}

/** Identity helper that keeps the literal types of a spec. */
export const defineListSpec = <const S extends ListSpec>(spec: S): S => spec

/**
 * `defineListSpec` with field names checked against a model type, e.g. the
 * Prisma-generated one – a typo or a renamed column fails at compile time:
 *
 *   export const helloListSpec = defineListSpecFor<Hello>()({ sortable: ['message'] })
 */
export const defineListSpecFor =
  <TModel>() =>
  <const S extends ListSpec<ListField<TModel>>>(
    spec: S & AliasesNeedPath<S, ListField<TModel>>,
  ): S =>
    spec

/** A filter key that is not a field (an alias) must say which field it reads via `path`. */
type AliasesNeedPath<S, F> = S extends { filters: infer Filters }
  ? { filters: { [K in keyof Filters]: K extends F ? unknown : { path: F } } }
  : unknown

/** Invalid keyword/filter/sort input – APIs map it to 400 Bad Request. */
export class ListQueryError extends Error {
  constructor(
    message: string,
    readonly field?: string,
  ) {
    super(message)
    this.name = 'ListQueryError'
  }
}

/** One validated condition: `path op value`, values already converted. */
export interface FilterCondition {
  path: string
  op: Exclude<FilterOperator, 'from' | 'to'>
  value: unknown
  caseInsensitive: boolean
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function convert(
  key: string,
  spec: FilterFieldSpec,
  raw: unknown,
  timeZone: string,
): unknown {
  const fail = (expected: string): never => {
    throw new ListQueryError(
      `Filter "${key}" expects ${expected}, got ${JSON.stringify(raw)}`,
      key,
    )
  }
  if (isPlainObject(raw) || Array.isArray(raw)) fail('a single value')

  switch (spec.type) {
    case 'string': {
      const value = String(raw).trim()
      return value || fail('a non-empty string')
    }
    case 'uuid':
      return UUID.test(String(raw)) ? String(raw) : fail('a UUID')
    case 'enum': {
      const value = String(raw)
      return spec.values?.includes(value)
        ? value
        : fail(`one of ${(spec.values ?? []).join(', ')}`)
    }
    case 'int': {
      const value = typeof raw === 'number' ? raw : Number(String(raw).trim())
      return Number.isInteger(value) && String(raw).trim() !== ''
        ? value
        : fail('an integer')
    }
    case 'float': {
      const value = typeof raw === 'number' ? raw : Number(String(raw).trim())
      return Number.isFinite(value) && String(raw).trim() !== ''
        ? value
        : fail('a number')
    }
    case 'boolean':
      if (raw === true || raw === 'true' || raw === '1' || raw === 1)
        return true
      if (raw === false || raw === 'false' || raw === '0' || raw === 0)
        return false
      return fail('true or false')
    case 'datetime':
    case 'date':
      try {
        // A bare day is a calendar day in the spec's time zone, not the server's
        if (typeof raw === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw))
          return parseDate(raw, ISO_DATE_FORMAT, timeZone)
        return toDate(raw as string | number)
      } catch {
        return fail('an ISO date (YYYY-MM-DD or date-time)')
      }
  }
}

/** Bare value → eq, array → in, null → eq null, object → operators. */
function toOperators(raw: unknown): Record<string, unknown> {
  if (raw === null) return { eq: null }
  if (Array.isArray(raw)) return { in: raw }
  if (isPlainObject(raw)) return raw
  return { eq: raw }
}

/**
 * Validate `filter` against the spec and return typed conditions.
 * Throws `ListQueryError` for unknown fields/operators or invalid values.
 */
export function parseListFilter(
  spec: ListSpec,
  filter: unknown,
): FilterCondition[] {
  if (filter === undefined || filter === null) return []
  if (!isPlainObject(filter))
    throw new ListQueryError('filter must be an object')

  const fields = spec.filters ?? {}
  const timeZone = spec.timeZone ?? DEFAULT_TIME_ZONE
  const conditions: FilterCondition[] = []

  for (const [key, raw] of Object.entries(filter)) {
    const field = fields[key]
    if (!field) {
      const allowed = Object.keys(fields)
      throw new ListQueryError(
        `Unknown filter "${key}"${allowed.length ? `. Allowed: ${allowed.join(', ')}` : ''}`,
        key,
      )
    }
    const path = field.path ?? key
    // Only text columns support case-insensitive matching (not enums/uuids)
    const caseInsensitive =
      field.type === 'string' && (field.caseInsensitive ?? true)
    const push = (op: FilterCondition['op'], value: unknown) =>
      conditions.push({ path, op, value, caseInsensitive })

    for (const [op, rawValue] of Object.entries(toOperators(raw))) {
      const allowedOps = FILTER_OPERATORS[field.type]
      if (!allowedOps.includes(op as FilterOperator)) {
        throw new ListQueryError(
          `Filter "${key}" does not support "${op}". Allowed: ${allowedOps.join(', ')}`,
          key,
        )
      }

      // NULL checks: { field: null } / { field: { not: null } }
      if (rawValue === null) {
        if (!field.nullable || (op !== 'eq' && op !== 'not'))
          throw new ListQueryError(`Filter "${key}" cannot be null`, key)
        push(op, null)
        continue
      }

      if (op === 'in' || op === 'notIn') {
        const list = Array.isArray(rawValue) ? rawValue : [rawValue]
        if (!list.length)
          throw new ListQueryError(
            `Filter "${key}.${op}" needs at least one value`,
            key,
          )
        push(
          op,
          list.map((v) => convert(key, field, v, timeZone)),
        )
        continue
      }

      const value = convert(key, field, rawValue, timeZone)

      // Calendar-day semantics for `date` fields
      if (field.type === 'date') {
        const { start, end } = dayRange(value as Date, timeZone)
        if (op === 'eq') {
          push('gte', start)
          push('lte', end)
        } else if (op === 'from' || op === 'gte') push('gte', start)
        else if (op === 'to' || op === 'lte') push('lte', end)
        else if (op === 'gt') push('gt', end)
        else push('lt', start) // lt
        continue
      }

      push(op as FilterCondition['op'], value)
    }
  }
  return conditions
}

/** Validate `sortBy`/`sortDir` against the spec (falls back to `defaultSort`). */
export function parseListSort(
  spec: ListSpec,
  sortBy?: string,
  sortDir?: string,
): { path: string; dir: SortDirection } | undefined {
  const dir = sortDir?.toLowerCase()
  if (dir !== undefined && dir !== 'asc' && dir !== 'desc')
    throw new ListQueryError('sortDir must be asc or desc', 'sortDir')

  if (!sortBy) {
    if (!spec.defaultSort) return undefined
    return {
      path:
        spec.filters?.[spec.defaultSort.field]?.path ?? spec.defaultSort.field,
      dir: dir ?? spec.defaultSort.dir,
    }
  }
  if (!spec.sortable?.includes(sortBy)) {
    throw new ListQueryError(
      `Cannot sort by "${sortBy}". Allowed: ${(spec.sortable ?? []).join(', ') || 'none'}`,
      'sortBy',
    )
  }
  return {
    path: spec.filters?.[sortBy]?.path ?? sortBy,
    dir: dir ?? SortDirection.Asc,
  }
}

/** Trimmed keyword with collapsed spaces, or undefined when empty. */
export function normalizeKeyword(keyword?: string): string | undefined {
  const value = keyword?.replace(/\s+/g, ' ').trim()
  return value || undefined
}

/**
 * Client helper: query string for a list endpoint (filter sent as JSON).
 *   apiFetch(`/hellos?${listQueryToSearchParams({ keyword, filter })}`)
 */
export function listQueryToSearchParams(
  query: Partial<ListQuery>,
): URLSearchParams {
  const params = new URLSearchParams()
  if (query.page !== undefined) params.set('page', String(query.page))
  if (query.pageSize !== undefined)
    params.set('pageSize', String(query.pageSize))
  const keyword = normalizeKeyword(query.keyword)
  if (keyword) params.set('keyword', keyword)
  if (query.sortBy) params.set('sortBy', query.sortBy)
  if (query.sortDir) params.set('sortDir', query.sortDir)
  const filter = Object.fromEntries(
    Object.entries(query.filter ?? {}).filter(([, v]) => v !== undefined),
  )
  if (Object.keys(filter).length) params.set('filter', JSON.stringify(filter))
  return params
}
