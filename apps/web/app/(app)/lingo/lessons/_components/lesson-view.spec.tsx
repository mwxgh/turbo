import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { type Lesson, lessonQueryOptions } from '@/lib/queries/lingo'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { LessonView } from './lesson-view'

const push = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))
const startAttempt = vi.fn((_input: unknown) =>
  Promise.resolve({ data: { id: 'a1' } }),
)
vi.mock('@/lib/lingo-actions', () => ({
  startAttempt: (input: unknown) => startAttempt(input),
}))

const lesson: Lesson = {
  id: 'word-form',
  title: 'Từ loại và vị trí trong câu',
  summary: 'Nhìn chỗ trống',
  minutes: 15,
  parts: ['P5', 'P6'],
  content:
    '## Bốn vị trí\n\nXác định từ trước và sau\n\n- Sau mạo từ → danh từ\n\n> **a -------- increase**',
  keyPoints: ['Nhìn hai bên chỗ trống'],
  practice: { part: 'P5', skillTag: 'grammar.word-form' },
  progress: { answered: 12, correct: 9, accuracy: 0.75, done: false },
  previous: null,
  next: { id: 'verb-tense', title: 'Thì của động từ' },
}

function renderLesson() {
  const queryClient = createTestQueryClient()
  queryClient.setQueryData(
    lessonQueryOptions('TOEIC_LR', 'word-form').queryKey,
    lesson,
  )
  return renderWithQuery(
    <LessonView exam="TOEIC_LR" id="word-form" />,
    queryClient,
  )
}

describe('LessonView', () => {
  it('shows the Markdown content and key points', () => {
    renderLesson()
    expect(
      screen.getByRole('heading', { level: 1, name: lesson.title }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Bốn vị trí' })).toBeVisible()
    expect(screen.getByText('Sau mạo từ → danh từ')).toBeVisible()
    expect(screen.getByText('a -------- increase')).toBeVisible()
    expect(screen.getByText('Nhìn hai bên chỗ trống')).toBeVisible()
    expect(screen.getByText('Đúng 75% trên 12 câu gần nhất')).toBeVisible()
    expect(
      screen.getByRole('link', { name: 'Thì của động từ' }),
    ).toHaveAttribute('href', '/lingo/lessons/verb-tense')
  })

  it('practises the lesson’s skill', async () => {
    const user = userEvent.setup()
    renderLesson()
    await user.click(screen.getByRole('button', { name: 'Luyện 10 câu' }))
    expect(startAttempt).toHaveBeenCalledWith({
      exam: 'TOEIC_LR',
      part: 'P5',
      skillTag: 'grammar.word-form',
      count: 10,
    })
    expect(push).toHaveBeenCalledWith('/lingo/attempts/a1/take')
  })
})
