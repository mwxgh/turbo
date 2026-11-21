import { Injectable } from '@nestjs/common'

import { LingoAttemptMode, LingoTestKind } from '@repo/db'
import { PrismaService } from '@repo/db/nest'

import { LingoService } from './lingo.service'
import { PART_WINDOW, type RoadmapStats, buildRoadmap } from './roadmap'
import { getExam } from './specs'

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
        select: { mode: true, scores: true, testId: true },
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
    return buildRoadmap(stats, goal.targetScore)
  }
}
