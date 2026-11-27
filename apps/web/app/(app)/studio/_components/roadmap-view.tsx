'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  Circle,
  CircleCheck,
  CircleDot,
  type PulsoIcon,
} from 'pulsoicon-react'

import { cn } from '@repo/ui/lib/utils'

import {
  type LessonState,
  type RoadmapStep,
  roadmapQueryOptions,
  roadmapsQueryOptions,
} from '@/lib/queries/studio'
import { categoryOf, lessonHref, trackHref } from '@/lib/studio'

import { DoneBar, Empty, PageHeading } from './learn-ui'

export function RoadmapList() {
  const { data: roadmaps } = useQuery(roadmapsQueryOptions())
  return (
    <>
      <PageHeading title="Lộ trình">
        <p>
          Các bước theo thứ tự, mỗi bước là một chủ đề. Đi hết một lộ trình là
          có đủ nền để làm dự án thật.
        </p>
      </PageHeading>
      {!roadmaps ? (
        <p className="text-muted-foreground">Đang tải…</p>
      ) : roadmaps.length ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {roadmaps.map((roadmap) => (
            <li key={roadmap.slug} className="flex [&>a]:flex-1">
              <Link
                href={`/studio/roadmaps/${roadmap.slug}`}
                className="flex flex-col gap-3 rounded-xl border bg-card p-5
                  shadow-xs transition-colors outline-none hover:bg-muted/40
                  focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="text-lg font-medium">{roadmap.title}</span>
                <span className="text-sm text-pretty text-muted-foreground">
                  {roadmap.summary}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {roadmap.steps} bước · {roadmap.lessons} bài
                </span>
                <DoneBar done={roadmap.done} total={roadmap.lessons} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>Chưa có lộ trình nào.</Empty>
      )}
    </>
  )
}

/** Look of each state, shared by step and lesson nodes (roadmap.sh-style colour key). */
const STATES: Record<
  LessonState,
  { label: string; icon: PulsoIcon; node: string; tint: string }
> = {
  done: {
    label: 'Đã xong',
    icon: CircleCheck,
    node: `border-emerald-600 bg-emerald-50 dark:border-emerald-500
      dark:bg-emerald-950/60`,
    tint: 'text-emerald-600 dark:text-emerald-400',
  },
  started: {
    label: 'Đang học',
    icon: CircleDot,
    node: 'border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-950/50',
    tint: 'text-amber-600 dark:text-amber-400',
  },
  todo: {
    label: 'Chưa học',
    icon: Circle,
    node: 'bg-card',
    tint: 'text-muted-foreground',
  },
}

/** A step is done when every lesson is, started once any lesson is touched. */
export function stepState(step: RoadmapStep): LessonState {
  const items = step.track?.items ?? []
  if (items.length && items.every((item) => item.state === 'done'))
    return 'done'
  return items.some((item) => item.state !== 'todo') ? 'started' : 'todo'
}

function StateIcon({ state }: { state: LessonState }) {
  const { icon: Icon, tint, label } = STATES[state]
  return <Icon aria-label={label} className={cn('size-4 shrink-0', tint)} />
}

function Legend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
      {(Object.keys(STATES) as LessonState[]).map((state) => (
        <li key={state} className="flex items-center gap-1.5">
          <StateIcon state={state} />
          {STATES[state].label}
        </li>
      ))}
    </ul>
  )
}

/** Lessons of a step on one side of the spine, each joined to it by a dashed line. */
function Branch({
  track,
  items,
  side,
}: {
  track: string
  items: NonNullable<RoadmapStep['track']>['items']
  side: 'left' | 'right'
}) {
  return (
    <ul
      className={cn(
        'flex flex-col justify-center gap-2',
        side === 'left' ? 'md:items-end' : 'md:items-start',
      )}
    >
      {items.map((item) => (
        <li
          key={item.slug}
          className={cn(
            'flex items-center',
            side === 'left' && 'md:flex-row-reverse',
          )}
        >
          <span
            aria-hidden
            className="hidden w-6 border-t border-dashed
              border-muted-foreground/50 md:block lg:w-10"
          />
          <Link
            href={lessonHref(track, item.slug)}
            className={cn(
              `flex max-w-64 items-center gap-2 rounded-md border px-3 py-1.5
              text-sm shadow-xs transition-colors outline-none hover:bg-muted/60
              focus-visible:ring-3 focus-visible:ring-ring/50`,
              STATES[item.state].node,
            )}
          >
            <StateIcon state={item.state} />
            <span className="min-w-0 truncate">{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/**
 * A roadmap the way roadmap.sh draws one: steps down a central spine, each step's lessons
 * branching out to both sides, every node coloured by the learner's state. On a phone the
 * lessons stack under their step.
 */
export function RoadmapView({ slug }: { slug: string }) {
  const { data: roadmap } = useQuery(roadmapQueryOptions(slug))
  if (!roadmap) return <p className="text-muted-foreground">Đang tải…</p>
  const lessons = roadmap.steps.reduce((n, s) => n + (s.track?.lessons ?? 0), 0)
  const done = roadmap.steps.reduce((n, s) => n + (s.track?.done ?? 0), 0)

  return (
    <>
      <div className="flex flex-col gap-3">
        <Link
          href="/studio/roadmaps"
          className="flex w-fit items-center gap-1.5 rounded-sm text-sm
            text-muted-foreground outline-none hover:text-foreground
            focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Lộ trình
        </Link>
        <PageHeading title={`Lộ trình ${roadmap.title}`}>
          <p>{roadmap.summary}</p>
        </PageHeading>
        <DoneBar done={done} total={lessons} className="max-w-sm" />
        <Legend />
      </div>

      <ol className="flex flex-col">
        {roadmap.steps.map((step, i) => {
          const state = stepState(step)
          const items = step.track?.items ?? []
          const half = Math.ceil(items.length / 2)
          const last = i === roadmap.steps.length - 1
          return (
            <li
              key={step.id}
              className="grid gap-x-0 gap-y-3 pb-10 last:pb-0
                md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)_minmax(0,1fr)]
                md:pb-12"
            >
              {/* Spine down to the next step */}
              <div
                className="relative flex flex-col items-center gap-2
                  md:col-start-2 md:row-start-1"
              >
                {!last && (
                  <span
                    aria-hidden
                    className="absolute top-6 -bottom-10 left-1/2 hidden w-0.5
                      -translate-x-1/2 bg-sky-500/60 md:-bottom-12 md:block"
                  />
                )}
                {step.track ? (
                  <Link
                    href={trackHref(step.track.slug)}
                    className={cn(
                      `relative z-10 flex w-full flex-col gap-1 rounded-lg
                        border-2 px-4 py-3 text-center shadow-sm
                        transition-colors outline-none hover:brightness-95
                        focus-visible:ring-3 focus-visible:ring-ring/50`,
                      state === 'todo'
                        ? `border-yellow-500 bg-yellow-100
                          dark:border-yellow-400 dark:bg-yellow-950/60`
                        : STATES[state].node,
                    )}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <StateIcon state={state} />
                      <h2 className="font-medium">{step.title}</h2>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {categoryOf(step.track.category).label} ·{' '}
                      <span className="tabular-nums">
                        {step.track.done}/{step.track.lessons} bài
                      </span>
                    </span>
                  </Link>
                ) : (
                  <div
                    className="relative z-10 flex w-full flex-col gap-1
                      rounded-lg border-2 border-dashed bg-muted px-4 py-3
                      text-center"
                  >
                    <h2 className="font-medium">{step.title}</h2>
                    <span className="text-xs text-muted-foreground">
                      Chưa có bài cho bước này
                    </span>
                  </div>
                )}
                {step.description && (
                  <p
                    className="relative z-10 bg-background px-1 text-center
                      text-xs text-pretty text-muted-foreground"
                  >
                    {step.description}
                  </p>
                )}
              </div>

              {step.track && items.length > 0 && (
                <>
                  <div className="md:col-start-1 md:row-start-1">
                    <Branch
                      track={step.track.slug}
                      items={items.slice(0, half)}
                      side="left"
                    />
                  </div>
                  <div className="md:col-start-3 md:row-start-1">
                    <Branch
                      track={step.track.slug}
                      items={items.slice(half)}
                      side="right"
                    />
                  </div>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </>
  )
}
