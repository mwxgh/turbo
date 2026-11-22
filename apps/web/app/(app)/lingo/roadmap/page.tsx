import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { DEFAULT_EXAM } from '@/lib/lingo'
import { dashboardQueryOptions, roadmapQueryOptions } from '@/lib/queries/lingo'
import { getQueryClient } from '@/lib/query-client'

import { RoadmapView } from './_components/roadmap-view'

export const dynamic = 'force-dynamic'

export default async function RoadmapPage() {
  const queryClient = getQueryClient()
  await Promise.all([
    queryClient.prefetchQuery(roadmapQueryOptions(DEFAULT_EXAM)),
    queryClient.prefetchQuery(dashboardQueryOptions(DEFAULT_EXAM)),
  ])
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RoadmapView exam={DEFAULT_EXAM} />
      </HydrationBoundary>
    </main>
  )
}
