import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { attemptsQueryOptions } from '@/lib/queries/lingo'
import { getQueryClient } from '@/lib/query-client'

import { AttemptHistory, HISTORY_QUERY } from './_components/attempt-history'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(attemptsQueryOptions(HISTORY_QUERY))
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AttemptHistory />
      </HydrationBoundary>
    </main>
  )
}
