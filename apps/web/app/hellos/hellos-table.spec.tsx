import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { DEFAULT_PAGE_SIZE, paginated } from '@repo/utils'

import { hellosListQueryOptions } from '../../lib/queries/hellos'
import {
  chooseRowAction,
  createTestQueryClient,
  renderWithQuery,
} from '../../lib/test-utils'
import type { Hello } from '../../lib/types'
import { HellosTable } from './hellos-table'

const { apiFetch } = vi.hoisted(() => ({ apiFetch: vi.fn() }))
vi.mock('../../lib/api', () => ({ apiFetch }))

const actions = vi.hoisted(() => ({
  createHello: vi.fn(),
  updateHello: vi.fn(),
  deleteHello: vi.fn(),
}))
vi.mock('./actions', () => actions)

const hello = (id: string, message: string, createdAt: string): Hello => ({
  id,
  message,
  createdAt,
  updatedAt: createdAt,
})
// 12:47 UTC → 19:47 in Asia/Ho_Chi_Minh
const hellos = [
  hello('h1', 'Xin chào', '2026-10-20T12:47:00.000Z'),
  hello('h2', 'Hello', '2026-10-21T01:00:00.000Z'),
]
const firstPage = { page: 1, pageSize: DEFAULT_PAGE_SIZE }

/** Cache filled like the page prefetch for a URL without parameters. */
function renderTable() {
  const queryClient = createTestQueryClient()
  queryClient.setQueryData(
    hellosListQueryOptions(firstPage).queryKey,
    paginated(hellos, hellos.length, firstPage),
  )
  apiFetch.mockResolvedValue(paginated(hellos, hellos.length, firstPage))
  return renderWithQuery(<HellosTable />, queryClient)
}

const rowOf = (text: string) =>
  screen.getByRole('row', { name: new RegExp(text) })
const lastUrl = () => apiFetch.mock.lastCall?.[0] as string | undefined

describe('HellosTable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('lists the prefetched page with the Vietnam-time creation date', () => {
    renderTable()
    expect(
      within(rowOf('Xin chào')).getByText('20/10/2026 19:47'),
    ).toHaveAttribute('datetime', hellos[0]!.createdAt)
    expect(screen.getByText('Showing 1–2 of 2')).toBeInTheDocument()
    expect(apiFetch).not.toHaveBeenCalled()
  })

  it('sorts, searches and filters on the API', async () => {
    renderTable()
    await userEvent.click(screen.getByRole('button', { name: /Message/ }))
    await waitFor(() =>
      expect(lastUrl()).toBe(
        '/hellos?page=1&pageSize=20&sortBy=message&sortDir=asc',
      ),
    )

    await userEvent.type(screen.getByPlaceholderText('Search hellos…'), 'xin')
    await waitFor(() => expect(lastUrl()).toContain('keyword=xin'))

    await userEvent.click(screen.getByLabelText('Created from'))
    const firstOfMonth = within(await screen.findByRole('grid')).getByText('1')
    await userEvent.click(firstOfMonth)
    await waitFor(() =>
      expect(decodeURIComponent(lastUrl() ?? '')).toMatch(
        /filter=\{"createdAt":\{"from":"\d{4}-\d{2}-01"\}\}/,
      ),
    )
  })

  it('deletes by id', async () => {
    renderTable()
    await chooseRowAction(rowOf('Xin chào'), 'Delete')
    expect(actions.deleteHello).toHaveBeenCalledWith('h1')
  })

  it('edits inline and closes the editor on success', async () => {
    actions.updateHello.mockResolvedValue({})
    renderTable()

    await chooseRowAction(rowOf('Xin chào'), 'Edit')
    const input = screen.getByLabelText('Edit message')
    await userEvent.clear(input)
    await userEvent.type(input, 'Updated')
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(actions.updateHello).toHaveBeenCalledWith('h1', {
      message: 'Updated',
    })
    expect(screen.queryByLabelText('Edit message')).not.toBeInTheDocument()
  })
})
