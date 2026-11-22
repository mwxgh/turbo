'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Loader2, Play } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'

import { percent, takeHref } from '@/lib/lingo'
import { startAttempt } from '@/lib/lingo-actions'
import { type Lesson, lessonQueryOptions } from '@/lib/queries/lingo'

const PRACTICE_COUNT = 10

/** Practice block: the skill's progress and a 10-question quick practice of it. */
function Practice({ exam, lesson }: { exam: string; lesson: Lesson }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  if (!lesson.practice) return null
  const { part, skillTag } = lesson.practice
  const p = lesson.progress

  async function start() {
    setPending(true)
    try {
      const res = await startAttempt({
        exam,
        part,
        skillTag,
        count: PRACTICE_COUNT,
      })
      if (res.data) router.push(takeHref(res.data.id))
      else
        toast.error('Không bắt đầu được bài', {
          description: res.errors?.join(' · '),
        })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setPending(false)
    }
  }

  return (
    <section
      aria-labelledby="practice-heading"
      className="flex flex-wrap items-center gap-4 rounded-xl border bg-card p-5
        shadow-xs"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h2 id="practice-heading" className="font-medium">
          Luyện ngay dạng câu này
        </h2>
        <p className="text-sm text-muted-foreground tabular-nums">
          {p?.done
            ? `Đã vững: đúng ${percent(p.accuracy)} trên ${p.answered} câu gần nhất`
            : p && p.answered > 0
              ? `Đúng ${percent(p.accuracy)} trên ${p.answered} câu gần nhất`
              : `${PRACTICE_COUNT} câu ${part}, chấm và giải thích ngay khi nộp`}
        </p>
      </div>
      <Button disabled={pending} onClick={() => void start()}>
        {pending ? (
          <Loader2
            aria-hidden
            className="animate-spin motion-reduce:animate-none"
          />
        ) : (
          <Play aria-hidden />
        )}
        Luyện {PRACTICE_COUNT} câu
      </Button>
    </section>
  )
}

/** One lesson: sections with rules and worked examples, key points, practice, previous / next. */
export function LessonView({ exam, id }: { exam: string; id: string }) {
  const { data: lesson } = useQuery(lessonQueryOptions(exam, id))
  if (!lesson) return <p className="text-muted-foreground">Đang tải bài…</p>

  return (
    <>
      <div className="flex flex-col gap-3">
        <Link
          href="/lingo/lessons"
          className="flex w-fit items-center gap-1.5 rounded-sm text-sm
            text-muted-foreground outline-none hover:text-foreground
            focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Bài học
        </Link>
        <h1 className="text-3xl font-medium tracking-tight text-balance">
          {lesson.title}
        </h1>
        <p className="text-muted-foreground">{lesson.summary}</p>
        <p className="flex gap-3 text-sm text-muted-foreground">
          <span className="tabular-nums">{lesson.minutes} phút</span>
          <span>{lesson.parts.join(', ')}</span>
        </p>
      </div>

      {lesson.sections.map((section, i) => (
        <section
          key={section.heading}
          aria-labelledby={`section-${i}`}
          className="flex flex-col gap-3"
        >
          <h2 id={`section-${i}`} className="text-lg font-medium">
            {section.heading}
          </h2>
          {section.paragraphs.map((text) => (
            <p key={text} className="leading-relaxed text-pretty">
              {text}
            </p>
          ))}
          {section.bullets && (
            <ul className="flex list-disc flex-col gap-1.5 pl-5 leading-relaxed">
              {section.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {section.examples && (
            <ul
              className="flex flex-col divide-y rounded-xl border bg-card
                shadow-xs"
            >
              {section.examples.map((ex) => (
                <li key={ex.en} className="flex flex-col gap-1.5 p-4">
                  <span className="leading-relaxed font-medium">{ex.en}</span>
                  <span className="text-sm text-muted-foreground">{ex.vi}</span>
                  {ex.note && (
                    <span className="text-sm leading-relaxed">
                      <span className="text-muted-foreground">Vì sao: </span>
                      {ex.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section
        aria-labelledby="key-points-heading"
        className="flex flex-col gap-2 rounded-xl border bg-muted/40 p-5"
      >
        <h2 id="key-points-heading" className="font-medium">
          Nhớ khi làm bài
        </h2>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          {lesson.keyPoints.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </section>

      <Practice exam={exam} lesson={lesson} />

      <nav
        aria-label="Bài trước và bài sau"
        className="flex flex-wrap justify-between gap-4 border-t pt-6 text-sm"
      >
        {lesson.previous ? (
          <Link
            href={`/lingo/lessons/${lesson.previous.id}`}
            className="flex items-center gap-1.5 rounded-sm
              text-muted-foreground outline-none hover:text-foreground
              focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {lesson.previous.title}
          </Link>
        ) : (
          <span />
        )}
        {lesson.next && (
          <Link
            href={`/lingo/lessons/${lesson.next.id}`}
            className="flex items-center gap-1.5 rounded-sm text-right
              outline-none hover:text-foreground focus-visible:ring-3
              focus-visible:ring-ring/50"
          >
            {lesson.next.title}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        )}
      </nav>
    </>
  )
}
