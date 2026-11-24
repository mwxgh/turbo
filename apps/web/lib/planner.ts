import {
  addDays,
  addMonths,
  format,
  isValid,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { parseAsString, parseAsStringLiteral } from 'nuqs/server'

import type { PlannerPriority, PlannerStatus, PlannerTask } from '@repo/types'
import { toDateKey } from '@repo/utils'

export const PLANNER_VIEWS = ['day', 'month', 'board'] as const
export type PlannerView = (typeof PLANNER_VIEWS)[number]

/** URL state of /planner (`?view=day&date=2026-11-24`), shared by the page prefetch and the client. */
export const plannerParsers = {
  view: parseAsStringLiteral(PLANNER_VIEWS).withDefault('month'),
  date: parseAsString,
}

/** Today in Vietnam time, `yyyy-MM-dd`. */
export const todayKey = () => toDateKey(new Date())

const DAY_KEY = /^\d{4}-\d{2}-\d{2}$/

/** A `yyyy-MM-dd` from the URL, or today when missing / invalid. */
export function normalizeDay(value: string | null | undefined): string {
  return value && DAY_KEY.test(value) && isValid(parseISO(value))
    ? value
    : todayKey()
}

/** `yyyy-MM-dd` ↔ a local Date at midnight (calendar arithmetic only, no time zone). */
export const parseDay = (key: string) => parseISO(key)
export const dayKey = (date: Date) => format(date, 'yyyy-MM-dd')

/** The 6 weeks (Monday first) of the month that contains `key`. */
export function monthGrid(key: string): string[] {
  const start = startOfWeek(startOfMonth(parseDay(key)), { weekStartsOn: 1 })
  return Array.from({ length: 42 }, (_, i) => dayKey(addDays(start, i)))
}

/** The Monday–Sunday week of `key`. */
export function weekDays(key: string): string[] {
  const start = startOfWeek(parseDay(key), { weekStartsOn: 1 })
  return Array.from({ length: 7 }, (_, i) => dayKey(addDays(start, i)))
}

/**
 * The days one request loads: the whole month grid. Every view of the same month shares it (a
 * week always sits inside its month's grid), so switching views needs no refetch.
 */
export function plannerRange(key: string): { from: string; to: string } {
  const grid = monthGrid(key)
  return { from: grid[0]!, to: grid[grid.length - 1]! }
}

/** Previous / next page of a view: a day, or a month. */
export function shiftDay(key: string, view: PlannerView, step: 1 | -1) {
  const date = parseDay(key)
  return dayKey(view === 'day' ? addDays(date, step) : addMonths(date, step))
}

/** The task's calendar day, `yyyy-MM-dd`, or null in the backlog. */
export const taskDay = (task: Pick<PlannerTask, 'date'>) =>
  task.date?.slice(0, 10) ?? null

/** 540 → "09:00". */
export function formatMinute(minute: number): string {
  const h = Math.floor(minute / 60) % 24
  const m = minute % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/** "09:00" → 540, or null when not a time. */
export function parseMinute(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value)
  if (!match) return null
  const minute = Number(match[1]) * 60 + Number(match[2])
  return minute < 1440 ? minute : null
}

/** "09:00 – 10:30", or null for an all-day task. */
export function timeLabel(
  task: Pick<PlannerTask, 'startMinute' | 'durationMinutes'>,
) {
  if (task.startMinute === null) return null
  const end = Math.min(task.startMinute + task.durationMinutes, 1440)
  return `${formatMinute(task.startMinute)} – ${formatMinute(end)}`
}

/** Board order (the API already sorts this way; optimistic edits re-sort). */
export const byPosition = (a: PlannerTask, b: PlannerTask) =>
  a.position - b.position || a.id.localeCompare(b.id)

/** Calendar order of one day: timed tasks by start, then all-day ones by board order. */
export const byTime = (a: PlannerTask, b: PlannerTask) =>
  (a.startMinute ?? 1440) - (b.startMinute ?? 1440) || byPosition(a, b)

/** A position between two neighbours (either may be missing), so a move rewrites one row. */
export function positionBetween(before?: number, after?: number): number {
  if (before !== undefined && after !== undefined) return (before + after) / 2
  if (before !== undefined) return before + 1
  if (after !== undefined) return after - 1
  return 1
}

export interface DayBlock {
  task: PlannerTask
  /** Column inside its overlap group, 0-based */
  lane: number
  /** Columns of the group */
  lanes: number
}

/** Side-by-side columns for the timed tasks of one day, so overlapping ones stay readable. */
export function layoutDay(tasks: PlannerTask[]): DayBlock[] {
  const timed = tasks.filter((task) => task.startMinute !== null).sort(byTime)
  const blocks: DayBlock[] = []
  let group: DayBlock[] = []
  let laneEnds: number[] = []
  let groupEnd = -1

  const close = () => {
    for (const block of group) block.lanes = laneEnds.length
    group = []
    laneEnds = []
  }
  for (const task of timed) {
    const start = task.startMinute!
    const end = start + Math.max(task.durationMinutes, 15)
    if (start >= groupEnd) close()
    let lane = laneEnds.findIndex((laneEnd) => laneEnd <= start)
    if (lane === -1) lane = laneEnds.length
    laneEnds[lane] = end
    groupEnd = Math.max(groupEnd, end)
    const block = { task, lane, lanes: 1 }
    group.push(block)
    blocks.push(block)
  }
  close()
  return blocks
}

export const STATUSES: { value: PlannerStatus; label: string }[] = [
  { value: 'TODO', label: 'Cần làm' },
  { value: 'DOING', label: 'Đang làm' },
  { value: 'DONE', label: 'Hoàn thành' },
]

export const PRIORITIES: { value: PlannerPriority; label: string }[] = [
  { value: 'LOW', label: 'Thấp' },
  { value: 'MEDIUM', label: 'Vừa' },
  { value: 'HIGH', label: 'Cao' },
]

export const statusLabel = (status: PlannerStatus) =>
  STATUSES.find((s) => s.value === status)!.label

/** Task colours: one hue each, readable in light and dark themes. */
export const COLORS = {
  sky: {
    dot: 'bg-sky-500',
    soft: 'bg-sky-500/12 text-sky-900 dark:bg-sky-400/15 dark:text-sky-100',
    bar: 'border-l-sky-500',
  },
  violet: {
    dot: 'bg-violet-500',
    soft: 'bg-violet-500/12 text-violet-900 dark:bg-violet-400/15 dark:text-violet-100',
    bar: 'border-l-violet-500',
  },
  emerald: {
    dot: 'bg-emerald-500',
    soft: 'bg-emerald-500/12 text-emerald-900 dark:bg-emerald-400/15 dark:text-emerald-100',
    bar: 'border-l-emerald-500',
  },
  amber: {
    dot: 'bg-amber-500',
    soft: 'bg-amber-500/15 text-amber-900 dark:bg-amber-400/15 dark:text-amber-100',
    bar: 'border-l-amber-500',
  },
  rose: {
    dot: 'bg-rose-500',
    soft: 'bg-rose-500/12 text-rose-900 dark:bg-rose-400/15 dark:text-rose-100',
    bar: 'border-l-rose-500',
  },
  slate: {
    dot: 'bg-slate-500',
    soft: 'bg-slate-500/12 text-slate-900 dark:bg-slate-400/15 dark:text-slate-100',
    bar: 'border-l-slate-500',
  },
} as const

export type PlannerColor = keyof typeof COLORS

export const colorOf = (task: Pick<PlannerTask, 'color'>) =>
  COLORS[task.color as PlannerColor] ?? COLORS.sky
