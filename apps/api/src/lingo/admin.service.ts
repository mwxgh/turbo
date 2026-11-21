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
import { TOEIC_MORE_SAMPLES } from './fixtures/toeic-more'
import { TOEIC_PART5_SAMPLES, TOEIC_STARTER_DECK } from './fixtures/toeic-part5'
import { itemListSpec } from './lingo.list-spec'
import { findPart, getExam, getPart } from './specs'
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
    getPart(exam, input.part)
    const batch = await this.prisma.lingoBatch.create({
      data: {
        source: input.source ?? LingoBatchSource.IMPORT,
        exam: exam.code,
        part: input.part,
        fileName: input.fileName ?? null,
        createdById: userId,
      },
    })
    const stored = await this.storeItems(
      batch.id,
      exam.code,
      input.part,
      input.items,
      () => input.status ?? LingoContentStatus.DRAFT,
    )
    await this.prisma.lingoBatch.update({
      where: { id: batch.id },
      data: {
        succeeded: stored.succeeded,
        failed: stored.failed,
        errors: stored.errors.length
          ? (stored.errors as unknown as Prisma.InputJsonValue)
          : undefined,
      },
    })
    const { ids: _ids, ...result } = stored
    return { batchId: batch.id, ...result }
  }

  /**
   * Validates and stores items into an existing batch (imports, AI runs). `statusOf` gets the
   * index of each raw item. Same text as a stored item (or an earlier one here) is skipped.
   */
  async storeItems(
    batchId: string,
    examCode: string,
    partCode: string,
    raw: unknown[],
    statusOf: (index: number) => LingoContentStatus,
  ): Promise<ImportResult & { ids: string[] }> {
    const exam = getExam(examCode)
    const { section, part } = getPart(exam, partCode)
    const schema = itemSchema(exam, part)

    const errors: RowError[] = []
    const valid = raw.flatMap((input, i) => {
      const result = schema.safeParse(input)
      if (result.success) return [{ item: result.data, index: i }]
      errors.push({ line: i + 1, issues: issueLines(result.error) })
      return []
    })

    // Skip items already stored (same text), including repeats inside the input
    const hashes = valid.map(({ item }) => itemHash(exam.code, part.code, item))
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

    // Nested creates (questions) need one create per item
    const created = await this.prisma.$transaction(
      fresh.map(({ item, index }) =>
        this.prisma.lingoItem.create({
          data: itemCreateData(
            exam,
            section,
            part,
            item,
            statusOf(index),
            batchId,
          ),
          select: { id: true },
        }),
      ),
    )
    return {
      ids: created.map((item) => item.id),
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
    if (status === LingoContentStatus.PUBLISHED) {
      // Photo parts (TOEIC Part 1) cannot go out without their photo
      const missing = await this.prisma.lingoItem.findMany({
        where: { id: { in: ids }, imageKey: null },
        select: { exam: true, part: true },
      })
      const needsPhoto = missing.filter((item) =>
        findPart(getExam(item.exam), item.part)?.part.media.includes('image'),
      )
      if (needsPhoto.length)
        throw new BadRequestException(
          `${needsPhoto.length} photo item(s) have no photo yet: upload one first`,
        )
    }
    const { count } = await this.prisma.lingoItem.updateMany({
      where: { id: { in: ids } },
      data: { status },
    })
    return { updated: count }
  }

  /** Attaches an uploaded photo (TOEIC Part 1) to an item. */
  async setImage(id: string, key: string) {
    if (!/^uploads\/[\w./-]+$/.test(key) || key.split('/').includes('..'))
      throw new BadRequestException('Not an uploaded file key')
    const item = await this.prisma.lingoItem.findUnique({
      where: { id },
      select: { exam: true, part: true },
    })
    if (!item) throw new NotFoundException('Item not found')
    if (!findPart(getExam(item.exam), item.part)?.part.media.includes('image'))
      throw new BadRequestException(`${item.part} items have no photo`)
    return this.prisma.lingoItem.update({
      where: { id },
      data: { imageKey: key },
      select: { id: true, imageKey: true },
    })
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
   * Loads the built-in TOEIC samples (published items of Parts 2–7 + a starter deck) so a fresh
   * environment has something to practise. Safe to run twice.
   */
  async loadSamples(userId: string) {
    const samples = { P5: TOEIC_PART5_SAMPLES, ...TOEIC_MORE_SAMPLES }
    const results = []
    for (const [part, partItems] of Object.entries(samples))
      results.push(
        await this.importItems(userId, {
          exam: 'TOEIC_LR',
          part,
          items: partItems,
          fileName: 'samples',
          status: LingoContentStatus.PUBLISHED,
        }),
      )
    const items = {
      succeeded: results.reduce((sum, r) => sum + r.succeeded, 0),
      duplicates: results.reduce((sum, r) => sum + r.duplicates, 0),
      failed: results.reduce((sum, r) => sum + r.failed, 0),
      errors: results.flatMap((r) => r.errors),
    }
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

  /** Validated CSV / AI rows → cards of a deck; existing terms are skipped. */
  async insertCards(
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
