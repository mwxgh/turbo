import { LingoContentStatus, LingoDifficulty, LingoTestKind } from '@repo/db'
import {
  BooleanField,
  EnumField,
  IntField,
  JsonField,
  StringField,
  UuidField,
} from '@repo/nest-common'

export class ImportItemsDto {
  @StringField({ maxLength: 32, example: 'TOEIC_LR' })
  exam: string

  @StringField({ maxLength: 16, example: 'P5' })
  part: string

  /** Items as in the part's schema; validated one by one */
  @JsonField({ each: true, minItems: 1, maxItems: 500 })
  items: object[]

  @StringField({ maxLength: 255, optional: true })
  fileName?: string
}

export class CreateItemDto {
  @StringField({ maxLength: 32, example: 'TOEIC_LR' })
  exam: string

  @StringField({ maxLength: 16, example: 'P5' })
  part: string

  @JsonField()
  item: object
}

export class SetItemStatusDto {
  @UuidField({ each: true, minItems: 1, maxItems: 200 })
  ids: string[]

  @EnumField(LingoContentStatus)
  status: LingoContentStatus
}

export class CreateDeckDto {
  @StringField({ maxLength: 32, optional: true, example: 'TOEIC_LR' })
  exam?: string

  @StringField({ maxLength: 100, example: 'TOEIC 600 words' })
  title: string

  @StringField({ maxLength: 500, optional: true })
  description?: string

  @StringField({ maxLength: 8, example: 'en' })
  language: string
}

export class ImportCardsDto {
  /** CSV text with a header row: term,pos,reading,meaningVi,example,exampleVi,topic */
  @StringField({ maxLength: 90_000 })
  csv: string

  @StringField({ maxLength: 255, optional: true })
  fileName?: string
}

export class SetItemImageDto {
  /** Key returned by POST /api/files/uploads */
  @StringField({ maxLength: 255, example: 'uploads/2026/11/<uuid>/office.png' })
  key: string
}

export class AssembleTestDto {
  @StringField({ maxLength: 32, example: 'TOEIC_LR' })
  exam: string

  @EnumField(LingoTestKind)
  kind: LingoTestKind

  @StringField({ maxLength: 150, example: 'TOEIC Test 01' })
  title: string

  @StringField({ maxLength: 1000, optional: true })
  description?: string
}

export class SetTestStatusDto {
  @EnumField(LingoContentStatus)
  status: LingoContentStatus
}

export class GenerateItemsDto {
  @StringField({ maxLength: 32, example: 'TOEIC_LR' })
  exam: string

  @StringField({ maxLength: 16, example: 'P5' })
  part: string

  /** Items (a Part 7 item holds 2–5 questions) */
  @IntField({ min: 1, max: 50, example: 10 })
  count: number

  @EnumField(LingoDifficulty)
  difficulty: LingoDifficulty

  @StringField({ maxLength: 100, optional: true, example: 'Office' })
  topic?: string

  /** The model answers its own items; disagreements go to NEEDS_REVIEW (one more call each) */
  @BooleanField({ optional: true })
  selfCheck?: boolean
}

export class GenerateTestDto {
  @StringField({ maxLength: 32, example: 'TOEIC_LR' })
  exam: string

  @EnumField(LingoTestKind)
  kind: LingoTestKind

  @EnumField(LingoDifficulty)
  difficulty: LingoDifficulty

  @StringField({ maxLength: 150, example: 'AI Test 01' })
  title: string

  @StringField({ maxLength: 100, optional: true })
  topic?: string

  @BooleanField({ optional: true })
  selfCheck?: boolean
}

export class GenerateCardsDto {
  @StringField({ maxLength: 100, each: true, minItems: 1, maxItems: 50 })
  terms: string[]
}
