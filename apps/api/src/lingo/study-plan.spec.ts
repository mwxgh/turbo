import { describe, expect, it } from 'vitest'

import { LESSON_IDS } from './lessons/plan'
import {
  PLAN_WEEKS,
  TOEIC_PLAN,
  type WeekStats,
  buildStudyPlan,
  currentWeekOf,
  dayStart,
} from './study-plan'

const monday = new Date('2026-11-16T00:00:00.000Z')
const day = (n: number) => new Date(monday.getTime() + n * 24 * 3600 * 1000)

const idle = (): WeekStats => ({
  parts: {},
  wordsLearned: 0,
  tests: { MINI: 0, FULL: 0 },
})

/** Exactly what week `n` asks, at full accuracy. */
const doneWeek = (n: number): WeekStats => {
  const spec = TOEIC_PLAN[n - 1]!
  return {
    parts: Object.fromEntries(
      Object.entries(spec.parts).map(([p, count]) => [
        p,
        { correct: count, total: count },
      ]),
    ),
    wordsLearned: spec.words,
    tests: { MINI: spec.tests?.MINI ?? 0, FULL: spec.tests?.FULL ?? 0 },
  }
}

describe('study plan', () => {
  it('has twelve weeks, each asking for words and some practice', () => {
    expect(TOEIC_PLAN).toHaveLength(PLAN_WEEKS)
    for (const week of TOEIC_PLAN) {
      expect(week.words).toBeGreaterThan(0)
      expect(
        Object.keys(week.parts).length + Object.keys(week.tests ?? {}).length,
      ).toBeGreaterThan(0)
    }
  })

  it('links only lessons of the course', () => {
    const known = new Set(Object.values(LESSON_IDS).flat())
    for (const week of TOEIC_PLAN)
      for (const id of week.lessons) expect(known.has(id), id).toBe(true)
  })

  it('starts on the day of the placement test, 00:00 UTC', () => {
    expect(dayStart(new Date('2026-11-16T23:30:00.000Z'))).toEqual(monday)
    expect(dayStart(monday)).toEqual(monday)
  })

  it('knows the current week and nothing outside the plan', () => {
    expect(currentWeekOf(null, day(3))).toBeNull()
    expect(currentWeekOf(monday, day(-1))).toBeNull()
    expect(currentWeekOf(monday, day(0))).toBe(1)
    expect(currentWeekOf(monday, day(15))).toBe(3)
    expect(currentWeekOf(monday, day(7 * PLAN_WEEKS))).toBeNull()
  })

  it('shows every week upcoming before the placement test', () => {
    const plan = buildStudyPlan(null, [], 800, day(3))
    expect(plan).toMatchObject({ start: null, currentWeek: null })
    expect(plan.weeks.every((w) => w.status === 'upcoming')).toBe(true)
    expect(plan.weeks[0]!.start).toBeNull()
  })

  it('marks done, missed and current weeks from each week’s activity', () => {
    const plan = buildStudyPlan(
      monday,
      [doneWeek(1), idle(), idle()],
      800,
      day(16),
    )
    expect(plan.currentWeek).toBe(3)
    expect(plan.weeks.slice(0, 4).map((w) => w.status)).toEqual([
      'done',
      'missed',
      'current',
      'upcoming',
    ])
    expect(plan.weeks[2]!.start).toBe(day(14).toISOString())
    expect(plan.weeks[2]!.tasks[0]).toMatchObject({
      id: 'w3.words',
      kind: 'words',
      done: false,
    })
  })

  it('asks less accuracy early and the full target from the test phase', () => {
    const early = buildStudyPlan(monday, [], 800, day(0)).weeks[0]!
    const late = buildStudyPlan(monday, [], 800, day(0)).weeks[9]!
    const accuracyOf = (label: string) => Number(/(\d+)%/.exec(label)![1])
    const earlyPart = early.tasks.find((t) => t.kind === 'part')!
    const latePart = late.tasks.find((t) => t.kind === 'part')!
    expect(accuracyOf(earlyPart.label)).toBe(71)
    expect(accuracyOf(latePart.label)).toBe(81)
  })

  it('counts a part done only at the week’s accuracy', () => {
    const week = doneWeek(1)
    week.parts.P5 = { correct: 30, total: 60 }
    const plan = buildStudyPlan(monday, [week], 800, day(2))
    expect(plan.weeks[0]!.tasks.find((t) => t.part === 'P5')!.done).toBe(false)
    expect(plan.weeks[0]!.status).toBe('current')
  })
})
