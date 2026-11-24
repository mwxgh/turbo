import { ApiProperty, PartialType } from '@nestjs/swagger'

import { PlannerPriority, PlannerStatus } from '@repo/db'
import {
  DateStringField,
  EnumField,
  IntField,
  NumberField,
  StringField,
} from '@repo/nest-common'

export class CreatePlannerTaskDto {
  @StringField({ maxLength: 200, example: 'Review the sprint board' })
  title: string

  @StringField({ maxLength: 2000, optional: true, nullable: true })
  note?: string | null

  @EnumField(PlannerStatus, { optional: true, enumName: 'PlannerStatus' })
  status?: PlannerStatus

  @EnumField(PlannerPriority, { optional: true, enumName: 'PlannerPriority' })
  priority?: PlannerPriority

  /** `yyyy-MM-dd`; null = backlog */
  @DateStringField({ optional: true, nullable: true, example: '2026-11-24' })
  date?: string | null

  /** Minutes after midnight; null = all day */
  @IntField({ min: 0, max: 1439, optional: true, nullable: true, example: 540 })
  startMinute?: number | null

  @IntField({ min: 5, max: 1440, optional: true, example: 60 })
  durationMinutes?: number

  @StringField({ maxLength: 16, optional: true, example: 'sky' })
  color?: string

  /** Order in the board column; omitted = end of the column */
  @NumberField({ optional: true })
  position?: number
}

export class UpdatePlannerTaskDto extends PartialType(CreatePlannerTaskDto) {}

export class PlannerRangeQueryDto {
  /** First day shown, `yyyy-MM-dd` */
  @DateStringField({ example: '2026-11-01' })
  from: string

  /** Last day shown, `yyyy-MM-dd` (inclusive) */
  @DateStringField({ example: '2026-11-30' })
  to: string
}

/** Response shape, for Swagger only. */
export class PlannerTaskDto {
  @ApiProperty({ format: 'uuid' }) id: string
  @ApiProperty() title: string
  @ApiProperty({ nullable: true, type: String }) note: string | null
  @ApiProperty({ enum: PlannerStatus, enumName: 'PlannerStatus' })
  status: PlannerStatus
  @ApiProperty({ enum: PlannerPriority, enumName: 'PlannerPriority' })
  priority: PlannerPriority
  @ApiProperty({ nullable: true, type: String, format: 'date' })
  date: string | null
  @ApiProperty({ nullable: true, type: Number }) startMinute: number | null
  @ApiProperty() durationMinutes: number
  @ApiProperty() color: string
  @ApiProperty() position: number
  @ApiProperty({ format: 'date-time' }) createdAt: string
  @ApiProperty({ format: 'date-time' }) updatedAt: string
}
