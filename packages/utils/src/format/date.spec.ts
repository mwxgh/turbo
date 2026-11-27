import assert from 'node:assert/strict'

import { describe, it } from 'vitest'

import {
  addDaysToKey,
  dayRange,
  dayStreak,
  daysBetween,
  formatDate,
  formatDateTime,
  fromNow,
  isValidDate,
  longestDayStreak,
  parseDate,
  toDate,
  toDateKey,
} from './date.js'

// 2026-10-20 17:30 UTC = 2026-10-21 00:30 in Asia/Ho_Chi_Minh (UTC+7)
const INSTANT = '2026-10-20T17:30:00.000Z'

describe('date', () => {
  it('formats in the business time zone by default', () => {
    assert.equal(formatDate(INSTANT), '21/10/2026')
    assert.equal(formatDateTime(INSTANT), '21/10/2026 00:30')
    assert.equal(toDateKey(INSTANT), '2026-10-21')
    assert.equal(
      formatDate(INSTANT, 'dd/MM/yyyy HH:mm', 'UTC'),
      '20/10/2026 17:30',
    )
  })

  it('parses wall-clock input in the time zone', () => {
    assert.equal(
      parseDate('21/10/2026 00:30', 'dd/MM/yyyy HH:mm').toISOString(),
      INSTANT,
    )
    assert.throws(() => parseDate('32/13/2026'), RangeError)
  })

  it('returns the calendar day range in the time zone', () => {
    const { start, end } = dayRange(INSTANT)
    assert.equal(start.toISOString(), '2026-10-20T17:00:00.000Z')
    assert.equal(end.toISOString(), '2026-10-21T16:59:59.999Z')
  })

  it('validates input', () => {
    assert.equal(toDate(0).toISOString(), '1970-01-01T00:00:00.000Z')
    assert.throws(() => toDate('not a date'), RangeError)
    assert.equal(isValidDate(INSTANT), true)
    assert.equal(isValidDate('nope'), false)
    assert.equal(isValidDate(null), false)
  })

  it('formats relative time in Vietnamese', () => {
    assert.equal(fromNow('2026-10-20T17:25:00.000Z', INSTANT), '5 phút trước')
  })
})

describe('day streaks', () => {
  // 12:00 on 2026-11-18 in Vietnam
  const now = '2026-11-18T05:00:00Z'
  const ago = (n: number) => addDaysToKey('2026-11-18', -n)

  it('counts calendar days between day keys, across months and years', () => {
    assert.equal(daysBetween('2026-11-30', '2026-12-01'), 1)
    assert.equal(daysBetween('2026-12-31', '2027-01-02'), 2)
    assert.equal(daysBetween('2026-11-18', '2026-11-18'), 0)
    assert.equal(addDaysToKey('2024-02-28', 1), '2024-02-29')
  })

  it('counts consecutive days ending today', () => {
    assert.equal(dayStreak(new Set([ago(0), ago(1), ago(2), ago(4)]), now), 3)
  })

  it("keeps yesterday's streak alive until today ends", () => {
    assert.equal(dayStreak(new Set([ago(1), ago(2)]), now), 2)
  })

  it('is 0 after a missed day', () => {
    assert.equal(dayStreak(new Set([ago(2), ago(3)]), now), 0)
  })

  it('finds the longest run in any order', () => {
    assert.equal(
      longestDayStreak([ago(0), ago(9), ago(7), ago(8), ago(10), ago(2)]),
      4,
    )
    assert.equal(longestDayStreak([]), 0)
  })
})
