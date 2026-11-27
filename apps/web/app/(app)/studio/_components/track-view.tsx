'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Check, ChevronRight } from 'pulsoicon-react'

import type { StudioLevel } from '@repo/types'
import { cn } from '@repo/ui/lib/utils'

import { type TrackLesson, trackQueryOptions } from '@/lib/queries/studio'
import { byLevel, categoryOf, lessonHref } from '@/lib/studio'

import {
  DoneBar,
  Empty,
  LEVEL_STYLE,
  LevelBadge,
  PageHeading,
} from './learn-ui'

/** A track: its lessons in a section per level (easiest first), numbered straight through. */
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
        <div className="flex flex-col gap-6">
          {byLevel(track.lessons).map(({ info, items }) => {
            const levelDone = items.filter((l) => l.done).length
            return (
              <section
                key={info.level}
                aria-labelledby={`level-${info.level}`}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h2
                    id={`level-${info.level}`}
                    className={cn(
                      'text-lg font-medium',
                      LEVEL_STYLE[info.level].text,
                    )}
                  >
                    {info.label}
                  </h2>
                  <LevelBadge level={info.level} />
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {levelDone}/{items.length} bài
                  </span>
                </div>
                <ol
                  className={cn(
                    `flex flex-col divide-y rounded-xl border border-l-4 bg-card
                      shadow-xs`,
                    LEVEL_BORDER[info.level],
                  )}
                >
                  {items.map((lesson) => (
                    <LessonRow
                      key={lesson.id}
                      track={track.slug}
                      lesson={lesson}
                      number={track.lessons.indexOf(lesson) + 1}
                    />
                  ))}
                </ol>
              </section>
            )
          })}
        </div>
      ) : (
        <Empty>Chủ đề này chưa có bài.</Empty>
      )}
    </>
  )
}

/** Left edge of each level's list, matching its badge colour. */
const LEVEL_BORDER: Record<StudioLevel, string> = {
  BASIC: 'border-l-emerald-500 dark:border-l-emerald-400',
  INTERMEDIATE: 'border-l-amber-500 dark:border-l-amber-400',
  ADVANCED: 'border-l-rose-500 dark:border-l-rose-400',
}

function LessonRow({
  track,
  lesson,
  number,
}: {
  track: string
  lesson: TrackLesson
  number: number
}) {
  return (
    <li>
      <Link
        href={lessonHref(track, lesson.slug)}
        className="group flex items-center gap-4 px-5 py-4 transition-colors
          outline-none first:rounded-tr-xl last:rounded-br-xl hover:bg-muted/50
          focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span
          className={cn(
            'w-6 shrink-0 font-mono text-sm text-muted-foreground tabular-nums',
            lesson.done && 'text-foreground',
          )}
        >
          {String(number).padStart(2, '0')}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="font-medium">{lesson.title}</span>
          <span className="text-sm text-pretty text-muted-foreground">
            {lesson.summary}
          </span>
          <span className="flex flex-wrap gap-x-3 text-xs text-muted-foreground">
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
          className="size-4 shrink-0 text-muted-foreground transition-transform
            group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </Link>
    </li>
  )
}
