import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { Attempt, ExamDetail } from '@/lib/queries/lingo'
import { renderWithQuery } from '@/lib/test-utils'

import { ExamRoom } from './exam-room'

const replace = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace }) }))

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
  name: 'TOEIC',
  sections: [
    {
      code: 'L',
      name: 'Listening',
      parts: [part('P2', true), part('P3', false)],
    },
  ],
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

/** One Part 3 conversation: three questions on one script. */
const conversation = (n: number) => ({
  ...attempt().questions[0]!,
  id: `c${n}`,
  order: n,
  itemId: 'conv',
  part: 'P3',
  transcript: [{ speaker: 'M' as const, text: 'Shall we meet at noon?' }],
  text: `Question ${n}?`,
})

describe('ExamRoom', () => {
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
    renderWithQuery(<ExamRoom attempt={attempt()} exam={exam} />)
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

  it('shows heard questions and options on demand in quick practice only', async () => {
    const user = userEvent.setup()
    const { unmount } = renderWithQuery(
      <ExamRoom
        attempt={attempt({
          mode: 'QUICK',
          test: null,
          deadline: null,
          timeLimitSec: null,
        })}
        exam={exam}
      />,
    )
    expect(screen.queryByText('Upstairs.')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Hiện chữ' }))
    expect(screen.getByText('Where is the meeting?')).toBeInTheDocument()
    expect(
      screen.getByRole('radio', { name: /Upstairs\./ }),
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Ẩn chữ' }))
    expect(screen.queryByText('Upstairs.')).not.toBeInTheDocument()
    unmount()

    // A test stays listening-only
    renderWithQuery(<ExamRoom attempt={attempt()} exam={exam} />)
    expect(
      screen.queryByRole('button', { name: 'Hiện chữ' }),
    ).not.toBeInTheDocument()
  })

  it('counts down to the deadline', () => {
    renderWithQuery(<ExamRoom attempt={attempt()} exam={exam} />)
    expect(screen.getByLabelText('Thời gian còn lại')).toHaveTextContent(
      /^0?4:5\d|05:00$/,
    )
  })

  it('shows the questions of one conversation together, numbered in the side list', async () => {
    const user = userEvent.setup()
    renderWithQuery(
      <ExamRoom
        attempt={attempt({
          parts: ['P2', 'P3'],
          total: 4,
          questions: [
            attempt().questions[0]!,
            conversation(1),
            conversation(2),
            conversation(3),
          ],
        })}
        exam={exam}
      />,
    )
    const list = screen.getByRole('complementary', { name: 'Danh sách câu' })
    expect(screen.getByText('Part 2')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Câu 3' }))
    expect(screen.getByText('Question 1?')).toBeInTheDocument()
    expect(screen.getByText('Question 3?')).toBeInTheDocument()
    expect(screen.getAllByRole('radiogroup')).toHaveLength(3)
    expect(list).toHaveTextContent('0/4 đã làm')

    await user.keyboard('b')
    expect(list).toHaveTextContent('1/4 đã làm')
    expect(
      screen.getByRole('button', { name: 'Câu 3, đã chọn' }),
    ).toHaveAttribute('aria-current', 'step')
  })
})
