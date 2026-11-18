'use client'

import { useState } from 'react'

import type { Attempt } from '@/lib/queries/lingo'

import { AttemptResult } from './attempt-result'
import { AttemptRunner } from './attempt-runner'

/** Runner while the attempt is open, result once submitted (same URL). */
export function AttemptView({
  initial,
  skillTags,
}: {
  initial: Attempt
  skillTags: Record<string, string>
}) {
  const [attempt, setAttempt] = useState(initial)
  return attempt.submittedAt ? (
    <AttemptResult attempt={attempt} skillTags={skillTags} />
  ) : (
    <AttemptRunner attempt={attempt} onSubmitted={setAttempt} />
  )
}
