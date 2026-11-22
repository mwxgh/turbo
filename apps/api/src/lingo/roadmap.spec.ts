import { describe, expect, it } from 'vitest'

import { type RoadmapStats, accuracyFor, buildRoadmap } from './roadmap'

const empty: RoadmapStats = {
  estimate: null,
  fullScores: [],
  parts: {},
  wordsLearned: 0,
  tests: { MINI: 0, FULL: 0 },
  placementDone: false,
}

const allParts = (correct: number, total: number) =>
  Object.fromEntries(
    ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'].map((p) => [
      p,
      { correct, total },
    ]),
  )

describe('roadmap', () => {
  it('needs about (target + 10) / 5 right answers of 200', () => {
    expect(accuracyFor(650)).toBeCloseTo(0.66)
    expect(accuracyFor(990)).toBe(0.95)
    expect(accuracyFor(10)).toBe(0.4)
  })

  it('starts a new learner at the foundation, placement first', () => {
    const roadmap = buildRoadmap(empty, null)
    expect(roadmap.target).toBe(650)
    expect(roadmap.stages.map((s) => s.status)).toEqual([
      'current',
      'upcoming',
      'upcoming',
      'upcoming',
    ])
    expect(roadmap.stages[0]!.tasks[0]).toMatchObject({
      kind: 'placement',
      done: false,
    })
  })

  it('skips stages the placement score already passes', () => {
    const roadmap = buildRoadmap(
      { ...empty, estimate: 600, placementDone: true },
      700,
    )
    expect(roadmap.stages.map((s) => s.status)).toEqual([
      'passed',
      'passed',
      'current',
      'upcoming',
    ])
  })

  it('counts a part done only with enough answers at the accuracy', () => {
    const few = buildRoadmap({ ...empty, parts: allParts(10, 10) }, 650)
    expect(few.stages[1]!.tasks.find((t) => t.part === 'P5')!.done).toBe(false)
    const many = buildRoadmap({ ...empty, parts: allParts(70, 100) }, 650)
    const p5 = many.stages[1]!.tasks.find((t) => t.part === 'P5')!
    expect(p5).toMatchObject({ done: true, progress: 1 })
    expect(p5.detail).toBe('40/40 câu · đúng 70%')
  })

  it('finishes when full tests reach the target twice', () => {
    const roadmap = buildRoadmap(
      {
        estimate: 700,
        fullScores: [700, 680, 600],
        parts: allParts(80, 100),
        wordsLearned: 650,
        tests: { MINI: 3, FULL: 3 },
        placementDone: true,
      },
      650,
    )
    expect(roadmap.stages.every((s) => s.status === 'done')).toBe(true)
  })
})
