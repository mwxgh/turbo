'use client'

import { type FormEvent, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { Check, Loader2, RotateCcw, X } from 'pulsoicon-react'

import { Button } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'

import { InlineCode } from '@/components/inline-code'
import type { LessonDetail, QuizResult } from '@/lib/queries/studio'
import { studioKeys } from '@/lib/queries/studio'
import { submitQuiz } from '@/lib/studio-actions'

/** End-of-lesson quiz: pick one choice per question, submit, see what was right and why. */
export function LessonQuiz({ lesson }: { lesson: LessonDetail }) {
  const queryClient = useQueryClient()
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    lesson.questions.map(() => null),
  )
  const [result, setResult] = useState<QuizResult | null>(null)
  const [pending, setPending] = useState(false)
  if (!lesson.questions.length) return null
  const complete = answers.every((a) => a !== null)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!complete) return
    setPending(true)
    try {
      const res = await submitQuiz(
        lesson.id,
        answers.map((a) => a ?? 0),
      )
      if (!res.data) {
        toast.error('Không nộp được bài', {
          description: res.errors?.join(' · '),
        })
        return
      }
      setResult(res.data)
      if (res.data.passed) toast.success('Đạt! Bài học đã được đánh dấu xong')
      await queryClient.invalidateQueries({ queryKey: studioKeys.learn })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setPending(false)
    }
  }

  function retry() {
    setResult(null)
    setAnswers(lesson.questions.map(() => null))
  }

  return (
    <section
      aria-labelledby="quiz-heading"
      className="flex flex-col gap-5 rounded-xl border bg-card p-5 shadow-xs"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="quiz-heading" className="text-lg font-medium">
          Kiểm tra nhanh
        </h2>
        <p className="text-sm text-muted-foreground tabular-nums">
          {result
            ? `Đúng ${result.score}/${result.total}`
            : lesson.quizTotal !== null
              ? `Điểm cao nhất ${lesson.quizScore}/${lesson.quizTotal}`
              : `${lesson.questions.length} câu, đúng từ 70% là xong bài`}
        </p>
      </div>

      <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-6">
        {lesson.questions.map((question, qi) => {
          const graded = result?.results[qi]
          return (
            <fieldset key={question.id} className="flex flex-col gap-2">
              <legend className="mb-2 font-medium text-pretty">
                <span className="mr-2 text-muted-foreground tabular-nums">
                  {qi + 1}.
                </span>
                <InlineCode text={question.prompt} />
              </legend>
              {question.choices.map((choice, ci) => {
                const chosen = answers[qi] === ci
                const right = graded && graded.answer === ci
                const wrong = graded && chosen && !graded.correct
                return (
                  <label
                    key={ci}
                    className={cn(
                      `flex cursor-pointer items-center gap-3 rounded-lg border
                      px-3 py-2 text-sm transition-colors
                      has-focus-visible:ring-3 has-focus-visible:ring-ring/50`,
                      !graded &&
                        (chosen
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'),
                      right &&
                        `border-emerald-600 bg-emerald-500/10
                        dark:border-emerald-400`,
                      wrong && 'border-destructive bg-destructive/10',
                      graded && 'cursor-default',
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      checked={chosen}
                      disabled={!!graded}
                      onChange={() =>
                        setAnswers((prev) =>
                          prev.map((a, i) => (i === qi ? ci : a)),
                        )
                      }
                      className="accent-primary"
                    />
                    <InlineCode text={choice} className="flex-1" />
                    {right && (
                      <Check
                        aria-label="Đáp án đúng"
                        className="size-4 text-emerald-600
                          dark:text-emerald-400"
                      />
                    )}
                    {wrong && (
                      <X
                        aria-label="Bạn chọn sai"
                        className="size-4 text-destructive"
                      />
                    )}
                  </label>
                )
              })}
              {graded?.explanation && (
                <p className="text-sm text-pretty text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Giải thích:{' '}
                  </span>
                  <InlineCode text={graded.explanation} />
                </p>
              )}
            </fieldset>
          )
        })}

        <div className="flex flex-wrap items-center gap-3">
          {result ? (
            <>
              <p
                role="status"
                className={cn(
                  'text-sm font-medium',
                  result.passed
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-muted-foreground',
                )}
              >
                {result.passed
                  ? 'Đạt yêu cầu.'
                  : 'Chưa đạt 70%. Đọc lại phần giải thích rồi thử lại nhé.'}
              </p>
              <Button type="button" variant="outline" onClick={retry}>
                <RotateCcw aria-hidden />
                Làm lại
              </Button>
            </>
          ) : (
            <Button type="submit" disabled={!complete || pending}>
              {pending && (
                <Loader2
                  aria-hidden
                  className="animate-spin motion-reduce:animate-none"
                />
              )}
              Nộp bài
            </Button>
          )}
        </div>
      </form>
    </section>
  )
}
