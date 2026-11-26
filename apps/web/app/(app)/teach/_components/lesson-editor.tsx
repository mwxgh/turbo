'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from '@tanstack/react-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'pulsoicon-react'

import { Button } from '@repo/ui/components/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@repo/ui/components/field'
import { Input } from '@repo/ui/components/input'
import { Textarea } from '@repo/ui/components/textarea'
import { cn } from '@repo/ui/lib/utils'

import { slugError } from '@/app/(app)/teach/_components/lessons-admin'
import { selectClass } from '@/app/(app)/teach/_components/panel'
import { useConfirm } from '@/components/confirm-dialog'
import { Markdown } from '@/components/markdown'
import { withToast } from '@/lib/action-toast'
import { type LessonInput, deleteLesson, saveLesson } from '@/lib/lingo-actions'
import {
  type AdminLesson,
  adminCourseQueryOptions,
  examQueryOptions,
  lingoKeys,
} from '@/lib/queries/lingo'

const lines = (text: string) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

const required = (label: string) => (value: string) =>
  value.trim() ? undefined : `Cần có ${label}`

/**
 * Write or edit one lesson: Markdown content with a preview, the "Nhớ khi làm bài" checklist,
 * parts, the practice (part + skill) and the status. Learners only see published lessons.
 */
export function LessonEditor({
  exam,
  lesson,
  moduleId,
}: {
  exam: string
  /** The lesson to edit; absent creates one */
  lesson?: AdminLesson
  /** Module of a new lesson */
  moduleId?: string
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: course } = useQuery(adminCourseQueryOptions(exam))
  const { data: examInfo } = useQuery(examQueryOptions(exam))
  const [preview, setPreview] = useState(false)
  const [confirm, confirmDialog] = useConfirm()
  const parts = examInfo?.sections.flatMap((s) => s.parts) ?? []
  const skills = Object.entries(examInfo?.skillTags ?? {})

  const form = useForm({
    defaultValues: {
      moduleId: lesson?.moduleId ?? moduleId ?? '',
      title: lesson?.title ?? '',
      slug: lesson?.slug ?? '',
      summary: lesson?.summary ?? '',
      minutes: String(lesson?.minutes ?? 10),
      order: String(lesson?.order ?? 0),
      parts: lesson?.parts.join(', ') ?? '',
      practicePart: lesson?.practicePart ?? '',
      practiceSkillTag: lesson?.practiceSkillTag ?? '',
      status: lesson?.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
      content: lesson?.content ?? '',
      keyPoints: lesson?.keyPoints.join('\n') ?? '',
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        const input: LessonInput = {
          moduleId: value.moduleId,
          slug: value.slug.trim(),
          title: value.title.trim(),
          summary: value.summary.trim(),
          content: value.content,
          keyPoints: lines(value.keyPoints),
          parts: value.parts
            .split(',')
            .map((p) => p.trim().toUpperCase())
            .filter(Boolean),
          minutes: Number(value.minutes) || 10,
          order: Number(value.order) || 0,
          practicePart: value.practicePart || null,
          practiceSkillTag:
            (value.practicePart && value.practiceSkillTag) || null,
          status: value.status as LessonInput['status'],
        }
        const saving = saveLesson(lesson?.id ?? null, input)
        const res = await withToast(saving, {
          success: lesson ? 'Đã lưu bài' : 'Đã thêm bài',
          error: 'Không lưu được bài',
        })
        if (res.errors) return res.errors.join(' · ')
        await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
        const created = lesson ? undefined : (await saving).data
        if (created) router.replace(`/teach/lessons/${created.id}`)
        return undefined
      },
    },
  })

  async function remove() {
    if (!lesson) return
    const ok = await confirm({
      title: `Xoá bài “${lesson.title}”?`,
      description:
        'Học viên không xem được bài này nữa. Lịch 12 tuần bỏ link tới bài. Không hoàn tác được.',
      confirm: 'Xoá bài',
      destructive: true,
    })
    if (!ok) return
    const res = await withToast(deleteLesson(lesson.id), {
      success: 'Đã xoá bài',
      error: 'Không xoá được bài',
    })
    if (res.errors) return
    await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
    router.push('/teach/lessons')
  }

  const text = (
    name: 'title' | 'slug' | 'summary',
    label: string,
    validate?: (value: string) => string | undefined,
    placeholder?: string,
  ) => (
    <form.Field
      name={name}
      validators={validate && { onChange: ({ value }) => validate(value) }}
    >
      {(field) => (
        <Field data-invalid={!field.state.meta.isValid}>
          <FieldLabel htmlFor={`lesson-${name}`}>{label}</FieldLabel>
          <Input
            id={`lesson-${name}`}
            placeholder={placeholder}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
          <FieldError>{field.state.meta.errors.join(', ')}</FieldError>
        </Field>
      )}
    </form.Field>
  )

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit()
      }}
    >
      {confirmDialog}
      <div className="grid gap-4 md:grid-cols-2">
        {text('title', 'Tên bài', required('tên bài'))}
        {text('slug', 'Mã (slug, dùng trong URL)', slugError, 'word-form')}
      </div>
      {text('summary', 'Tóm tắt')}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <form.Field
          name="moduleId"
          validators={{ onChange: ({ value }) => required('module')(value) }}
        >
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor="lesson-module">Module</FieldLabel>
              <select
                id="lesson-module"
                className={selectClass}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value="">Chọn module</option>
                {course?.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
              <FieldError>{field.state.meta.errors.join(', ')}</FieldError>
            </Field>
          )}
        </form.Field>
        <form.Field name="status">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="lesson-status">Trạng thái</FieldLabel>
              <select
                id="lesson-status"
                className={selectClass}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value="DRAFT">Nháp (học viên không thấy)</option>
                <option value="PUBLISHED">Đã xuất bản</option>
              </select>
            </Field>
          )}
        </form.Field>
        <form.Field name="minutes">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="lesson-minutes">Số phút</FieldLabel>
              <Input
                id="lesson-minutes"
                type="number"
                min={1}
                max={600}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>
        <form.Field name="order">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="lesson-order">
                Thứ tự trong module
              </FieldLabel>
              <Input
                id="lesson-order"
                type="number"
                min={0}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <form.Field name="parts">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="lesson-parts">Part</FieldLabel>
              <Input
                id="lesson-parts"
                placeholder="P5, P6"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldDescription>Cách nhau bằng dấu phẩy</FieldDescription>
            </Field>
          )}
        </form.Field>
        <form.Field name="practicePart">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="lesson-practice-part">
                Luyện tập: Part
              </FieldLabel>
              <select
                id="lesson-practice-part"
                className={selectClass}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value="">Không có phần luyện</option>
                {parts.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.code} · {p.nameVi}
                  </option>
                ))}
              </select>
            </Field>
          )}
        </form.Field>
        <form.Subscribe selector={(s) => s.values.practicePart}>
          {(practicePart) => (
            <form.Field name="practiceSkillTag">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="lesson-practice-skill">
                    Luyện tập: dạng câu
                  </FieldLabel>
                  <select
                    id="lesson-practice-skill"
                    className={selectClass}
                    disabled={!practicePart}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <option value="">Mọi câu của Part</option>
                    {skills.map(([tag, label]) => (
                      <option key={tag} value={tag}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <FieldDescription>
                    Tiến độ bài tính từ câu trả lời của dạng này
                  </FieldDescription>
                </Field>
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>

      <form.Field name="content">
        {(field) => (
          <Field>
            <div className="flex items-center justify-between gap-3">
              <FieldLabel htmlFor="lesson-content">
                Nội dung (Markdown)
              </FieldLabel>
              <div role="group" aria-label="Chế độ xem" className="flex gap-1">
                {[
                  { value: false, label: 'Soạn' },
                  { value: true, label: 'Xem trước' },
                ].map((mode) => (
                  <Button
                    key={mode.label}
                    type="button"
                    size="sm"
                    variant={preview === mode.value ? 'secondary' : 'ghost'}
                    aria-pressed={preview === mode.value}
                    onClick={() => setPreview(mode.value)}
                  >
                    {mode.label}
                  </Button>
                ))}
              </div>
            </div>
            {preview ? (
              <div className="min-h-64 rounded-lg border p-4">
                <Markdown>{field.state.value || '_Chưa có nội dung_'}</Markdown>
              </div>
            ) : (
              <Textarea
                id="lesson-content"
                rows={24}
                className="font-mono text-sm"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
            <FieldDescription>
              {'"## " mở một phần, "- " cho gạch đầu dòng, "> " cho câu ví dụ'}
            </FieldDescription>
          </Field>
        )}
      </form.Field>

      <form.Field name="keyPoints">
        {(field) => (
          <Field>
            <FieldLabel htmlFor="lesson-key-points">Nhớ khi làm bài</FieldLabel>
            <Textarea
              id="lesson-key-points"
              rows={5}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldDescription>Mỗi dòng một ý</FieldDescription>
          </Field>
        )}
      </form.Field>

      <form.Subscribe selector={(s) => s.errorMap.onSubmit}>
        {(error) =>
          error ? (
            <p role="alert" className="text-sm text-destructive">
              {String(error)}
            </p>
          ) : null
        }
      </form.Subscribe>

      <div
        className={cn(
          'flex flex-wrap gap-2 border-t pt-6',
          lesson && 'justify-between',
        )}
      >
        <form.Subscribe
          selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {lesson ? 'Lưu bài' : 'Thêm bài'}
            </Button>
          )}
        </form.Subscribe>
        {lesson && (
          <Button
            type="button"
            variant="ghost"
            className="text-destructive"
            onClick={() => void remove()}
          >
            <Trash2 aria-hidden="true" />
            Xoá bài
          </Button>
        )}
      </div>
    </form>
  )
}
