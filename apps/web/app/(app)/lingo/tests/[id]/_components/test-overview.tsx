'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Loader2, Play, Timer } from 'pulsoicon-react'

import { Button } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'
import { formatDate } from '@repo/utils'

import { minutes } from '@/app/(app)/lingo/[exam]/tests/_components/test-library'
import { takeHref } from '@/lib/lingo'
import { startAttempt } from '@/lib/lingo-actions'
import { testQueryOptions } from '@/lib/queries/lingo'

const LIMITS = [0, 10, 20, 30, 45, 60, 90, 120] as const

/** A test: start the full test, or practise chosen parts with an optional timer. */
export function TestOverview({ id }: { id: string }) {
  const router = useRouter()
  const { data: test } = useQuery(testQueryOptions(id))
  const [parts, setParts] = useState<string[]>([])
  const [limit, setLimit] = useState<number>(0)
  const [starting, setStarting] = useState<'FULL_TEST' | 'PRACTICE'>()
  if (!test) return null

  async function start(mode: 'FULL_TEST' | 'PRACTICE') {
    if (!test) return
    setStarting(mode)
    try {
      const res = await startAttempt({
        exam: test.exam,
        testId: test.id,
        mode,
        ...(mode === 'PRACTICE' && {
          parts,
          ...(limit && { timeLimitSec: limit * 60 }),
        }),
      })
      if (res.data) router.push(takeHref(res.data.id))
      else
        toast.error('Không bắt đầu được bài', {
          description: res.errors?.join(' · '),
        })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setStarting(undefined)
    }
  }

  const toggle = (code: string) =>
    setParts((prev) =>
      prev.includes(code) ? prev.filter((p) => p !== code) : [...prev, code],
    )

  return (
    <>
      <div className="flex flex-col gap-2">
        <Link
          href={`/lingo/${test.exam}/tests`}
          className="mb-2 flex items-center gap-1.5 self-start rounded-sm
            text-sm text-muted-foreground transition-colors outline-none
            hover:text-foreground focus-visible:ring-3
            focus-visible:ring-ring/50"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Thư viện đề
        </Link>
        <h1 className="text-3xl font-medium tracking-tight text-balance">
          {test.title}
        </h1>
        <p className="text-muted-foreground">
          {test.kind === 'FULL' ? 'Full test' : 'Mini test'} · {test.questions}{' '}
          câu · {minutes(test.timeLimitSec)}
          {test.description ? ` · ${test.description}` : ''}
        </p>
      </div>

      <section
        aria-labelledby="full-heading"
        className="flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-xs"
      >
        <h2 id="full-heading" className="font-medium">
          Thi thử
        </h2>
        <p className="text-sm text-muted-foreground">
          Làm hết đề trong {minutes(test.timeLimitSec)}, hết giờ tự nộp. Mỗi
          đoạn nghe chỉ phát một lần. Có điểm quy đổi theo từng phần.
        </p>
        <Button
          className="self-start"
          disabled={!!starting}
          onClick={() => void start('FULL_TEST')}
        >
          {starting === 'FULL_TEST' ? (
            <Loader2
              aria-hidden
              className="animate-spin motion-reduce:animate-none"
            />
          ) : (
            <Timer aria-hidden />
          )}
          Bắt đầu thi
        </Button>
      </section>

      <section
        aria-labelledby="practice-heading"
        className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-xs"
      >
        <h2 id="practice-heading" className="font-medium">
          Luyện tập
        </h2>
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm font-medium">
            Chọn Part (bỏ trống = tất cả)
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {test.parts.map((part) => (
              <label
                key={part.code}
                className={cn(
                  `flex min-h-11 cursor-pointer items-center gap-3 rounded-lg
                  border px-3 text-sm transition-colors has-focus-visible:ring-3
                  has-focus-visible:ring-ring/50`,
                  parts.includes(part.code)
                    ? 'border-foreground bg-muted ring-1 ring-foreground'
                    : 'hover:bg-muted/60',
                )}
              >
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  checked={parts.includes(part.code)}
                  onChange={() => toggle(part.code)}
                />
                <span className="flex-1">
                  {part.code.replace('P', 'Part ')} · {part.nameVi}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {part.questions} câu
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Giới hạn thời gian
          <select
            value={limit}
            onChange={(event) => setLimit(Number(event.target.value))}
            className="h-9 w-48 rounded-lg border border-input bg-transparent
              px-2.5 font-normal transition-[border-color,box-shadow]
              outline-none focus-visible:border-ring focus-visible:ring-3
              focus-visible:ring-ring/50 dark:bg-input/30"
          >
            {LIMITS.map((value) => (
              <option key={value} value={value}>
                {value ? `${value} phút` : 'Không giới hạn'}
              </option>
            ))}
          </select>
        </label>
        <Button
          variant="outline"
          className="self-start"
          disabled={!!starting}
          onClick={() => void start('PRACTICE')}
        >
          {starting === 'PRACTICE' ? (
            <Loader2
              aria-hidden
              className="animate-spin motion-reduce:animate-none"
            />
          ) : (
            <Play aria-hidden />
          )}
          Luyện tập
        </Button>
      </section>

      {test.attempts.length > 0 && (
        <section
          aria-labelledby="history-heading"
          className="flex flex-col gap-3"
        >
          <h2 id="history-heading" className="font-medium">
            Lần làm gần đây
          </h2>
          <ul
            className="flex flex-col divide-y overflow-hidden rounded-xl border
              bg-card shadow-xs"
          >
            {test.attempts.map((a) => {
              const scaled = a.scores
                ? Object.values(a.scores).reduce(
                    (sum, s) => sum + (s.scaled ?? 0),
                    0,
                  )
                : 0
              return (
                <li key={a.id}>
                  <Link
                    href={`/lingo/attempts/${a.id}`}
                    className="flex flex-wrap items-center justify-between gap-2
                      px-4 py-3 text-sm transition-colors outline-none
                      hover:bg-muted/50 focus-visible:ring-3
                      focus-visible:ring-ring/50 focus-visible:ring-inset"
                  >
                    <span>
                      {a.mode === 'FULL_TEST'
                        ? 'Thi thử'
                        : `Luyện ${a.parts.map((p) => p.replace('P', 'Part ')).join(', ')}`}
                    </span>
                    <span
                      className="flex items-center gap-3 text-muted-foreground
                        tabular-nums"
                    >
                      {a.mode === 'FULL_TEST' && (
                        <span className="font-medium text-foreground">
                          {scaled} điểm
                        </span>
                      )}
                      {a.correct}/{a.total} câu
                      {a.submittedAt && (
                        <span>{formatDate(a.submittedAt)}</span>
                      )}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </>
  )
}
