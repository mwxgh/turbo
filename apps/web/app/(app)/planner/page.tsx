import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { createLoader } from 'nuqs/server'

import { normalizeDay, plannerParsers, plannerRange } from '@/lib/planner'
import { plannerTasksQueryOptions } from '@/lib/queries/planner'
import { getQueryClient } from '@/lib/query-client'

import { PlannerView } from './_components/planner-view'

export const dynamic = 'force-dynamic'

const loadPlannerState = createLoader(plannerParsers)

/** Day timeline, month calendar and kanban board over the same tasks (one month grid per load). */
export default async function PlannerPage({
  searchParams,
}: PageProps<'/planner'>) {
  const { date } = await loadPlannerState(searchParams)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    plannerTasksQueryOptions(plannerRange(normalizeDay(date))),
  )

  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:py-8"
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlannerView />
      </HydrationBoundary>
    </main>
  )
}
