'use client'

import { useQuery } from '@tanstack/react-query'

import { tracksQueryOptions } from '@/lib/queries/studio'
import { categoryBySegment } from '@/lib/studio'

import { Empty, PageHeading, TrackGrid } from './learn-ui'

export function CategoryView({ segment }: { segment: string }) {
  const category = categoryBySegment(segment)
  const { data: tracks } = useQuery(tracksQueryOptions())
  if (!category) return null
  const inGroup = tracks?.filter((t) => t.category === category.category)

  return (
    <>
      <PageHeading title={category.label}>
        <p>{category.description}</p>
      </PageHeading>
      {!inGroup ? (
        <p className="text-muted-foreground">Đang tải…</p>
      ) : inGroup.length ? (
        <TrackGrid tracks={inGroup} />
      ) : (
        <Empty>Chưa có chủ đề nào trong nhóm này.</Empty>
      )}
    </>
  )
}
