'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { Loader2, RotateCcw } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { formatDate } from '@repo/utils'

import {
  Passage,
  QuestionImage,
  Transcript,
} from '@/app/(app)/lingo/_components/question-media'
import { LETTERS, takeHref } from '@/lib/lingo'
import { startAttempt } from '@/lib/lingo-actions'
import { mistakesQueryOptions } from '@/lib/queries/lingo'

/** Questions last answered wrong; "Làm lại" starts an attempt with them. */
export function MistakesList({ exam }: { exam: string }) {
  const router = useRouter()
  const { data: mistakes = [] } = useQuery(mistakesQueryOptions(exam))
  const [starting, setStarting] = useState(false)
  const parts = [...new Set(mistakes.map((m) => m.part))]

  async function retry(part: string) {
    setStarting(true)
    try {
      const res = await startAttempt({
        exam,
        part,
        count: 20,
        source: 'MISTAKES',
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

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Sổ câu sai</h1>
          <p className="text-muted-foreground">
            Câu bạn làm sai ở lần gần nhất. Làm đúng lại thì câu tự rời sổ.
          </p>
        </div>
        {parts.map((part) => (
          <Button
            key={part}
            onClick={() => void retry(part)}
            disabled={starting}
          >
            {starting ? (
              <Loader2
                aria-hidden="true"
                className="animate-spin motion-reduce:animate-none"
              />
            ) : (
              <RotateCcw aria-hidden="true" />
            )}
            Làm lại {part.replace('P', 'Part ')}
          </Button>
        ))}
      </div>

      {mistakes.length === 0 ? (
        <p
          className="rounded-xl border border-dashed p-6 text-center
            text-muted-foreground"
        >
          Chưa có câu sai nào. Tuyệt!
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {mistakes.map((m) => (
            <li
              key={m.id}
              className="flex flex-col gap-2 rounded-xl border bg-card p-4"
            >
              <div
                className="flex justify-between gap-2 text-xs
                  text-muted-foreground"
              >
                <span>{m.part.replace('P', 'Part ')}</span>
                <span>{formatDate(m.answeredAt)}</span>
              </div>
              {m.imageUrl && <QuestionImage url={m.imageUrl} />}
              {m.transcript && <Transcript lines={m.transcript} />}
              {m.passage && (
                <Passage
                  text={m.passage}
                  className="max-h-64 overflow-y-auto text-sm"
                />
              )}
              {m.text && <p className="leading-relaxed">{m.text}</p>}
              <p className="text-sm">
                <span className="text-destructive">
                  Bạn chọn:{' '}
                  {m.response
                    ? `${LETTERS[m.response.choice]}. ${m.options[m.response.choice]}`
                    : 'bỏ trống'}
                </span>
                {' · '}
                <span
                  className="font-medium text-emerald-700 dark:text-emerald-300"
                >
                  Đáp án: {LETTERS[m.answer!]}. {m.options[m.answer!]}
                </span>
              </p>
              {m.explanationVi && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {m.explanationVi}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </>
  )
}
