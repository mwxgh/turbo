import { cookies } from 'next/headers'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import type { User } from '@repo/types'

import { apiFetch } from '@/lib/api'
import { APPS } from '@/lib/apps'
import { authCookies } from '@/lib/env'
import { healthQueryOptions } from '@/lib/queries/health'
import { getQueryClient } from '@/lib/query-client'

import { AppCard } from './_components/app-card'
import { HealthCard } from './_components/health-card'

// Always render at request time so the first health status is fresh.
export const dynamic = 'force-dynamic'

async function displayName(): Promise<string | undefined> {
  if (!(await cookies()).has(authCookies.access)) return undefined
  const user = await apiFetch<User>('/auth/me', { cache: 'no-store' }).catch(
    () => null,
  )
  return user?.name ?? user?.username ?? user?.email ?? undefined
}

/** Launcher: one card per app (`lib/apps.ts`), then the system status. */
export default async function Home() {
  const queryClient = getQueryClient()
  // Errors are swallowed: the client retries and shows "offline"
  const [name] = await Promise.all([
    displayName(),
    queryClient.prefetchQuery(healthQueryOptions()),
  ])

  return (
    <main
      className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-10
        sm:py-14"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">
          Choose an app
        </h1>
        <p className="text-muted-foreground">
          {name ? `Signed in as ${name}. ` : ''}Every app here uses your account
          and the same API.
        </p>
      </div>

      <section aria-labelledby="apps-heading" className="flex flex-col gap-4">
        <h2 id="apps-heading" className="sr-only">
          Apps
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {APPS.map((app) => (
            <li key={app.id}>
              <AppCard app={app} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="status-heading" className="flex flex-col gap-3">
        <h2
          id="status-heading"
          className="text-sm font-medium text-muted-foreground"
        >
          System status
        </h2>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HealthCard />
        </HydrationBoundary>
      </section>
    </main>
  )
}
