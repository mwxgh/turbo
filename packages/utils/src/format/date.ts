import { TZDate, tz } from '@date-fns/tz'
import {
  endOfDay,
  format,
  formatDistance,
  isValid,
  parse,
  parseISO,
  startOfDay,
} from 'date-fns'
import { vi } from 'date-fns/locale'

/** Business time zone: calendar days and displayed times use it unless told otherwise. */
export const DEFAULT_TIME_ZONE = 'Asia/Ho_Chi_Minh'

export const DATE_FORMAT = 'dd/MM/yyyy'
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm'
export const ISO_DATE_FORMAT = 'yyyy-MM-dd'

/** Anything that describes an instant: `Date`, ISO string or epoch milliseconds. */
export type DateInput = Date | string | number

/** Convert to a `Date`; throws `RangeError` for invalid input. */
export function toDate(input: DateInput): Date {
  const date =
    typeof input === 'string'
      ? parseISO(input)
      : new Date(input instanceof Date ? input.getTime() : input)
  if (!isValid(date)) throw new RangeError(`Invalid date: ${String(input)}`)
  return date
}

export function isValidDate(input: unknown): boolean {
  if (
    !(input instanceof Date) &&
    typeof input !== 'string' &&
    typeof input !== 'number'
  ) {
    return false
  }
  try {
    toDate(input)
    return true
  } catch {
    return false
  }
}

/** Format in a time zone (date-fns pattern, Vietnamese locale). */
export function formatDate(
  input: DateInput,
  pattern: string = DATE_FORMAT,
  timeZone: string = DEFAULT_TIME_ZONE,
): string {
  return format(toDate(input), pattern, { in: tz(timeZone), locale: vi })
}

export function formatDateTime(
  input: DateInput,
  timeZone: string = DEFAULT_TIME_ZONE,
): string {
  return formatDate(input, DATETIME_FORMAT, timeZone)
}

/** Calendar day in a time zone as `yyyy-MM-dd` (stable key for grouping by day). */
export function toDateKey(
  input: DateInput,
  timeZone: string = DEFAULT_TIME_ZONE,
): string {
  return formatDate(input, ISO_DATE_FORMAT, timeZone)
}

/** Parse a wall-clock string (e.g. from a form) entered in a time zone; throws if invalid. */
export function parseDate(
  value: string,
  pattern: string = DATE_FORMAT,
  timeZone: string = DEFAULT_TIME_ZONE,
): Date {
  const date = parse(value, pattern, TZDate.tz(timeZone), { in: tz(timeZone) })
  if (!isValid(date))
    throw new RangeError(`Invalid date "${value}" for ${pattern}`)
  return new Date(date.getTime())
}

/**
 * First and last instant of the input's calendar day in a time zone, e.g. for
 * DB queries: `where: { createdAt: { gte: start, lte: end } }`.
 */
export function dayRange(
  input: DateInput,
  timeZone: string = DEFAULT_TIME_ZONE,
): { start: Date; end: Date } {
  const date = toDate(input)
  return {
    start: new Date(startOfDay(date, { in: tz(timeZone) }).getTime()),
    end: new Date(endOfDay(date, { in: tz(timeZone) }).getTime()),
  }
}

/** Relative time in Vietnamese, e.g. "5 phút trước". */
export function fromNow(input: DateInput, now: DateInput = new Date()): string {
  return formatDistance(toDate(input), toDate(now), {
    addSuffix: true,
    locale: vi,
  })
}
