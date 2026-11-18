import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { Badge } from '@repo/ui/components/badge'

import type { AppEntry } from '@/lib/apps'

const frame = `group relative flex h-full flex-col gap-4 rounded-xl border bg-card p-5
  text-card-foreground shadow-xs transition-[border-color,box-shadow]`

/**
 * Launcher card. A ready app is one link (the whole card is the target, one tab stop); an app
 * that is not available yet stays visible with the reason, and is not focusable.
 */
export function AppCard({ app }: { app: AppEntry }) {
  const Icon = app.icon
  const body = (
    <>
      <span
        className={`flex size-11 items-center justify-center rounded-lg
          ${app.tone}`}
      >
        <Icon aria-hidden="true" className="size-5.5" />
      </span>
      <span className="flex flex-col gap-1.5">
        <span className="flex items-center gap-2">
          <span className="text-base font-semibold">{app.name}</span>
          {app.status === 'soon' && (
            <Badge variant="secondary">Coming soon</Badge>
          )}
        </span>
        <span
          className="text-sm leading-relaxed text-pretty text-muted-foreground"
        >
          {app.description}
        </span>
      </span>
      <span
        className={`mt-auto flex items-center gap-1 text-sm font-medium ${
          app.status === 'ready' ? 'text-foreground' : 'text-muted-foreground'
          }`}
      >
        {app.status === 'ready' ? (
          <>
            Open
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5
                motion-reduce:transition-none"
            />
          </>
        ) : (
          'In development'
        )}
      </span>
    </>
  )

  if (app.status === 'soon')
    return (
      <div aria-disabled="true" className={`${frame} border-dashed`}>
        {body}
      </div>
    )

  return (
    <Link
      href={app.href}
      className={`${frame} outline-none hover:border-foreground/20
        hover:shadow-sm focus-visible:border-ring focus-visible:ring-3
        focus-visible:ring-ring/50`}
    >
      {body}
    </Link>
  )
}
