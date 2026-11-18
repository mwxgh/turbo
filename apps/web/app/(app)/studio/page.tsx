import { Suspense } from 'react'

import type { Metadata } from 'next'

import { appById } from '@/lib/apps'

import { StudioConfigurator } from './_components/studio-configurator'

const app = appById('studio')

export const metadata: Metadata = { title: app.name }

export default function StudioPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-bold tracking-tight">{app.name}</h1>
        <p className="text-muted-foreground">
          Pick a stack, database first, and see every file of the monorepo it
          generates.
        </p>
      </div>
      {/* The choices are read from the URL: rendered on the client, space reserved meanwhile */}
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="h-[36rem] animate-pulse rounded-xl bg-muted
              motion-reduce:animate-none"
          />
        }
      >
        <StudioConfigurator />
      </Suspense>
    </main>
  )
}
