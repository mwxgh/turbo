import { Injectable } from '@nestjs/common'

import { LingoContentStatus } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { dayStreak, toDateKey } from '@repo/utils'

import type { UpdateGoalDto } from './dto/goal.dto'
import { EXAMS, type ExamSpec, getExam } from './specs'
import { VocabService } from './vocab.service'

/** Weak skill tags need this many answers before they are reported. */
const MIN_TAG_ANSWERS = 3
/** Answers looked at for accuracy by part / tag. */
const STATS_WINDOW = 500

const examSummary = (exam: ExamSpec) => ({
  code: exam.code,
  name: exam.name,
  language: exam.language,
  available: exam.available,
})

@Injectable()
export class LingoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vocab: VocabService,
  ) {}

  exams() {
    return EXAMS.map(examSummary)
  }

  /** The exam's structure plus how many published questions each part has. */
  async exam(code: string) {
    const exam = getExam(code)
    const parts = exam.sections.flatMap((section) => section.parts)
    const counts = await Promise.all(
      parts.map((part) =>
        this.prisma.lingoQuestion.count({
          where: {
            item: {
              exam: code,
              part: part.code,
              status: LingoContentStatus.PUBLISHED,
            },
          },
        }),
      ),
    )
    const published = Object.fromEntries(
      parts.map((part, i) => [part.code, counts[i]!]),
    )

    return {
      ...examSummary(exam),
      skillTags: exam.skillTags,
      difficulties: exam.difficulties,
      sections: exam.sections.map((section) => ({
        code: section.code,
        name: section.name,
        minutes: section.minutes,
        scoreMin: section.score.min,
        scoreMax: section.score.max,
        parts: section.parts.map((part) => ({
          code: part.code,
          name: part.name,
          nameVi: part.nameVi,
          count: part.count,
          options: part.options,
          media: part.media,
          spokenOptions: part.spokenOptions,
          questionsPerItem: part.questionsPerItem,
          available: part.available,
          published: published[part.code] ?? 0,
        })),
      })),
    }
  }

  async goal(userId: string, exam: string) {
    getExam(exam)
    const goal = await this.prisma.lingoGoal.findUnique({
      where: { userId_exam: { userId, exam } },
    })
    return (
      goal ?? {
        userId,
        exam,
        targetScore: null,
        examDate: null,
        newCardsPerDay: 20,
        updatedAt: null,
      }
    )
  }

  updateGoal(userId: string, exam: string, body: UpdateGoalDto) {
    getExam(exam)
    const data = {
      targetScore: body.targetScore,
      examDate:
        body.examDate === undefined
          ? undefined
          : body.examDate && new Date(body.examDate.slice(0, 10)),
      newCardsPerDay: body.newCardsPerDay,
    }
    return this.prisma.lingoGoal.upsert({
      where: { userId_exam: { userId, exam } },
      create: { userId, exam, ...data },
      update: data,
    })
  }

  async dashboard(userId: string, code: string) {
    const exam = getExam(code)
    const [goal, review, attempts, answers, reviewDays] = await Promise.all([
      this.goal(userId, code),
      this.vocab.queueCounts(userId, code),
      this.prisma.lingoAttempt.findMany({
        where: { userId, exam: code, submittedAt: { not: null } },
        orderBy: { submittedAt: 'desc' },
        select: {
          id: true,
          mode: true,
          parts: true,
          total: true,
          correct: true,
          submittedAt: true,
        },
      }),
      this.prisma.lingoAnswer.findMany({
        where: {
          correct: { not: null },
          attempt: { userId, exam: code, submittedAt: { not: null } },
        },
        orderBy: { answeredAt: 'desc' },
        take: STATS_WINDOW,
        select: {
          correct: true,
          question: {
            select: { skillTags: true, item: { select: { part: true } } },
          },
        },
      }),
      this.prisma.lingoCardState.findMany({
        where: { userId, lastReview: { not: null } },
        select: { lastReview: true },
        orderBy: { lastReview: 'desc' },
        take: 2000,
      }),
    ])

    const byPart = new Map<string, { correct: number; total: number }>()
    const byTag = new Map<string, { correct: number; total: number }>()
    const add = (map: typeof byPart, key: string, ok: boolean) => {
      const entry = map.get(key) ?? { correct: 0, total: 0 }
      entry.total++
      if (ok) entry.correct++
      map.set(key, entry)
    }
    for (const a of answers) {
      add(byPart, a.question.item.part, a.correct!)
      for (const tag of a.question.skillTags) add(byTag, tag, a.correct!)
    }
    const accuracy = (e: { correct: number; total: number }) =>
      e.total ? e.correct / e.total : 0

    const studyDays = new Set([
      ...attempts.map((a) => toDateKey(a.submittedAt!)),
      ...reviewDays.map((r) => toDateKey(r.lastReview!)),
    ])

    return {
      goal,
      review,
      totals: {
        attempts: attempts.length,
        answered: answers.length,
        accuracy: accuracy({
          correct: answers.filter((a) => a.correct).length,
          total: answers.length,
        }),
      },
      parts: [...byPart].map(([part, e]) => ({
        part,
        ...e,
        accuracy: accuracy(e),
      })),
      weakTags: [...byTag]
        .filter(([, e]) => e.total >= MIN_TAG_ANSWERS)
        .map(([tag, e]) => ({
          tag,
          label: exam.skillTags[tag] ?? tag,
          ...e,
          accuracy: accuracy(e),
        }))
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, 3),
      streak: streak(studyDays),
      recentAttempts: attempts.slice(0, 5),
    }
  }
}

/** Consecutive study days ending today (or yesterday, so the streak survives until tonight). */
export const streak = (days: Set<string>, now = new Date()): number =>
  dayStreak(days, now)
