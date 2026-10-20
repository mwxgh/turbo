import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type Paginated, paginated } from '@repo/utils'

import { hellosKeys } from '../../lib/queries/hellos'
import { createTestQueryClient, renderWithQuery } from '../../lib/test-utils'
import type { Hello } from '../../lib/types'
import { HellosView } from './hellos-view'

const { apiFetch } = vi.hoisted(() => ({ apiFetch: vi.fn() }))
vi.mock('../../lib/api', () => ({ apiFetch }))

const actions = vi.hoisted(() => ({
  createHello: vi.fn(),
  updateHello: vi.fn(),
  deleteHello: vi.fn(),
}))
vi.mock('./actions', () => actions)

const hello = (id: string, message: string): Hello => ({
  id,
  message,
  createdAt: '2026-10-20T12:47:00.000Z',
  updatedAt: '2026-10-20T12:47:00.000Z',
})
const page = (...items: Hello[]): Paginated<Hello> =>
  paginated(items, items.length, { page: 1, pageSize: 100 })

/** Like the server prefetch + HydrationBoundary: the cache starts filled. */
function renderPrefetched(data: Paginated<Hello>) {
  const queryClient = createTestQueryClient()
  queryClient.setQueryData(hellosKeys.list(), data)
  return renderWithQuery(<HellosView />, queryClient)
}

describe('HellosView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders prefetched data without a request', () => {
    renderPrefetched(page(hello('h1', 'Xin chào')))
    expect(
      screen.getByRole('heading', { name: 'Hellos (1)' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Xin chào')).toBeInTheDocument()
    expect(apiFetch).not.toHaveBeenCalled()
  })

  it('refetches the list after creating a hello', async () => {
    renderPrefetched(page(hello('h1', 'Xin chào')))
    actions.createHello.mockResolvedValue({})
    apiFetch.mockResolvedValue(
      page(hello('h2', 'New one'), hello('h1', 'Xin chào')),
    )

    await userEvent.type(screen.getByLabelText('New hello'), 'New one')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(actions.createHello).toHaveBeenCalledWith({ message: 'New one' })
    expect(await screen.findByText('New one')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Hellos (2)' }),
    ).toBeInTheDocument()
  })

  it('does not refetch when the API rejects the input', async () => {
    renderPrefetched(page())
    actions.createHello.mockResolvedValue({ errors: ['Record already exists'] })

    await userEvent.type(screen.getByLabelText('New hello'), 'dup')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Record already exists',
    )
    expect(apiFetch).not.toHaveBeenCalled()
  })

  it('removes a row optimistically, before the API answers', async () => {
    renderPrefetched(page(hello('h1', 'Xin chào'), hello('h2', 'Hello')))
    let finish!: () => void
    actions.deleteHello.mockReturnValue(new Promise<void>((r) => (finish = r)))
    apiFetch.mockResolvedValue(page(hello('h2', 'Hello')))

    const row = screen.getByRole('row', { name: /Xin chào/ })
    await userEvent.click(within(row).getByRole('button', { name: 'Delete' }))

    // Gone while the request is still pending
    expect(screen.queryByText('Xin chào')).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Hellos (1)' }),
    ).toBeInTheDocument()
    finish()
    await waitFor(() => expect(apiFetch).toHaveBeenCalled()) // settled → refetch
  })

  it('puts the row back when the delete fails', async () => {
    renderPrefetched(page(hello('h1', 'Xin chào')))
    actions.deleteHello.mockRejectedValue(new Error('forbidden'))
    apiFetch.mockResolvedValue(page(hello('h1', 'Xin chào')))

    const row = screen.getByRole('row', { name: /Xin chào/ })
    await userEvent.click(within(row).getByRole('button', { name: 'Delete' }))

    expect(await screen.findByText('Xin chào')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Hellos (1)' }),
    ).toBeInTheDocument()
  })

  it('offers a retry when loading fails', async () => {
    apiFetch.mockRejectedValueOnce(new Error('down')).mockResolvedValue(page())
    renderWithQuery(<HellosView />)

    await userEvent.click(await screen.findByRole('button', { name: 'Retry' }))
    expect(await screen.findByText('No hellos yet.')).toBeInTheDocument()
  })
})
