import { describe, expect, it } from 'vitest'

import type { PlannerTask } from '@repo/types'

import {
  formatMinute,
  layoutDay,
  monthGrid,
  normalizeDay,
  parseMinute,
  plannerRange,
  positionBetween,
  shiftDay,
  taskDay,
  timeLabel,
  weekDays,
} from './planner'

const task = (id: string, startMinute: number | null, durationMinutes = 60) =>
  ({ id, startMinute, durationMinutes, position: 1 }) as PlannerTask

describe('planner calendar helpers', () => {
  it('builds a 6-week, Monday-first month grid', () => {
    const grid = monthGrid('2026-11-24')
    expect(grid).toHaveLength(42)
    expect(grid[0]).toBe('2026-10-26')
    expect(grid[41]).toBe('2026-12-06')
    expect(plannerRange('2026-11-01')).toEqual({
      from: '2026-10-26',
      to: '2026-12-06',
    })
  })

  it('keeps every week inside its month range', () => {
    expect(weekDays('2026-11-01')).toEqual([
      '2026-10-26',
      '2026-10-27',
      '2026-10-28',
      '2026-10-29',
      '2026-10-30',
      '2026-10-31',
      '2026-11-01',
    ])
  })

  it('pages by day or by month', () => {
    expect(shiftDay('2026-11-30', 'day', 1)).toBe('2026-12-01')
    expect(shiftDay('2026-01-31', 'month', 1)).toBe('2026-02-28')
    expect(shiftDay('2026-11-24', 'board', -1)).toBe('2026-10-24')
  })

  it('falls back to today for a missing or bad date', () => {
    expect(normalizeDay('2026-02-03')).toBe('2026-02-03')
    expect(normalizeDay('2026-13-40')).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(normalizeDay('2026-13-40')).toBe(normalizeDay(null))
  })

  it('reads the day of an API date', () => {
    expect(taskDay({ date: '2026-11-24T00:00:00.000Z' })).toBe('2026-11-24')
    expect(taskDay({ date: null })).toBeNull()
  })
})

describe('planner time helpers', () => {
  it('formats and parses minutes', () => {
    expect(formatMinute(545)).toBe('09:05')
    expect(parseMinute('09:05')).toBe(545)
    expect(parseMinute('24:00')).toBeNull()
    expect(parseMinute('')).toBeNull()
    expect(timeLabel({ startMinute: 1410, durationMinutes: 60 })).toBe(
      '23:30 – 00:00',
    )
    expect(timeLabel({ startMinute: null, durationMinutes: 60 })).toBeNull()
  })

  it('places a position between neighbours', () => {
    expect(positionBetween(1, 2)).toBe(1.5)
    expect(positionBetween(3)).toBe(4)
    expect(positionBetween(undefined, 1)).toBe(0)
    expect(positionBetween()).toBe(1)
  })

  it('puts overlapping tasks side by side', () => {
    const blocks = layoutDay([
      task('a', 540),
      task('b', 570),
      task('c', 600, 30),
      task('d', 720),
      task('e', null),
    ])
    expect(
      blocks.map(({ task: t, lane, lanes }) => [t.id, lane, lanes]),
    ).toEqual([
      ['a', 0, 2],
      ['b', 1, 2],
      ['c', 0, 2],
      ['d', 0, 1],
    ])
  })
})
