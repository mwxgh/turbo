import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import {
  LingoContentStatus,
  type LingoTestKind,
  type Prisma,
  toPrismaListArgs,
} from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { type ListQuery, paginated } from '@repo/utils'

import { partTarget, pickItems, shuffle, timeLimitSec } from './assemble'
import { testListSpec } from './lingo.list-spec'
import { type ExamSpec, getExam } from './specs'

/** Item → part and question count: enough to describe a test. */
const itemShape = {
  item: {
    select: {
      id: true,
      part: true,
      status: true,
      _count: { select: { questions: true } },
    },
  },
} satisfies Prisma.LingoTestItemInclude

type TestItemRow = Prisma.LingoTestItemGetPayload<{ include: typeof itemShape }>

/** Questions per part, parts in exam order. */
export function partsOf(exam: ExamSpec, rows: TestItemRow[]) {
  const counts: Record<string, number> = {}
  for (const row of rows)
    counts[row.item.part] =
      (counts[row.item.part] ?? 0) + row.item._count.questions
  return exam.sections.flatMap((section) =>
    section.parts
      .filter((part) => counts[part.code])
      .map((part) => ({
        code: part.code,
        name: part.name,
        nameVi: part.nameVi,
        section: section.code,
        questions: counts[part.code]!,
        target: part.count,
      })),
  )
}

function summary(
  exam: ExamSpec,
  test: { items: TestItemRow[] } & Record<string, unknown>,
) {
  const { items, ...rest } = test
  const parts = partsOf(exam, items)
  return {
    ...rest,
    parts,
    questions: parts.reduce((sum, p) => sum + p.questions, 0),
    timeLimitSec: timeLimitSec(
      exam,
      Object.fromEntries(parts.map((p) => [p.code, p.questions])),
    ),
  }
}

@Injectable()
export class TestsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Published tests of an exam, with the learner's submitted attempt count. */
  async list(userId: string, examCode: string, query: ListQuery) {
    const exam = getExam(examCode)
    return this.page(
      exam,
      query,
      {
        exam: exam.code,
        status: LingoContentStatus.PUBLISHED,
      },
      userId,
    )
  }

  /** One published test: parts, time limit, the learner's latest results. */
  async view(userId: string, id: string) {
    const test = await this.prisma.lingoTest.findFirst({
      where: { id, status: LingoContentStatus.PUBLISHED },
      include: {
        items: { include: itemShape },
        attempts: {
          where: { userId, submittedAt: { not: null } },
          orderBy: { submittedAt: 'desc' },
          take: 10,
          select: {
            id: true,
            mode: true,
            parts: true,
            correct: true,
            total: true,
            scores: true,
            submittedAt: true,
          },
        },
      },
    })
    if (!test) throw new NotFoundException('Test not found')
    return summary(getExam(test.exam), test)
  }

  // ─── Admin ────────────────────────────────────────────────────────────────

  adminList(query: ListQuery) {
    return this.page(undefined, query, {})
  }

  /** Every item with its questions, in test order (for review before publishing). */
  async adminView(id: string) {
    const test = await this.prisma.lingoTest.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { order: 'asc' },
          include: {
            item: { include: { questions: { orderBy: { order: 'asc' } } } },
          },
        },
        batch: { select: { id: true, status: true, message: true } },
      },
    })
    if (!test) throw new NotFoundException('Test not found')
    const { items, ...rest } = test
    return { ...rest, items: items.map((row) => row.item) }
  }

  /**
   * A new DRAFT test from published items: each part filled to its target (full or mini),
   * items no other test uses first. Parts short of items are reported, not fatal.
   */
  async assemble(
    userId: string,
    input: {
      exam: string
      kind: LingoTestKind
      title: string
      description?: string
    },
  ) {
    const exam = getExam(input.exam)
    const pool = await this.prisma.lingoItem.findMany({
      where: { exam: exam.code, status: LingoContentStatus.PUBLISHED },
      select: {
        id: true,
        part: true,
        _count: { select: { questions: true, tests: true } },
      },
    })
    shuffle(pool)

    const itemIds: string[] = []
    const shortfall: Record<string, number> = {}
    for (const section of exam.sections)
      for (const part of section.parts) {
        const target = partTarget(part, input.kind)
        const candidates = pool
          .filter((item) => item.part === part.code)
          .map((item) => ({
            id: item.id,
            size: item._count.questions,
            used: item._count.tests > 0,
          }))
        const picked = pickItems(candidates, target)
        const got = candidates
          .filter((c) => picked.includes(c.id))
          .reduce((sum, c) => sum + c.size, 0)
        if (got < target) shortfall[part.code] = target - got
        itemIds.push(...picked)
      }
    if (!itemIds.length)
      throw new BadRequestException('No published items to build a test from')

    const test = await this.create({
      ...input,
      exam: exam.code,
      itemIds,
      createdById: userId,
    })
    return { test, shortfall }
  }

  /** Items in the given order (the caller keeps parts in exam order). */
  create(input: {
    exam: string
    kind: LingoTestKind
    title: string
    description?: string
    itemIds: string[]
    createdById: string
    batchId?: string
  }) {
    const { itemIds, ...data } = input
    return this.prisma.lingoTest.create({
      data: {
        ...data,
        items: {
          create: itemIds.map((itemId, order) => ({ itemId, order })),
        },
      },
    })
  }

  /** Publishing needs every item published: reviewing a test means reviewing its items. */
  async setStatus(id: string, status: LingoContentStatus) {
    const test = await this.prisma.lingoTest.findUnique({
      where: { id },
      include: { items: { include: itemShape } },
    })
    if (!test) throw new NotFoundException('Test not found')
    if (status === LingoContentStatus.PUBLISHED) {
      const pending = test.items.filter(
        (row) => row.item.status !== LingoContentStatus.PUBLISHED,
      ).length
      if (!test.items.length)
        throw new BadRequestException('The test has no items')
      if (pending)
        throw new BadRequestException(
          `${pending} item(s) of this test are not published yet`,
        )
    }
    return this.prisma.lingoTest.update({ where: { id }, data: { status } })
  }

  async remove(id: string) {
    const { count } = await this.prisma.lingoTest.deleteMany({ where: { id } })
    if (!count) throw new NotFoundException('Test not found')
  }

  private async page(
    exam: ExamSpec | undefined,
    query: ListQuery,
    scope: Prisma.LingoTestWhereInput,
    userId?: string,
  ) {
    const { where, ...args } = toPrismaListArgs<
      Prisma.LingoTestWhereInput,
      Prisma.LingoTestOrderByWithRelationInput
    >(testListSpec, query)
    const scoped = { ...where, ...scope }
    const [tests, total] = await Promise.all([
      this.prisma.lingoTest.findMany({
        where: scoped,
        ...args,
        include: {
          items: { include: itemShape },
          _count: {
            select: {
              attempts: userId
                ? { where: { userId, submittedAt: { not: null } } }
                : true,
            },
          },
        },
      }),
      this.prisma.lingoTest.count({ where: scoped }),
    ])
    const items = tests.map(({ _count, ...test }) => ({
      ...summary(exam ?? getExam(test.exam), test),
      attempts: _count.attempts,
    }))
    return paginated(items, total, query)
  }
}
