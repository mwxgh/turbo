import { ApiProperty } from '@nestjs/swagger'

import { Transform } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDefined,
  IsOptional,
  ValidateIf,
  type ValidationOptions,
} from 'class-validator'

export interface BaseFieldOptions {
  /** `undefined` (missing) is allowed; other validators are skipped. */
  optional?: boolean
  /** `null` is allowed; other validators are skipped. */
  nullable?: boolean
  /** Value is an array; every validator applies to each item. */
  each?: boolean
  minItems?: number
  maxItems?: number
  /** Array items must be unique. */
  uniqueItems?: boolean
  /** Custom message for the field's main type check. */
  message?: string
  /** Swagger description. */
  description?: string
  /** Swagger example. */
  example?: unknown
  /** Set `false` to leave the field out of the Swagger schema. */
  swagger?: boolean
}

/** Swagger schema bits that depend on the field type (type, format, enum, min, …). */
export type ApiSchema = Record<string, unknown>

function presence({ optional, nullable }: BaseFieldOptions): PropertyDecorator {
  if (optional && nullable) return IsOptional()
  if (optional || nullable) {
    const skipped = optional ? undefined : null
    return (target, key) =>
      ValidateIf(
        (obj: Record<string | symbol, unknown>) => obj[key] !== skipped,
      )(target, key)
  }
  return IsDefined()
}

function apiProperty(
  options: BaseFieldOptions,
  schema: ApiSchema,
): PropertyDecorator[] {
  if (options.swagger === false) return []
  const { each, optional, nullable, description, example } = options
  return [
    ApiProperty({
      required: !optional,
      nullable,
      description,
      example,
      ...(each
        ? {
            isArray: true,
            minItems: options.minItems,
            maxItems: options.maxItems,
            uniqueItems: options.uniqueItems,
          }
        : {}),
      ...schema,
    }),
  ]
}

/**
 * Decorators shared by every field: presence (required / optional / nullable),
 * array rules and the Swagger property. Returns them plus the validation
 * options for item validators.
 */
export function baseDecorators(
  options: BaseFieldOptions,
  schema: ApiSchema,
): [PropertyDecorator[], ValidationOptions] {
  const decorators = [presence(options), ...apiProperty(options, schema)]
  if (options.each) {
    decorators.push(ToArray(), IsArray())
    if (options.minItems !== undefined)
      decorators.push(ArrayMinSize(options.minItems))
    if (options.maxItems !== undefined)
      decorators.push(ArrayMaxSize(options.maxItems))
    if (options.uniqueItems) decorators.push(ArrayUnique())
  }
  return [decorators, { each: options.each }]
}

/** Validation options for the main type check, including the custom message. */
export const mainOptions = (
  options: BaseFieldOptions,
  each: ValidationOptions,
): ValidationOptions =>
  options.message ? { ...each, message: options.message } : each

/**
 * `@Transform` that maps the value, or each item when it is an array.
 * class-transformer runs `@Transform`s in reverse registration order, so field
 * transforms must not depend on each other's order – mapping items keeps a
 * single value and an array (after `ToArray`) equivalent.
 */
export const TransformEach = (fn: (value: unknown) => unknown) =>
  Transform(({ value }: { value: unknown }) =>
    Array.isArray(value) ? value.map(fn) : fn(value),
  )

/**
 * Wrap a single value in an array (`?tag=a` → `['a']`, `?tag=a&tag=b` stays
 * `['a', 'b']`). `undefined`/`null` are kept so optional/nullable still apply.
 */
export const ToArray = () =>
  Transform(({ value }: { value: unknown }) =>
    value === undefined || value === null || Array.isArray(value)
      ? value
      : [value],
  )
