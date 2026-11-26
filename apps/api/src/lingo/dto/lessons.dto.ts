import { LingoContentStatus } from '@repo/db'
import { EnumField, IntField, StringField, UuidField } from '@repo/nest-common'

/** URL key: lowercase words joined by dashes (`word-form`). */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export class LessonModuleDto {
  @StringField({ maxLength: 32, example: 'TOEIC_LR' })
  exam: string

  @StringField({ maxLength: 80, pattern: SLUG, example: 'grammar' })
  slug: string

  @StringField({ maxLength: 120, example: 'Ngữ pháp Part 5–6' })
  title: string

  @StringField({ maxLength: 500, optional: true, allowEmpty: true })
  description?: string

  @IntField({ min: 0, optional: true })
  order?: number
}

export class LessonDto {
  @UuidField()
  moduleId: string

  @StringField({ maxLength: 80, pattern: SLUG, example: 'word-form' })
  slug: string

  @StringField({ maxLength: 160 })
  title: string

  @StringField({ maxLength: 500, optional: true, allowEmpty: true })
  summary?: string

  /** Markdown (GFM) */
  @StringField({ maxLength: 100_000, optional: true, allowEmpty: true })
  content?: string

  /** "Nhớ khi làm bài" checklist */
  @StringField({ maxLength: 500, each: true, maxItems: 20, optional: true })
  keyPoints?: string[]

  /** Parts the lesson is about (P1…P7) */
  @StringField({ maxLength: 16, each: true, maxItems: 10, optional: true })
  parts?: string[]

  @IntField({ min: 1, max: 600, optional: true })
  minutes?: number

  /** Practice: published questions of this part… */
  @StringField({ maxLength: 16, optional: true, nullable: true })
  practicePart?: string | null

  /** …tagged with this skill (needs `practicePart`) */
  @StringField({ maxLength: 64, optional: true, nullable: true })
  practiceSkillTag?: string | null

  @IntField({ min: 0, optional: true })
  order?: number

  @EnumField(LingoContentStatus, { optional: true })
  status?: LingoContentStatus
}
