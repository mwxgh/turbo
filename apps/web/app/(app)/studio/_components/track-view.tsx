'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Check, ChevronRight } from 'lucide-react'

import { cn } from '@repo/ui/lib/utils'

import { trackQueryOptions } from '@/lib/queries/studio'
import { categoryOf, lessonHref } from '@/lib/studio'

import { DoneBar, Empty, PageHeading } from './learn-ui'

/** A track: its lessons in order, each with length, quiz score and done mark. */
export function TrackView({ slug }: { slug: string }) {
  const { data: track } = useQuery(trackQueryOptions(slug))
  if (!track) return <p className="text-muted-foreground">Đang tải…</p>
  const category = categoryOf(track.category)
  const done = track.lessons.filter((l) => l.done).length
  const next = track.lessons.find((l) => !l.done)

  return (
    <>
      <div className="flex flex-col gap-3">
        <Link
          href={`/studio/${category.segment}`}
          className="flex w-fit items-center gap-1.5 rounded-sm text-sm
            text-muted-foreground outline-none hover:text-foreground
            focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {category.label}
        </Link>
        <PageHeading title={track.title}>
          <p>{track.summary}</p>
        </PageHeading>
        <DoneBar
          done={done}
          total={track.lessons.length}
          className="max-w-sm"
        />
        {next && (
          <Link
            href={lessonHref(track.slug, next.slug)}
            className="w-fit text-sm font-medium text-emerald-700
              underline-offset-4 hover:underline dark:text-emerald-300"
          >
            {done ? 'Học tiếp' : 'Bắt đầu'}: {next.title}
          </Link>
        )}
      </div>

      {track.lessons.length ? (
        <ol
          className="flex flex-col divide-y rounded-xl border bg-card shadow-xs"
        >
          {track.lessons.map((lesson, i) => (
            <li key={lesson.id}>
              <Link
                href={lessonHref(track.slug, lesson.slug)}
                className="group flex items-center gap-4 px-5 py-4
                  transition-colors outline-none first:rounded-t-xl
                  last:rounded-b-xl hover:bg-muted/50 focus-visible:ring-3
                  focus-visible:ring-ring/50"
              >
                <span
                  className={cn(
                    `w-6 shrink-0 font-mono text-sm text-muted-foreground
                      tabular-nums`,
                    lesson.done && 'text-foreground',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-medium">{lesson.title}</span>
                  <span className="text-sm text-pretty text-muted-foreground">
                    {lesson.summary}
                  </span>
                  <span
                    className="flex flex-wrap gap-x-3 text-xs
                      text-muted-foreground"
                  >
                    <span className="tabular-nums">{lesson.minutes} phút</span>
                    {lesson.quizTotal !== null && (
                      <span className="tabular-nums">
                        Quiz {lesson.quizScore}/{lesson.quizTotal}
                      </span>
                    )}
                    {lesson.done && (
                      <span className="flex items-center gap-1 text-foreground">
                        <Check aria-hidden className="size-3.5" />
                        Đã xong
                      </span>
                    )}
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
          ))}
        </ol>
      ) : (
        <Empty>Chủ đề này chưa có bài.</Empty>
      )}
    </>
  )
}
