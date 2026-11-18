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

import type { SaveAnswerDto, StartAttemptDto } from './dto/attempt.dto'
import { attemptListSpec } from './lingo.list-spec'
import { getExam, getPart } from './specs'
import { scaledScore } from './specs/score'

const DEFAULT_COUNT = 10

interface ChoicePrompt {
  text?: string
  options: string[]
}
interface ChoiceAnswer {
  choice: number
}

const answerInclude = {
  question: {
    include: {
      item: {
        select: {
          part: true,
          section: true,
          content: true,
          difficulty: true,
          topic: true,
        },
      },
    },
  },
} satisfies Prisma.LingoAnswerInclude

type AnswerRow = Prisma.LingoAnswerGetPayload<{ include: typeof answerInclude }>

/** Fisher–Yates, in place. */
function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j]!, items[i]!]
  }
  return items
}

@Injectable()
export class PracticeService {
  constructor(private readonly prisma: PrismaService) {}

  /** Picks published questions of one part (unseen first, or last-wrong ones) and starts an attempt. */
  async start(userId: string, body: StartAttemptDto) {
    const exam = getExam(body.exam)
    const { part } = getPart(exam, body.part)
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
      },
    })
    if (!attempt) throw new NotFoundException('Attempt not found')
    const submitted = attempt.submittedAt !== null
    const { answers, ...rest } = attempt
    return {
      ...rest,
      questions: answers.map((a) => questionView(a, submitted)),
    }
  }

  list(userId: string, query: ListQuery) {
    const { where, ...args } = toPrismaListArgs<
      Prisma.LingoAttemptWhereInput,
      Prisma.LingoAttemptOrderByWithRelationInput
    >(attemptListSpec, query)
    const scoped = { ...where, userId }
    return Promise.all([
      this.prisma.lingoAttempt.findMany({ where: scoped, ...args }),
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
        attempt: { select: { submittedAt: true } },
        question: { select: { prompt: true } },
      },
    })
    if (!answer) throw new NotFoundException('Question not in this attempt')
    if (answer.attempt.submittedAt)
      throw new ConflictException('Attempt already submitted')

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
    if (attempt.mode === LingoAttemptMode.FULL_TEST)
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
    return latest
      .filter((a) => a.correct === false)
      .map((a) => ({ ...questionView(a, true), answeredAt: a.answeredAt }))
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

function questionView(a: AnswerRow, reveal: boolean) {
  const q = a.question
  const prompt = q.prompt as unknown as ChoicePrompt
  const base = {
    id: q.id,
    order: a.order,
    type: q.type,
    part: q.item.part,
    passage: (q.item.content as { passage?: string } | null)?.passage ?? null,
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
  }
}
