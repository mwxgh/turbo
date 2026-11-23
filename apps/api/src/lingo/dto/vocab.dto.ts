import { IntField, StringField, UuidField } from '@repo/nest-common'

export class ReviewQueueQueryDto {
  @StringField({ maxLength: 32, optional: true, example: 'TOEIC_LR' })
  exam?: string

  @UuidField({ optional: true })
  deckId?: string
}

export class CardSearchQueryDto {
  @StringField({ minLength: 1, maxLength: 100, example: 'hop dong' })
  q: string

  @StringField({ maxLength: 32, optional: true, example: 'TOEIC_LR' })
  exam?: string
}

export class ReviewCardDto {
  /** ts-fsrs Rating: 1 Again, 2 Hard, 3 Good, 4 Easy */
  @IntField({ min: 1, max: 4, example: 3 })
  rating: number
}
