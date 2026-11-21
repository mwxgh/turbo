'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { ChevronRight, Play } from 'lucide-react'

import { Badge } from '@repo/ui/components/badge'
import { buttonVariants } from '@repo/ui/components/button'
import { cn } from '@repo/ui/lib/utils'
import { formatDate, formatDateTime } from '@repo/utils'

import {
  DEFAULT_EXAM,
  duration,
  partLabel,
  percent,
  resultHref,
  scaledTotal,
  takeHref,
} from '@/lib/lingo'
import { type AttemptListItem, attemptsQueryOptions } from '@/lib/queries/lingo'

import { type ChartPoint, ProgressChart } from './progress-chart'

/** The latest 100 attempts: enough for a progress view. */
export const HISTORY_QUERY = { page: 1, pageSize: 100 }

const FILTERS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'FULL_TEST', label: 'Full test' },
  { value: 'practice', label: 'Luyện Part' },
  { value: 'open', label: 'Đang làm' },
] as const

const MODE_LABEL: Record<AttemptListItem['mode'], string> = {
  FULL_TEST: 'Full test',
  PRACTICE: 'Luyện đề',
  QUICK: 'Luyện nhanh',
  PLACEMENT: 'Kiểm tra đầu vào',
}

const titleOf = (a: AttemptListItem) =>
  a.test?.title ??
  (a.mode === 'PLACEMENT'
    ? 'Bài kiểm tra đầu vào'
    : a.parts.map(partLabel).join(', '))

const matches = (
  a: AttemptListItem,
  filter: (typeof FILTERS)[number]['value'],
) =>
  filter === 'all' ||
  (filter === 'open'
    ? !a.submittedAt
    : !!a.submittedAt &&
      (filter === 'FULL_TEST'
        ? a.mode === 'FULL_TEST'
        : a.mode !== 'FULL_TEST'))

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border bg-card p-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-2xl font-semibold tabular-nums">{value}</dd>
    </div>
  )
}

/** Every attempt of the learner: progress over time, then the list to resume or review. */
export function AttemptHistory() {
  const { data } = useQuery(attemptsQueryOptions(HISTORY_QUERY))
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['value']>('all')
  const attempts = data?.items ?? []
  const submitted = attempts.filter((a) => a.submittedAt)
  const fullTests = submitted
    .map((a) => ({ a, score: scaledTotal(a.scores) }))
    .filter(
      (row): row is { a: AttemptListItem; score: number } =>
        row.a.mode === 'FULL_TEST' && row.score !== null,
    )
  const answered = submitted.reduce((sum, a) => sum + a.total, 0)
  const correct = submitted.reduce((sum, a) => sum + (a.correct ?? 0), 0)
  // Oldest first, for the chart
  const timeline = [...submitted].reverse()
  const byScore = fullTests.length >= 2
  const points: ChartPoint[] = byScore
    ? [...fullTests].reverse().map(({ a, score }) => ({
        id: a.id,
        value: score,
        label: formatDate(a.submittedAt!),
        detail: titleOf(a),
        href: resultHref(a.id),
      }))
    : timeline.slice(-30).map((a) => ({
        id: a.id,
        value: a.total ? (a.correct ?? 0) / a.total : 0,
        label: formatDate(a.submittedAt!),
        detail: `${titleOf(a)} · ${a.correct ?? 0}/${a.total} câu`,
        href: resultHref(a.id),
      }))
  const shown = attempts.filter((a) => matches(a, filter))

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold">Lịch sử làm bài</h1>
        <p className="text-muted-foreground">
          Điểm và độ chính xác qua từng lần làm. Bài đang dở làm tiếp được ở
          đây.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Bài đã nộp" value={String(submitted.length)} />
        <Stat label="Câu đã làm" value={String(answered)} />
        <Stat
          label="Độ chính xác"
          value={answered ? percent(correct / answered) : '–'}
        />
        <Stat
          label="Điểm full test cao nhất"
          value={
            fullTests.length
              ? String(Math.max(...fullTests.map((t) => t.score)))
              : '–'
          }
        />
      </dl>

      <section
        aria-labelledby="progress-heading"
        className="flex flex-col gap-3 rounded-xl border bg-card p-5"
      >
        <div className="flex flex-col gap-0.5">
          <h2 id="progress-heading" className="font-semibold">
            {byScore ? 'Điểm full test' : 'Độ chính xác mỗi lần làm'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {byScore
              ? 'Điểm quy đổi (10–990) của các bài full test đã nộp.'
              : 'Làm từ 2 bài full test trở lên để xem biểu đồ điểm.'}
          </p>
        </div>
        {points.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Chưa có bài nào được nộp.
          </p>
        ) : (
          <ProgressChart
            points={points}
            max={byScore ? 990 : 1}
            format={byScore ? (v) => String(Math.round(v)) : percent}
            label={
              byScore
                ? 'Điểm full test theo thời gian'
                : 'Độ chính xác theo thời gian'
            }
          />
        )}
      </section>

      <section aria-labelledby="list-heading" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="list-heading" className="text-lg font-semibold">
            Các lần làm
          </h2>
          <div role="radiogroup" aria-label="Lọc bài" className="flex gap-1.5">
            {FILTERS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={filter === option.value}
                onClick={() => setFilter(option.value)}
                className={cn(
                  `min-h-8 cursor-pointer rounded-lg border px-3 text-sm
                  transition-colors outline-none focus-visible:ring-3
                  focus-visible:ring-ring/50`,
                  filter === option.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'hover:bg-muted',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {shown.length === 0 ? (
          <div
            className="flex flex-col items-center gap-3 rounded-xl border
              border-dashed p-8 text-center text-sm text-muted-foreground"
          >
            Chưa có bài nào ở mục này.
            <Link
              href={`/lingo/${DEFAULT_EXAM}/tests`}
              className={buttonVariants({ size: 'sm' })}
            >
              Chọn đề để làm
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col divide-y rounded-xl border bg-card">
            {shown.map((a) => {
              const score =
                a.mode === 'FULL_TEST' ? scaledTotal(a.scores) : null
              return (
                <li key={a.id}>
                  <Link
                    href={a.submittedAt ? resultHref(a.id) : takeHref(a.id)}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4
                      transition-colors outline-none hover:bg-muted/40
                      focus-visible:ring-3 focus-visible:ring-ring/50
                      focus-visible:ring-inset"
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{titleOf(a)}</span>
                        <Badge variant="outline">{MODE_LABEL[a.mode]}</Badge>
                        {!a.submittedAt && (
                          <Badge variant="secondary">Đang làm</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDateTime(a.startedAt)}
                        {a.submittedAt &&
                          ` · ${duration(Date.parse(a.submittedAt) - Date.parse(a.startedAt))}`}
                        {a.test && a.mode !== 'FULL_TEST'
                          ? ` · ${a.parts.map(partLabel).join(', ')}`
                          : ''}
                      </span>
                    </div>
                    {a.submittedAt ? (
                      <div className="flex items-baseline gap-3 tabular-nums">
                        {score !== null && (
                          <span className="text-lg font-semibold">
                            {score}
                            <span className="sr-only"> điểm</span>
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {a.correct ?? 0}/{a.total} câu ·{' '}
                          {percent(a.total ? (a.correct ?? 0) / a.total : 0)}
                        </span>
                      </div>
                    ) : (
                      <span
                        className="flex items-center gap-1 text-sm font-medium"
                      >
                        <Play aria-hidden="true" className="size-4" />
                        Làm tiếp
                      </span>
                    )}
                    <ChevronRight
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </>
  )
}
