import { QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { Hello } from '@repo/types'
import { paginated } from '@repo/utils'

import { hellosKeys } from '../../lib/queries/hellos'
import { createTestQueryClient } from '../../lib/test-utils'
import { useDeleteHello } from './use-hello-mutations'

vi.mock('./actions', () => ({
  deleteHello: vi.fn(() => new Promise<void>(() => {})), // still in flight
}))
vi.mock('@repo/ui/components/sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const hello = (id: string): Hello => ({
  id,
  message: id,
  createdAt: '2026-10-28T00:00:00.000Z',
  updatedAt: '2026-10-28T00:00:00.000Z',
})

describe('useDeleteHello', () => {
  it('optimistically updates only the cached pages that show the row', async () => {
    const queryClient = createTestQueryClient()
    const page1 = [...hellosKeys.lists(), { page: 1, pageSize: 2 }]
    const page2 = [...hellosKeys.lists(), { page: 2, pageSize: 2 }]
    queryClient.setQueryData(
      page1,
      paginated([hello('a'), hello('b')], 3, { page: 1, pageSize: 2 }),
    )
    const untouched = paginated([hello('c')], 3, { page: 2, pageSize: 2 })
    queryClient.setQueryData(page2, untouched)

    const { result } = renderHook(() => useDeleteHello(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    })
    await act(async () => {
      result.current.mutate('a')
      await Promise.resolve()
    })

    await vi.waitFor(() =>
      expect(queryClient.getQueryData(page1)).toMatchObject({
        items: [hello('b')],
        total: 2,
        totalPages: 1,
      }),
    )
    expect(queryClient.getQueryData(page2)).toBe(untouched)
  })
})
