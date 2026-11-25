import type { Metadata } from 'next'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { LearnPage } from '@/app/(app)/studio/_components/learn-ui'
import { RoadmapList } from '@/app/(app)/studio/_components/roadmap-view'
import { roadmapsQueryOptions } from '@/lib/queries/studio'
import { getQueryClient } from '@/lib/query-client'

export const metadata: Metadata = { title: 'Lộ trình' }

export const dynamic = 'force-dynamic'

export default async function RoadmapsPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(roadmapsQueryOptions())
  return (
    <LearnPage>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RoadmapList />
      </HydrationBoundary>
    </LearnPage>
  )
}
