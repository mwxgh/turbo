import { describe, expect, it } from 'vitest'

import { toDateKey } from '@repo/utils'

import { itemHash } from './content'
import { streak } from './lingo.service'

const day = 24 * 60 * 60 * 1000
const now = new Date('2026-11-18T05:00:00Z') // 12:00 in Vietnam
const key = (daysAgo: number) =>
  toDateKey(new Date(now.getTime() - daysAgo * day))

describe('streak', () => {
  it('counts consecutive days ending today', () => {
    expect(streak(new Set([key(0), key(1), key(2), key(4)]), now)).toBe(3)
  })

  it('keeps yesterday’s streak alive until today ends', () => {
    expect(streak(new Set([key(1), key(2)]), now)).toBe(2)
  })

  it('is 0 after a missed day', () => {
    expect(streak(new Set([key(2), key(3)]), now)).toBe(0)
  })
})

describe('itemHash', () => {
  const item = {
    difficulty: 'EASY' as const,
    topic: undefined,
    passage: undefined,
    questions: [
      {
        text: 'Q',
        options: ['a', 'b'],
        answer: 0,
        explanationVi: 'x',
        translationVi: undefined,
        skillTags: [],
      },
    ],
  }
  it('ignores explanations and difficulty, not the text', () => {
    const base = itemHash('TOEIC_LR', 'P5', item)
    expect(itemHash('TOEIC_LR', 'P5', { ...item, difficulty: 'HARD' })).toBe(
      base,
    )
    expect(
      itemHash('TOEIC_LR', 'P5', {
        ...item,
        questions: [{ ...item.questions[0]!, explanationVi: 'y' }],
      }),
    ).toBe(base)
    expect(itemHash('TOEIC_LR', 'P6', item)).not.toBe(base)
    expect(
      itemHash('TOEIC_LR', 'P5', {
        ...item,
        questions: [{ ...item.questions[0]!, text: 'Q2' }],
      }),
    ).not.toBe(base)
  })
})
