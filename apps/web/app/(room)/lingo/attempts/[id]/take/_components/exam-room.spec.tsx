import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { Attempt, ExamDetail } from '@/lib/queries/lingo'
import { renderWithQuery } from '@/lib/test-utils'

import { AttemptRunner } from './attempt-runner'

vi.mock('@/lib/lingo-actions', () => ({
  saveAnswer: vi.fn(() => Promise.resolve({})),
  submitAttempt: vi.fn(() => Promise.resolve({ errors: ['x'] })),
}))

const speak = vi.fn()
class Utterance {
  onend?: () => void
  constructor(readonly text: string) {}
}

const part = (code: string, spokenOptions: boolean) => ({
  code,
  name: code,
  nameVi: code,
  count: 1,
  options: 3,
  media: [],
  spokenOptions,
  questionsPerItem: [1, 1] as [number, number],
  available: true,
  published: 1,
})

const exam = {
  sections: [{ code: 'L', name: 'Listening', parts: [part('P2', true)] }],
} as unknown as ExamDetail

const attempt = (extra: Partial<Attempt> = {}): Attempt => ({
  id: 'a1',
  exam: 'TOEIC_LR',
  mode: 'FULL_TEST',
  test: { id: 't1', title: 'Test 01', kind: 'MINI' },
  timeLimitSec: 600,
  deadline: new Date(Date.now() + 5 * 60_000).toISOString(),
  parts: ['P2'],
  total: 1,
  correct: null,
  scores: null,
  startedAt: new Date().toISOString(),
  submittedAt: null,
  questions: [
    {
      id: 'q1',
      order: 0,
      type: 'SINGLE_CHOICE',
      itemId: 'i1',
      section: 'L',
      part: 'P2',
      passage: null,
      transcript: null,
      accent: 'US',
      imageUrl: null,
      text: 'Where is the meeting?',
      options: ['Upstairs.', 'At noon.', 'Yes.'],
      response: null,
      flagged: false,
    },
  ],
  ...extra,
})

describe('AttemptRunner', () => {
  beforeEach(() => {
    speak.mockReset()
    vi.stubGlobal('speechSynthesis', {
      speak,
      cancel: vi.fn(),
      getVoices: () => [],
    })
    vi.stubGlobal('SpeechSynthesisUtterance', Utterance)
  })

  it('hides heard questions and options, plays the recording once in a full test', async () => {
    const user = userEvent.setup()
    renderWithQuery(
      <AttemptRunner attempt={attempt()} exam={exam} onSubmitted={vi.fn()} />,
    )
    expect(screen.queryByText('Where is the meeting?')).not.toBeInTheDocument()
    expect(screen.queryByText('Upstairs.')).not.toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(3)

    await user.click(screen.getByRole('button', { name: 'Nghe' }))
    expect(speak.mock.calls.map(([u]) => (u as Utterance).text)).toEqual([
      'Where is the meeting?',
      'A. Upstairs.',
      'B. At noon.',
      'C. Yes.',
    ])
    // The last line ends the recording
    ;(speak.mock.calls.at(-1)![0] as Utterance).onend?.()
    expect(
      await screen.findByRole('button', { name: 'Đã nghe' }),
    ).toBeDisabled()
  })

  it('counts down to the deadline', () => {
    renderWithQuery(
      <AttemptRunner attempt={attempt()} exam={exam} onSubmitted={vi.fn()} />,
    )
    expect(screen.getByLabelText('Thời gian còn lại')).toHaveTextContent(
      /^0?4:5\d|05:00$/,
    )
  })
})
