'use client'

import { useState } from 'react'

import type { Attempt, ExamDetail } from '@/lib/queries/lingo'

import { AttemptResult } from './attempt-result'
import { AttemptRunner } from './attempt-runner'

/** Runner while the attempt is open, result once submitted (same URL). */
export function AttemptView({
  initial,
  exam,
}: {
  initial: Attempt
  exam: ExamDetail
}) {
  const [attempt, setAttempt] = useState(initial)
  return attempt.submittedAt ? (
    <AttemptResult attempt={attempt} exam={exam} />
  ) : (
    <AttemptRunner attempt={attempt} exam={exam} onSubmitted={setAttempt} />
  )
}
