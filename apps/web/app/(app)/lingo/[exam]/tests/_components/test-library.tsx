'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { CircleCheck } from 'lucide-react'

import { cn } from '@repo/ui/lib/utils'

import { examQueryOptions, testsQueryOptions } from '@/lib/queries/lingo'

/** Newest first, enough for a library page. */
export const TEST_LIST_QUERY = { page: 1, pageSize: 50 }

const KINDS = [
  { value: '', label: 'Tất cả' },
  { value: 'FULL', label: 'Full test' },
  { value: 'MINI', label: 'Mini test' },
] as const

export const minutes = (seconds: number) => `${Math.round(seconds / 60)} phút`

/** Published tests of an exam, filterable by kind. */
export function TestLibrary({ exam }: { exam: string }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]['value']>('')
  const { data: spec } = useQuery(examQueryOptions(exam))
  const { data } = useQuery(testsQueryOptions(exam, TEST_LIST_QUERY))
  const tests = (data?.items ?? []).filter((t) => !kind || t.kind === kind)

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium tracking-tight">Thư viện đề</h1>
        <p className="text-muted-foreground">
          {spec?.name}: làm full test có điểm quy đổi, hoặc luyện từng Part.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Loại đề"
        className="flex gap-1 self-start rounded-lg bg-muted p-1 text-sm"
      >
        {KINDS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={kind === option.value}
            onClick={() => setKind(option.value)}
            className={cn(
              `min-h-7 cursor-pointer rounded-md px-3 font-medium
              transition-colors outline-none focus-visible:ring-3
              focus-visible:ring-ring/50`,
              kind === option.value
                ? 'bg-background text-foreground ring-1 ring-foreground/10'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {tests.length === 0 ? (
        <p
          className="rounded-xl border border-dashed p-8 text-center
            text-muted-foreground"
        >
          Chưa có đề nào được xuất bản. Thầy cô ghép đề hoặc sinh đề bằng AI ở
          khu ra đề.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {tests.map((test) => (
            <li key={test.id}>
              <Link
                href={`/lingo/tests/${test.id}`}
                className="flex h-full flex-col gap-3 rounded-xl border bg-card
                  p-5 shadow-xs transition-[border-color,box-shadow]
                  outline-none hover:border-foreground/20 hover:shadow-sm
                  focus-visible:border-ring focus-visible:ring-3
                  focus-visible:ring-ring/50"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-medium">{test.title}</h2>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {test.kind === 'FULL' ? 'Full' : 'Mini'}
                  </span>
                </div>
                {test.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {test.description}
                  </p>
                )}
                <div
                  className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1
                    text-sm text-muted-foreground tabular-nums"
                >
                  <span>
                    {test.questions} câu · {minutes(test.timeLimitSec)} ·{' '}
                    {test.parts.length} Part · {test.takers} lượt làm
                  </span>
                  {test.attempts > 0 && (
                    <span className="flex items-center gap-1.5 text-foreground">
                      <CircleCheck aria-hidden className="size-4" />
                      Bạn đã làm {test.attempts} lần
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
