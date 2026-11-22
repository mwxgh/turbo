import { cookies } from 'next/headers'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import type { User } from '@repo/types'

import { GrowingTree } from '@/components/growing-tree'
import { apiFetch } from '@/lib/api'
import { launcherApps } from '@/lib/apps'
import { authCookies } from '@/lib/env'
import { healthQueryOptions } from '@/lib/queries/health'
import { getQueryClient } from '@/lib/query-client'

import { AppCard } from './_components/app-card'
import { HealthCard } from './_components/health-card'

// Always render at request time so the first health status is fresh.
export const dynamic = 'force-dynamic'

async function signedInUser(): Promise<User | null> {
  if (!(await cookies()).has(authCookies.access)) return null
  return apiFetch<User>('/auth/me', { cache: 'no-store' }).catch(() => null)
}

/** Launcher: one card per app (`lib/apps.ts`) beside the daily-growth tree, then the system status. */
export default async function Home() {
  const queryClient = getQueryClient()
  // Errors are swallowed: the client retries and shows "offline"
  const [user] = await Promise.all([
    signedInUser(),
    queryClient.prefetchQuery(healthQueryOptions()),
  ])
  const apps = launcherApps(user?.role === 'ADMIN')

  return (
    <main
      className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-10
        sm:py-14"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium tracking-tight text-balance">
          Where to grow today
        </h1>
        <p className="text-muted-foreground">
          1% better every day. Pick an app, or keep this page open and watch the
          tree grow.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section aria-labelledby="apps-heading" className="flex flex-col">
          <h2 id="apps-heading" className="sr-only">
            Apps
          </h2>
          <ul className="grid h-full gap-4 sm:grid-cols-2">
            {apps.map((app) => (
              <li key={app.id}>
                <AppCard app={app} />
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="growth-heading"
          className="flex flex-col gap-2 rounded-xl border bg-card p-5
            shadow-xs"
        >
          <h2 id="growth-heading" className="text-sm font-medium">
            Daily watering
          </h2>
          <GrowingTree />
        </section>
      </div>

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
