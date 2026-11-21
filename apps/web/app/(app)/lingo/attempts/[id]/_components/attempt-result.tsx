'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  Check,
  CircleSlash,
  Clock,
  History,
  Loader2,
  RotateCcw,
  Route,
  X,
} from 'lucide-react'

import { Badge } from '@repo/ui/components/badge'
import { Button, buttonVariants } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'
import { formatDateTime } from '@repo/utils'

import {
  Passage,
  QuestionImage,
  Transcript,
} from '@/app/(app)/lingo/_components/question-media'
import {
  LETTERS,
  duration,
  partLabel,
  percent,
  scaledTotal,
  takeHref,
} from '@/lib/lingo'
import { startAttempt } from '@/lib/lingo-actions'
import type { Attempt, AttemptQuestion, ExamDetail } from '@/lib/queries/lingo'

type Outcome = 'correct' | 'wrong' | 'blank'

const outcomeOf = (q: AttemptQuestion): Outcome =>
  q.correct ? 'correct' : q.response?.choice == null ? 'blank' : 'wrong'

const OUTCOME = {
  correct: {
    label: 'Đúng',
    icon: Check,
    cell: 'border-emerald-600/50 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
  },
  wrong: {
    label: 'Sai',
    icon: X,
    cell: 'border-destructive/50 bg-destructive/10 text-destructive',
  },
  blank: {
    label: 'Bỏ trống',
    icon: CircleSlash,
    cell: 'border-dashed text-muted-foreground',
  },
} as const

const FILTERS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'wrong', label: 'Sai' },
  { value: 'blank', label: 'Bỏ trống' },
] as const

/** Right / total per key, in first-seen order. */
function tally<K extends string>(
  questions: AttemptQuestion[],
  keysOf: (q: AttemptQuestion) => K[],
) {
  const map = new Map<K, { correct: number; total: number }>()
  for (const q of questions)
    for (const key of keysOf(q)) {
      const row = map.get(key) ?? { correct: 0, total: 0 }
      row.total++
      if (q.correct) row.correct++
      map.set(key, row)
    }
  return [...map].map(([key, row]) => ({ key, ...row }))
}

function Bar({ ratio }: { ratio: number }) {
  return (
    <div className="h-2 w-full min-w-16 overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: `${Math.round(ratio * 100)}%` }}
      />
    </div>
  )
}

function QuestionReview({ q }: { q: AttemptQuestion }) {
  const chosen = q.response?.choice
  const outcome = OUTCOME[outcomeOf(q)]
  return (
    <li id={`review-${q.id}`} className="flex scroll-mt-6 flex-col gap-3">
      <div className="flex items-start gap-3">
        <span
          className="flex size-8 shrink-0 items-center justify-center
            rounded-full bg-muted text-sm font-semibold tabular-nums"
        >
          {q.order + 1}
        </span>
        <p className="flex-1 pt-1 leading-relaxed">
          {q.text ?? (
            <span className="text-muted-foreground">(Câu hỏi nghe)</span>
          )}
        </p>
        <Badge
          variant={outcome === OUTCOME.wrong ? 'destructive' : 'outline'}
          className={cn(
            'gap-1',
            outcome === OUTCOME.correct &&
              'text-emerald-700 dark:text-emerald-300',
          )}
        >
          <outcome.icon aria-hidden="true" className="size-3.5" />
          {outcome.label}
        </Badge>
      </div>
      <ul className="flex flex-col gap-1.5 sm:pl-11">
        {q.options.map((option, i) => {
          const isAnswer = i === q.answer
          const isWrongChoice = i === chosen && !isAnswer
          return (
            <li
              key={i}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-3 py-2 text-sm',
                isAnswer && 'border-emerald-600/50 bg-emerald-500/10',
                isWrongChoice && 'border-destructive/50 bg-destructive/10',
              )}
            >
              <span aria-hidden="true" className="w-4 font-semibold">
                {LETTERS[i]}
              </span>
              <span className="flex-1">{option}</span>
              {isAnswer && (
                <span
                  className="flex items-center gap-1 text-xs font-medium
                    text-emerald-700 dark:text-emerald-300"
                >
                  <Check aria-hidden="true" className="size-3.5" />
                  Đáp án
                </span>
              )}
              {isWrongChoice && (
                <span
                  className="flex items-center gap-1 text-xs font-medium
                    text-destructive"
                >
                  <X aria-hidden="true" className="size-3.5" />
                  Bạn chọn
                </span>
              )}
            </li>
          )
        })}
      </ul>
      {(q.explanationVi || q.translationVi) && (
        <div className="flex flex-col gap-2 text-sm sm:pl-11">
          {q.explanationVi && (
            <p className="leading-relaxed">
              <span className="font-medium">Giải thích: </span>
              <span className="text-muted-foreground">{q.explanationVi}</span>
            </p>
          )}
          {q.translationVi && (
            <p className="leading-relaxed">
              <span className="font-medium">Dịch: </span>
              <span className="text-muted-foreground">{q.translationVi}</span>
            </p>
          )}
        </div>
      )}
    </li>
  )
}

/** One item: its photo, script or passage once, then its questions. */
function GroupReview({ questions }: { questions: AttemptQuestion[] }) {
  const first = questions[0]!
  return (
    <li className="flex flex-col gap-4 rounded-xl border bg-card p-5">
      <span className="text-sm text-muted-foreground">
        {partLabel(first.part)}
      </span>
      {first.imageUrl && <QuestionImage url={first.imageUrl} />}
      {first.scene && (
        <p className="text-sm text-muted-foreground">Ảnh: {first.scene}</p>
      )}
      {first.transcript && (
        <details className="group flex flex-col gap-2 text-sm">
          <summary className="cursor-pointer font-medium">Transcript</summary>
          <div className="pt-2">
            <Transcript lines={first.transcript} />
          </div>
        </details>
      )}
      {first.passage && <Passage text={first.passage} className="text-sm" />}
      <ol className="flex flex-col gap-6">
        {questions.map((q) => (
          <QuestionReview key={q.id} q={q} />
        ))}
      </ol>
    </li>
  )
}

/**
 * Result of a submitted attempt: scaled score in a full test, counts, accuracy by part and by
 * skill, the answer sheet, then every question with its explanation, grouped like in the test.
 */
export function AttemptResult({
  attempt,
  exam,
}: {
  attempt: Attempt
  exam: ExamDetail
}) {
  const router = useRouter()
  const [starting, setStarting] = useState(false)
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['value']>('all')
  const questions = attempt.questions
  const counts = { correct: 0, wrong: 0, blank: 0 }
  for (const q of questions) counts[outcomeOf(q)]++
  const ratio = attempt.total ? counts.correct / attempt.total : 0
  const placement = attempt.mode === 'PLACEMENT'
  const total =
    attempt.mode === 'FULL_TEST' || placement
      ? scaledTotal(attempt.scores)
      : null
  const partNames = new Map(
    exam.sections.flatMap((s) => s.parts.map((p) => [p.code, p.nameVi])),
  )
  const byPart = tally(questions, (q) => [q.part])
  const weakTags = tally(questions, (q) => q.skillTags ?? [])
    .filter((t) => t.correct < t.total)
    .sort((a, b) => a.correct / a.total - b.correct / b.total)
    .slice(0, 6)

  const shown = questions.filter(
    (q) => filter === 'all' || outcomeOf(q) === filter,
  )
  const groups: AttemptQuestion[][] = []
  for (const q of shown) {
    const last = groups.at(-1)
    if (last?.[0]!.itemId === q.itemId) last.push(q)
    else groups.push([q])
  }

  async function again() {
    if (attempt.test) {
      router.push(`/lingo/tests/${attempt.test.id}`)
      return
    }
    setStarting(true)
    try {
      const res = await startAttempt({
        exam: attempt.exam,
        part: attempt.parts[0]!,
        count: attempt.total,
      })
      if (res.data) router.push(takeHref(res.data.id))
      else
        toast.error('Không bắt đầu được bài', {
          description: res.errors?.join(' · '),
        })
    } finally {
      setStarting(false)
    }
  }

  function jump(q: AttemptQuestion) {
    if (filter !== 'all' && outcomeOf(q) !== filter) setFilter('all')
    requestAnimationFrame(() =>
      document
        .getElementById(`review-${q.id}`)
        ?.scrollIntoView({ block: 'start' }),
    )
  }

  return (
    <>
      <section
        aria-labelledby="result-heading"
        className="flex flex-col gap-6 rounded-xl border bg-card p-6"
      >
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            Kết quả ·{' '}
            {attempt.mode === 'FULL_TEST'
              ? 'Full test'
              : placement
                ? 'Kiểm tra đầu vào'
                : attempt.parts.map(partLabel).join(', ')}
            {attempt.submittedAt &&
              ` · nộp lúc ${formatDateTime(attempt.submittedAt)}`}
          </p>
          <h1 id="result-heading" className="text-2xl font-semibold">
            {attempt.test?.title ??
              (placement ? 'Bài kiểm tra đầu vào' : `Luyện ${exam.name}`)}
          </h1>
        </div>

        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {total !== null ? (
            <div className="col-span-2 flex flex-col gap-1 sm:col-span-1">
              <dt className="text-sm text-muted-foreground">Điểm ước tính</dt>
              <dd className="text-4xl font-bold tabular-nums">{total}</dd>
              <dd className="text-xs text-muted-foreground">
                {exam.sections
                  .filter((s) => attempt.scores?.[s.code]?.scaled != null)
                  .map((s) => `${s.name} ${attempt.scores![s.code]!.scaled}`)
                  .join(' · ')}
              </dd>
            </div>
          ) : (
            <div className="col-span-2 flex flex-col gap-1 sm:col-span-1">
              <dt className="text-sm text-muted-foreground">Số câu đúng</dt>
              <dd className="text-4xl font-bold tabular-nums">
                {counts.correct}
                <span className="text-lg font-normal text-muted-foreground">
                  /{attempt.total}
                </span>
              </dd>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <dt className="text-sm text-muted-foreground">Độ chính xác</dt>
            <dd className="text-2xl font-semibold tabular-nums">
              {percent(ratio)}
            </dd>
          </div>
          {(['correct', 'wrong', 'blank'] as const).map((key) => {
            const Icon = OUTCOME[key].icon
            return (
              <div key={key} className="flex flex-col gap-1">
                <dt
                  className="flex items-center gap-1 text-sm
                    text-muted-foreground"
                >
                  <Icon aria-hidden="true" className="size-3.5" />
                  {OUTCOME[key].label}
                </dt>
                <dd className="text-2xl font-semibold tabular-nums">
                  {counts[key]}
                </dd>
              </div>
            )
          })}
          {attempt.submittedAt && (
            <div className="flex flex-col gap-1">
              <dt
                className="flex items-center gap-1 text-sm
                  text-muted-foreground"
              >
                <Clock aria-hidden="true" className="size-3.5" />
                Thời gian
              </dt>
              <dd className="text-2xl font-semibold tabular-nums">
                {duration(
                  Date.parse(attempt.submittedAt) -
                    Date.parse(attempt.startedAt),
                )}
              </dd>
            </div>
          )}
        </dl>

        {placement && (
          <p className="rounded-lg bg-muted/50 p-3 text-sm">
            Điểm ước tính từ khoảng 30 câu, chỉ dùng để chọn giai đoạn bắt đầu.
            Lộ trình đã cập nhật theo kết quả này.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {placement ? (
            <Link href="/lingo/roadmap" className={buttonVariants()}>
              <Route aria-hidden="true" />
              Xem lộ trình
            </Link>
          ) : (
            <Button onClick={() => void again()} disabled={starting}>
              {starting ? (
                <Loader2
                  aria-hidden="true"
                  className="animate-spin motion-reduce:animate-none"
                />
              ) : (
                <RotateCcw aria-hidden="true" />
              )}
              {attempt.test ? 'Về trang đề' : 'Luyện tiếp'}
            </Button>
          )}
          <Link
            href="/lingo/history"
            className={buttonVariants({ variant: 'outline' })}
          >
            <History aria-hidden="true" />
            Lịch sử làm bài
          </Link>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="parts-heading"
          className="flex flex-col gap-3"
        >
          <h2 id="parts-heading" className="text-lg font-semibold">
            Theo Part
          </h2>
          <div className="overflow-x-auto rounded-xl border bg-card">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr className="border-b">
                  <th className="px-3 py-2 font-medium">Part</th>
                  <th className="px-3 py-2 text-right font-medium">Đúng</th>
                  <th className="w-2/5 px-3 py-2 font-medium">Tỉ lệ</th>
                </tr>
              </thead>
              <tbody>
                {byPart.map((row) => (
                  <tr key={row.key} className="border-b last:border-0">
                    <td className="px-3 py-2">
                      <span className="font-medium">{partLabel(row.key)}</span>
                      <span className="block text-xs text-muted-foreground">
                        {partNames.get(row.key)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {row.correct}/{row.total}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Bar ratio={row.correct / row.total} />
                        <span className="w-10 text-right tabular-nums">
                          {percent(row.correct / row.total)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="tags-heading" className="flex flex-col gap-3">
          <h2 id="tags-heading" className="text-lg font-semibold">
            Kỹ năng cần luyện
          </h2>
          {weakTags.length === 0 ? (
            <p
              className="rounded-xl border border-dashed p-6 text-center text-sm
                text-muted-foreground"
            >
              Không có kỹ năng nào sai trong bài này.
            </p>
          ) : (
            <ul className="flex flex-col gap-2 rounded-xl border bg-card p-4">
              {weakTags.map((tag) => (
                <li
                  key={tag.key}
                  className="grid grid-cols-[minmax(0,1fr)_6rem_3rem]
                    items-center gap-3 text-sm"
                >
                  <span className="truncate">
                    {exam.skillTags[tag.key] ?? tag.key}
                  </span>
                  <Bar ratio={tag.correct / tag.total} />
                  <span className="text-right tabular-nums">
                    {tag.correct}/{tag.total}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section aria-labelledby="sheet-heading" className="flex flex-col gap-3">
        <h2 id="sheet-heading" className="text-lg font-semibold">
          Phiếu trả lời
        </h2>
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
          {[...new Set(questions.map((q) => q.part))].map((code) => (
            <div key={code} className="flex flex-col gap-1.5">
              <h3 className="text-xs font-medium text-muted-foreground">
                {partLabel(code)}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {questions
                  .filter((q) => q.part === code)
                  .map((q) => {
                    const outcome = outcomeOf(q)
                    const chosen = q.response?.choice
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => jump(q)}
                        aria-label={`Câu ${q.order + 1}: ${OUTCOME[outcome].label}`}
                        className={cn(
                          `flex h-8 min-w-11 cursor-pointer items-center
                          justify-center gap-1 rounded-md border px-1.5 text-xs
                          tabular-nums transition-opacity outline-none
                          hover:opacity-80 focus-visible:ring-3
                          focus-visible:ring-ring/50`,
                          OUTCOME[outcome].cell,
                        )}
                      >
                        {q.order + 1}
                        <span aria-hidden="true" className="font-semibold">
                          {chosen == null ? '–' : LETTERS[chosen]}
                        </span>
                      </button>
                    )
                  })}
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            Mỗi ô: số câu và đáp án bạn chọn. Xanh đúng, đỏ sai, viền đứt bỏ
            trống. Bấm để xem giải thích.
          </p>
        </div>
      </section>

      <section aria-labelledby="review-heading" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="review-heading" className="text-lg font-semibold">
            Xem lại và giải thích
          </h2>
          <div role="radiogroup" aria-label="Lọc câu" className="flex gap-1.5">
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
                {option.value !== 'all' && ` (${counts[option.value]})`}
              </button>
            ))}
          </div>
        </div>
        {groups.length === 0 ? (
          <p
            className="rounded-xl border border-dashed p-6 text-center text-sm
              text-muted-foreground"
          >
            Không có câu nào ở mục này.
          </p>
        ) : (
          <ol className="flex flex-col gap-4">
            {groups.map((group) => (
              <GroupReview key={group[0]!.id} questions={group} />
            ))}
          </ol>
        )}
      </section>
    </>
  )
}
