import { describe, expect, it } from 'vitest'

import { ListQueryError, defineListSpec } from '@repo/utils'

import { escapeLike, toPrismaListArgs } from './list-query.js'

const spec = defineListSpec({
  keywordFields: ['title', 'author.name'],
  sortable: ['title', 'createdAt', 'author'],
  defaultSort: { field: 'createdAt', dir: 'desc' },
  filters: {
    title: { type: 'string' },
    code: { type: 'string', caseInsensitive: false },
    status: { type: 'enum', values: ['A', 'B'] },
    price: { type: 'float' },
    deletedAt: { type: 'datetime', nullable: true },
    author: { type: 'string', path: 'author.name' },
  },
})

const page = { page: 2, pageSize: 10 }

describe('toPrismaListArgs', () => {
  it('maps pagination and the default sort with a tie-breaker', () => {
    expect(toPrismaListArgs(spec, page)).toEqual({
      where: {},
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      skip: 10,
      take: 10,
    })
  })

  it('builds AND conditions, case-insensitive text and relation paths', () => {
    const { where } = toPrismaListArgs(spec, {
      ...page,
      filter: {
        status: ['A', 'B'],
        price: { gte: 10, lt: '20' },
        title: { contains: 'hello' },
        code: 'X1',
        deletedAt: null,
        author: 'An',
      },
    })
    expect(where).toEqual({
      AND: [
        { status: { in: ['A', 'B'] } }, // enum: exact match
        { price: { gte: 10 } },
        { price: { lt: 20 } },
        { title: { contains: 'hello', mode: 'insensitive' } },
        { code: { equals: 'X1' } },
        { deletedAt: null },
        { author: { name: { equals: 'An', mode: 'insensitive' } } },
      ],
    })
  })

  it('searches the keyword across fields (OR) and IS NOT NULL', () => {
    const { where } = toPrismaListArgs(spec, {
      ...page,
      keyword: '  xin  chào ',
      filter: { deletedAt: { not: null } },
    })
    expect(where).toEqual({
      AND: [
        { deletedAt: { not: null } },
        {
          OR: [
            { title: { contains: 'xin chào', mode: 'insensitive' } },
            { author: { name: { contains: 'xin chào', mode: 'insensitive' } } },
          ],
        },
      ],
    })
  })

  it('sorts by a relation field', () => {
    expect(
      toPrismaListArgs(spec, { ...page, sortBy: 'author', sortDir: 'asc' })
        .orderBy,
    ).toEqual([{ author: { name: 'asc' } }, { id: 'asc' }])
  })

  it('rejects what the spec does not allow', () => {
    expect(() =>
      toPrismaListArgs(spec, { ...page, filter: { password: 'x' } }),
    ).toThrow(ListQueryError)
    expect(() =>
      toPrismaListArgs(spec, { ...page, sortBy: 'password' }),
    ).toThrow(ListQueryError)
  })

  it('escapes LIKE wildcards in pattern filters and the keyword', () => {
    expect(escapeLike('100%_a\\b')).toBe('100\\%\\_a\\\\b')
    const { where } = toPrismaListArgs(spec, {
      ...page,
      keyword: '50%',
      filter: { title: { startsWith: 'a_b' }, code: 'x%' },
    })
    expect(where).toEqual({
      AND: [
        { title: { startsWith: 'a\\_b', mode: 'insensitive' } },
        { code: { equals: 'x%' } }, // equality is not a pattern: untouched
        {
          OR: [
            { title: { contains: '50\\%', mode: 'insensitive' } },
            { author: { name: { contains: '50\\%', mode: 'insensitive' } } },
          ],
        },
      ],
    })
  })
})
