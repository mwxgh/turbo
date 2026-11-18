import { LingoContentStatus } from '@repo/db'
import { EnumField, JsonField, StringField, UuidField } from '@repo/nest-common'

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
