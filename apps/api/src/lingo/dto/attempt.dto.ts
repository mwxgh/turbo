import { LingoDifficulty } from '@repo/db'
import {
  BooleanField,
  EnumField,
  IntField,
  StringField,
  UuidField,
} from '@repo/nest-common'

/** Object, not array: EnumField reads enum-like objects */
export const AttemptSource = { NEW: 'NEW', MISTAKES: 'MISTAKES' } as const
export type AttemptSource = (typeof AttemptSource)[keyof typeof AttemptSource]

/** Modes of an attempt on a test (QUICK attempts have no test) */
export const TestMode = {
  PRACTICE: 'PRACTICE',
  FULL_TEST: 'FULL_TEST',
} as const
export type TestMode = (typeof TestMode)[keyof typeof TestMode]

export class StartAttemptDto {
  @StringField({ maxLength: 32, example: 'TOEIC_LR' })
  exam: string

  /** Quick practice: the part to draw questions from */
  @StringField({ maxLength: 16, optional: true, example: 'P5' })
  part?: string

  /** Take (parts of) a published test instead of a quick practice */
  @UuidField({ optional: true })
  testId?: string

  /** With `testId`: PRACTICE (chosen parts, optional timer) or FULL_TEST (every part, timed, scaled score) */
  @EnumField(TestMode, { optional: true })
  mode?: TestMode

  /** PRACTICE: parts of the test to take (all when omitted) */
  @StringField({ maxLength: 16, each: true, optional: true, maxItems: 10 })
  parts?: string[]

  /** PRACTICE: time limit (none when omitted); FULL_TEST always uses the test's */
  @IntField({ min: 60, max: 4 * 60 * 60, optional: true })
  timeLimitSec?: number

  @IntField({ min: 1, max: 50, optional: true, example: 10 })
  count?: number

  @EnumField(LingoDifficulty, { optional: true })
  difficulty?: LingoDifficulty

  /** NEW: unseen questions first; MISTAKES: questions last answered wrong */
  @EnumField(AttemptSource, { optional: true })
  source?: AttemptSource
}

export class SaveAnswerDto {
  /** Index of the chosen option; null clears the answer */
  @IntField({ min: 0, max: 9, optional: true, nullable: true })
  choice?: number | null

  @IntField({ min: 0, max: 3_600_000, optional: true })
  timeMs?: number

  @BooleanField({ optional: true })
  flagged?: boolean
}
