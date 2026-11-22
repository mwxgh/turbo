import { notFound } from 'next/navigation'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { currentUser } from '@/lib/lingo'
import { dashboardQueryOptions, examQueryOptions } from '@/lib/queries/lingo'
import { getQueryClient } from '@/lib/query-client'

import { ExamDashboard } from './_components/exam-dashboard'

export const dynamic = 'force-dynamic'

export default async function ExamPage({ params }: PageProps<'/lingo/[exam]'>) {
  const { exam } = await params
  const queryClient = getQueryClient()
  const [user, spec] = await Promise.all([
    currentUser(),
    // Unknown or not yet available exam → 404 (the api answers 404)
    queryClient.fetchQuery(examQueryOptions(exam)).catch(() => null),
    queryClient.prefetchQuery(dashboardQueryOptions(exam)),
  ])
  if (!spec) notFound()
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExamDashboard exam={exam} isAdmin={user?.role === 'ADMIN'} />
      </HydrationBoundary>
    </main>
  )
}
