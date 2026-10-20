import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithQuery as render } from '../../lib/test-utils'
import type { Hello } from '../../lib/types'
import { HellosTable } from './hellos-table'

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

const rowOf = (text: string) =>
  screen.getByRole('row', { name: new RegExp(text) })

describe('HellosTable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('lists hellos with the Vietnam-time creation date', () => {
    render(<HellosTable hellos={hellos} />)
    const row = rowOf('Xin chào')
    expect(within(row).getByText('20/10/2026 19:47')).toHaveAttribute(
      'datetime',
      hellos[0]!.createdAt,
    )
  })

  it('sorts by message and searches', async () => {
    render(<HellosTable hellos={hellos} />)
    await userEvent.click(screen.getByRole('button', { name: /Message/ }))
    const firstRow = screen.getAllByRole('row')[1]!
    expect(within(firstRow).getByText('Hello')).toBeInTheDocument()

    await userEvent.type(screen.getByPlaceholderText('Search hellos…'), 'xin')
    expect(screen.queryByText('Hello')).not.toBeInTheDocument()
    expect(screen.getByText('Xin chào')).toBeInTheDocument()
  })

  it('deletes by id', async () => {
    render(<HellosTable hellos={hellos} />)
    await userEvent.click(
      within(rowOf('Xin chào')).getByRole('button', { name: 'Delete' }),
    )
    expect(actions.deleteHello).toHaveBeenCalledWith('h1')
  })

  it('edits inline and closes the editor on success', async () => {
    actions.updateHello.mockResolvedValue({})
    actions.deleteHello.mockResolvedValue(undefined)
    render(<HellosTable hellos={hellos} />)

    await userEvent.click(
      within(rowOf('Xin chào')).getByRole('button', { name: 'Edit' }),
    )
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
