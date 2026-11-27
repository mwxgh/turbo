import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { type TrackSummary, tracksQueryOptions } from '@/lib/queries/studio'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { CategoryView } from './category-view'

const javascript: TrackSummary = {
  id: 'js',
  slug: 'javascript',
  category: 'LANGUAGE',
  title: 'JavaScript',
  summary: 'Ngôn ngữ của web',
  lessons: 12,
  done: 7,
  levels: [
    { level: 'BASIC', lessons: 6, done: 6 },
    { level: 'ADVANCED', lessons: 6, done: 1 },
  ],
}

describe('CategoryView', () => {
  it('shows one card per track with a progress row per level, easiest first', () => {
    const queryClient = createTestQueryClient()
    queryClient.setQueryData(tracksQueryOptions().queryKey, [javascript])
    renderWithQuery(<CategoryView segment="languages" />, queryClient)

    const card = screen.getByRole('link', { name: /JavaScript/ })
    expect(card).toHaveAttribute('href', '/studio/tracks/javascript')
    const rows = [...card.querySelectorAll('li')]
    expect(rows).toHaveLength(2)
    expect(rows[0]).toHaveTextContent(/^Cơ bản.*6\/6 bài$/)
    expect(rows[1]).toHaveTextContent(/^Nâng cao.*1\/6 bài$/)
  })
})
