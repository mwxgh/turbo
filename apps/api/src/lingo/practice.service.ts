import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import {
  LingoAttemptMode,
  LingoContentStatus,
  Prisma,
  toPrismaListArgs,
} from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { type ListQuery, paginated } from '@repo/utils'

import { FilesService } from '../files/files.service'
import { pickItems, shuffle, timeLimitSec } from './assemble'
import {
  type SaveAnswerDto,
  type StartAttemptDto,
  TestMode,
} from './dto/attempt.dto'
import { attemptListSpec } from './lingo.list-spec'
import { PLACEMENT_COUNTS } from './roadmap'
import { type ExamSpec, getExam, getPart } from './specs'
import type { ScriptLine } from './specs/schemas'
import { scaledScore } from './specs/score'

const DEFAULT_COUNT = 10

interface ChoicePrompt {
  text?: string
  options: string[]
}
interface ChoiceAnswer {
  choice: number
}
interface ItemContent {
  passage?: string
  transcript?: ScriptLine[]
  accent?: string
  scene?: string
}

/** Answers saved this long after the time limit still count (network, clock skew). */
const GRACE_MS = 60_000

const answerInclude = {
  question: {
    include: {
      item: {
        select: {
          id: true,
          part: true,
          section: true,
          content: true,
          imageKey: true,
          difficulty: true,
          topic: true,
        },
      },
    },
  },
} satisfies Prisma.LingoAnswerInclude

type AnswerRow = Prisma.LingoAnswerGetPayload<{ include: typeof answerInclude }>

@Injectable()
export class PracticeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly files: FilesService,
  ) {}

  /** A quick practice of one part, (parts of) a published test, or the placement test. */
  start(userId: string, body: StartAttemptDto) {
    const exam = getExam(body.exam)
    if (body.placement) return this.startPlacement(userId, exam)
    if (body.testId) return this.startTest(userId, exam, body.testId, body)
    if (!body.part) throw new BadRequestException('part or testId is required')
    return this.startQuick(userId, exam, body.part, body)
  }

  /**
   * FULL_TEST: every question, the test's time limit, scaled score. PRACTICE: the chosen parts,
   * with the timer the learner picked (or none).
   */
  private async startTest(
    userId: string,
    exam: ExamSpec,
    testId: string,
    body: StartAttemptDto,
  ) {
    const test = await this.prisma.lingoTest.findFirst({
      where: {
        id: testId,
        exam: exam.code,
        status: LingoContentStatus.PUBLISHED,
      },
      include: {
        items: {
          orderBy: { order: 'asc' },
          include: {
            item: {
              select: {
                part: true,
                questions: { select: { id: true }, orderBy: { order: 'asc' } },
              },
            },
          },
        },
      },
    })
    if (!test) throw new NotFoundException('Test not found')

    const full = body.mode !== TestMode.PRACTICE
    const wanted = !full && body.parts?.length ? new Set(body.parts) : null
    const rows = test.items.filter(
      (row) => !wanted || wanted.has(row.item.part),
    )
    if (!rows.length)
      throw new BadRequestException('The test has none of these parts')

    const perPart: Record<string, number> = {}
    for (const row of rows)
      perPart[row.item.part] =
        (perPart[row.item.part] ?? 0) + row.item.questions.length
    const questionIds = rows.flatMap((row) =>
      row.item.questions.map((q) => q.id),
    )
    const attempt = await this.prisma.lingoAttempt.create({
      data: {
        userId,
        exam: exam.code,
        testId: test.id,
        mode: full ? LingoAttemptMode.FULL_TEST : LingoAttemptMode.PRACTICE,
        parts: Object.keys(perPart),
        timeLimitSec: full ? timeLimitSec(exam, perPart) : body.timeLimitSec,
        total: questionIds.length,
        answers: {
          create: questionIds.map((questionId, order) => ({
            questionId,
            order,
          })),
        },
      },
    })
    return this.view(userId, attempt.id)
  }

  /**
   * Placement test: PLACEMENT_COUNTS questions of each part from published items (parts without
   * content are left out), in exam order, timed like the same share of the real exam.
   */
  private async startPlacement(userId: string, exam: ExamSpec) {
    const items = await this.prisma.lingoItem.findMany({
      where: { exam: exam.code, status: LingoContentStatus.PUBLISHED },
      select: {
        id: true,
        part: true,
        questions: { select: { id: true }, orderBy: { order: 'asc' } },
      },
    })
    const perPart: Record<string, number> = {}
    const questionIds: string[] = []
    for (const section of exam.sections)
      for (const part of section.parts) {
        const target = PLACEMENT_COUNTS[part.code] ?? 0
        const pool = shuffle(items.filter((i) => i.part === part.code))
        const picked = new Set(
          pickItems(
            pool.map((i) => ({
              id: i.id,
              size: i.questions.length,
              used: false,
            })),
            target,
          ),
        )
        for (const item of pool.filter((i) => picked.has(i.id))) {
          questionIds.push(...item.questions.map((q) => q.id))
          perPart[part.code] = (perPart[part.code] ?? 0) + item.questions.length
        }
      }
    if (!questionIds.length)
      throw new NotFoundException('No published questions for a placement test')

    const attempt = await this.prisma.lingoAttempt.create({
      data: {
        userId,
        exam: exam.code,
        mode: LingoAttemptMode.PLACEMENT,
        parts: Object.keys(perPart),
        timeLimitSec: timeLimitSec(exam, perPart),
        total: questionIds.length,
        answers: {
          create: questionIds.map((questionId, order) => ({
            questionId,
            order,
          })),
        },
      },
    })
    return this.view(userId, attempt.id)
  }

  /** Picks published questions of one part (unseen first, or last-wrong ones). */
  private async startQuick(
    userId: string,
    exam: ExamSpec,
    partCode: string,
    body: StartAttemptDto,
  ) {
    const { part } = getPart(exam, partCode)
    const count = body.count ?? DEFAULT_COUNT

    const items = await this.prisma.lingoItem.findMany({
      where: {
        exam: exam.code,
        part: part.code,
        status: LingoContentStatus.PUBLISHED,
        ...(body.difficulty && { difficulty: body.difficulty }),
      },
      select: {
        id: true,
        questions: { select: { id: true }, orderBy: { order: 'asc' } },
      },
    })
    if (!items.length)
      throw new NotFoundException('No published questions for this part yet')

    const history = await this.lastAnswers(userId, exam.code)
    let pool = shuffle(items)
    if (body.source === 'MISTAKES') {
      pool = pool.filter((item) =>
        item.questions.some((q) => history.get(q.id) === false),
      )
      if (!pool.length) throw new NotFoundException('No mistakes to practise')
    } else {
      // Unseen items first, then the rest (already shuffled)
      const seen = (item: (typeof items)[number]) =>
        item.questions.some((q) => history.has(q.id))
      pool = [...pool.filter((i) => !seen(i)), ...pool.filter(seen)]
    }

    const questionIds: string[] = []
    for (const item of pool) {
      if (questionIds.length >= count) break
      questionIds.push(...item.questions.map((q) => q.id))
    }

    const attempt = await this.prisma.lingoAttempt.create({
      data: {
        userId,
        exam: exam.code,
        mode: LingoAttemptMode.QUICK,
        parts: [part.code],
        total: questionIds.length,
        answers: {
          create: questionIds.map((questionId, order) => ({
            questionId,
            order,
          })),
        },
      },
    })
    return this.view(userId, attempt.id)
  }

  /** The attempt with its questions; answers and explanations only once submitted. */
  async view(userId: string, id: string) {
    const attempt = await this.prisma.lingoAttempt.findFirst({
      where: { id, userId },
      include: {
        answers: { include: answerInclude, orderBy: { order: 'asc' } },
        test: { select: { id: true, title: true, kind: true } },
      },
    })
    if (!attempt) throw new NotFoundException('Attempt not found')
    const submitted = attempt.submittedAt !== null
    const { answers, ...rest } = attempt
    return {
      ...rest,
      deadline: attempt.timeLimitSec
        ? new Date(attempt.startedAt.getTime() + attempt.timeLimitSec * 1000)
        : null,
      questions: await this.questionViews(answers, submitted),
    }
  }

  /** Questions as the runner / result page shows them, photos as temporary URLs. */
  private async questionViews(rows: AnswerRow[], reveal: boolean) {
    const keys = [
      ...new Set(rows.flatMap((a) => a.question.item.imageKey ?? [])),
    ]
    const urls = new Map(
      await Promise.all(
        keys.map(async (key) => [key, await this.files.readUrl(key)] as const),
      ),
    )
    return rows.map((a) => questionView(a, reveal, urls))
  }

  list(userId: string, query: ListQuery) {
    const { where, ...args } = toPrismaListArgs<
      Prisma.LingoAttemptWhereInput,
      Prisma.LingoAttemptOrderByWithRelationInput
    >(attemptListSpec, query)
    const scoped = { ...where, userId }
    return Promise.all([
      this.prisma.lingoAttempt.findMany({
        where: scoped,
        ...args,
        include: { test: { select: { id: true, title: true, kind: true } } },
      }),
      this.prisma.lingoAttempt.count({ where: scoped }),
    ]).then(([items, total]) => paginated(items, total, query))
  }

  async saveAnswer(
    userId: string,
    attemptId: string,
    questionId: string,
    body: SaveAnswerDto,
  ) {
    const answer = await this.prisma.lingoAnswer.findFirst({
      where: { attemptId, questionId, attempt: { userId } },
      include: {
        attempt: {
          select: { submittedAt: true, startedAt: true, timeLimitSec: true },
        },
        question: { select: { prompt: true } },
      },
    })
    if (!answer) throw new NotFoundException('Question not in this attempt')
    const { attempt } = answer
    if (attempt.submittedAt)
      throw new ConflictException('Attempt already submitted')
    if (
      attempt.timeLimitSec &&
      Date.now() >
        attempt.startedAt.getTime() + attempt.timeLimitSec * 1000 + GRACE_MS
    )
      throw new ConflictException('Time is up')

    const options = (answer.question.prompt as unknown as ChoicePrompt).options
    if (body.choice != null && body.choice >= options.length)
      throw new BadRequestException(`choice must be below ${options.length}`)

    await this.prisma.lingoAnswer.update({
      where: { id: answer.id },
      data: {
        ...(body.choice !== undefined && {
          response:
            body.choice === null ? Prisma.DbNull : { choice: body.choice },
          answeredAt: new Date(),
        }),
        ...(body.timeMs !== undefined && { timeMs: body.timeMs }),
        ...(body.flagged !== undefined && { flagged: body.flagged }),
      },
    })
  }

  /** Grades every answer; unanswered questions count as wrong. */
  async submit(userId: string, id: string) {
    const attempt = await this.prisma.lingoAttempt.findFirst({
      where: { id, userId },
      include: { answers: { include: answerInclude } },
    })
    if (!attempt) throw new NotFoundException('Attempt not found')
    if (attempt.submittedAt) return this.view(userId, id)

    const exam = getExam(attempt.exam)
    const graded = attempt.answers.map((a) => {
      const choice = (a.response as unknown as ChoiceAnswer | null)?.choice
      const correct =
        choice !== undefined &&
        choice === (a.question.answer as unknown as ChoiceAnswer).choice
      return {
        id: a.id,
        section: a.question.item.section,
        correct,
        answeredAt: a.answeredAt,
      }
    })

    const scores: Record<
      string,
      { correct: number; total: number; scaled?: number }
    > = {}
    for (const g of graded) {
      const s = (scores[g.section] ??= { correct: 0, total: 0 })
      s.total++
      if (g.correct) s.correct++
    }
    // Scaled only where every part is sampled: a full test or the placement test
    if (
      attempt.mode === LingoAttemptMode.FULL_TEST ||
      attempt.mode === LingoAttemptMode.PLACEMENT
    )
      for (const section of exam.sections) {
        const s = scores[section.code]
        if (s) s.scaled = scaledScore(section.score, s.correct, s.total)
      }

    const now = new Date()
    await this.prisma.$transaction([
      ...graded.map((g) =>
        this.prisma.lingoAnswer.update({
          where: { id: g.id },
          data: { correct: g.correct, answeredAt: g.answeredAt ?? now },
        }),
      ),
      this.prisma.lingoAttempt.update({
        where: { id },
        data: {
          submittedAt: now,
          correct: graded.filter((g) => g.correct).length,
          scores,
        },
      }),
    ])
    return this.view(userId, id)
  }

  /** Questions the learner last answered wrong, newest first. */
  async mistakes(userId: string, exam: string) {
    getExam(exam)
    const latest = await this.prisma.lingoAnswer.findMany({
      where: { correct: { not: null }, attempt: { userId, exam } },
      orderBy: [{ answeredAt: 'desc' }, { id: 'desc' }],
      distinct: ['questionId'],
      include: answerInclude,
      take: 500,
    })
    const wrong = latest.filter((a) => a.correct === false)
    const views = await this.questionViews(wrong, true)
    return views.map((view, i) => ({
      ...view,
      answeredAt: wrong[i]!.answeredAt,
    }))
  }

  /** questionId → whether the learner's latest graded answer was correct. */
  private async lastAnswers(userId: string, exam: string) {
    const latest = await this.prisma.lingoAnswer.findMany({
      where: { correct: { not: null }, attempt: { userId, exam } },
      orderBy: [{ answeredAt: 'desc' }, { id: 'desc' }],
      distinct: ['questionId'],
      select: { questionId: true, correct: true },
    })
    return new Map(latest.map((a) => [a.questionId, a.correct!]))
  }
}

/**
 * One question for the learner. Listening scripts are sent before submitting: the browser reads
 * them aloud (no recorded audio yet), the runner keeps them hidden until then.
 */
function questionView(
  a: AnswerRow,
  reveal: boolean,
  imageUrls: Map<string, string>,
) {
  const q = a.question
  const prompt = q.prompt as unknown as ChoicePrompt
  const content = (q.item.content ?? {}) as ItemContent
  const base = {
    id: q.id,
    order: a.order,
    type: q.type,
    itemId: q.item.id,
    section: q.item.section,
    part: q.item.part,
    passage: content.passage ?? null,
    transcript: content.transcript ?? null,
    accent: content.accent ?? null,
    imageUrl: q.item.imageKey ? (imageUrls.get(q.item.imageKey) ?? null) : null,
    text: prompt.text ?? null,
    options: prompt.options,
    response: a.response as unknown as ChoiceAnswer | null,
    flagged: a.flagged,
  }
  if (!reveal) return base
  return {
    ...base,
    correct: a.correct,
    answer: (q.answer as unknown as ChoiceAnswer).choice,
    explanationVi: q.explanationVi,
    translationVi: q.translationVi,
    skillTags: q.skillTags,
    difficulty: q.item.difficulty,
    topic: q.item.topic,
    scene: content.scene ?? null,
  }
}
