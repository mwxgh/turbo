import { QueryClient } from '@tanstack/react-query'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { hellosInfiniteQueryOptions } from './hellos'

const page = (page: number, totalPages: number) => ({
  items: [],
  total: 0,
  page,
  pageSize: 20,
  totalPages,
})

describe('hellosInfiniteQueryOptions', () => {
  afterEach(() => vi.restoreAllMocks())

  it('asks for the next page until the last one', () => {
    const { getNextPageParam } = hellosInfiniteQueryOptions()
    expect(getNextPageParam(page(1, 3), [], 1, [])).toBe(2)
    expect(getNextPageParam(page(3, 3), [], 3, [])).toBeUndefined()
  })

  it('fetches GET /hellos page by page', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify(page(1, 1))))
    await new QueryClient().fetchInfiniteQuery(hellosInfiniteQueryOptions())
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:4000/api/hellos?page=1&pageSize=20',
      { headers: {} },
    )
  })
})
