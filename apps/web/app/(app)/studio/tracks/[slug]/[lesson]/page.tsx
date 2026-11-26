import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { LearnPage } from '@/app/(app)/studio/_components/learn-ui'
import { LessonView } from '@/app/(app)/studio/_components/lesson-view'
import { lessonQueryOptions } from '@/lib/queries/studio'
import { getQueryClient } from '@/lib/query-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: PageProps<'/studio/tracks/[slug]/[lesson]'>): Promise<Metadata> {
  const { slug, lesson } = await params
  const data = await getQueryClient()
    .fetchQuery(lessonQueryOptions(slug, lesson))
    .catch(() => null)
  return { title: data ? `${data.title} · ${data.track.title}` : 'Studio' }
}

export default async function LessonPage({
  params,
}: PageProps<'/studio/tracks/[slug]/[lesson]'>) {
  const { slug, lesson } = await params
  const queryClient = getQueryClient()
  const data = await queryClient
    .fetchQuery(lessonQueryOptions(slug, lesson))
    .catch(() => null)
  if (!data) notFound()
  return (
    <LearnPage className="max-w-3xl">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LessonView track={slug} lesson={lesson} />
      </HydrationBoundary>
    </LearnPage>
  )
}
