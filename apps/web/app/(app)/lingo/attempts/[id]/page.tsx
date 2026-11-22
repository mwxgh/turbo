import { notFound, redirect } from 'next/navigation'

import { ApiError, apiFetch } from '@/lib/api'
import { takeHref } from '@/lib/lingo'
import type { Attempt, ExamDetail } from '@/lib/queries/lingo'

import { AttemptResult } from './_components/attempt-result'

export const dynamic = 'force-dynamic'

/** Result and review of a submitted attempt; an open one goes back to the exam room. */
export default async function AttemptPage({
  params,
}: PageProps<'/lingo/attempts/[id]'>) {
  const { id } = await params
  const attempt = await apiFetch<Attempt>(
    `/lingo/attempts/${encodeURIComponent(id)}`,
    { cache: 'no-store' },
  ).catch((error: unknown) => {
    if (
      error instanceof ApiError &&
      (error.status === 404 || error.status === 400)
    )
      notFound()
    throw error
  })
  if (!attempt.submittedAt) redirect(takeHref(attempt.id))
  const exam = await apiFetch<ExamDetail>(
    `/lingo/exams/${encodeURIComponent(attempt.exam)}`,
    { cache: 'no-store' },
  )
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8">
      <AttemptResult attempt={attempt} exam={exam} />
    </main>
  )
}
