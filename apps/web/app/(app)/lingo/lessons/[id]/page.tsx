import { notFound } from 'next/navigation'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { LessonView } from '@/app/(app)/lingo/lessons/_components/lesson-view'
import { DEFAULT_EXAM } from '@/lib/lingo'
import { lessonQueryOptions } from '@/lib/queries/lingo'
import { getQueryClient } from '@/lib/query-client'

export const dynamic = 'force-dynamic'

export default async function LessonPage({
  params,
}: PageProps<'/lingo/lessons/[id]'>) {
  const { id } = await params
  const queryClient = getQueryClient()
  const lesson = await queryClient
    .fetchQuery(lessonQueryOptions(DEFAULT_EXAM, id))
    .catch(() => null)
  if (!lesson) notFound()
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LessonView exam={DEFAULT_EXAM} id={id} />
      </HydrationBoundary>
    </main>
  )
}
