import { notFound } from 'next/navigation'

import { ApiError, apiFetch } from '@/lib/api'
import { type Attempt, type ExamDetail } from '@/lib/queries/lingo'

import { AttemptView } from './_components/attempt-view'

export const dynamic = 'force-dynamic'

export default async function AttemptPage({
  params,
}: PageProps<'/lingo/attempts/[id]'>) {
  const { id } = await params
  const attempt = await apiFetch<Attempt>(
    `/lingo/attempts/${encodeURIComponent(id)}`,
    {
      cache: 'no-store',
    },
  ).catch((error: unknown) => {
    if (
      error instanceof ApiError &&
      (error.status === 404 || error.status === 400)
    )
      notFound()
    throw error
  })
  const exam = await apiFetch<ExamDetail>(
    `/lingo/exams/${encodeURIComponent(attempt.exam)}`,
    {
      cache: 'no-store',
    },
  )
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <AttemptView initial={attempt} skillTags={exam.skillTags} />
    </main>
  )
}
