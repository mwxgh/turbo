import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { DEFAULT_EXAM } from '@/lib/lingo'
import { lessonsQueryOptions } from '@/lib/queries/lingo'
import { getQueryClient } from '@/lib/query-client'

import { CourseView } from './_components/course-view'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Bài học' }

export default async function LessonsPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(lessonsQueryOptions(DEFAULT_EXAM))
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CourseView exam={DEFAULT_EXAM} />
      </HydrationBoundary>
    </main>
  )
}
