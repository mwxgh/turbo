import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithQuery } from '@/lib/test-utils'

import { CardSearch } from './card-search'

const apiFetch = vi.fn((_path: string, _init?: unknown) =>
  Promise.resolve({
    engine: 'elasticsearch',
    items: [
      {
        id: 'c1',
        term: 'contract',
        pos: 'n',
        reading: '/ˈkɒntrækt/',
        meaningVi: 'hợp đồng',
        example: 'Sign the contract before you start.',
        exampleVi: null,
        deckId: 'd1',
        deckTitle: 'Bài 16 · Hợp đồng, đàm phán & pháp lý (1/2)',
      },
    ],
  }),
)
vi.mock('@/lib/api', () => ({
  apiFetch: (path: string, init?: unknown) => apiFetch(path, init),
}))

describe('CardSearch', () => {
  it('searches once typing pauses and lists the hits with their deck', async () => {
    const user = userEvent.setup()
    renderWithQuery(<CardSearch exam="TOEIC_LR" />)

    await user.type(
      screen.getByRole('searchbox', { name: 'Tìm từ' }),
      'hop dong',
    )

    expect(await screen.findByText('contract')).toBeInTheDocument()
    expect(screen.getByText('hợp đồng')).toBeInTheDocument()
    expect(screen.getByText(/Bài 16/)).toBeInTheDocument()
    // Debounced: one request with the whole text, not one per key
    expect(apiFetch).toHaveBeenCalledTimes(1)
    expect(apiFetch.mock.calls[0]![0]).toBe(
      '/lingo/cards/search?q=hop+dong&exam=TOEIC_LR',
    )
  })

  it('does not search for a single letter', async () => {
    apiFetch.mockClear()
    const user = userEvent.setup()
    renderWithQuery(<CardSearch />)
    await user.type(screen.getByRole('searchbox', { name: 'Tìm từ' }), 'a')
    await new Promise((r) => setTimeout(r, 400))
    expect(apiFetch).not.toHaveBeenCalled()
  })
})
