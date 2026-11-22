import { DateStringField, IntField } from '@repo/nest-common'

export class UpdateGoalDto {
  @IntField({ min: 10, max: 990, optional: true, nullable: true, example: 650 })
  targetScore?: number | null

  /** `yyyy-MM-dd` */
  @DateStringField({ optional: true, nullable: true, example: '2027-03-20' })
  examDate?: string | null

  @IntField({ min: 0, max: 200, optional: true, example: 20 })
  newCardsPerDay?: number
}
