import Link from 'next/link'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { buttonVariants } from '@repo/ui/components/button'

import { hellosListQueryOptions } from '../../lib/queries/hellos'
import { getQueryClient } from '../../lib/query-client'
import { HellosView } from './hellos-view'

export const dynamic = 'force-dynamic'

export default async function HellosPage() {
  // Prefetch on the server: the HTML already contains the list, then the
  // browser takes over with the same cache entry (no loading flash).
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(hellosListQueryOptions())

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12">
      <Link
        href="/"
        className={buttonVariants({
          variant: 'link',
          className: 'self-start px-0',
        })}
      >
        ← Home
      </Link>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HellosView />
      </HydrationBoundary>
    </main>
  )
}
