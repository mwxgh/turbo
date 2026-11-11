import { describe, expect, it, vi } from 'vitest'

import { hellosKeys, hellosListQueryOptions } from './hellos'

const { apiFetch } = vi.hoisted(() => ({ apiFetch: vi.fn() }))
vi.mock('../api', () => ({ apiFetch }))

describe('hellosListQueryOptions', () => {
  it('keys each list query under hellosKeys.all (one cache entry per page/filter)', () => {
    const query = { page: 2, pageSize: 20, keyword: 'xin' }
    expect(hellosListQueryOptions(query).queryKey).toEqual([
      'hellos',
      'list',
      query,
    ])
    expect(hellosKeys.lists().slice(0, 1)).toEqual([...hellosKeys.all])
  })

  it('fetches GET /hellos with the list query', async () => {
    apiFetch.mockResolvedValue({})
    await hellosListQueryOptions({
      page: 1,
      pageSize: 20,
      sortBy: 'createdAt',
      sortDir: 'desc',
    }).queryFn!({} as never)
    expect(apiFetch).toHaveBeenCalledWith(
      '/hellos?page=1&pageSize=20&sortBy=createdAt&sortDir=desc',
      { cache: 'no-store' },
    )
  })
})
