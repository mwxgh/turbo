'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Loader2,
  Send,
  Timer,
} from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'

import {
  ListeningPlayer,
  Passage,
  QuestionImage,
} from '@/app/(app)/lingo/_components/question-media'
import { LETTERS } from '@/lib/lingo'
import { saveAnswer, submitAttempt } from '@/lib/lingo-actions'
import {
  type Attempt,
  type ExamDetail,
  type PartInfo,
  lingoKeys,
} from '@/lib/queries/lingo'
import { scriptOf } from '@/lib/speech'

const clock = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

/**
 * One question at a time. Keys: A–D or 1–4 choose, ← → move, F flags. Every choice is saved right
 * away, so a closed tab resumes where it stopped. With a time limit the clock counts down and the
 * attempt is submitted when it runs out. Listening is read by the browser; in a full test each
 * recording plays once.
 */
export function AttemptRunner({
  attempt,
  exam,
  onSubmitted,
}: {
  attempt: Attempt
  exam: ExamDetail
  onSubmitted: (attempt: Attempt) => void
}) {
  const queryClient = useQueryClient()
  const questions = attempt.questions
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      questions.findIndex((q) => !q.response),
    ),
  )
  const [choices, setChoices] = useState<(number | null)[]>(() =>
    questions.map((q) => q.response?.choice ?? null),
  )
  const [flags, setFlags] = useState(() => questions.map((q) => q.flagged))
  const [submitting, setSubmitting] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  /** Items whose recording was played (full test: once each) */
  const [played, setPlayed] = useState<ReadonlySet<string>>(new Set())
  const shownAt = useRef(0)
  const autoSubmitted = useRef(false)
  const deadline = attempt.deadline ? Date.parse(attempt.deadline) : null
  const parts = new Map<string, PartInfo>(
    exam.sections.flatMap((s) => s.parts.map((p) => [p.code, p])),
  )

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    shownAt.current = Date.now()
  }, [index])

  const question = questions[index]!
  const part = parts.get(question.part)
  const spoken = part?.spokenOptions ?? false
  const script = scriptOf(question, spoken)
  const answered = choices.filter((c) => c !== null).length
  const remaining = deadline === null ? null : deadline - now

  const choose = useCallback(
    (choice: number) => {
      setChoices((prev) => prev.map((c, i) => (i === index ? choice : c)))
      void saveAnswer(attempt.id, question.id, {
        choice,
        timeMs: Date.now() - shownAt.current,
      })
        .then((res) => {
          if (res.errors)
            toast.error('Chưa lưu được đáp án', {
              description: res.errors.join(' · '),
            })
        })
        .catch(() => toast.error('Mất kết nối, đáp án chưa được lưu'))
    },
    [attempt.id, index, question.id],
  )

  const toggleFlag = useCallback(() => {
    const flagged = !flags[index]
    setFlags((prev) => prev.map((f, i) => (i === index ? flagged : f)))
    void saveAnswer(attempt.id, question.id, { flagged }).catch(() => undefined)
  }, [attempt.id, flags, index, question.id])

  const go = useCallback(
    (to: number) => setIndex(Math.min(Math.max(to, 0), questions.length - 1)),
    [questions.length],
  )

  async function submit(timeUp = false) {
    const missing = questions.length - answered
    if (
      !timeUp &&
      missing &&
      !window.confirm(`Còn ${missing} câu chưa làm (tính là sai). Vẫn nộp bài?`)
    )
      return
    setSubmitting(true)
    try {
      const res = await submitAttempt(attempt.id)
      if (res.data) {
        await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
        onSubmitted(res.data)
        window.scrollTo({ top: 0 })
      } else
        toast.error('Không nộp được bài', {
          description: res.errors?.join(' · '),
        })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setSubmitting(false)
    }
  }

  // Time is up: submit what was answered
  useEffect(() => {
    if (remaining === null || remaining > 0 || autoSubmitted.current) return
    autoSubmitted.current = true
    toast.info('Hết giờ, bài đã được nộp')
    void submit(true)
  })

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      )
        return
      const key = event.key.toUpperCase()
      const letter = LETTERS.indexOf(key)
      const digit = Number(key) - 1
      const pick = letter >= 0 ? letter : Number.isInteger(digit) ? digit : -1
      if (pick >= 0 && pick < question.options.length) {
        event.preventDefault()
        choose(pick)
      } else if (event.key === 'ArrowRight') go(index + 1)
      else if (event.key === 'ArrowLeft') go(index - 1)
      else if (key === 'F') toggleFlag()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [choose, go, index, question.options.length, toggleFlag])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">
            {attempt.test && `${attempt.test.title} · `}
            {question.part.replace('P', 'Part ')}
            {part && ` · ${part.nameVi}`}
          </span>
          <h1 className="text-xl font-semibold">
            Câu {index + 1}
            <span className="text-muted-foreground"> / {questions.length}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {remaining === null ? (
            <span
              aria-label="Thời gian đã làm"
              className="font-mono tabular-nums"
            >
              {clock(now - Date.parse(attempt.startedAt))}
            </span>
          ) : (
            <span
              aria-label="Thời gian còn lại"
              className={cn(
                'flex items-center gap-1 font-mono tabular-nums',
                remaining < 5 * 60_000 && 'font-semibold text-destructive',
              )}
            >
              <Timer aria-hidden className="size-4" />
              {clock(remaining)}
            </span>
          )}
          <span className="tabular-nums">
            {answered}/{questions.length} đã chọn
          </span>
        </div>
      </div>

      <div
        role="progressbar"
        aria-label="Tiến độ"
        aria-valuenow={answered}
        aria-valuemin={0}
        aria-valuemax={questions.length}
        className="h-1.5 overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]
            motion-reduce:transition-none"
          style={{ width: `${(answered / questions.length) * 100}%` }}
        />
      </div>

      <section aria-label={`Câu ${index + 1}`} className="flex flex-col gap-5">
        {question.imageUrl && <QuestionImage url={question.imageUrl} />}
        {script.length > 0 && (
          <ListeningPlayer
            key={question.itemId}
            lines={script}
            locked={attempt.mode === 'FULL_TEST' && played.has(question.itemId)}
            onPlayed={() =>
              setPlayed((prev) => new Set(prev).add(question.itemId))
            }
          />
        )}
        {question.passage && (
          <Passage
            text={question.passage}
            className="max-h-[28rem] overflow-y-auto"
          />
        )}
        {question.text && !spoken && (
          <p className="text-lg leading-relaxed">{question.text}</p>
        )}
        {spoken && (
          <p className="text-sm text-muted-foreground">
            Nghe {question.text ? 'câu hỏi và ' : ''}các lựa chọn rồi chọn đáp
            án đúng.
          </p>
        )}
        <div
          role="radiogroup"
          aria-label="Đáp án"
          className="flex flex-col gap-2"
        >
          {question.options.map((option, i) => {
            const selected = choices[index] === i
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => choose(i)}
                className={cn(
                  `flex min-h-12 w-full cursor-pointer items-center gap-3
                  rounded-xl border px-4 py-2 text-left transition-colors
                  outline-none focus-visible:ring-3 focus-visible:ring-ring/50`,
                  selected
                    ? 'border-primary bg-primary/10'
                    : 'hover:bg-muted/60',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    `flex size-7 shrink-0 items-center justify-center
                    rounded-full border text-sm font-semibold`,
                    selected &&
                      'border-primary bg-primary text-primary-foreground',
                  )}
                >
                  {LETTERS[i]}
                </span>
                {!spoken && <span>{option}</span>}
              </button>
            )
          })}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => go(index - 1)}
            disabled={index === 0}
          >
            <ChevronLeft aria-hidden="true" />
            Trước
          </Button>
          <Button
            variant="outline"
            onClick={toggleFlag}
            aria-pressed={flags[index]}
            className={cn(
              flags[index] &&
                'border-amber-500 text-amber-700 dark:text-amber-300',
            )}
          >
            <Flag aria-hidden="true" />
            {flags[index] ? 'Đã đánh dấu' : 'Đánh dấu'}
          </Button>
        </div>
        {index < questions.length - 1 ? (
          <Button onClick={() => go(index + 1)}>
            Tiếp
            <ChevronRight aria-hidden="true" />
          </Button>
        ) : (
          <Button onClick={() => void submit()} disabled={submitting}>
            {submitting ? (
              <Loader2
                aria-hidden="true"
                className="animate-spin motion-reduce:animate-none"
              />
            ) : (
              <Send aria-hidden="true" />
            )}
            Nộp bài
          </Button>
        )}
      </div>

      <nav
        aria-label="Danh sách câu"
        className="flex flex-col gap-2 border-t pt-4"
      >
        <div className="flex flex-wrap gap-2">
          {questions.map((q, i) => (
            <button
              key={q.id}
              type="button"
              onClick={() => go(i)}
              aria-current={i === index ? 'step' : undefined}
              aria-label={`Câu ${i + 1}${choices[i] !== null ? ', đã chọn' : ''}${flags[i] ? ', đã đánh dấu' : ''}`}
              className={cn(
                `relative flex size-9 cursor-pointer items-center justify-center
                rounded-lg border text-sm tabular-nums transition-colors
                outline-none focus-visible:ring-3 focus-visible:ring-ring/50`,
                choices[i] !== null
                  ? 'bg-muted font-medium'
                  : 'text-muted-foreground',
                i === index && 'border-primary ring-1 ring-primary',
              )}
            >
              {i + 1}
              {flags[i] && (
                <Flag
                  aria-hidden="true"
                  className="absolute -top-1.5 -right-1.5 size-3.5
                    fill-amber-500 text-amber-500"
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Phím tắt: A–D chọn đáp án · ← → chuyển câu · F đánh dấu
          </p>
          {index < questions.length - 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void submit()}
              disabled={submitting}
            >
              Nộp bài sớm
            </Button>
          )}
        </div>
      </nav>
    </div>
  )
}
