'use client'

import { Database } from 'lucide-react'

import { cn } from '@repo/ui/lib/utils'

import type { ImportResult } from '@/lib/queries/lingo'

export const selectClass = `h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm
  outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50
  dark:bg-input/30`

export function Panel({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Database
  title: string
  description: string
  children: React.ReactNode
}) {
  const id = title.replace(/\s+/g, '-').toLowerCase()
  return (
    <section
      aria-labelledby={id}
      className="flex flex-col gap-4 rounded-xl border bg-card p-5"
    >
      <div className="flex items-start gap-3">
        <Icon
          aria-hidden="true"
          className="mt-0.5 size-5 text-muted-foreground"
        />
        <div className="flex flex-col gap-1">
          <h2 id={id} className="font-semibold">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
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
      <p>
        Thêm <strong>{result.succeeded}</strong> · trùng bỏ qua{' '}
        {result.duplicates} · lỗi{' '}
        <strong className={cn(result.failed && 'text-destructive')}>
          {result.failed}
        </strong>
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
