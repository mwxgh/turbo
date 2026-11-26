'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronRight } from 'pulsoicon-react'

import { cn } from '@repo/ui/lib/utils'

import { percent } from '@/lib/lingo'
import { type LessonSummary, lessonsQueryOptions } from '@/lib/queries/lingo'

/** Quiet status of a lesson: mastered, in progress (accuracy), or not practised yet. */
function LessonStatus({ lesson }: { lesson: LessonSummary }) {
  const p = lesson.progress
  if (p?.done)
    return (
      <span className="flex items-center gap-1 text-foreground">
        <Check aria-hidden className="size-3.5" />
        Đã vững
      </span>
    )
  if (p && p.answered > 0)
    return (
      <span className="tabular-nums">
        đúng {percent(p.accuracy)} · {p.answered} câu
      </span>
    )
  return <span>{lesson.practice ? 'Chưa luyện' : 'Bài đọc'}</span>
}

/** The course: modules in study order, each lesson with its length and progress. */
export function CourseView({ exam }: { exam: string }) {
  const { data: course } = useQuery(lessonsQueryOptions(exam))
  if (!course) return <p className="text-muted-foreground">Đang tải bài học…</p>

  const lessons = course.modules.flatMap((m) => m.lessons)
  const mastered = lessons.filter((l) => l.progress?.done).length
  const practised = lessons.filter((l) => l.practice).length
  let number = 0

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium tracking-tight">Bài học TOEIC</h1>
        <p className="text-muted-foreground">
          {lessons.length} bài theo {course.modules.length} chương. Mỗi bài có
          lý thuyết, ví dụ và phần luyện ngay đúng dạng câu đó.
        </p>
        <p className="text-sm text-muted-foreground tabular-nums">
          Đã vững {mastered}/{practised} bài có phần luyện
        </p>
      </div>

      {course.modules.map((module) => (
        <section
          key={module.id}
          aria-labelledby={`module-${module.id}`}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <h2 id={`module-${module.id}`} className="text-lg font-medium">
              {module.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {module.description}
            </p>
          </div>
          <ol
            className="flex flex-col divide-y rounded-xl border bg-card
              shadow-xs"
          >
            {module.lessons.map((lesson) => {
              number++
              return (
                <li key={lesson.id}>
                  <Link
                    href={`/lingo/lessons/${lesson.id}`}
                    className="group flex items-center gap-4 px-5 py-4
                      transition-colors outline-none first:rounded-t-xl
                      last:rounded-b-xl hover:bg-muted/50 focus-visible:ring-3
                      focus-visible:ring-ring/50"
                  >
                    <span
                      className={cn(
                        `w-6 shrink-0 font-mono text-sm text-muted-foreground
                        tabular-nums`,
                        lesson.progress?.done && 'text-foreground',
                      )}
                    >
                      {String(number).padStart(2, '0')}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="font-medium">{lesson.title}</span>
                      <span
                        className="text-sm text-pretty text-muted-foreground"
                      >
                        {lesson.summary}
                      </span>
                      <span
                        className="flex flex-wrap gap-x-3 text-xs
                          text-muted-foreground"
                      >
                        <span className="tabular-nums">
                          {lesson.minutes} phút
                        </span>
                        <span>{lesson.parts.join(', ')}</span>
                        <LessonStatus lesson={lesson} />
                      </span>
                    </span>
                    <ChevronRight
                      aria-hidden
                      className="size-4 shrink-0 text-muted-foreground
                        transition-transform group-hover:translate-x-0.5
                        motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </>
  )
}
