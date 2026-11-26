'use client'

import { useForm } from '@tanstack/react-form'
import { Trash2 } from 'pulsoicon-react'

import type { PlannerTask } from '@repo/types'
import { Button } from '@repo/ui/components/button'
import { DatePicker } from '@repo/ui/components/date-picker'
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
import { cn } from '@repo/ui/lib/utils'

import type { PlannerTaskInput } from '@/app/(app)/planner/actions'
import type { ActionState } from '@/lib/action-toast'
import {
  COLORS,
  PRIORITIES,
  STATUSES,
  formatMinute,
  parseMinute,
  taskDay,
} from '@/lib/planner'

export const TITLE_MAX = 200
const DURATIONS = [15, 30, 45, 60, 90, 120, 180]

/** What the dialog opens with: an existing task, or the defaults of a new one. */
export type TaskDraft =
  { task: PlannerTask } | { task?: undefined; defaults: PlannerTaskInput }

interface FormValues {
  title: string
  note: string
  date: string
  time: string
  durationMinutes: number
  priority: PlannerTask['priority']
  status: PlannerTask['status']
  color: string
}

function initialValues(draft: TaskDraft): FormValues {
  const source: PlannerTaskInput = draft.task ?? draft.defaults
  return {
    title: source.title ?? '',
    note: source.note ?? '',
    date: (draft.task ? taskDay(draft.task) : source.date) ?? '',
    time:
      source.startMinute === null || source.startMinute === undefined
        ? ''
        : formatMinute(source.startMinute),
    durationMinutes: source.durationMinutes ?? 60,
    priority: source.priority ?? 'MEDIUM',
    status: source.status ?? 'TODO',
    color: source.color ?? 'sky',
  }
}

/** Client-side rule (instant feedback); the API DTO stays the source of truth. */
export function validateTitle(value: string): string | undefined {
  const title = value.trim()
  if (!title) return 'Nhập tên việc'
  if (title.length > TITLE_MAX) return `Tối đa ${TITLE_MAX} ký tự`
  return undefined
}

export interface TaskDialogProps {
  draft: TaskDraft | null
  onClose: () => void
  onSubmit: (
    input: PlannerTaskInput,
    task?: PlannerTask,
  ) => Promise<ActionState>
  onDelete: (task: PlannerTask) => void
}

export function TaskDialog({ draft, onClose, ...props }: TaskDialogProps) {
  return (
    <Dialog open={draft !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        {/* Keyed: a new draft starts a fresh form */}
        {draft && (
          <TaskForm
            key={draft.task ? draft.task.id : JSON.stringify(draft.defaults)}
            draft={draft}
            onClose={onClose}
            {...props}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex rounded-lg bg-muted p-0.5"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            `flex-1 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap
            transition-all`,
            value === option.value
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function TaskForm({
  draft,
  onClose,
  onSubmit,
  onDelete,
}: Omit<TaskDialogProps, 'draft'> & { draft: TaskDraft }) {
  const form = useForm({
    defaultValues: initialValues(draft),
    validators: {
      onSubmitAsync: async ({ value }) => {
        const startMinute = value.date ? parseMinute(value.time) : null
        const res = await onSubmit(
          {
            title: value.title.trim(),
            note: value.note.trim() || null,
            date: value.date || null,
            startMinute,
            durationMinutes: value.durationMinutes,
            priority: value.priority,
            status: value.status,
            color: value.color,
          },
          draft.task,
        )
        return res.errors?.join(', ')
      },
    },
    onSubmit: () => onClose(),
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
        <DialogTitle>{draft.task ? 'Sửa việc' : 'Việc mới'}</DialogTitle>
      </DialogHeader>

      <form.Field
        name="title"
        validators={{ onChange: ({ value }) => validateTitle(value) }}
      >
        {(field) => {
          const invalid =
            field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={invalid}>
              <Input
                name={field.name}
                aria-label="Tên việc"
                aria-invalid={invalid}
                placeholder="Cần làm gì?"
                autoFocus
                className="h-11 text-base font-medium"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {invalid && (
                <FieldError>{field.state.meta.errors.join(', ')}</FieldError>
              )}
            </Field>
          )
        }}
      </form.Field>

      <form.Field name="note">
        {(field) => (
          <Textarea
            aria-label="Ghi chú"
            placeholder="Ghi chú (không bắt buộc)"
            rows={2}
            maxLength={2000}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>

      <div className="grid gap-3 sm:grid-cols-[1fr_8rem]">
        <form.Field name="date">
          {(field) => (
            <Field>
              <FieldLabel>Ngày</FieldLabel>
              <DatePicker
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="Chưa lên lịch"
              />
            </Field>
          )}
        </form.Field>
        <form.Subscribe selector={(s) => s.values.date}>
          {(date) => (
            <form.Field name="time">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="planner-time">Giờ bắt đầu</FieldLabel>
                  <Input
                    id="planner-time"
                    type="time"
                    step={300}
                    disabled={!date}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>

      <form.Subscribe selector={(s) => Boolean(s.values.date && s.values.time)}>
        {(timed) =>
          timed && (
            <form.Field name="durationMinutes">
              {(field) => (
                <Field>
                  <FieldLabel>Thời lượng</FieldLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {DURATIONS.map((minutes) => (
                      <button
                        key={minutes}
                        type="button"
                        aria-pressed={field.state.value === minutes}
                        onClick={() => field.handleChange(minutes)}
                        className={cn(
                          `rounded-full border px-3 py-1 text-xs font-medium
                          transition-colors`,
                          field.state.value === minutes
                            ? `border-primary bg-primary
                              text-primary-foreground`
                            : 'hover:bg-muted',
                        )}
                      >
                        {minutes < 60 ? `${minutes}p` : `${minutes / 60}h`}
                      </button>
                    ))}
                  </div>
                </Field>
              )}
            </form.Field>
          )
        }
      </form.Subscribe>

      <div className="grid gap-3 sm:grid-cols-[3fr_2fr]">
        <form.Field name="status">
          {(field) => (
            <Field>
              <FieldLabel>Trạng thái</FieldLabel>
              <Segmented
                label="Trạng thái"
                value={field.state.value}
                options={STATUSES}
                onChange={field.handleChange}
              />
            </Field>
          )}
        </form.Field>
        <form.Field name="priority">
          {(field) => (
            <Field>
              <FieldLabel>Ưu tiên</FieldLabel>
              <Segmented
                label="Ưu tiên"
                value={field.state.value}
                options={PRIORITIES}
                onChange={field.handleChange}
              />
            </Field>
          )}
        </form.Field>
      </div>

      <form.Field name="color">
        {(field) => (
          <Field>
            <FieldLabel>Màu</FieldLabel>
            <div role="radiogroup" aria-label="Màu" className="flex gap-2">
              {Object.entries(COLORS).map(([key, color]) => (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-label={key}
                  aria-checked={field.state.value === key}
                  onClick={() => field.handleChange(key)}
                  className={cn(
                    `size-7 rounded-full ring-offset-2 ring-offset-popover
                    transition-transform hover:scale-110`,
                    color.dot,
                    field.state.value === key && 'ring-2 ring-foreground/70',
                  )}
                />
              ))}
            </div>
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

      <DialogFooter className="items-center sm:justify-between">
        {draft.task ? (
          <Button
            type="button"
            variant="destructive"
            onClick={() => onDelete(draft.task)}
          >
            <Trash2 />
            Xoá
          </Button>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Huỷ
          </Button>
          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {draft.task ? 'Lưu' : 'Thêm việc'}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </DialogFooter>
    </form>
  )
}
