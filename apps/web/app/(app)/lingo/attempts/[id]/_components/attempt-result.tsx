'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Check, CircleSlash, Loader2, RotateCcw, X } from 'lucide-react'

import { Badge } from '@repo/ui/components/badge'
import { Button, buttonVariants } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'

import {
  Passage,
  QuestionImage,
  Transcript,
} from '@/app/(app)/lingo/_components/question-media'
import { LETTERS, percent } from '@/lib/lingo'
import { startAttempt } from '@/lib/lingo-actions'
import type { Attempt, AttemptQuestion, ExamDetail } from '@/lib/queries/lingo'

function QuestionReview({
  q,
  n,
  skillTags,
}: {
  q: AttemptQuestion
  n: number
  skillTags: Record<string, string>
}) {
  const chosen = q.response?.choice
  return (
    <li className="flex flex-col gap-4 rounded-xl border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">Câu {n}</h3>
        {q.correct ? (
          <Badge
            variant="secondary"
            className="gap-1 text-emerald-700 dark:text-emerald-300"
          >
            <Check aria-hidden="true" className="size-3.5" /> Đúng
          </Badge>
        ) : chosen === undefined ? (
          <Badge variant="outline" className="gap-1">
            <CircleSlash aria-hidden="true" className="size-3.5" /> Bỏ trống
          </Badge>
        ) : (
          <Badge variant="destructive" className="gap-1">
            <X aria-hidden="true" className="size-3.5" /> Sai
          </Badge>
        )}
      </div>
      {q.imageUrl && <QuestionImage url={q.imageUrl} />}
      {q.scene && (
        <p className="text-sm text-muted-foreground">Ảnh: {q.scene}</p>
      )}
      {q.transcript && (
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Transcript</span>
          <Transcript lines={q.transcript} />
        </div>
      )}
      {q.passage && <Passage text={q.passage} className="text-sm" />}
      {q.text && <p className="leading-relaxed">{q.text}</p>}
      <ul className="flex flex-col gap-1.5">
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
      {q.explanationVi && (
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Giải thích</span>
          <p className="leading-relaxed text-muted-foreground">
            {q.explanationVi}
          </p>
        </div>
      )}
      {q.translationVi && (
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Dịch</span>
          <p className="leading-relaxed text-muted-foreground">
            {q.translationVi}
          </p>
        </div>
      )}
      {!!q.skillTags?.length && (
        <div className="flex flex-wrap gap-1.5">
          {q.skillTags.map((tag) => (
            <Badge key={tag} variant="outline">
              {skillTags[tag] ?? tag}
            </Badge>
          ))}
        </div>
      )}
    </li>
  )
}

export function AttemptResult({
  attempt,
  exam,
}: {
  attempt: Attempt
  exam: ExamDetail
}) {
  const skillTags = exam.skillTags
  const router = useRouter()
  const [starting, setStarting] = useState(false)
  const correct = attempt.correct ?? 0
  const ratio = attempt.total ? correct / attempt.total : 0
  const wrongOnly = attempt.questions.filter((q) => !q.correct)
  const [onlyWrong, setOnlyWrong] = useState(false)
  const shown = onlyWrong ? wrongOnly : attempt.questions

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
      if (res.data) router.push(`/lingo/attempts/${res.data.id}`)
      else
        toast.error('Không bắt đầu được bài', {
          description: res.errors?.join(' · '),
        })
    } finally {
      setStarting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <section
        aria-labelledby="result-heading"
        className="flex flex-col gap-4 rounded-xl border bg-card p-6"
      >
        <h1
          id="result-heading"
          className="text-sm font-medium text-muted-foreground"
        >
          Kết quả · {attempt.test ? `${attempt.test.title} · ` : ''}
          {attempt.mode === 'FULL_TEST'
            ? 'Full test'
            : attempt.parts.map((p) => p.replace('P', 'Part ')).join(', ')}
        </h1>
        {attempt.mode === 'FULL_TEST' && attempt.scores && (
          <dl className="flex flex-wrap gap-6">
            <div>
              <dt className="text-sm text-muted-foreground">Điểm ước tính</dt>
              <dd className="text-4xl font-bold tabular-nums">
                {Object.values(attempt.scores).reduce(
                  (sum, s) => sum + (s.scaled ?? 0),
                  0,
                )}
              </dd>
            </div>
            {exam.sections
              .filter((section) => attempt.scores?.[section.code])
              .map((section) => {
                const score = attempt.scores![section.code]!
                return (
                  <div key={section.code}>
                    <dt className="text-sm text-muted-foreground">
                      {section.name}
                    </dt>
                    <dd className="text-2xl font-semibold tabular-nums">
                      {score.scaled ?? '–'}
                      <span
                        className="ml-2 text-sm font-normal
                          text-muted-foreground"
                      >
                        {score.correct}/{score.total} câu
                      </span>
                    </dd>
                  </div>
                )
              })}
          </dl>
        )}
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold tabular-nums">
            {correct}/{attempt.total}
          </span>
          <span className="text-lg text-muted-foreground tabular-nums">
            {percent(ratio)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {ratio >= 0.85
            ? 'Rất tốt! Thử độ khó cao hơn nhé.'
            : ratio >= 0.6
              ? 'Khá ổn. Đọc kỹ giải thích các câu sai bên dưới.'
              : 'Cần luyện thêm. Câu sai đã được lưu vào Sổ câu sai.'}
        </p>
        <div className="flex flex-wrap gap-2">
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
          <Link
            href={`/lingo/${attempt.exam}`}
            className={buttonVariants({ variant: 'outline' })}
          >
            Về tổng quan
          </Link>
        </div>
      </section>

      <section aria-labelledby="review-heading" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="review-heading" className="text-lg font-semibold">
            Xem lại
          </h2>
          {wrongOnly.length > 0 && wrongOnly.length < attempt.total && (
            <Button
              variant="ghost"
              size="sm"
              aria-pressed={onlyWrong}
              onClick={() => setOnlyWrong((v) => !v)}
            >
              {onlyWrong ? 'Hiện tất cả' : `Chỉ câu sai (${wrongOnly.length})`}
            </Button>
          )}
        </div>
        <ol className="flex flex-col gap-4">
          {shown.map((q) => (
            <QuestionReview
              key={q.id}
              q={q}
              n={q.order + 1}
              skillTags={skillTags}
            />
          ))}
        </ol>
      </section>
    </div>
  )
}
