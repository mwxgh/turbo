import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { Attempt, AttemptQuestion, ExamDetail } from '@/lib/queries/lingo'
import { renderWithQuery } from '@/lib/test-utils'

import { AttemptResult } from './attempt-result'

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))
vi.mock('@/lib/lingo-actions', () => ({ startAttempt: vi.fn() }))

const exam = {
  name: 'TOEIC',
  skillTags: { 'grammar.verb-tense': 'Thì động từ' },
  sections: [
    {
      code: 'R',
      name: 'Reading',
      parts: [{ code: 'P5', nameVi: 'Điền câu' }],
    },
  ],
} as unknown as ExamDetail

const question = (
  n: number,
  choice: number | null,
  extra: Partial<AttemptQuestion> = {},
): AttemptQuestion => ({
  id: `q${n}`,
  order: n,
  type: 'SINGLE_CHOICE',
  itemId: `i${n}`,
  section: 'R',
  part: 'P5',
  passage: null,
  transcript: null,
  accent: null,
  imageUrl: null,
  text: `Sentence ${n} -------.`,
  options: ['a', 'b', 'c', 'd'],
  response: choice === null ? null : { choice },
  flagged: false,
  answer: 1,
  correct: choice === 1,
  explanationVi: `Giải thích ${n}`,
  skillTags: ['grammar.verb-tense'],
  ...extra,
})

const attempt: Attempt = {
  id: 'a1',
  exam: 'TOEIC_LR',
  mode: 'QUICK',
  test: null,
  timeLimitSec: null,
  deadline: null,
  parts: ['P5'],
  total: 3,
  correct: 1,
  scores: null,
  startedAt: '2026-11-21T10:00:00.000Z',
  submittedAt: '2026-11-21T10:05:00.000Z',
  questions: [question(0, 1), question(1, 2), question(2, null)],
}

describe('AttemptResult', () => {
  it('counts right, wrong and blank answers, by part and by skill', () => {
    renderWithQuery(<AttemptResult attempt={attempt} exam={exam} />)
    expect(screen.getByText('5 phút')).toBeInTheDocument()
    const parts = screen.getByRole('table')
    expect(within(parts).getByText('1/3')).toBeInTheDocument()
    expect(screen.getByText('Thì động từ')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Câu 2: Sai' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Câu 3: Bỏ trống' }),
    ).toBeInTheDocument()
  })

  it('filters the review to wrong answers', async () => {
    const user = userEvent.setup()
    renderWithQuery(<AttemptResult attempt={attempt} exam={exam} />)
    // q0 right, q1 wrong, q2 blank
    expect(screen.getByText('Giải thích 0')).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Sai (1)' }))
    expect(screen.queryByText('Giải thích 0')).not.toBeInTheDocument()
    expect(screen.getByText('Giải thích 1')).toBeInTheDocument()
    expect(screen.queryByText('Giải thích 2')).not.toBeInTheDocument()
  })
})
