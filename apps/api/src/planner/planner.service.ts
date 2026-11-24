import { BadRequestException, Injectable } from '@nestjs/common'

import type { PlannerTask } from '@repo/db'
import { PrismaService } from '@repo/db/nest'

import type {
  CreatePlannerTaskDto,
  PlannerRangeQueryDto,
  UpdatePlannerTaskDto,
} from './dto/planner-task.dto'

/** Widest calendar range one request may load (a month view with its spill-over weeks fits). */
export const MAX_RANGE_DAYS = 62

const DAY_MS = 86_400_000

/** `yyyy-MM-dd…` → the calendar day as a UTC-midnight Date (what Prisma stores in a `@db.Date`). */
const toDay = (value: string) => new Date(`${value.slice(0, 10)}T00:00:00Z`)

/** `undefined` keeps the column, `null` clears it. */
const day = (value: string | null | undefined) =>
  value === undefined ? undefined : value && toDay(value)

@Injectable()
export class PlannerService {
  constructor(private readonly prisma: PrismaService) {}

  /** The user's tasks dated inside [from, to] plus the whole backlog (no date). */
  async findRange(userId: string, { from, to }: PlannerRangeQueryDto) {
    const start = toDay(from)
    const end = toDay(to)
    const days = (end.getTime() - start.getTime()) / DAY_MS
    if (days < 0 || days > MAX_RANGE_DAYS)
      throw new BadRequestException(
        `Range must be 0–${MAX_RANGE_DAYS} days, from ≤ to`,
      )
    return this.prisma.plannerTask.findMany({
      where: {
        userId,
        OR: [{ date: { gte: start, lte: end } }, { date: null }],
      },
      orderBy: [{ position: 'asc' }, { id: 'asc' }],
    })
  }

  async create(
    userId: string,
    { date, position, ...data }: CreatePlannerTaskDto,
  ): Promise<PlannerTask> {
    const status = data.status ?? 'TODO'
    return this.prisma.plannerTask.create({
      data: {
        ...data,
        userId,
        status,
        date: day(date),
        position: position ?? (await this.endOf(userId, status)),
      },
    })
  }

  /** Another user's id is a 404 (P2025), like a missing one. */
  update(
    userId: string,
    id: string,
    { date, ...data }: UpdatePlannerTaskDto,
  ): Promise<PlannerTask> {
    return this.prisma.plannerTask.update({
      where: { id, userId },
      data: { ...data, date: day(date) },
    })
  }

  async remove(userId: string, id: string): Promise<void> {
    await this.prisma.plannerTask.delete({ where: { id, userId } })
  }

  /** Position after the last card of a column. */
  private async endOf(userId: string, status: PlannerTask['status']) {
    const last = await this.prisma.plannerTask.findFirst({
      where: { userId, status },
      orderBy: { position: 'desc' },
      select: { position: true },
    })
    return (last?.position ?? 0) + 1
  }
}
