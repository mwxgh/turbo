import Link from 'next/link'

import { Check, ChevronRight } from 'lucide-react'

import { Progress } from '@repo/ui/components/progress'
import { cn } from '@repo/ui/lib/utils'

import type { TrackSummary } from '@/lib/queries/studio'
import { donePercent, trackHref } from '@/lib/studio'

/** Page frame shared by the learning pages. */
export function LearnPage({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <main
      className={cn(
        'mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:py-10',
        className,
      )}
    >
      {children}
    </main>
  )
}

export function PageHeading({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-medium tracking-tight text-balance">
        {title}
      </h1>
      {children && (
        <div className="text-pretty text-muted-foreground">{children}</div>
      )}
    </div>
  )
}

/** "3/8 bài" with a thin bar; reads as "Hoàn thành 37%" to screen readers. */
export function DoneBar({
  done,
  total,
  className,
}: {
  done: number
  total: number
  className?: string
}) {
  const percent = donePercent(done, total)
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Progress
        value={percent}
        aria-label={`Hoàn thành ${percent}%`}
        className="flex-1"
      />
      <span className="text-xs text-muted-foreground tabular-nums">
        {done}/{total} bài
      </span>
    </div>
  )
}

/** One track as a card: title, summary, progress. */
export function TrackCard({ track }: { track: TrackSummary }) {
  const finished = track.lessons > 0 && track.done === track.lessons
  return (
    <Link
      href={trackHref(track.slug)}
      className="group flex flex-col gap-3 rounded-xl border bg-card p-5
        shadow-xs transition-colors outline-none hover:bg-muted/40
        focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span className="flex items-center gap-2 font-medium">
        {track.title}
        {finished && (
          <Check
            aria-label="Đã học xong"
            className="size-4 text-emerald-600 dark:text-emerald-400"
          />
        )}
        <ChevronRight
          aria-hidden
          className="ml-auto size-4 text-muted-foreground transition-transform
            group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </span>
      <span className="text-sm text-pretty text-muted-foreground">
        {track.summary}
      </span>
      <DoneBar done={track.done} total={track.lessons} className="mt-auto" />
    </Link>
  )
}

export function TrackGrid({ tracks }: { tracks: TrackSummary[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tracks.map((track) => (
        <li key={track.id} className="flex [&>a]:flex-1">
          <TrackCard track={track} />
        </li>
      ))}
    </ul>
  )
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="rounded-xl border border-dashed p-8 text-center text-sm
        text-muted-foreground"
    >
      {children}
    </p>
  )
}
