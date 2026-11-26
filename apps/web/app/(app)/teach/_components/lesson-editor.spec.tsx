import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  type AdminCourse,
  type ExamDetail,
  adminCourseQueryOptions,
  examQueryOptions,
} from '@/lib/queries/lingo'
import { createTestQueryClient, renderWithQuery } from '@/lib/test-utils'

import { LessonEditor } from './lesson-editor'

const replace = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace, push: vi.fn() }),
}))
const saveLesson = vi.fn((_id: string | null, _input: unknown) =>
  Promise.resolve({ data: { id: 'new-id' } }),
)
vi.mock('@/lib/lingo-actions', () => ({
  saveLesson: (id: string | null, input: unknown) => saveLesson(id, input),
  deleteLesson: vi.fn(),
}))

const MODULE = '11111111-1111-4111-8111-111111111111'

function renderEditor() {
  const queryClient = createTestQueryClient()
  queryClient.setQueryData(adminCourseQueryOptions('TOEIC_LR').queryKey, [
    { id: MODULE, title: 'Ngữ pháp', lessons: [] },
  ] as unknown as AdminCourse)
  queryClient.setQueryData(examQueryOptions('TOEIC_LR').queryKey, {
    skillTags: { 'grammar.word-form': 'Từ loại' },
    sections: [{ parts: [{ code: 'P5', nameVi: 'Hoàn thành câu' }] }],
  } as unknown as ExamDetail)
  return renderWithQuery(
    <LessonEditor exam="TOEIC_LR" moduleId={MODULE} />,
    queryClient,
  )
}

describe('LessonEditor', () => {
  it('saves a new lesson as a draft and opens it', async () => {
    const user = userEvent.setup()
    renderEditor()
    await user.type(screen.getByLabelText('Tên bài'), 'Từ loại')
    await user.type(screen.getByLabelText(/Mã \(slug/), 'word-form')
    await user.type(screen.getByLabelText('Part'), 'p5, p6')
    await user.selectOptions(screen.getByLabelText('Luyện tập: Part'), 'P5')
    await user.selectOptions(
      screen.getByLabelText('Luyện tập: dạng câu'),
      'grammar.word-form',
    )
    await user.type(screen.getByLabelText('Nội dung (Markdown)'), '## Mở đầu')
    await user.type(
      screen.getByLabelText('Nhớ khi làm bài'),
      'Nhìn hai bên{Enter}{Enter}Loại đáp án',
    )
    await user.click(screen.getByRole('button', { name: 'Thêm bài' }))

    await waitFor(() =>
      expect(saveLesson).toHaveBeenCalledWith(null, {
        moduleId: MODULE,
        slug: 'word-form',
        title: 'Từ loại',
        summary: '',
        content: '## Mở đầu',
        keyPoints: ['Nhìn hai bên', 'Loại đáp án'],
        parts: ['P5', 'P6'],
        minutes: 10,
        order: 0,
        practicePart: 'P5',
        practiceSkillTag: 'grammar.word-form',
        status: 'DRAFT',
      }),
    )
    await waitFor(() =>
      expect(replace).toHaveBeenCalledWith('/teach/lessons/new-id'),
    )
  })

  it('previews the Markdown', async () => {
    const user = userEvent.setup()
    renderEditor()
    await user.type(screen.getByLabelText('Nội dung (Markdown)'), '## Mở đầu')
    await user.click(screen.getByRole('button', { name: 'Xem trước' }))
    expect(screen.getByRole('heading', { name: 'Mở đầu' })).toBeVisible()
  })
})
