import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { decksQueryOptions, reviewQueryOptions } from '@/lib/queries/lingo'
import { getQueryClient } from '@/lib/query-client'

import { CardSearch } from './_components/card-search'
import { ReviewSession } from './_components/review-session'

export const dynamic = 'force-dynamic'

export default async function ReviewPage({
  searchParams,
}: PageProps<'/lingo/review'>) {
  const raw = (await searchParams).exam
  const exam = typeof raw === 'string' && raw ? raw : undefined
  const queryClient = getQueryClient()
  await Promise.all([
    queryClient.prefetchQuery(reviewQueryOptions(exam)),
    queryClient.prefetchQuery(decksQueryOptions(exam)),
  ])
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CardSearch exam={exam} />
        <ReviewSession exam={exam} />
      </HydrationBoundary>
    </main>
  )
}
