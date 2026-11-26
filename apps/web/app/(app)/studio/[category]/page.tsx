import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { CategoryView } from '@/app/(app)/studio/_components/category-view'
import { LearnPage } from '@/app/(app)/studio/_components/learn-ui'
import { tracksQueryOptions } from '@/lib/queries/studio'
import { getQueryClient } from '@/lib/query-client'
import { categoryBySegment } from '@/lib/studio'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: PageProps<'/studio/[category]'>): Promise<Metadata> {
  const category = categoryBySegment((await params).category)
  return { title: category?.label ?? 'Studio' }
}

/** /studio/languages, /studio/frameworks …: the tracks of one group. */
export default async function CategoryPage({
  params,
}: PageProps<'/studio/[category]'>) {
  const category = categoryBySegment((await params).category)
  if (!category) notFound()
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(tracksQueryOptions())
  return (
    <LearnPage>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryView segment={category.segment} />
      </HydrationBoundary>
    </LearnPage>
  )
}
