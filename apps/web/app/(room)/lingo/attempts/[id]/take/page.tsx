import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { ApiError, apiFetch } from '@/lib/api'
import { resultHref } from '@/lib/lingo'
import type { Attempt, ExamDetail } from '@/lib/queries/lingo'

import { ExamRoom } from './_components/exam-room'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Phòng thi · Lingo' }

/**
 * The exam room: outside the (app) group, so no app header, Lingo nav or tutor bubble while the
 * learner works. A submitted attempt goes to its result page.
 */
export default async function TakePage({
  params,
}: PageProps<'/lingo/attempts/[id]/take'>) {
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
  if (attempt.submittedAt) redirect(resultHref(attempt.id))
  const exam = await apiFetch<ExamDetail>(
    `/lingo/exams/${encodeURIComponent(attempt.exam)}`,
    { cache: 'no-store' },
  )
  return <ExamRoom attempt={attempt} exam={exam} />
}
