'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'

import {
  adminItemsQueryOptions,
  adminTestsQueryOptions,
} from '@/lib/queries/lingo'

/** One count: only the total of a one-row page is read. */
const one = { page: 1, pageSize: 1 }

function Stat({
  label,
  value,
  href,
  hint,
}: {
  label: string
  value: number | undefined
  href: string
  hint: string
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-1 rounded-xl border bg-card p-4
        transition-colors outline-none hover:bg-muted/40 focus-visible:ring-3
        focus-visible:ring-ring/50"
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-3xl font-semibold tabular-nums">
        {value ?? '–'}
      </span>
      <span
        className="mt-auto flex items-center gap-1 text-sm text-muted-foreground
          group-hover:text-foreground"
      >
        {hint}
        <ChevronRight aria-hidden="true" className="size-4" />
      </span>
    </Link>
  )
}

/** What waits for the teacher: items to review, tests to publish. */
export function TeachOverview({ exam }: { exam: string }) {
  const items = (status: string) =>
    adminItemsQueryOptions({ ...one, filter: { exam, status } })
  const tests = (status?: string) =>
    adminTestsQueryOptions({
      ...one,
      filter: { exam, ...(status && { status }) },
    })
  const draft = useQuery(items('DRAFT')).data?.total
  const review = useQuery(items('NEEDS_REVIEW')).data?.total
  const published = useQuery(items('PUBLISHED')).data?.total
  const allTests = useQuery(tests()).data?.total
  const liveTests = useQuery(tests('PUBLISHED')).data?.total

  return (
    <section aria-labelledby="todo-heading" className="flex flex-col gap-3">
      <h2 id="todo-heading" className="text-lg font-semibold">
        Việc cần làm
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Câu nháp chờ duyệt"
          value={draft}
          href="/teach/items"
          hint="Duyệt câu"
        />
        <Stat
          label="Câu AI tự kiểm thấy sai"
          value={review}
          href="/teach/items"
          hint="Xem lại"
        />
        <Stat
          label="Câu đã xuất bản"
          value={published}
          href="/teach/tests"
          hint="Ghép đề"
        />
        <Stat
          label="Đề đang mở cho học viên"
          value={liveTests}
          href="/teach/tests"
          hint={allTests === undefined ? 'Bộ đề' : `${allTests} đề tất cả`}
        />
      </div>
    </section>
  )
}
