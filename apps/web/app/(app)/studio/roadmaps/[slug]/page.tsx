import { notFound } from 'next/navigation'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { LearnPage } from '@/app/(app)/studio/_components/learn-ui'
import { RoadmapView } from '@/app/(app)/studio/_components/roadmap-view'
import { roadmapQueryOptions } from '@/lib/queries/studio'
import { getQueryClient } from '@/lib/query-client'

export const dynamic = 'force-dynamic'

export default async function RoadmapPage({
  params,
}: PageProps<'/studio/roadmaps/[slug]'>) {
  const { slug } = await params
  const queryClient = getQueryClient()
  const roadmap = await queryClient
    .fetchQuery(roadmapQueryOptions(slug))
    .catch(() => null)
  if (!roadmap) notFound()
  return (
    <LearnPage className="max-w-3xl">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RoadmapView slug={slug} />
      </HydrationBoundary>
    </LearnPage>
  )
}
