'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Check } from 'pulsoicon-react'

import { cn } from '@repo/ui/lib/utils'

import { roadmapQueryOptions, roadmapsQueryOptions } from '@/lib/queries/studio'
import { categoryOf, trackHref } from '@/lib/studio'

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

/** A roadmap as a numbered timeline; finished steps get a check. */
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
      </div>

      <ol className="flex flex-col">
        {roadmap.steps.map((step, i) => {
          const finished =
            !!step.track &&
            step.track.lessons > 0 &&
            step.track.done === step.track.lessons
          return (
            <li key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Line to the next step */}
              {i < roadmap.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-9 bottom-1 left-[1.0625rem] w-px
                    bg-border"
                />
              )}
              <span
                className={cn(
                  `flex size-9 shrink-0 items-center justify-center rounded-full
                  border text-sm font-medium tabular-nums`,
                  finished
                    ? `border-emerald-600 bg-emerald-600 text-white
                      dark:border-emerald-400 dark:bg-emerald-400
                      dark:text-emerald-950`
                    : 'bg-card',
                )}
              >
                {finished ? (
                  <Check aria-label="Đã xong" className="size-4" />
                ) : (
                  i + 1
                )}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1.5">
                <h2 className="font-medium">{step.title}</h2>
                {step.description && (
                  <p className="text-sm text-pretty text-muted-foreground">
                    {step.description}
                  </p>
                )}
                {step.track ? (
                  <Link
                    href={trackHref(step.track.slug)}
                    className="flex flex-col gap-2 rounded-xl border bg-card p-4
                      shadow-xs transition-colors outline-none hover:bg-muted/40
                      focus-visible:ring-3 focus-visible:ring-ring/50
                      sm:max-w-md"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium">
                        {step.track.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {categoryOf(step.track.category).label}
                      </span>
                    </span>
                    <DoneBar
                      done={step.track.done}
                      total={step.track.lessons}
                    />
                  </Link>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Chưa có bài cho bước này.
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </>
  )
}
