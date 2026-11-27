import Link from 'next/link'

import type { StudioLevel } from '@repo/types'
import { Progress } from '@repo/ui/components/progress'
import { cn } from '@repo/ui/lib/utils'

import { Check, ChevronRight } from '@/components/icons'
import type { TrackSummary } from '@/lib/queries/studio'
import { LEVELS, donePercent, levelOf, trackHref } from '@/lib/studio'

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

/** Colour of each level, easy → hard: green, amber, rose. */
export const LEVEL_STYLE: Record<
  StudioLevel,
  { badge: string; bar: string; text: string }
> = {
  BASIC: {
    badge: `border-emerald-600/30 bg-emerald-500/10 text-emerald-700
      dark:border-emerald-400/30 dark:text-emerald-300`,
    bar: 'bg-emerald-500 dark:bg-emerald-400',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  INTERMEDIATE: {
    badge: `border-amber-600/30 bg-amber-500/10 text-amber-700
      dark:border-amber-400/30 dark:text-amber-300`,
    bar: 'bg-amber-500 dark:bg-amber-400',
    text: 'text-amber-700 dark:text-amber-300',
  },
  ADVANCED: {
    badge: `border-rose-600/30 bg-rose-500/10 text-rose-700
      dark:border-rose-400/30 dark:text-rose-300`,
    bar: 'bg-rose-500 dark:bg-rose-400',
    text: 'text-rose-700 dark:text-rose-300',
  },
}

/** "Cơ bản ▮▯▯": the level name with as many filled bars as its difficulty. */
export function LevelBadge({
  level,
  className,
}: {
  level: StudioLevel
  className?: string
}) {
  const info = levelOf(level)
  const style = LEVEL_STYLE[level]
  return (
    <span
      className={cn(
        `inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2
        py-0.5 text-xs font-medium`,
        style.badge,
        className,
      )}
    >
      {info.label}
      <span aria-hidden className="flex items-end gap-0.5">
        {LEVELS.map((step) => (
          <span
            key={step.level}
            className={cn(
              'w-1 rounded-sm',
              step.rank === 1 ? 'h-1.5' : step.rank === 2 ? 'h-2' : 'h-2.5',
              step.rank <= info.rank ? style.bar : 'bg-current opacity-20',
            )}
          />
        ))}
      </span>
    </span>
  )
}

/** One track as a card: title, summary, then a progress row per level, easiest first. */
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
      {track.levels.length > 1 ? (
        <ol className="mt-auto flex flex-col gap-2">
          {track.levels.map((level) => (
            <li key={level.level} className="flex items-center gap-3">
              <LevelBadge
                level={level.level}
                className="w-24 justify-between"
              />
              <DoneBar
                done={level.done}
                total={level.lessons}
                className="flex-1"
              />
            </li>
          ))}
        </ol>
      ) : (
        <DoneBar done={track.done} total={track.lessons} className="mt-auto" />
      )}
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
