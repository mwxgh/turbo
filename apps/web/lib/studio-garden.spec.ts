import { describe, expect, it } from 'vitest'

import {
  gardenMessage,
  growthOf,
  leafSpot,
  stageOf,
  weekdayLabel,
  wiltOf,
} from './studio-garden'

describe('studio garden', () => {
  it('names the stage and the next one by leaves', () => {
    expect(stageOf(0)).toMatchObject({ index: 0, next: { at: 1 } })
    expect(stageOf(4).stage.name).toBe('Mầm non')
    expect(stageOf(5).stage.name).toBe('Cây non')
    expect(stageOf(250)).toMatchObject({
      stage: { name: 'Cổ thụ' },
      next: null,
    })
  })

  it('grows from nothing to full size at the last stage', () => {
    expect(growthOf(0)).toBe(0)
    expect(growthOf(25)).toBeCloseTo(0.5)
    expect(growthOf(100)).toBe(1)
    expect(growthOf(500)).toBe(1)
  })

  it('wilts only after the streak breaks, at most 80%', () => {
    expect(wiltOf(null)).toBe(0)
    expect(wiltOf(0)).toBe(0)
    expect(wiltOf(1)).toBe(0)
    expect(wiltOf(2)).toBeCloseTo(0.2)
    expect(wiltOf(30)).toBe(0.8)
  })

  it('places every leaf inside the crown, the same each time', () => {
    const crown = { cx: 100, cy: 80, rx: 50, ry: 40 }
    for (let i = 0; i < 60; i++) {
      const { x, y } = leafSpot(i, 60, crown)
      expect(((x - 100) / 50) ** 2 + ((y - 80) / 40) ** 2).toBeLessThanOrEqual(
        1.0001,
      )
    }
    expect(leafSpot(7, 60, crown)).toEqual(leafSpot(7, 60, crown))
  })

  it('labels weekdays Monday-first', () => {
    expect(weekdayLabel('2026-11-23')).toBe('T2')
    expect(weekdayLabel('2026-11-28')).toBe('T7')
    expect(weekdayLabel('2026-11-29')).toBe('CN')
  })

  it('nudges by streak state', () => {
    expect(
      gardenMessage({ current: 0, studiedToday: false, idleDays: null }),
    ).toMatch(/gieo hạt/)
    expect(
      gardenMessage({ current: 3, studiedToday: true, idleDays: 0 }),
    ).toMatch(/3 ngày liên tiếp/)
    expect(
      gardenMessage({ current: 2, studiedToday: false, idleDays: 1 }),
    ).toMatch(/giữ chuỗi 2 ngày/)
    expect(
      gardenMessage({ current: 0, studiedToday: false, idleDays: 4 }),
    ).toMatch(/héo sau 4 ngày/)
  })
})
