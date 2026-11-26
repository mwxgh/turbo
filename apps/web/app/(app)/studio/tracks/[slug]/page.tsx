import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { LearnPage } from '@/app/(app)/studio/_components/learn-ui'
import { TrackView } from '@/app/(app)/studio/_components/track-view'
import { trackQueryOptions } from '@/lib/queries/studio'
import { getQueryClient } from '@/lib/query-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: PageProps<'/studio/tracks/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const track = await getQueryClient()
    .fetchQuery(trackQueryOptions(slug))
    .catch(() => null)
  return { title: track?.title ?? 'Studio' }
}

export default async function TrackPage({
  params,
}: PageProps<'/studio/tracks/[slug]'>) {
  const { slug } = await params
  const queryClient = getQueryClient()
  const track = await queryClient
    .fetchQuery(trackQueryOptions(slug))
    .catch(() => null)
  if (!track) notFound()
  return (
    <LearnPage className="max-w-3xl">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TrackView slug={slug} />
      </HydrationBoundary>
    </LearnPage>
  )
}
