import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { Attempt, ExamDetail } from '@/lib/queries/lingo'
import { renderWithQuery } from '@/lib/test-utils'

import { ExamRoom } from './exam-room'

const replace = vi.fn()
const push = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace, push }),
}))

vi.mock('@/lib/lingo-actions', () => ({
  saveAnswer: vi.fn(() => Promise.resolve({})),
  submitAttempt: vi.fn(() => Promise.resolve({ errors: ['x'] })),
}))

const speak = vi.fn()
const cancel = vi.fn()
class Utterance {
  onend?: () => void
  onerror?: () => void
  rate = 1
  constructor(readonly text: string) {}
}

/** The utterance spoken `n`-th (lines are spoken one after another, after a tick). */
async function spoken(n: number) {
  await vi.waitFor(() => expect(speak.mock.calls.length).toBeGreaterThan(n))
  return speak.mock.calls[n]![0] as Utterance
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
    cancel.mockReset()
    vi.stubGlobal('speechSynthesis', {
      speak,
      cancel,
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
    // The question, then each option: a line starts when the previous one ends
    const heard: string[] = []
    for (let n = 0; n < 4; n++) {
      const line = await spoken(n)
      heard.push(line.text)
      line.onend?.()
    }
    expect(heard).toEqual([
      'Where is the meeting?',
      'A. Upstairs.',
      'B. At noon.',
      'C. Yes.',
    ])
    expect(
      await screen.findByRole('button', { name: 'Đã nghe' }),
    ).toBeDisabled()
  })

  it('quick practice is listening-only, the text shows on demand', async () => {
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
    expect(screen.queryByText('Where is the meeting?')).not.toBeInTheDocument()
    expect(screen.queryByText('Upstairs.')).not.toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: 'Hiện câu hỏi & đáp án' }),
    )
    expect(screen.getByText('Where is the meeting?')).toBeInTheDocument()
    expect(
      screen.getByRole('radio', { name: /Upstairs\./ }),
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: 'Ẩn câu hỏi & đáp án' }),
    )
    expect(screen.queryByText('Where is the meeting?')).not.toBeInTheDocument()
    expect(screen.queryByText('Upstairs.')).not.toBeInTheDocument()
    unmount()

    // A test stays listening-only, at normal speed
    renderWithQuery(<ExamRoom attempt={attempt()} exam={exam} />)
    expect(
      screen.queryByRole('button', { name: /Hiện câu hỏi/ }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('group', { name: 'Tốc độ đọc' }),
    ).not.toBeInTheDocument()
  })

  it('shows the Part 3 conversation on demand in quick practice only', async () => {
    const user = userEvent.setup()
    const quick = {
      mode: 'QUICK' as const,
      test: null,
      deadline: null,
      timeLimitSec: null,
      parts: ['P3'],
      total: 2,
      questions: [conversation(0), conversation(1)],
    }
    const { unmount } = renderWithQuery(
      <ExamRoom attempt={attempt(quick)} exam={exam} />,
    )
    // Questions are printed, the script is not
    expect(screen.getByText('Question 0?')).toBeInTheDocument()
    expect(screen.queryByText('Shall we meet at noon?')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Hiện hội thoại' }))
    expect(screen.getByText('Shall we meet at noon?')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Ẩn hội thoại' }))
    expect(screen.queryByText('Shall we meet at noon?')).not.toBeInTheDocument()
    unmount()

    // A test never shows the script
    renderWithQuery(
      <ExamRoom
        attempt={attempt({ ...quick, mode: 'FULL_TEST', test: attempt().test })}
        exam={exam}
      />,
    )
    expect(
      screen.queryByRole('button', { name: /hội thoại/ }),
    ).not.toBeInTheDocument()
  })

  it('hides the text again on the next question', async () => {
    const user = userEvent.setup()
    const base = attempt().questions[0]!
    renderWithQuery(
      <ExamRoom
        attempt={attempt({
          mode: 'QUICK',
          test: null,
          deadline: null,
          timeLimitSec: null,
          total: 2,
          questions: [
            base,
            {
              ...base,
              id: 'q2',
              itemId: 'i2',
              order: 1,
              text: 'Who called?',
              options: ['Ms. Kim.', 'At five.', 'No.'],
            },
          ],
        })}
        exam={exam}
      />,
    )
    await user.click(
      screen.getByRole('button', { name: 'Hiện câu hỏi & đáp án' }),
    )
    await user.click(screen.getByRole('radio', { name: /Upstairs\./ }))
    await user.click(screen.getByRole('button', { name: /Tiếp/ }))
    expect(screen.queryByText('Who called?')).not.toBeInTheDocument()
    expect(screen.queryByText('Ms. Kim.')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Hiện câu hỏi & đáp án' }),
    ).toBeInTheDocument()
  })

  it('reads at the chosen speed outside scored attempts', async () => {
    const user = userEvent.setup()
    renderWithQuery(
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
    await user.click(screen.getByRole('button', { name: '1.25×' }))
    expect(screen.getByRole('button', { name: '1.25×' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await user.click(screen.getByRole('button', { name: 'Nghe' }))
    expect((await spoken(0)).rate).toBeCloseTo(0.95 * 1.25)
  })

  it('keeps reading while the exam clock ticks', async () => {
    const user = userEvent.setup()
    renderWithQuery(<ExamRoom attempt={attempt()} exam={exam} />)
    await user.click(screen.getByRole('button', { name: 'Nghe' }))
    const question = await spoken(0)
    // The clock re-renders the room every second: that used to cancel the reading
    await new Promise((r) => setTimeout(r, 1_200))
    expect(cancel).toHaveBeenCalledTimes(1) // only the one before starting
    question.onend?.()
    expect((await spoken(1)).text).toBe('A. Upstairs.')
  })

  it('keeps reading when a line fails', async () => {
    const user = userEvent.setup()
    renderWithQuery(<ExamRoom attempt={attempt()} exam={exam} />)
    await user.click(screen.getByRole('button', { name: 'Nghe' }))
    ;(await spoken(0)).onerror?.()
    expect((await spoken(1)).text).toBe('A. Upstairs.')
  })

  it('asks in a dialog before leaving the room', async () => {
    const user = userEvent.setup()
    renderWithQuery(<ExamRoom attempt={attempt()} exam={exam} />)
    await user.click(screen.getByRole('link', { name: /Thoát/ }))
    const dialog = await screen.findByRole('alertdialog', {
      name: 'Thoát phòng thi?',
    })
    expect(dialog).toHaveTextContent('Đáp án đã được lưu')
    await user.click(screen.getByRole('button', { name: 'Ở lại' }))
    expect(push).not.toHaveBeenCalled()

    await user.click(screen.getByRole('link', { name: /Thoát/ }))
    await user.click(await screen.findByRole('button', { name: 'Thoát' }))
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith('/lingo/tests/t1'))
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
