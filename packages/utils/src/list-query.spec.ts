import { describe, expect, it } from 'vitest'

import {
  ListQueryError,
  defineListSpec,
  listQueryToSearchParams,
  normalizeKeyword,
  parseListFilter,
  parseListSort,
} from './list-query.js'

const spec = defineListSpec({
  keywordFields: ['name', 'author.name'],
  sortable: ['name', 'createdAt', 'price'],
  defaultSort: { field: 'createdAt', dir: 'desc' },
  filters: {
    name: { type: 'string' },
    code: { type: 'string', caseInsensitive: false },
    id: { type: 'uuid' },
    status: { type: 'enum', values: ['DRAFT', 'PUBLISHED'] },
    price: { type: 'float' },
    stock: { type: 'int' },
    active: { type: 'boolean' },
    deletedAt: { type: 'datetime', nullable: true },
    createdAt: { type: 'date' },
    author: { type: 'string', path: 'author.name' },
  },
})

const conditions = (filter: unknown) =>
  parseListFilter(spec, filter).map(({ path, op, value }) => ({
    path,
    op,
    value: value instanceof Date ? value.toISOString() : value,
  }))

describe('parseListFilter – value shapes (btp compatible)', () => {
  it('bare value → eq, array → in, null → IS NULL', () => {
    expect(
      conditions({ status: 'DRAFT', stock: ['1', 2], deletedAt: null }),
    ).toEqual([
      { path: 'status', op: 'eq', value: 'DRAFT' },
      { path: 'stock', op: 'in', value: [1, 2] },
      { path: 'deletedAt', op: 'eq', value: null },
    ])
  })

  it('operator objects, IS NOT NULL and relation paths', () => {
    expect(
      conditions({
        price: { gte: '10', lt: 99.5 },
        name: { contains: ' abc ' },
        status: { notIn: ['DRAFT'] },
        deletedAt: { not: null },
        author: { startsWith: 'An' },
        active: 'false',
      }),
    ).toEqual([
      { path: 'price', op: 'gte', value: 10 },
      { path: 'price', op: 'lt', value: 99.5 },
      { path: 'name', op: 'contains', value: 'abc' },
      { path: 'status', op: 'notIn', value: ['DRAFT'] },
      { path: 'deletedAt', op: 'not', value: null },
      { path: 'author.name', op: 'startsWith', value: 'An' },
      { path: 'active', op: 'eq', value: false },
    ])
  })

  it('keeps case sensitivity per field', () => {
    const [cond] = parseListFilter(spec, { code: 'AbC' })
    expect(cond?.caseInsensitive).toBe(false)
    expect(parseListFilter(spec, { name: 'x' })[0]?.caseInsensitive).toBe(true)
    // enums/uuids are matched exactly (Prisma rejects `mode` on them)
    expect(parseListFilter(spec, { status: 'DRAFT' })[0]?.caseInsensitive).toBe(
      false,
    )
  })
})

describe('parseListFilter – calendar days (Asia/Ho_Chi_Minh)', () => {
  it('eq / from / to cover whole days in Vietnam time', () => {
    expect(conditions({ createdAt: '2026-10-20' })).toEqual([
      { path: 'createdAt', op: 'gte', value: '2026-10-19T17:00:00.000Z' },
      { path: 'createdAt', op: 'lte', value: '2026-10-20T16:59:59.999Z' },
    ])
    expect(
      conditions({ createdAt: { from: '2026-10-01', to: '2026-10-31' } }),
    ).toEqual([
      { path: 'createdAt', op: 'gte', value: '2026-09-30T17:00:00.000Z' },
      { path: 'createdAt', op: 'lte', value: '2026-10-31T16:59:59.999Z' },
    ])
    expect(
      conditions({ createdAt: { gt: '2026-10-20', lt: '2026-10-25' } }),
    ).toEqual([
      { path: 'createdAt', op: 'gt', value: '2026-10-20T16:59:59.999Z' },
      { path: 'createdAt', op: 'lt', value: '2026-10-24T17:00:00.000Z' },
    ])
  })

  it('does not depend on the server time zone', () => {
    // Vitest runs with the host TZ; the result above must not change with it.
    // (CI and Docker images use UTC, developer machines often +07:00.)
    expect(new Date('2026-10-20T00:00:00').getTimezoneOffset()).toBeTypeOf(
      'number',
    )
    expect(conditions({ createdAt: '2026-10-20' })[0]?.value).toBe(
      '2026-10-19T17:00:00.000Z',
    )
  })
})

describe('parseListFilter – rejects bad input with clear messages', () => {
  it.each<[unknown, RegExp]>([
    [{ secret: 1 }, /Unknown filter "secret". Allowed: name, code/],
    [{ name: { gt: 'a' } }, /"name" does not support "gt"/],
    [{ status: 'ARCHIVED' }, /expects one of DRAFT, PUBLISHED/],
    [{ stock: '1.5' }, /expects an integer/],
    [{ price: 'abc' }, /expects a number/],
    [{ active: 'yes' }, /expects true or false/],
    [{ id: 'not-a-uuid' }, /expects a UUID/],
    [{ createdAt: '2026-13-45' }, /expects an ISO date/],
    [{ name: null }, /cannot be null/],
    [{ name: '   ' }, /non-empty string/],
    [{ stock: { in: [] } }, /needs at least one value/],
    [{ name: { contains: ['a'] } }, /expects a single value/],
    ['status=1', /filter must be an object/],
  ])('%j', (filter, message) => {
    expect(() => parseListFilter(spec, filter)).toThrow(ListQueryError)
    expect(() => parseListFilter(spec, filter)).toThrow(message)
  })

  it('accepts no filter', () => {
    expect(parseListFilter(spec, undefined)).toEqual([])
    expect(parseListFilter(spec, {})).toEqual([])
  })
})

describe('parseListSort', () => {
  it('uses the default sort, validates fields and maps paths', () => {
    expect(parseListSort(spec)).toEqual({ path: 'createdAt', dir: 'desc' })
    expect(parseListSort(spec, 'price', 'DESC')).toEqual({
      path: 'price',
      dir: 'desc',
    })
    expect(parseListSort(spec, 'name')).toEqual({ path: 'name', dir: 'asc' })
    expect(() => parseListSort(spec, 'password')).toThrow(
      'Cannot sort by "password". Allowed: name, createdAt, price',
    )
    expect(() => parseListSort(spec, 'name', 'up')).toThrow('asc or desc')
  })
})

describe('client helpers', () => {
  it('normalizes keywords', () => {
    expect(normalizeKeyword('  xin   chào ')).toBe('xin chào')
    expect(normalizeKeyword('   ')).toBeUndefined()
  })

  it('builds the query string with JSON filter', () => {
    const params = listQueryToSearchParams({
      page: 2,
      pageSize: 10,
      keyword: ' abc ',
      sortBy: 'createdAt',
      sortDir: 'desc',
      filter: { status: ['DRAFT'], price: { gte: 10 }, unused: undefined },
    })
    expect(Object.fromEntries(params)).toEqual({
      page: '2',
      pageSize: '10',
      keyword: 'abc',
      sortBy: 'createdAt',
      sortDir: 'desc',
      filter: '{"status":["DRAFT"],"price":{"gte":10}}',
    })
    expect(listQueryToSearchParams({ filter: {} }).toString()).toBe('')
  })
})
