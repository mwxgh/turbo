import type { ExamSpec, PartSpec } from './specs'

export interface Candidate {
  id: string
  /** Questions of the item */
  size: number
  /** Already in another test: used only when fresh items run out */
  used: boolean
}

/** Fisher–Yates, in place. */
export function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j]!, items[i]!]
  }
  return items
}

/**
 * Items whose questions add up to `target`, or to the largest total below it the pool allows
 * (subset sum: Part 7 items hold 2–5 questions, so greedy picking can miss an exact fill).
 * Earlier candidates win ties, and unused items come before used ones.
 */
export function pickItems(candidates: Candidate[], target: number): string[] {
  const ordered = [
    ...candidates.filter((c) => !c.used),
    ...candidates.filter((c) => c.used),
  ]
  // best[s]: the earliest-found item list summing to s
  const best: (string[] | undefined)[] = [[]]
  for (const item of ordered) {
    if (best[target]) break
    for (let sum = target - item.size; sum >= 0; sum--) {
      const base = best[sum]
      if (base && !best[sum + item.size])
        best[sum + item.size] = [...base, item.id]
    }
  }
  for (let sum = target; sum > 0; sum--) {
    const found = best[sum]
    if (found) return found
  }
  return []
}

/** Questions a test of this kind takes from a part. */
export const partTarget = (part: PartSpec, kind: 'FULL' | 'MINI') =>
  kind === 'FULL' ? part.count : part.miniCount

/**
 * Time limit of a test or of some of its parts: each section's minutes in proportion to the
 * questions taken from it (a full Reading section → 75 min, half of it → 38 min).
 */
export function timeLimitSec(
  exam: ExamSpec,
  questionsByPart: Record<string, number>,
): number {
  let seconds = 0
  for (const section of exam.sections) {
    const full = section.parts.reduce((sum, p) => sum + p.count, 0)
    const taken = section.parts.reduce(
      (sum, p) => sum + (questionsByPart[p.code] ?? 0),
      0,
    )
    seconds += (section.minutes * 60 * Math.min(taken, full)) / full
  }
  return Math.ceil(seconds / 60) * 60
}
