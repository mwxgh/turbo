import { Injectable } from '@nestjs/common'

import { LingoAttemptMode, LingoTestKind } from '@repo/db'
import { PrismaService } from '@repo/db/nest'

import { LingoService } from './lingo.service'
import { PART_WINDOW, type RoadmapStats, buildRoadmap } from './roadmap'
import { getExam } from './specs'
import {
  PLAN_WEEKS,
  type WeekStats,
  buildStudyPlan,
  currentWeekOf,
  dayStart,
} from './study-plan'

type Scores = Record<string, { scaled?: number }> | null

/** Sum of the scaled sections, or null when one is missing. */
function totalOf(scores: Scores): number | null {
  const scaled = Object.values(scores ?? {}).map((s) => s.scaled)
  if (!scaled.length) return null
  let total = 0
  for (const s of scaled) {
    if (s === undefined) return null
    total += s
  }
  return total
}

/** ts-fsrs Review state: the card was learned at least once */
const REVIEW_STATE = 2

@Injectable()
export class RoadmapService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lingo: LingoService,
  ) {}

  async roadmap(userId: string, code: string) {
    const exam = getExam(code)
    const parts = exam.sections.flatMap((s) => s.parts.map((p) => p.code))
    const [goal, scored, tests, wordsLearned, ...answers] = await Promise.all([
      this.lingo.goal(userId, exam.code),
      this.prisma.lingoAttempt.findMany({
        where: {
          userId,
          exam: exam.code,
          submittedAt: { not: null },
          mode: {
            in: [LingoAttemptMode.FULL_TEST, LingoAttemptMode.PLACEMENT],
          },
        },
        orderBy: { submittedAt: 'desc' },
        select: { mode: true, scores: true, testId: true, submittedAt: true },
      }),
      this.prisma.lingoAttempt.findMany({
        where: {
          userId,
          exam: exam.code,
          submittedAt: { not: null },
          mode: LingoAttemptMode.FULL_TEST,
          testId: { not: null },
        },
        select: { test: { select: { kind: true } } },
      }),
      this.prisma.lingoCardState.count({
        where: { userId, state: { gte: REVIEW_STATE } },
      }),
      ...parts.map((part) =>
        this.prisma.lingoAnswer.findMany({
          where: {
            correct: { not: null },
            question: { item: { part } },
            attempt: { userId, exam: exam.code, submittedAt: { not: null } },
          },
          orderBy: { answeredAt: 'desc' },
          take: PART_WINDOW,
          select: { correct: true },
        }),
      ),
    ])

    const totals = scored.map((a) => ({
      mode: a.mode,
      total: totalOf(a.scores as Scores),
    }))
    const stats: RoadmapStats = {
      estimate: totals.find((t) => t.total !== null)?.total ?? null,
      fullScores: totals
        .filter((t) => t.mode === LingoAttemptMode.FULL_TEST)
        .flatMap((t) => (t.total === null ? [] : [t.total])),
      parts: Object.fromEntries(
        parts.map((part, i) => [
          part,
          {
            correct: answers[i]!.filter((a) => a.correct).length,
            total: answers[i]!.length,
          },
        ]),
      ),
      wordsLearned,
      tests: {
        MINI: tests.filter((t) => t.test?.kind === LingoTestKind.MINI).length,
        FULL: tests.filter((t) => t.test?.kind === LingoTestKind.FULL).length,
      },
      placementDone: totals.some((t) => t.mode === LingoAttemptMode.PLACEMENT),
    }
    const roadmap = buildRoadmap(stats, goal.targetScore)

    // The plan starts on the day of the first placement test
    const placedAt = scored
      .filter((a) => a.mode === LingoAttemptMode.PLACEMENT && a.submittedAt)
      .at(-1)?.submittedAt
    const start = placedAt ? dayStart(placedAt) : null
    const weeks = start
      ? await this.planWeeks(userId, exam.code, parts, start)
      : []
    return {
      ...roadmap,
      plan: buildStudyPlan(start, weeks, roadmap.target, new Date()),
    }
  }

  /** Activity of each week from `start` up to now (at most PLAN_WEEKS weeks). */
  private async planWeeks(
    userId: string,
    exam: string,
    parts: string[],
    start: Date,
  ): Promise<WeekStats[]> {
    const now = new Date()
    const last = currentWeekOf(start, now) ?? PLAN_WEEKS
    const weekOf = (date: Date) =>
      Math.floor((date.getTime() - start.getTime()) / (7 * 24 * 3600 * 1000))
    const [answers, cards, tests] = await Promise.all([
      this.prisma.lingoAnswer.findMany({
        where: {
          correct: { not: null },
          answeredAt: { gte: start },
          attempt: { userId, exam, submittedAt: { not: null } },
        },
        select: {
          correct: true,
          answeredAt: true,
          question: { select: { item: { select: { part: true } } } },
        },
      }),
      this.prisma.lingoCardState.findMany({
        where: { userId, createdAt: { gte: start } },
        select: { createdAt: true },
      }),
      this.prisma.lingoAttempt.findMany({
        where: {
          userId,
          exam,
          mode: LingoAttemptMode.FULL_TEST,
          testId: { not: null },
          submittedAt: { gte: start },
        },
        select: { submittedAt: true, test: { select: { kind: true } } },
      }),
    ])

    const weeks: WeekStats[] = Array.from({ length: last }, () => ({
      parts: Object.fromEntries(
        parts.map((p) => [p, { correct: 0, total: 0 }]),
      ),
      wordsLearned: 0,
      tests: { MINI: 0, FULL: 0 },
    }))
    for (const a of answers) {
      const w = weeks[weekOf(a.answeredAt!)]
      const s = w?.parts[a.question.item.part]
      if (!s) continue
      s.total++
      if (a.correct) s.correct++
    }
    for (const c of cards) {
      const w = weeks[weekOf(c.createdAt)]
      if (w) w.wordsLearned++
    }
    for (const t of tests) {
      const w = weeks[weekOf(t.submittedAt!)]
      if (w && t.test) w.tests[t.test.kind]++
    }
    return weeks
  }
}
