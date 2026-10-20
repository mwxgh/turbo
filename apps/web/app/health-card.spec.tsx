import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createTestQueryClient, renderWithQuery } from '../lib/test-utils'
import { HealthCard } from './health-card'

const { apiFetch } = vi.hoisted(() => ({ apiFetch: vi.fn() }))
vi.mock('../lib/api', () => ({ apiFetch }))

const health = {
  status: 'ok',
  service: 'api',
  env: 'dev',
  uptime: 1,
  timestamp: '2026-10-21T00:00:00.000Z',
  checks: { database: 'up' },
}

describe('HealthCard', () => {
  beforeEach(() => {
    apiFetch.mockReset()
  })

  it('shows data prefetched on the server without fetching again', () => {
    const queryClient = createTestQueryClient()
    queryClient.setQueryData(['health'], health)
    renderWithQuery(<HealthCard />, queryClient)

    expect(screen.getByText('online')).toBeInTheDocument()
    expect(apiFetch).not.toHaveBeenCalled()
  })

  it('fetches from the browser and shows online', async () => {
    apiFetch.mockResolvedValue(health)
    renderWithQuery(<HealthCard />)

    expect(screen.getByText('checking…')).toBeInTheDocument()
    expect(await screen.findByText('online')).toBeInTheDocument()
    expect(screen.getByText(/"database": "up"/)).toBeInTheDocument()
    expect(apiFetch).toHaveBeenCalledWith('/health', { cache: 'no-store' })
  })

  it('shows offline when the API fails', async () => {
    apiFetch.mockRejectedValue(new Error('down'))
    renderWithQuery(<HealthCard />)
    expect(await screen.findByText('offline')).toBeInTheDocument()
  })
})
