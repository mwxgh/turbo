import { describe, expect, it, vi } from 'vitest'

import { HEALTH_POLL_MS, healthQueryOptions } from './health'

const { apiFetch } = vi.hoisted(() => ({ apiFetch: vi.fn() }))
vi.mock('@/lib/api', () => ({ apiFetch }))

describe('healthQueryOptions', () => {
  it('polls health and does not retry (shows offline fast)', () => {
    const options = healthQueryOptions()
    expect(options.refetchInterval).toBe(HEALTH_POLL_MS)
    expect(options.retry).toBe(false)
  })

  it('fetches GET /health uncached', async () => {
    apiFetch.mockResolvedValue({})
    await healthQueryOptions().queryFn!({} as never)
    expect(apiFetch).toHaveBeenCalledWith('/health', { cache: 'no-store' })
  })
})
