import { describe, expect, it } from 'vitest'

import { LESSON_MIN, lessonGoal, skillProgress } from './lessons.service'

const answers = (tag: string, right: number, wrong: number) => [
  ...Array.from({ length: right }, () => ({ correct: true, skillTags: [tag] })),
  ...Array.from({ length: wrong }, () => ({
    correct: false,
    skillTags: [tag],
  })),
]

describe('lesson progress', () => {
  it('asks a little under the target, never under 60%', () => {
    expect(lessonGoal(800)).toBeCloseTo(0.76)
    expect(lessonGoal(300)).toBe(0.6)
  })

  it('needs enough answers at the goal accuracy', () => {
    const few = skillProgress(answers('a', 5, 0), ['a'], 0.7).get('a')!
    expect(few).toMatchObject({ answered: 5, done: false })
    const enough = skillProgress(answers('a', LESSON_MIN, 2), ['a', 'b'], 0.7)
    expect(enough.get('a')).toMatchObject({ answered: 12, done: true })
    expect(enough.get('b')).toMatchObject({ answered: 0, done: false })
  })

  it('looks at the latest answers only', () => {
    // Newest first: 30 right after 20 old wrong ones
    const p = skillProgress(
      [...answers('a', 30, 0), ...answers('a', 0, 20)],
      ['a'],
      0.9,
    ).get('a')!
    expect(p).toMatchObject({ answered: 30, accuracy: 1, done: true })
  })
})
