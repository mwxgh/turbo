import { notFound } from 'next/navigation'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { examQueryOptions, testsQueryOptions } from '@/lib/queries/lingo'
import { getQueryClient } from '@/lib/query-client'

import { TEST_LIST_QUERY, TestLibrary } from './_components/test-library'

export const dynamic = 'force-dynamic'

export default async function TestsPage({
  params,
}: PageProps<'/lingo/[exam]/tests'>) {
  const { exam } = await params
  const queryClient = getQueryClient()
  const [spec] = await Promise.all([
    queryClient.fetchQuery(examQueryOptions(exam)).catch(() => null),
    queryClient.prefetchQuery(testsQueryOptions(exam, TEST_LIST_QUERY)),
  ])
  if (!spec) notFound()
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TestLibrary exam={exam} />
      </HydrationBoundary>
    </main>
  )
}
