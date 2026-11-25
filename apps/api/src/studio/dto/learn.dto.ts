import { StudioCategory, StudioStatus } from '@repo/db'
import {
  BooleanField,
  ClassField,
  EnumField,
  IntField,
  StringField,
  UuidField,
} from '@repo/nest-common'

/** URL key: lowercase words joined by dashes (`design-patterns`). */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export class SetLessonDoneDto {
  @BooleanField()
  done: boolean
}

export class SubmitQuizDto {
  /** Chosen choice index per question, in question order */
  @IntField({ each: true, min: 0, max: 9, maxItems: 50 })
  answers: number[]
}

export class TrackDto {
  @StringField({ maxLength: 80, pattern: SLUG, example: 'typescript' })
  slug: string

  @EnumField(StudioCategory)
  category: StudioCategory

  @StringField({ maxLength: 120, example: 'TypeScript' })
  title: string

  @StringField({ maxLength: 500, optional: true })
  summary?: string

  @IntField({ min: 0, optional: true })
  order?: number

  @EnumField(StudioStatus, { optional: true })
  status?: StudioStatus
}

export class QuizQuestionDto {
  @StringField({ maxLength: 1000 })
  prompt: string

  @StringField({ maxLength: 300, each: true, minItems: 2, maxItems: 6 })
  choices: string[]

  @IntField({ min: 0, max: 5 })
  answer: number

  @StringField({ maxLength: 2000, optional: true })
  explanation?: string
}

export class LessonDto {
  @StringField({ maxLength: 80, pattern: SLUG, example: 'generics' })
  slug: string

  @StringField({ maxLength: 160 })
  title: string

  @StringField({ maxLength: 500, optional: true })
  summary?: string

  /** Markdown (GFM) */
  @StringField({ maxLength: 100_000, optional: true, allowEmpty: true })
  content?: string

  @IntField({ min: 1, max: 600, optional: true })
  minutes?: number

  @IntField({ min: 0, optional: true })
  order?: number

  @EnumField(StudioStatus, { optional: true })
  status?: StudioStatus

  /** Replaces every question of the lesson, in this order */
  @ClassField(() => QuizQuestionDto, {
    each: true,
    maxItems: 20,
    optional: true,
  })
  questions?: QuizQuestionDto[]
}

export class RoadmapStepDto {
  @StringField({ maxLength: 160 })
  title: string

  @StringField({ maxLength: 1000, optional: true })
  description?: string

  @UuidField({ optional: true, nullable: true })
  trackId?: string | null
}

export class RoadmapDto {
  @StringField({ maxLength: 80, pattern: SLUG, example: 'backend' })
  slug: string

  @StringField({ maxLength: 120 })
  title: string

  @StringField({ maxLength: 500, optional: true })
  summary?: string

  @IntField({ min: 0, optional: true })
  order?: number

  @EnumField(StudioStatus, { optional: true })
  status?: StudioStatus

  /** Replaces every step of the roadmap, in this order */
  @ClassField(() => RoadmapStepDto, {
    each: true,
    maxItems: 50,
    optional: true,
  })
  steps?: RoadmapStepDto[]
}
