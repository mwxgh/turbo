import { describe, expect, it, vi } from 'vitest'

import { HEALTH_POLL_MS, healthQueryOptions } from './health'
import { hellosKeys, hellosListQueryOptions } from './hellos'

const { apiFetch } = vi.hoisted(() => ({ apiFetch: vi.fn() }))
vi.mock('../api', () => ({ apiFetch }))

describe('query options', () => {
  it('nests list keys under hellosKeys.all for invalidation', () => {
    expect(hellosListQueryOptions().queryKey).toEqual(['hellos', 'list'])
    expect(hellosKeys.list().slice(0, 1)).toEqual([...hellosKeys.all])
  })

  it('polls health and does not retry (shows offline fast)', () => {
    const options = healthQueryOptions()
    expect(options.refetchInterval).toBe(HEALTH_POLL_MS)
    expect(options.retry).toBe(false)
  })

  it('fetch the expected API paths', async () => {
    apiFetch.mockResolvedValue({})
    const ctx = {} as never
    await hellosListQueryOptions().queryFn!(ctx)
    await healthQueryOptions().queryFn!(ctx)
    expect(apiFetch).toHaveBeenNthCalledWith(
      1,
      '/hellos?pageSize=100&sortBy=createdAt&sortDir=desc',
      {
        cache: 'no-store',
      },
    )
    expect(apiFetch).toHaveBeenNthCalledWith(2, '/health', {
      cache: 'no-store',
    })
  })
})
