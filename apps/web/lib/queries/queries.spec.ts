import { describe, expect, it, vi } from 'vitest'

import { HEALTH_POLL_MS, healthQueryOptions } from './health'
import { hellosKeys, hellosListQueryOptions } from './hellos'

const { apiFetch } = vi.hoisted(() => ({ apiFetch: vi.fn() }))
vi.mock('../api', () => ({ apiFetch }))

describe('query options', () => {
  it('keys each list query under hellosKeys.all (one cache entry per page/filter)', () => {
    const query = { page: 2, pageSize: 20, keyword: 'xin' }
    expect(hellosListQueryOptions(query).queryKey).toEqual([
      'hellos',
      'list',
      query,
    ])
    expect(hellosKeys.lists().slice(0, 1)).toEqual([...hellosKeys.all])
  })

  it('polls health and does not retry (shows offline fast)', () => {
    const options = healthQueryOptions()
    expect(options.refetchInterval).toBe(HEALTH_POLL_MS)
    expect(options.retry).toBe(false)
  })

  it('fetches the expected API paths', async () => {
    apiFetch.mockResolvedValue({})
    const ctx = {} as never
    await hellosListQueryOptions({
      page: 1,
      pageSize: 20,
      sortBy: 'createdAt',
      sortDir: 'desc',
    }).queryFn!(ctx)
    await healthQueryOptions().queryFn!(ctx)
    expect(apiFetch).toHaveBeenNthCalledWith(
      1,
      '/hellos?page=1&pageSize=20&sortBy=createdAt&sortDir=desc',
      { cache: 'no-store' },
    )
    expect(apiFetch).toHaveBeenNthCalledWith(2, '/health', {
      cache: 'no-store',
    })
  })
})
