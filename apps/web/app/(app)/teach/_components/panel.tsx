'use client'

import type { LucideIcon } from 'lucide-react'

import { cn } from '@repo/ui/lib/utils'

import type { ImportResult } from '@/lib/queries/lingo'

export const selectClass = `h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm
  outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50
  dark:bg-input/30`

/** Section heading inside a teacher page (below the page h1). */
export const sectionHeadingClass = 'text-lg font-medium'

/** Empty list: a dashed frame with one quiet line. */
export const emptyClass = `rounded-xl border border-dashed px-6 py-8 text-center text-sm
  text-muted-foreground`

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  EASY: 'Dễ',
  MEDIUM: 'Vừa',
  HARD: 'Khó',
}

/** Item and test statuses. */
export const STATUS_LABEL: Record<string, string> = {
  DRAFT: 'Nháp',
  NEEDS_REVIEW: 'Cần xem lại',
  PUBLISHED: 'Đã xuất bản',
  REJECTED: 'Đã loại',
}

/** Dot colour of a status: green = live, amber = needs a look, red = rejected or failed, grey otherwise. */
const STATUS_DOT: Record<string, string> = {
  PUBLISHED: 'bg-emerald-500',
  NEEDS_REVIEW: 'bg-amber-500',
  REJECTED: 'bg-destructive',
  FAILED: 'bg-destructive',
}

/** A status as a small dot and its label, instead of a loud pill. */
export function StatusDot({
  status,
  label,
  className,
}: {
  status: string
  label: string
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'size-2 shrink-0 rounded-full',
          STATUS_DOT[status] ?? 'bg-muted-foreground/50',
        )}
      />
      {label}
    </span>
  )
}

export function Panel({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon
  title: string
  description: string
  children: React.ReactNode
}) {
  const id = title.replace(/\s+/g, '-').toLowerCase()
  return (
    <section
      aria-labelledby={id}
      className="flex flex-col gap-5 rounded-xl border bg-card p-5 shadow-xs"
    >
      <div className="flex items-start gap-3">
        <Icon
          aria-hidden="true"
          className="mt-1 size-4 shrink-0 text-muted-foreground"
        />
        <div className="flex flex-col gap-1">
          <h2 id={id} className="font-medium">
            {title}
          </h2>
          <p className="text-sm text-pretty text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      {children}
    </section>
  )
}

export function ResultSummary({ result }: { result: ImportResult }) {
  return (
    <div
      role="status"
      className="flex flex-col gap-2 rounded-lg bg-muted/40 p-3 text-sm"
    >
      <p className="tabular-nums">
        Thêm <span className="font-medium">{result.succeeded}</span> · trùng bỏ
        qua {result.duplicates} · lỗi{' '}
        <span
          className={cn('font-medium', result.failed && 'text-destructive')}
        >
          {result.failed}
        </span>
      </p>
      {result.errors.length > 0 && (
        <ul className="max-h-48 list-disc overflow-y-auto pl-5 text-destructive">
          {result.errors.map((e) => (
            <li key={e.line}>
              Dòng {e.line}: {e.issues.join('; ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
