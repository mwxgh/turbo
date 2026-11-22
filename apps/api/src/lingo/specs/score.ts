import type { SectionSpec } from './types'

/**
 * Estimated scaled score of a section from its correct ratio: linear between the table points,
 * rounded to the section's step and clamped to its range.
 */
export function scaledScore(
  score: SectionSpec['score'],
  correct: number,
  total: number,
): number {
  const ratio = total > 0 ? Math.min(Math.max(correct / total, 0), 1) : 0
  const points = score.table
  let value = points.at(-1)![1]
  for (let i = 1; i < points.length; i++) {
    const [r0, s0] = points[i - 1]!
    const [r1, s1] = points[i]!
    if (ratio <= r1) {
      value = r1 === r0 ? s1 : s0 + ((ratio - r0) / (r1 - r0)) * (s1 - s0)
      break
    }
  }
  const stepped = Math.round(value / score.step) * score.step
  return Math.min(Math.max(stepped, score.min), score.max)
}
