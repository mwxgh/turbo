import { describe, expect, it } from 'vitest'

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  paginated,
  paginationArgs,
  totalPages,
} from './pagination.js'

describe('pagination', () => {
  it('has sane defaults', () => {
    expect([DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE]).toEqual([
      1, 20, 100,
    ])
  })

  it('converts a 1-based page to skip/take', () => {
    expect(paginationArgs({ page: 1, pageSize: 20 })).toEqual({
      skip: 0,
      take: 20,
    })
    expect(paginationArgs({ page: 3, pageSize: 10 })).toEqual({
      skip: 20,
      take: 10,
    })
  })

  it('counts pages (at least one)', () => {
    expect(totalPages(0, 20)).toBe(1)
    expect(totalPages(20, 20)).toBe(1)
    expect(totalPages(21, 20)).toBe(2)
  })

  it('builds the response body', () => {
    expect(paginated(['a', 'b'], 12, { page: 2, pageSize: 10 })).toEqual({
      items: ['a', 'b'],
      total: 12,
      page: 2,
      pageSize: 10,
      totalPages: 2,
    })
  })
})
