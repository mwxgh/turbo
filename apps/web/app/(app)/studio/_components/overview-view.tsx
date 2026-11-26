'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Check, Route } from 'pulsoicon-react'

import {
  overviewQueryOptions,
  roadmapsQueryOptions,
  tracksQueryOptions,
} from '@/lib/queries/studio'
import { CATEGORIES, lessonHref } from '@/lib/studio'

import { DoneBar, PageHeading, TrackGrid } from './learn-ui'

/** Studio home: lessons to continue, roadmaps, then every group with its first tracks. */
export function OverviewView() {
  const { data: overview } = useQuery(overviewQueryOptions())
  const { data: tracks = [] } = useQuery(tracksQueryOptions())
  const { data: roadmaps = [] } = useQuery(roadmapsQueryOptions())

  return (
    <>
      <PageHeading title="Studio">
        <p>
          Học lập trình theo lộ trình: ngôn ngữ, framework, design pattern và
          kiến thức nền tảng. Mỗi bài có ví dụ code và quiz ngắn.
        </p>
        {overview && overview.done > 0 && (
          <p className="mt-1 text-sm tabular-nums">
            Bạn đã học xong {overview.done} bài.
          </p>
        )}
      </PageHeading>

      {overview && overview.recent.length > 0 && (
        <section
          aria-labelledby="recent-heading"
          className="flex flex-col gap-3"
        >
          <h2 id="recent-heading" className="text-lg font-medium">
            Học tiếp
          </h2>
          <ul
            className="flex flex-col divide-y rounded-xl border bg-card
              shadow-xs"
          >
            {overview.recent.map((lesson) => (
              <li key={`${lesson.track.slug}/${lesson.slug}`}>
                <Link
                  href={lessonHref(lesson.track.slug, lesson.slug)}
                  className="flex items-center gap-3 px-5 py-3 text-sm
                    transition-colors outline-none first:rounded-t-xl
                    last:rounded-b-xl hover:bg-muted/50 focus-visible:ring-3
                    focus-visible:ring-ring/50"
                >
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-medium">{lesson.title}</span>
                    <span className="text-muted-foreground">
                      {lesson.track.title}
                    </span>
                  </span>
                  {lesson.done ? (
                    <span
                      className="flex items-center gap-1 text-muted-foreground"
                    >
                      <Check aria-hidden className="size-4" />
                      Đã xong
                    </span>
                  ) : (
                    <ArrowRight
                      aria-hidden
                      className="size-4 text-muted-foreground"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {roadmaps.length > 0 && (
        <section
          aria-labelledby="roadmaps-heading"
          className="flex flex-col gap-3"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="roadmaps-heading" className="text-lg font-medium">
              Lộ trình
            </h2>
            <Link
              href="/studio/roadmaps"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Xem tất cả
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {roadmaps.map((roadmap) => (
              <li key={roadmap.slug} className="flex [&>a]:flex-1">
                <Link
                  href={`/studio/roadmaps/${roadmap.slug}`}
                  className="flex flex-col gap-3 rounded-xl border bg-card p-5
                    shadow-xs transition-colors outline-none hover:bg-muted/40
                    focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Route
                      aria-hidden
                      className="size-4 text-emerald-600 dark:text-emerald-400"
                    />
                    {roadmap.title}
                  </span>
                  <span className="text-sm text-pretty text-muted-foreground">
                    {roadmap.summary}
                  </span>
                  <DoneBar done={roadmap.done} total={roadmap.lessons} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {CATEGORIES.map((category) => {
        const inGroup = tracks.filter((t) => t.category === category.category)
        if (!inGroup.length) return null
        return (
          <section
            key={category.segment}
            aria-labelledby={`group-${category.segment}`}
            className="flex flex-col gap-3"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id={`group-${category.segment}`}
                className="text-lg font-medium"
              >
                {category.label}
              </h2>
              <Link
                href={`/studio/${category.segment}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Xem tất cả
              </Link>
            </div>
            <TrackGrid tracks={inGroup.slice(0, 3)} />
          </section>
        )
      })}
    </>
  )
}
