import { Suspense } from 'react'

import type { Metadata } from 'next'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { appById } from '@/lib/apps'
import { studioOptionsQueryOptions } from '@/lib/queries/studio'
import { getQueryClient } from '@/lib/query-client'

import { StudioConfigurator } from './_components/studio-configurator'

const app = appById('studio')

export const metadata: Metadata = { title: app.name }

export const dynamic = 'force-dynamic'

export default async function StudioPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(studioOptionsQueryOptions())
  return (
    <main
      className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10
        sm:py-14"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium tracking-tight">{app.name}</h1>
        <p className="text-muted-foreground">
          Pick a stack step by step, database first, then generate the project:
          browse every file and download it as a zip.
        </p>
      </div>
      {/* The choices are read from the URL: rendered on the client, space reserved meanwhile */}
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="h-[36rem] w-full max-w-2xl rounded-xl bg-muted/40"
          />
        }
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <StudioConfigurator />
        </HydrationBoundary>
      </Suspense>
    </main>
  )
}
