'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useForm } from '@tanstack/react-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil, Plus, Trash2 } from 'pulsoicon-react'

import { Button } from '@repo/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog'
import { Field, FieldError, FieldLabel } from '@repo/ui/components/field'
import { Input } from '@repo/ui/components/input'
import { Textarea } from '@repo/ui/components/textarea'

import {
  STATUS_LABEL,
  StatusDot,
  emptyClass,
  sectionHeadingClass,
} from '@/app/(app)/teach/_components/panel'
import { useConfirm } from '@/components/confirm-dialog'
import { withToast } from '@/lib/action-toast'
import {
  type LessonModuleInput,
  deleteLessonModule,
  saveLessonModule,
} from '@/lib/lingo-actions'
import {
  type AdminCourse,
  adminCourseQueryOptions,
  lingoKeys,
} from '@/lib/queries/lingo'

type Module = AdminCourse[number]

/** URL key: lowercase words joined by dashes, like the API's DTO. */
export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const slugError = (value: string) =>
  SLUG.test(value) ? undefined : 'Chỉ chữ thường, số và dấu gạch ngang'

/** Create or edit a module of the course. */
function ModuleDialog({
  exam,
  module,
  nextOrder,
  onClose,
}: {
  exam: string
  /** The module to edit; `null` creates one */
  module: Module | null
  nextOrder: number
  onClose: () => void
}) {
  const queryClient = useQueryClient()
  const form = useForm({
    defaultValues: {
      slug: module?.slug ?? '',
      title: module?.title ?? '',
      description: module?.description ?? '',
      order: String(module?.order ?? nextOrder),
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        const input: LessonModuleInput = {
          exam,
          slug: value.slug.trim(),
          title: value.title.trim(),
          description: value.description.trim(),
          order: Number(value.order) || 0,
        }
        const res = await withToast(
          saveLessonModule(module?.id ?? null, input),
          {
            success: module ? 'Đã lưu module' : 'Đã thêm module',
            error: 'Không lưu được module',
          },
        )
        return res.errors?.join(' · ')
      },
    },
    onSubmit: async () => {
      await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
      onClose()
    },
  })

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit()
      }}
    >
      <DialogHeader>
        <DialogTitle>{module ? 'Sửa module' : 'Module mới'}</DialogTitle>
      </DialogHeader>
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) => (value.trim() ? undefined : 'Cần có tên'),
        }}
      >
        {(field) => (
          <Field data-invalid={!field.state.meta.isValid}>
            <FieldLabel htmlFor="module-title">Tên</FieldLabel>
            <Input
              id="module-title"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldError>{field.state.meta.errors.join(', ')}</FieldError>
          </Field>
        )}
      </form.Field>
      <div className="grid gap-4 sm:grid-cols-[1fr_6rem]">
        <form.Field
          name="slug"
          validators={{ onChange: ({ value }) => slugError(value) }}
        >
          {(field) => (
            <Field data-invalid={!field.state.meta.isValid}>
              <FieldLabel htmlFor="module-slug">Mã (slug)</FieldLabel>
              <Input
                id="module-slug"
                placeholder="grammar"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldError>{field.state.meta.errors.join(', ')}</FieldError>
            </Field>
          )}
        </form.Field>
        <form.Field name="order">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="module-order">Thứ tự</FieldLabel>
              <Input
                id="module-order"
                type="number"
                min={0}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>
      </div>
      <form.Field name="description">
        {(field) => (
          <Field>
            <FieldLabel htmlFor="module-description">Mô tả</FieldLabel>
            <Textarea
              id="module-description"
              rows={2}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
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
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onClose}>
          Huỷ
        </Button>
        <form.Subscribe
          selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              Lưu
            </Button>
          )}
        </form.Subscribe>
      </DialogFooter>
    </form>
  )
}

/** The course of an exam: modules with every lesson (drafts too), to add, edit and remove. */
export function LessonsAdmin({ exam }: { exam: string }) {
  const queryClient = useQueryClient()
  const { data: modules } = useQuery(adminCourseQueryOptions(exam))
  /** `undefined` = closed, `null` = new module */
  const [editing, setEditing] = useState<Module | null>()
  const [confirm, confirmDialog] = useConfirm()

  async function remove(module: Module) {
    const ok = await confirm({
      title: `Xoá module “${module.title}”?`,
      description: `${module.lessons.length} bài trong module cũng bị xoá. Không hoàn tác được.`,
      confirm: 'Xoá module',
      destructive: true,
    })
    if (!ok) return
    const res = await withToast(deleteLessonModule(module.id), {
      success: 'Đã xoá module',
      error: 'Không xoá được module',
    })
    if (!res.errors)
      await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
  }

  if (!modules) return <p className="text-muted-foreground">Đang tải…</p>

  return (
    <>
      {confirmDialog}
      <Dialog
        open={editing !== undefined}
        onOpenChange={(open) => !open && setEditing(undefined)}
      >
        <DialogContent className="sm:max-w-lg">
          {editing !== undefined && (
            <ModuleDialog
              exam={exam}
              module={editing}
              nextOrder={modules.length}
              onClose={() => setEditing(undefined)}
            />
          )}
        </DialogContent>
      </Dialog>

      <div>
        <Button onClick={() => setEditing(null)}>
          <Plus aria-hidden="true" />
          Thêm module
        </Button>
      </div>

      {modules.length === 0 && (
        <p className={emptyClass}>Chưa có module nào.</p>
      )}

      {modules.map((module) => (
        <section
          key={module.id}
          aria-labelledby={`module-${module.id}`}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1">
              <h2 id={`module-${module.id}`} className={sectionHeadingClass}>
                {module.title}
              </h2>
              {module.description && (
                <p className="text-sm text-muted-foreground">
                  {module.description}
                </p>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={
                  <Link
                    href={`/teach/lessons/new?module=${encodeURIComponent(module.id)}`}
                  />
                }
              >
                <Plus aria-hidden="true" />
                Thêm bài
              </Button>
              <Button
                variant="ghost"
                size="sm"
                aria-label={`Sửa module ${module.title}`}
                onClick={() => setEditing(module)}
              >
                <Pencil aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                aria-label={`Xoá module ${module.title}`}
                onClick={() => void remove(module)}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          </div>
          {module.lessons.length === 0 ? (
            <p className={emptyClass}>Module chưa có bài.</p>
          ) : (
            <ul
              className="flex flex-col divide-y rounded-xl border bg-card
                shadow-xs"
            >
              {module.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    href={`/teach/lessons/${lesson.id}`}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4
                      py-3 text-sm outline-none hover:bg-muted/50
                      focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span className="min-w-0 flex-1 font-medium">
                      {lesson.title}
                    </span>
                    <span className="text-muted-foreground">
                      {lesson.parts.join(', ')}
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {lesson.minutes} phút
                    </span>
                    <StatusDot
                      status={lesson.status}
                      label={STATUS_LABEL[lesson.status] ?? lesson.status}
                      className="text-muted-foreground"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  )
}
