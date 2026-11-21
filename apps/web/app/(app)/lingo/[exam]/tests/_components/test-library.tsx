'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { CircleCheck, Clock, FileText, ListChecks, Users } from 'lucide-react'

import { Badge } from '@repo/ui/components/badge'
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
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Thư viện đề</h1>
        <p className="text-muted-foreground">
          {spec?.name}: làm full test có điểm quy đổi, hoặc luyện từng Part.
        </p>
      </div>

      <div role="radiogroup" aria-label="Loại đề" className="flex gap-2">
        {KINDS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={kind === option.value}
            onClick={() => setKind(option.value)}
            className={cn(
              `min-h-9 cursor-pointer rounded-lg border px-3 text-sm
              transition-colors outline-none focus-visible:ring-3
              focus-visible:ring-ring/50`,
              kind === option.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'hover:bg-muted',
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
                  p-4 transition-colors outline-none hover:bg-muted/40
                  focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold">{test.title}</h2>
                  <Badge
                    variant={test.kind === 'FULL' ? 'default' : 'secondary'}
                  >
                    {test.kind === 'FULL' ? 'Full' : 'Mini'}
                  </Badge>
                </div>
                {test.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {test.description}
                  </p>
                )}
                <div
                  className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-sm
                    text-muted-foreground"
                >
                  <span className="flex items-center gap-1">
                    <ListChecks aria-hidden className="size-4" />
                    {test.questions} câu
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock aria-hidden className="size-4" />
                    {minutes(test.timeLimitSec)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText aria-hidden className="size-4" />
                    {test.parts.length} Part
                  </span>
                  <span className="flex items-center gap-1">
                    <Users aria-hidden className="size-4" />
                    {test.takers} lượt làm
                  </span>
                  {test.attempts > 0 && (
                    <span className="flex items-center gap-1 text-foreground">
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
