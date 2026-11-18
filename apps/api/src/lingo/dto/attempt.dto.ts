import { LingoDifficulty } from '@repo/db'
import {
  BooleanField,
  EnumField,
  IntField,
  StringField,
} from '@repo/nest-common'

/** Object, not array: EnumField reads enum-like objects */
export const AttemptSource = { NEW: 'NEW', MISTAKES: 'MISTAKES' } as const
export type AttemptSource = (typeof AttemptSource)[keyof typeof AttemptSource]

export class StartAttemptDto {
  @StringField({ maxLength: 32, example: 'TOEIC_LR' })
  exam: string

  @StringField({ maxLength: 16, example: 'P5' })
  part: string

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
