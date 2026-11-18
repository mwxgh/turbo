import Link from 'next/link'

import { ChevronRight } from 'lucide-react'

import { apiFetch } from '@/lib/api'
import type { ExamSummary } from '@/lib/queries/lingo'

export const dynamic = 'force-dynamic'

/** Pick an exam; only exams with content are clickable. */
export default async function LingoPage() {
  const exams = await apiFetch<ExamSummary[]>('/lingo/exams', {
    cache: 'no-store',
  })
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-bold tracking-tight">Lingo</h1>
        <p className="text-muted-foreground">
          Chọn kỳ thi bạn đang ôn. Mỗi kỳ thi có mục tiêu, tiến độ và bộ từ vựng
          riêng.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <li key={exam.code}>
            {exam.available ? (
              <Link
                href={`/lingo/${exam.code}`}
                className="group flex h-full items-center justify-between gap-4
                  rounded-xl border bg-card p-5 transition-colors outline-none
                  hover:border-primary/40 hover:bg-muted/40 focus-visible:ring-3
                  focus-visible:ring-ring/50"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{exam.name}</span>
                  <span className="text-sm text-muted-foreground">Đang mở</span>
                </div>
                <ChevronRight
                  aria-hidden="true"
                  className="size-5 text-muted-foreground transition-transform
                    group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            ) : (
              <div
                aria-disabled="true"
                className="flex h-full flex-col gap-1 rounded-xl border
                  border-dashed p-5 text-muted-foreground"
              >
                <span className="font-semibold">{exam.name}</span>
                <span className="text-sm">Sắp có</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
