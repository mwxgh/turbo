import Link from 'next/link'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { buttonVariants } from '@repo/ui/components/button'

import { healthQueryOptions } from '../lib/queries/health'
import { getQueryClient } from '../lib/query-client'
import { Chat } from './chat'
import { HealthCard } from './health-card'

// Always render at request time so the first health status is fresh.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const queryClient = getQueryClient()
  // Errors are swallowed: the client retries and shows "offline"
  await queryClient.prefetchQuery(healthQueryOptions())

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Turborepo base</h1>
        <Link href="/hellos" className={buttonVariants({ variant: 'outline' })}>
          Hellos CRUD →
        </Link>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <HealthCard />
      </HydrationBoundary>

      <Chat />
    </main>
  )
}
