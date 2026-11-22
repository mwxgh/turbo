import { describe, expect, it } from 'vitest'

import { pickItems, timeLimitSec } from './assemble'
import { getExam } from './specs'

const toeic = getExam('TOEIC_LR')

describe('pickItems', () => {
  it('fills the target exactly, skipping items that overshoot', () => {
    const items = [
      { id: 'a', size: 5, used: false },
      { id: 'b', size: 4, used: false },
      { id: 'c', size: 2, used: false },
      { id: 'd', size: 3, used: false },
    ]
    expect(pickItems(items, 10)).toEqual(['a', 'c', 'd'])
  })

  it('prefers items no test uses yet', () => {
    const items = [
      { id: 'old', size: 1, used: true },
      { id: 'new', size: 1, used: false },
    ]
    expect(pickItems(items, 1)).toEqual(['new'])
    expect(pickItems(items, 2)).toEqual(['new', 'old'])
  })

  it('stops short when the pool is too small', () => {
    expect(pickItems([{ id: 'a', size: 3, used: false }], 6)).toEqual(['a'])
  })
})

describe('timeLimitSec', () => {
  it('gives a full test 120 minutes and parts their share', () => {
    const all = Object.fromEntries(
      toeic.sections.flatMap((s) => s.parts.map((p) => [p.code, p.count])),
    )
    expect(timeLimitSec(toeic, all)).toBe(120 * 60)
    // Part 5 = 30 of 100 reading questions → 22.5 of 75 minutes, rounded up
    expect(timeLimitSec(toeic, { P5: 30 })).toBe(23 * 60)
  })
})
