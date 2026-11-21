import { notFound } from 'next/navigation'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { testQueryOptions } from '@/lib/queries/lingo'
import { getQueryClient } from '@/lib/query-client'

import { TestOverview } from './_components/test-overview'

export const dynamic = 'force-dynamic'

export default async function TestPage({
  params,
}: PageProps<'/lingo/tests/[id]'>) {
  const { id } = await params
  const queryClient = getQueryClient()
  const test = await queryClient
    .fetchQuery(testQueryOptions(id))
    .catch(() => null)
  if (!test) notFound()
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TestOverview id={id} />
      </HydrationBoundary>
    </main>
  )
}
