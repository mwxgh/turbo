import { redirect } from 'next/navigation'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import {
  gardenQueryOptions,
  overviewQueryOptions,
  roadmapsQueryOptions,
  tracksQueryOptions,
} from '@/lib/queries/studio'
import { getQueryClient } from '@/lib/query-client'

import { LearnPage } from './_components/learn-ui'
import { OverviewView } from './_components/overview-view'

export const dynamic = 'force-dynamic'

/** Query keys of the project generator, which used to live at /studio. */
const GENERATOR_KEYS = [
  'name',
  'repo',
  'database',
  'backend',
  'orm',
  'frontend',
]

export default async function StudioPage({
  searchParams,
}: PageProps<'/studio'>) {
  const params = await searchParams
  // Old shared links of the generator keep working
  if (GENERATOR_KEYS.some((key) => key in params)) {
    const query = new URLSearchParams(
      Object.entries(params).flatMap(([key, value]) =>
        [value ?? []].flat().map((v) => [key, v]),
      ),
    )
    redirect(`/studio/generator?${query}`)
  }

  const queryClient = getQueryClient()
  await Promise.all([
    queryClient.prefetchQuery(overviewQueryOptions()),
    queryClient.prefetchQuery(gardenQueryOptions()),
    queryClient.prefetchQuery(tracksQueryOptions()),
    queryClient.prefetchQuery(roadmapsQueryOptions()),
  ])
  return (
    <LearnPage>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <OverviewView />
      </HydrationBoundary>
    </LearnPage>
  )
}
