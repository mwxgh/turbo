import Link from 'next/link'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { buttonVariants } from '@repo/ui/components/button'
import {
  loadListTableState,
  toListQuery,
} from '@repo/ui/components/data-table/server'

import { hellosListQueryOptions } from '../../lib/queries/hellos'
import { getQueryClient } from '../../lib/query-client'
import { HellosView } from './hellos-view'

export const dynamic = 'force-dynamic'

export default async function HellosPage({
  searchParams,
}: PageProps<'/hellos'>) {
  // Prefetch the page the URL asks for: the HTML already contains it, then the
  // table takes over with the same cache entry (no loading flash).
  const query = toListQuery(await loadListTableState(searchParams))
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(hellosListQueryOptions(query))

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
