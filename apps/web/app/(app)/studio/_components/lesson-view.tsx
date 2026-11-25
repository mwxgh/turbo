'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Check, CircleCheck } from 'lucide-react'

import { Button } from '@repo/ui/components/button'

import { Markdown } from '@/components/markdown'
import { withToast } from '@/lib/action-toast'
import { lessonQueryOptions, studioKeys } from '@/lib/queries/studio'
import { lessonHref, trackHref } from '@/lib/studio'
import { setLessonDone } from '@/lib/studio-actions'

import { LessonQuiz } from './lesson-quiz'

/** One lesson: Markdown content, quiz, the done mark, previous / next lesson. */
export function LessonView({
  track,
  lesson: slug,
}: {
  track: string
  lesson: string
}) {
  const queryClient = useQueryClient()
  const { data: lesson } = useQuery(lessonQueryOptions(track, slug))
  const [pending, setPending] = useState(false)
  if (!lesson) return <p className="text-muted-foreground">Đang tải bài…</p>

  async function toggleDone(done: boolean) {
    setPending(true)
    const res = await withToast(setLessonDone(lesson!.id, done), {
      success: done ? 'Đã đánh dấu học xong' : 'Đã bỏ đánh dấu',
      error: 'Không lưu được',
    })
    if (!res.errors)
      await queryClient.invalidateQueries({ queryKey: studioKeys.learn })
    setPending(false)
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <Link
          href={trackHref(lesson.track.slug)}
          className="flex w-fit items-center gap-1.5 rounded-sm text-sm
            text-muted-foreground outline-none hover:text-foreground
            focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {lesson.track.title}
        </Link>
        <h1 className="text-3xl font-medium tracking-tight text-balance">
          {lesson.title}
        </h1>
        {lesson.summary && (
          <p className="text-muted-foreground">{lesson.summary}</p>
        )}
        <p
          className="flex flex-wrap items-center gap-3 text-sm
            text-muted-foreground"
        >
          <span className="tabular-nums">{lesson.minutes} phút</span>
          {lesson.done && (
            <span
              className="flex items-center gap-1 text-emerald-700
                dark:text-emerald-300"
            >
              <Check aria-hidden className="size-4" />
              Đã học xong
            </span>
          )}
        </p>
      </div>

      <Markdown>{lesson.content}</Markdown>

      <LessonQuiz key={lesson.id} lesson={lesson} />

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant={lesson.done ? 'outline' : 'default'}
          disabled={pending}
          onClick={() => void toggleDone(!lesson.done)}
        >
          <CircleCheck aria-hidden />
          {lesson.done ? 'Bỏ đánh dấu đã học' : 'Đánh dấu đã học xong'}
        </Button>
      </div>

      <nav
        aria-label="Bài trước và bài sau"
        className="flex flex-wrap justify-between gap-4 border-t pt-6 text-sm"
      >
        {lesson.previous ? (
          <Link
            href={lessonHref(lesson.track.slug, lesson.previous.slug)}
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
            href={lessonHref(lesson.track.slug, lesson.next.slug)}
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
