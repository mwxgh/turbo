import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { mistakesQueryOptions } from '@/lib/queries/lingo'
import { getQueryClient } from '@/lib/query-client'

import { MistakesList } from './_components/mistakes-list'

export const dynamic = 'force-dynamic'

export default async function MistakesPage({
  params,
}: PageProps<'/lingo/[exam]/mistakes'>) {
  const { exam } = await params
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(mistakesQueryOptions(exam))
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MistakesList exam={exam} />
      </HydrationBoundary>
    </main>
  )
}
