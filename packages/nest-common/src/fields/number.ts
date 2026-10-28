import { applyDecorators } from '@nestjs/common'

import {
  IsBoolean,
  IsDivisibleBy,
  IsInt,
  IsNumber,
  IsPositive,
  Max,
  Min,
} from 'class-validator'

import {
  type BaseFieldOptions,
  TransformEach,
  baseDecorators,
  mainOptions,
} from './core.js'

export interface NumberFieldOptions extends BaseFieldOptions {
  /** Must be an integer. Default `false` (use `IntField` for integers). */
  int?: boolean
  min?: number
  max?: number
  /** Must be > 0. */
  positive?: boolean
  multipleOf?: number
  /** Max digits after the decimal point (non-integers only). */
  maxDecimalPlaces?: number
}

// Multipart forms and query strings send numbers as text
const toNumber = (v: unknown) =>
  typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v))
    ? Number(v)
    : v

export function NumberField(
  options: NumberFieldOptions = {},
): PropertyDecorator {
  const { int, min, max, positive, multipleOf, maxDecimalPlaces } = options
  const [decorators, each] = baseDecorators(options, {
    type: int ? 'integer' : Number,
    minimum: min,
    maximum: max,
    exclusiveMinimum: positive && min === undefined ? 0 : undefined,
    multipleOf,
  })

  decorators.push(
    TransformEach(toNumber),
    int
      ? IsInt(mainOptions(options, each))
      : IsNumber(
          { allowNaN: false, allowInfinity: false, maxDecimalPlaces },
          mainOptions(options, each),
        ),
  )
  if (min !== undefined) decorators.push(Min(min, each))
  if (max !== undefined) decorators.push(Max(max, each))
  if (positive) decorators.push(IsPositive(each))
  if (multipleOf !== undefined) decorators.push(IsDivisibleBy(multipleOf, each))

  return applyDecorators(...decorators)
}

export function IntField(
  options: Omit<NumberFieldOptions, 'int' | 'maxDecimalPlaces'> = {},
): PropertyDecorator {
  return NumberField({ ...options, int: true })
}

/** Boolean; also accepts `'true' | 'false' | '1' | '0'` from forms and query strings. */
export function BooleanField(
  options: BaseFieldOptions = {},
): PropertyDecorator {
  const [decorators, each] = baseDecorators(options, { type: Boolean })
  decorators.push(
    TransformEach((v) => {
      if (v === 'true' || v === '1') return true
      if (v === 'false' || v === '0') return false
      return v
    }),
    IsBoolean(mainOptions(options, each)),
  )
  return applyDecorators(...decorators)
}
