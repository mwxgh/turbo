import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { type AttemptListItem, attemptsQueryOptions } from '@/lib/queries/lingo'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { AttemptHistory, HISTORY_QUERY } from './attempt-history'

const row = (
  id: string,
  extra: Partial<AttemptListItem> = {},
): AttemptListItem => ({
  id,
  userId: 'u1',
  exam: 'TOEIC_LR',
  mode: 'FULL_TEST',
  parts: [],
  timeLimitSec: 7200,
  total: 200,
  correct: 150,
  scores: {
    L: { correct: 80, total: 100, scaled: 400 },
    R: { correct: 70, total: 100, scaled: 350 },
  },
  testId: 't1',
  test: { id: 't1', title: 'Test 01', kind: 'FULL' },
  startedAt: '2026-11-20T10:00:00.000Z',
  submittedAt: '2026-11-20T12:00:00.000Z',
  ...extra,
})

function renderHistory(items: AttemptListItem[]) {
  const queryClient = createTestQueryClient()
  queryClient.setQueryData(attemptsQueryOptions(HISTORY_QUERY).queryKey, {
    items,
    total: items.length,
    page: 1,
    pageSize: 100,
    totalPages: 1,
  })
  return renderWithQuery(<AttemptHistory />, queryClient)
}

describe('AttemptHistory', () => {
  it('charts full-test scores and resumes open attempts', async () => {
    const user = userEvent.setup()
    renderHistory([
      row('open', {
        mode: 'PRACTICE',
        parts: ['P5'],
        submittedAt: null,
        correct: null,
        scores: null,
      }),
      row('b', { submittedAt: '2026-11-21T12:00:00.000Z' }),
      row('a', {
        scores: {
          L: { correct: 60, total: 100, scaled: 300 },
          R: { correct: 50, total: 100, scaled: 250 },
        },
      }),
    ])
    expect(
      screen.getByRole('img', { name: 'Điểm full test theo thời gian' }),
    ).toBeInTheDocument()
    expect(screen.getByText('750', { selector: 'dd' })).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'Đang làm' }))
    expect(screen.getByRole('link', { name: /Làm tiếp/ })).toHaveAttribute(
      'href',
      '/lingo/attempts/open/take',
    )
  })
})
