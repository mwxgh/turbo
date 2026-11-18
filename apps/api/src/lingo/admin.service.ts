import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import {
  LingoBatchSource,
  LingoContentStatus,
  type Prisma,
  toPrismaListArgs,
} from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { type ListQuery, paginated } from '@repo/utils'

import { itemCreateData, itemHash } from './content'
import type { CreateDeckDto } from './dto/admin.dto'
import { TOEIC_PART5_SAMPLES, TOEIC_STARTER_DECK } from './fixtures/toeic-part5'
import { itemListSpec } from './lingo.list-spec'
import { getExam, getPart } from './specs'
import { parseCsv } from './specs/csv'
import { cardRowSchema, issueLines, itemSchema } from './specs/schemas'

export interface RowError {
  /** 1-based item index (JSON) or CSV line (header = line 1) */
  line: number
  issues: string[]
}

export interface ImportResult {
  batchId?: string
  succeeded: number
  duplicates: number
  failed: number
  errors: RowError[]
}

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Validates every item against the part's schema; valid, new ones are stored as `status`
   * (DRAFT by default: they wait for review). Invalid rows are reported, not fatal.
   */
  async importItems(
    userId: string,
    input: {
      exam: string
      part: string
      items: unknown[]
      fileName?: string
      source?: LingoBatchSource
      status?: LingoContentStatus
    },
  ): Promise<ImportResult> {
    const exam = getExam(input.exam)
    const { section, part } = getPart(exam, input.part)
    const schema = itemSchema(exam, part)

    const errors: RowError[] = []
    const valid = input.items.flatMap((raw, i) => {
      const result = schema.safeParse(raw)
      if (result.success) return [result.data]
      errors.push({ line: i + 1, issues: issueLines(result.error) })
      return []
    })

    // Skip items already stored (same text), including repeats inside the file
    const hashes = valid.map((item) => itemHash(exam.code, part.code, item))
    const existing = new Set(
      (
        await this.prisma.lingoItem.findMany({
          where: { exam: exam.code, contentHash: { in: hashes } },
          select: { contentHash: true },
        })
      ).map((i) => i.contentHash),
    )
    const fresh = valid.filter((_, i) => {
      const hash = hashes[i]!
      if (existing.has(hash)) return false
      existing.add(hash)
      return true
    })

    const batch = await this.prisma.lingoBatch.create({
      data: {
        source: input.source ?? LingoBatchSource.IMPORT,
        exam: exam.code,
        part: part.code,
        fileName: input.fileName ?? null,
        succeeded: fresh.length,
        failed: errors.length,
        errors: errors.length
          ? (errors as unknown as Prisma.InputJsonValue)
          : undefined,
        createdById: userId,
      },
    })
    // Nested creates (questions) need one create per item
    await this.prisma.$transaction(
      fresh.map((item) =>
        this.prisma.lingoItem.create({
          data: itemCreateData(
            exam,
            section,
            part,
            item,
            input.status ?? LingoContentStatus.DRAFT,
            batch.id,
          ),
        }),
      ),
    )
    return {
      batchId: batch.id,
      succeeded: fresh.length,
      duplicates: valid.length - fresh.length,
      failed: errors.length,
      errors,
    }
  }

  /** One item from the admin form: same validation as an import, 400 if invalid or a duplicate. */
  async createItem(userId: string, exam: string, part: string, item: unknown) {
    const result = await this.importItems(userId, {
      exam,
      part,
      items: [item],
      source: LingoBatchSource.MANUAL,
    })
    if (result.failed) throw new BadRequestException(result.errors[0]!.issues)
    if (result.duplicates)
      throw new BadRequestException(['This item already exists'])
    return result
  }

  async listItems(query: ListQuery) {
    const { where, ...args } = toPrismaListArgs<
      Prisma.LingoItemWhereInput,
      Prisma.LingoItemOrderByWithRelationInput
    >(itemListSpec, query)
    const [items, total] = await Promise.all([
      this.prisma.lingoItem.findMany({
        where,
        ...args,
        include: { questions: { orderBy: { order: 'asc' } } },
      }),
      this.prisma.lingoItem.count({ where }),
    ])
    return paginated(items, total, query)
  }

  async setStatus(ids: string[], status: LingoContentStatus) {
    const { count } = await this.prisma.lingoItem.updateMany({
      where: { id: { in: ids } },
      data: { status },
    })
    return { updated: count }
  }

  batches() {
    return this.prisma.lingoBatch.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { createdBy: { select: { id: true, name: true, email: true } } },
    })
  }

  createDeck(body: CreateDeckDto) {
    if (body.exam) getExam(body.exam)
    return this.prisma.lingoDeck.create({ data: { ...body, ownerId: null } })
  }

  /** CSV rows → cards of a system deck; existing terms are skipped. */
  async importCards(deckId: string, csv: string): Promise<ImportResult> {
    const deck = await this.prisma.lingoDeck.findFirst({
      where: { id: deckId, ownerId: null },
    })
    if (!deck) throw new NotFoundException('Deck not found')
    return this.insertCards(deck.id, parseCsv(csv), 2)
  }

  /**
   * Loads the built-in TOEIC samples (published Part 5 items + a starter deck) so a fresh
   * environment has something to practise. Safe to run twice.
   */
  async loadSamples(userId: string) {
    const items = await this.importItems(userId, {
      exam: 'TOEIC_LR',
      part: 'P5',
      items: TOEIC_PART5_SAMPLES,
      fileName: 'samples',
      status: LingoContentStatus.PUBLISHED,
    })
    const deck =
      (await this.prisma.lingoDeck.findFirst({
        where: { ownerId: null, title: TOEIC_STARTER_DECK.title },
      })) ??
      (await this.prisma.lingoDeck.create({
        data: {
          exam: 'TOEIC_LR',
          title: TOEIC_STARTER_DECK.title,
          description: TOEIC_STARTER_DECK.description,
          language: 'en',
        },
      }))
    const cards = await this.insertCards(deck.id, TOEIC_STARTER_DECK.cards, 1)
    return { items, cards }
  }

  private async insertCards(
    deckId: string,
    rows: unknown[],
    firstLine: number,
  ): Promise<ImportResult> {
    const errors: RowError[] = []
    const valid = rows.flatMap((raw, i) => {
      const result = cardRowSchema.safeParse(raw)
      if (result.success) return [result.data]
      errors.push({ line: i + firstLine, issues: issueLines(result.error) })
      return []
    })
    const { count } = await this.prisma.lingoCard.createMany({
      data: valid.map((row) => ({ ...row, deckId })),
      skipDuplicates: true,
    })
    return {
      succeeded: count,
      duplicates: valid.length - count,
      failed: errors.length,
      errors,
    }
  }
}
