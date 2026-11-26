'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'pulsoicon-react'

import { LessonEditor } from '@/app/(app)/teach/_components/lesson-editor'
import { TeachHeader } from '@/app/(app)/teach/_components/teach-header'
import { DEFAULT_EXAM } from '@/lib/lingo'
import { adminLessonQueryOptions } from '@/lib/queries/lingo'

/** Loads the lesson, then its editor (keyed by `updatedAt` so a save refreshes the form). */
export function EditLesson({ id }: { id: string }) {
  const { data: lesson, isError } = useQuery(adminLessonQueryOptions(id))
  return (
    <>
      <Link
        href="/teach/lessons"
        className="flex w-fit items-center gap-1.5 rounded-sm text-sm
          text-muted-foreground outline-none hover:text-foreground
          focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Bài học
      </Link>
      {isError ? (
        <p className="text-muted-foreground">Không tìm thấy bài.</p>
      ) : !lesson ? (
        <p className="text-muted-foreground">Đang tải bài…</p>
      ) : (
        <>
          <TeachHeader
            title={lesson.title}
            description={`${lesson.module.title} · /lingo/lessons/${lesson.slug}`}
          />
          <LessonEditor
            key={String(lesson.updatedAt)}
            exam={DEFAULT_EXAM}
            lesson={lesson}
          />
        </>
      )}
    </>
  )
}
