import {
  Injectable,
  Logger,
  NotFoundException,
  type OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common'

import {
  LingoBatchSource,
  LingoBatchStatus,
  LingoContentStatus,
  type LingoTestKind,
  type Prisma,
} from '@repo/db'
import { PrismaService } from '@repo/db/nest'

import { AdminService, type ImportResult, type RowError } from './admin.service'
import { ArkModel, extractJson } from './ark-model'
import { partTarget, pickItems } from './assemble'
import {
  type Difficulty,
  cardsPrompt,
  checkPrompt,
  itemsPrompt,
} from './generate-prompts'
import { type ExamSpec, type PartSpec, getExam, getPart } from './specs'
import type { ItemInput } from './specs/schemas'
import { TestsService } from './tests.service'

/** Questions asked for in one model call: long enough to be useful, short enough to finish. */
const QUESTIONS_PER_CALL = 10
/** Model calls running at once in one batch. */
const CONCURRENCY = 3
/** Rounds of top-up generation per part (Part 7 items vary in size, some come out invalid). */
const ROUNDS = 3
/** A RUNNING batch older than this was cut off by a restart. */
const STALE_MS = 2 * 60 * 60 * 1000

export interface GenerateItemsInput {
  exam: string
  part: string
  count: number
  difficulty: Difficulty
  topic?: string
  selfCheck?: boolean
}

export interface GenerateTestInput {
  exam: string
  kind: LingoTestKind
  difficulty: Difficulty
  title: string
  topic?: string
  selfCheck?: boolean
}

/** Runs `fn` over `items`, at most `limit` at a time, results in order. */
export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array<R>(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i]!, i)
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  )
  return results
}

const averageQuestions = (part: PartSpec) =>
  (part.questionsPerItem[0] + part.questionsPerItem[1]) / 2

/** Items per model call for a part (P5: 10 sentences, P7: 2 passages). */
export const itemsPerCall = (part: PartSpec) =>
  Math.max(1, Math.floor(QUESTIONS_PER_CALL / averageQuestions(part)))

/** Splits `total` into calls of at most `size`. */
const chunks = (total: number, size: number) =>
  Array.from({ length: Math.ceil(total / size) }, (_, i) =>
    Math.min(size, total - i * size),
  )

/** Progress of a running batch, written back after every call. */
class Progress {
  succeeded = 0
  failed = 0
  errors: RowError[] = []
  calls = 0

  add(result: ImportResult, call: number) {
    this.succeeded += result.succeeded
    this.failed += result.failed
    this.errors.push(
      ...result.errors.map((e) => ({
        line: e.line,
        issues: e.issues.map((issue) => `call ${call}: ${issue}`),
      })),
    )
  }

  fail(call: number, error: unknown) {
    this.failed++
    this.errors.push({
      line: 0,
      issues: [
        `call ${call}: ${error instanceof Error ? error.message : String(error)}`,
      ],
    })
  }

  get data() {
    return {
      succeeded: this.succeeded,
      failed: this.failed,
      errors: this.errors.length
        ? (this.errors.slice(-50) as unknown as Prisma.InputJsonValue)
        : undefined,
    }
  }
}

/**
 * AI content (BytePlus ModelArk): items of a part, whole tests, vocabulary cards. Items go through
 * the same validation and review as imports (ADR 0013): DRAFT, or NEEDS_REVIEW when the model's
 * own answer disagrees with its answer key. Long runs work in the background and report through
 * their `LingoBatch`.
 */
@Injectable()
export class GeneratorService implements OnModuleInit {
  private readonly logger = new Logger(GeneratorService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly model: ArkModel,
    private readonly admin: AdminService,
    private readonly tests: TestsService,
  ) {}

  /** Runs live in this process: one cut off by a restart will never finish. */
  async onModuleInit() {
    await this.prisma.lingoBatch.updateMany({
      where: {
        status: LingoBatchStatus.RUNNING,
        createdAt: { lt: new Date(Date.now() - STALE_MS) },
      },
      data: { status: LingoBatchStatus.FAILED, message: 'Interrupted' },
    })
  }

  /** Starts generating items of one part; returns the RUNNING batch at once. */
  async generateItems(userId: string, input: GenerateItemsInput) {
    const exam = getExam(input.exam)
    const { part } = getPart(exam, input.part)
    const batch = await this.begin(userId, exam, part.code, { ...input })
    this.background(batch.id, async (progress) => {
      await this.generatePart(
        batch.id,
        exam,
        part,
        input,
        input.count,
        progress,
      )
    })
    return batch
  }

  /**
   * Starts generating a whole test: every part up to its target, then a DRAFT test of those items.
   * Admins review the items, then publish the test.
   */
  async generateTest(userId: string, input: GenerateTestInput) {
    const exam = getExam(input.exam)
    const batch = await this.begin(userId, exam, null, { ...input })
    this.background(batch.id, async (progress) => {
      const itemIds: string[] = []
      for (const section of exam.sections)
        for (const part of section.parts) {
          const target = partTarget(part, input.kind)
          const made: { id: string; size: number }[] = []
          for (let round = 0; round < ROUNDS; round++) {
            const have = made.reduce((sum, item) => sum + item.size, 0)
            if (have >= target) break
            const count = Math.ceil((target - have) / averageQuestions(part))
            made.push(
              ...(await this.generatePart(
                batch.id,
                exam,
                part,
                input,
                count,
                progress,
              )),
            )
          }
          itemIds.push(
            ...pickItems(
              made.map((item) => ({ ...item, used: false })),
              target,
            ),
          )
        }
      if (!itemIds.length) throw new Error('No valid item was generated')
      await this.tests.create({
        exam: exam.code,
        kind: input.kind,
        title: input.title,
        description: `AI · ${input.difficulty}${input.topic ? ` · ${input.topic}` : ''}`,
        itemIds,
        createdById: userId,
        batchId: batch.id,
      })
    })
    return batch
  }

  /** Fills vocabulary cards of a system deck from bare terms (waits for the model). */
  async generateCards(deckId: string, terms: string[]) {
    this.ensureEnabled()
    const deck = await this.prisma.lingoDeck.findFirst({
      where: { id: deckId, ownerId: null },
    })
    if (!deck) throw new NotFoundException('Deck not found')
    const exam = deck.exam ? getExam(deck.exam) : undefined
    const answer = extractJson(
      await this.model.complete(cardsPrompt(exam, deck.language, terms)),
    ) as { cards?: unknown }
    const cards = Array.isArray(answer.cards) ? answer.cards : []
    return this.admin.insertCards(deck.id, cards, 1)
  }

  private ensureEnabled() {
    if (!this.model.enabled)
      throw new ServiceUnavailableException('AI is not configured')
  }

  private begin(
    userId: string,
    exam: ExamSpec,
    part: string | null,
    request: Prisma.InputJsonObject,
  ) {
    this.ensureEnabled()
    return this.prisma.lingoBatch.create({
      data: {
        source: LingoBatchSource.AI,
        status: LingoBatchStatus.RUNNING,
        exam: exam.code,
        part,
        request,
        createdById: userId,
      },
    })
  }

  /** Runs a job after the response; its batch ends DONE or FAILED. */
  private background(
    batchId: string,
    job: (progress: Progress) => Promise<void>,
  ) {
    const progress = new Progress()
    const finish = (status: LingoBatchStatus, message?: string) =>
      this.prisma.lingoBatch.update({
        where: { id: batchId },
        data: { ...progress.data, status, message: message?.slice(0, 1000) },
      })
    void job(progress)
      .then(() =>
        progress.succeeded
          ? finish(LingoBatchStatus.DONE)
          : finish(LingoBatchStatus.FAILED, 'No valid item was generated'),
      )
      .catch(async (error: unknown) => {
        this.logger.error(error)
        await finish(
          LingoBatchStatus.FAILED,
          error instanceof Error ? error.message : String(error),
        )
      })
      .catch((error: unknown) => this.logger.error(error))
  }

  /** `count` items of a part in parallel calls; returns the stored ones. */
  private async generatePart(
    batchId: string,
    exam: ExamSpec,
    part: PartSpec,
    input: { difficulty: Difficulty; topic?: string; selfCheck?: boolean },
    count: number,
    progress: Progress,
  ) {
    const made = await mapLimit(
      chunks(count, itemsPerCall(part)),
      CONCURRENCY,
      async (size) => {
        const call = ++progress.calls
        try {
          const answer = extractJson(
            await this.model.complete(
              itemsPrompt(exam, part, { ...input, count: size }),
            ),
          ) as { items?: unknown }
          const raw = Array.isArray(answer.items) ? answer.items : []
          const review = input.selfCheck
            ? await this.disagreements(exam, part, raw)
            : new Set<number>()
          const result = await this.admin.storeItems(
            batchId,
            exam.code,
            part.code,
            raw,
            (i) =>
              review.has(i)
                ? LingoContentStatus.NEEDS_REVIEW
                : LingoContentStatus.DRAFT,
          )
          progress.add(result, call)
          return result.ids
        } catch (error) {
          progress.fail(call, error)
          return []
        } finally {
          await this.prisma.lingoBatch.update({
            where: { id: batchId },
            data: progress.data,
          })
        }
      },
    )
    const ids = made.flat()
    const sizes = await this.prisma.lingoQuestion.groupBy({
      by: ['itemId'],
      where: { itemId: { in: ids } },
      _count: true,
    })
    const size = new Map(sizes.map((row) => [row.itemId, row._count]))
    return ids.map((id) => ({ id, size: size.get(id) ?? 0 }))
  }

  /**
   * Indexes of raw items whose answer key the model does not reproduce. Invalid items are left
   * to validation; a failed check sends every item to review.
   */
  private async disagreements(
    exam: ExamSpec,
    part: PartSpec,
    raw: unknown[],
  ): Promise<Set<number>> {
    const items = raw as Partial<ItemInput>[]
    const checkable = items.flatMap((item, index) =>
      Array.isArray(item?.questions) ? [{ item, index }] : [],
    )
    if (!checkable.length) return new Set()
    try {
      const answer = extractJson(
        await this.model.complete(
          checkPrompt(
            exam,
            part,
            checkable.map(({ item }) => ({
              passage: item.passage,
              transcript: item.transcript,
              scene: item.scene,
              questions: item.questions!.map((q) => ({
                text: q.text,
                options: q.options,
              })),
            })),
          ),
        ),
      ) as { items?: { answers?: unknown }[] }
      const solved = Array.isArray(answer.items) ? answer.items : []
      return new Set(
        checkable
          .filter(({ item }, i) => {
            const answers = solved[i]?.answers
            return (
              !Array.isArray(answers) ||
              item.questions!.some((q, j) => answers[j] !== q.answer)
            )
          })
          .map(({ index }) => index),
      )
    } catch (error) {
      this.logger.warn(`Self-check failed: ${String(error)}`)
      return new Set(checkable.map(({ index }) => index))
    }
  }
}
