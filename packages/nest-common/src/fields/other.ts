import { applyDecorators } from '@nestjs/common'

import { Type } from 'class-transformer'
import {
  IsDate,
  IsISO8601,
  IsIn,
  IsObject,
  MaxDate,
  MinDate,
  ValidateNested,
} from 'class-validator'

import {
  type BaseFieldOptions,
  TransformEach,
  baseDecorators,
  mainOptions,
} from './core.js'

export interface EnumFieldOptions extends BaseFieldOptions {
  /** Swagger schema name for the enum (shared component instead of inline). */
  enumName?: string
  /**
   * Accept string values in any case and with surrounding spaces, converted to
   * the enum's own value (`' DESC '` → `'desc'`, `'draft'` → `'DRAFT'`).
   * Default `false` (exact match).
   */
  caseInsensitive?: boolean
}

/** Enum values (numeric enums also hold reverse `value → name` keys). */
const enumValues = (entity: object): unknown[] =>
  Object.entries(entity)
    .filter(([key]) => Number.isNaN(Number(key)))
    .map(([, value]) => value as unknown)

/** `v → enum value` ignoring case; exact matches win, ambiguous ones are left as is. */
function enumNormalizer(entity: object): (v: unknown) => unknown {
  const values = enumValues(entity).filter(
    (v): v is string => typeof v === 'string',
  )
  const exact = new Set(values)
  const byLower = new Map<string, string | null>()
  for (const value of values) {
    const key = value.toLowerCase()
    byLower.set(key, byLower.has(key) ? null : value) // null: 'a' vs 'A'
  }
  return (v) => {
    if (typeof v !== 'string') return v
    const s = v.trim()
    if (exact.has(s)) return s
    return byLower.get(s.toLowerCase()) ?? v
  }
}

export function EnumField(
  entity: object,
  options: EnumFieldOptions = {},
): PropertyDecorator {
  const [decorators, each] = baseDecorators(options, {
    enum: entity,
    enumName: options.enumName,
  })
  if (options.caseInsensitive)
    decorators.push(TransformEach(enumNormalizer(entity)))
  // IsIn over the real values: IsEnum also accepts the names of numeric enums
  // ('High' for `enum P { High = 2 }`) because of TS reverse mappings
  decorators.push(IsIn(enumValues(entity), mainOptions(options, each)))
  return applyDecorators(...decorators)
}

export interface DateFieldOptions extends BaseFieldOptions {
  min?: Date | (() => Date)
  max?: Date | (() => Date)
}

/** Date, converted to a `Date` object (accepts ISO strings and timestamps). */
export function DateField(options: DateFieldOptions = {}): PropertyDecorator {
  const { min, max } = options
  const [decorators, each] = baseDecorators(options, {
    type: String,
    format: 'date-time',
  })
  decorators.push(
    TransformEach((v) => {
      if (typeof v !== 'string' && typeof v !== 'number') return v
      const date = new Date(v)
      return Number.isNaN(date.getTime()) ? v : date
    }),
    IsDate(mainOptions(options, each)),
  )
  if (min) decorators.push(MinDate(min, each))
  if (max) decorators.push(MaxDate(max, each))
  return applyDecorators(...decorators)
}

/** ISO 8601 date string, kept as a string. */
export function DateStringField(
  options: BaseFieldOptions = {},
): PropertyDecorator {
  const [decorators, each] = baseDecorators(options, {
    type: String,
    format: 'date-time',
  })
  decorators.push(IsISO8601({ strict: true }, mainOptions(options, each)))
  return applyDecorators(...decorators)
}

/** Nested object (or array of objects with `each`), validated recursively. */
export function ClassField(
  type: () => new (...args: never[]) => object,
  options: BaseFieldOptions = {},
): PropertyDecorator {
  const [decorators, each] = baseDecorators(options, { type })
  decorators.push(
    IsObject(mainOptions(options, each)),
    ValidateNested(each),
    Type(type),
  )
  return applyDecorators(...decorators)
}

/** Free-form JSON object (no nested validation). Parses JSON strings from forms. */
export function JsonField(options: BaseFieldOptions = {}): PropertyDecorator {
  const [decorators, each] = baseDecorators(options, {
    type: 'object',
    additionalProperties: true,
  })
  decorators.push(
    TransformEach((v) => {
      if (typeof v !== 'string') return v
      try {
        return JSON.parse(v) as unknown
      } catch {
        return v
      }
    }),
    IsObject(mainOptions(options, each)),
  )
  return applyDecorators(...decorators)
}
