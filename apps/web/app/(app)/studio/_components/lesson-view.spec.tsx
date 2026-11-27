import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type LessonDetail, lessonQueryOptions } from '@/lib/queries/studio'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { LessonView } from './lesson-view'

const submitQuiz = vi.fn()
const setLessonDone = vi.fn()
vi.mock('@/lib/studio-actions', () => ({
  submitQuiz: (...args: unknown[]) => submitQuiz(...args) as unknown,
  setLessonDone: (...args: unknown[]) => setLessonDone(...args) as unknown,
}))

const lesson: LessonDetail = {
  id: 'l1',
  slug: 'generics',
  title: 'Generics',
  summary: 'Viết hàm dùng lại được',
  content:
    '## Vấn đề\n\nDùng `T`:\n\n~~~ts\nfunction first<T>(items: T[]) {}\n~~~',
  minutes: 12,
  level: 'ADVANCED',
  updatedAt: '2026-11-25T00:00:00Z',
  questions: [
    { id: 'q1', prompt: 'T là gì?', choices: ['Biến', 'Tham số kiểu'] },
    { id: 'q2', prompt: 'Có nên dùng any?', choices: ['Có', 'Không'] },
  ],
  track: {
    id: 't1',
    slug: 'typescript',
    title: 'TypeScript',
    category: 'LANGUAGE',
  },
  done: false,
  quizScore: null,
  quizTotal: null,
  previous: { slug: 'kieu-co-ban', title: 'Kiểu cơ bản' },
  next: null,
}

function renderLesson() {
  const queryClient = createTestQueryClient()
  queryClient.setQueryData(
    lessonQueryOptions('typescript', 'generics').queryKey,
    lesson,
  )
  return renderWithQuery(
    <LessonView track="typescript" lesson="generics" />,
    queryClient,
  )
}

describe('LessonView', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders the Markdown with highlighted code and links the track', () => {
    renderLesson()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Generics' }),
    ).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Vấn đề' })).toBeVisible()
    expect(document.querySelector('pre code.language-ts')).not.toBeNull()
    expect(screen.getByRole('link', { name: 'TypeScript' })).toHaveAttribute(
      'href',
      '/studio/tracks/typescript',
    )
    expect(screen.getByRole('link', { name: 'Kiểu cơ bản' })).toHaveAttribute(
      'href',
      '/studio/tracks/typescript/kieu-co-ban',
    )
  })

  it('submits the quiz once every question is answered and shows the grading', async () => {
    submitQuiz.mockResolvedValue({
      data: {
        score: 1,
        total: 2,
        passed: false,
        done: false,
        results: [
          {
            id: 'q1',
            chosen: 1,
            answer: 1,
            correct: true,
            explanation: 'Tham số kiểu.',
          },
          {
            id: 'q2',
            chosen: 0,
            answer: 1,
            correct: false,
            explanation: 'Mất kiểu.',
          },
        ],
      },
    })
    renderLesson()
    const quiz = screen.getByRole('region', { name: 'Kiểm tra nhanh' })
    const submit = within(quiz).getByRole('button', { name: 'Nộp bài' })
    expect(submit).toBeDisabled()

    await userEvent.click(
      within(quiz).getByRole('radio', { name: 'Tham số kiểu' }),
    )
    await userEvent.click(within(quiz).getByRole('radio', { name: 'Có' }))
    await userEvent.click(submit)

    expect(submitQuiz).toHaveBeenCalledWith('l1', [1, 0])
    expect(await within(quiz).findByText('Đúng 1/2')).toBeVisible()
    expect(within(quiz).getByText('Mất kiểu.')).toBeVisible()
    expect(within(quiz).getByLabelText('Bạn chọn sai')).toBeVisible()
    expect(within(quiz).getByRole('status')).toHaveTextContent(/Chưa đạt 70%/)

    await userEvent.click(within(quiz).getByRole('button', { name: 'Làm lại' }))
    expect(within(quiz).getByRole('button', { name: 'Nộp bài' })).toBeDisabled()
  })

  it('marks the lesson done by hand', async () => {
    setLessonDone.mockResolvedValue({ data: {} })
    renderLesson()
    await userEvent.click(
      screen.getByRole('button', { name: 'Đánh dấu đã học xong' }),
    )
    expect(setLessonDone).toHaveBeenCalledWith('l1', true)
  })
})
