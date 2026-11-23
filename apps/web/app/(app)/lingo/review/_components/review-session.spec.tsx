import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { decksQueryOptions, reviewQueryOptions } from '@/lib/queries/lingo'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { ReviewSession } from './review-session'

const reviewCard = vi.fn((_id: string, _rating: number) =>
  Promise.resolve({ data: {} }),
)
const markCardKnown = vi.fn((_id: string) => Promise.resolve({ data: {} }))
vi.mock('@/lib/lingo-actions', () => ({
  reviewCard: (id: string, rating: number) => reviewCard(id, rating),
  markCardKnown: (id: string) => markCardKnown(id),
  learnExtensions: vi.fn(),
}))

const card = (id: string, term: string) => ({
  id,
  deckId: 'd1',
  term,
  pos: 'n',
  reading: '/ˈɒnset/',
  meaningVi: `nghĩa của ${term}`,
  example: null,
  exampleVi: null,
  topic: null,
  extensions: null,
  audioKey: null,
  createdAt: '2026-11-23T00:00:00.000Z',
  isNew: true,
  state: 0,
})

vi.mock('@/lib/api', () => ({ apiFetch: vi.fn(() => Promise.resolve([])) }))

/** Like the page: the queue is prefetched and hydrated before the session renders. */
function renderSession() {
  const client = createTestQueryClient()
  client.setQueryData(reviewQueryOptions('TOEIC_LR').queryKey, {
    newPerDay: 15,
    cards: [card('c1', 'onset'), card('c2', 'outset')],
  })
  client.setQueryData(decksQueryOptions('TOEIC_LR').queryKey, [])
  return renderWithQuery(<ReviewSession exam="TOEIC_LR" />, client)
}

describe('ReviewSession', () => {
  beforeEach(() => {
    reviewCard.mockClear()
    markCardKnown.mockClear()
  })

  it('shows the term, its part of speech and IPA, the daily limit and a new-word badge', async () => {
    renderSession()
    expect(await screen.findByText('onset')).toBeInTheDocument()
    expect(screen.getByText('(n) /ˈɒnset/')).toBeInTheDocument()
    expect(screen.getByText(/tối đa 15 từ mới/)).toBeInTheDocument()
    expect(screen.getByText('Từ mới')).toBeInTheDocument()
    expect(screen.queryByText('nghĩa của onset')).not.toBeInTheDocument()
  })

  it('flips the card, then rates it Dễ / Trung bình / Khó as FSRS Easy / Good / Again', async () => {
    const user = userEvent.setup()
    renderSession()
    await user.click(await screen.findByRole('button', { name: 'Lật thẻ' }))
    expect(screen.getByText('nghĩa của onset')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Khó' }))
    expect(reviewCard).toHaveBeenCalledWith('c1', 1)
    // Khó comes back after the rest of the queue
    expect(await screen.findByText('outset')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Trung bình' }))
    expect(reviewCard).toHaveBeenLastCalledWith('c2', 3)
    expect(await screen.findByText('onset')).toBeInTheDocument()
    await user.keyboard('1')
    expect(reviewCard).toHaveBeenLastCalledWith('c1', 4)
  })

  it('"Đã biết" takes the card out of the review list', async () => {
    const user = userEvent.setup()
    renderSession()
    await user.click(
      await screen.findByRole('button', {
        name: /Đã biết, loại khỏi danh sách ôn tập/,
      }),
    )
    expect(markCardKnown).toHaveBeenCalledWith('c1')
    expect(reviewCard).not.toHaveBeenCalled()
    expect(await screen.findByText('outset')).toBeInTheDocument()
  })
})
