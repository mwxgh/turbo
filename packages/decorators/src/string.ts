import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUUID,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

import {
  type ApiSchema,
  type BaseFieldOptions,
  TransformEach,
  baseDecorators,
  composeDecorators,
  mainOptions,
} from './core.js'

export interface StringFieldOptions extends BaseFieldOptions {
  minLength?: number
  maxLength?: number
  /** Exact length. */
  length?: number
  pattern?: RegExp
  /** Accept `''` for a required field. Default `false`. */
  allowEmpty?: boolean
  /** Trim surrounding whitespace before validating. Default `true`. */
  trim?: boolean
  /** Turn `''` (after trimming) into `undefined`. Default: same as `optional`. */
  emptyToUndefined?: boolean
  toLowerCase?: boolean
  toUpperCase?: boolean
}

/** Shared implementation: `schema` and `extra` let the wrappers below specialize it. */
function stringField(
  options: StringFieldOptions,
  schema: ApiSchema,
  ...extra: PropertyDecorator[]
): PropertyDecorator {
  const {
    minLength,
    maxLength,
    length,
    pattern,
    trim = true,
    emptyToUndefined = options.optional ?? false,
    toLowerCase,
    toUpperCase,
  } = options
  const [decorators, each] = baseDecorators(options, {
    type: String,
    minLength: length ?? minLength,
    maxLength: length ?? maxLength,
    pattern: pattern?.source,
    ...schema,
  })

  decorators.push(
    TransformEach((v) => {
      if (typeof v !== 'string') return v
      let s = trim ? v.trim() : v
      if (toLowerCase) s = s.toLowerCase()
      if (toUpperCase) s = s.toUpperCase()
      return emptyToUndefined && s === '' ? undefined : s
    }),
    IsString(mainOptions(options, each)),
  )
  if (!options.allowEmpty) decorators.push(IsNotEmpty(each))
  if (length !== undefined) decorators.push(Length(length, length, each))
  if (minLength !== undefined) decorators.push(MinLength(minLength, each))
  if (maxLength !== undefined) decorators.push(MaxLength(maxLength, each))
  if (pattern) decorators.push(Matches(pattern, each))

  return composeDecorators(...decorators, ...extra)
}

/** Trimmed string. */
export function StringField(
  options: StringFieldOptions = {},
): PropertyDecorator {
  return stringField(options, {})
}

/** Email, lowercased. */
export function EmailField(
  options: StringFieldOptions = {},
): PropertyDecorator {
  return stringField(
    { maxLength: 191, toLowerCase: true, ...options },
    { format: 'email' },
    IsEmail({}, { each: options.each }),
  )
}

export interface UrlFieldOptions extends StringFieldOptions {
  /** Default `['http', 'https']`. */
  protocols?: string[]
  /** Require a TLD (rejects `http://localhost`). Default `false`. */
  requireTld?: boolean
}

export function UrlField(options: UrlFieldOptions = {}): PropertyDecorator {
  const { protocols = ['http', 'https'], requireTld = false } = options
  return stringField(
    { maxLength: 2048, ...options },
    { format: 'uri' },
    IsUrl(
      { protocols, require_protocol: true, require_tld: requireTld },
      { each: options.each },
    ),
  )
}

export interface UuidFieldOptions extends BaseFieldOptions {
  /** Default `'all'`. */
  version?: '1' | '2' | '3' | '4' | '5' | '7' | 'all'
}

export function UuidField(options: UuidFieldOptions = {}): PropertyDecorator {
  return stringField(
    options,
    { format: 'uuid' },
    IsUUID(options.version ?? 'all', { each: options.each }),
  )
}

/** Region code accepted by class-validator's `IsPhoneNumber` (e.g. 'VN', 'US'). */
export type PhoneRegion = NonNullable<Parameters<typeof IsPhoneNumber>[0]>

export interface PhoneFieldOptions extends StringFieldOptions {
  /** Region used to parse numbers without a country code. Default `'VN'`. */
  region?: PhoneRegion
}

/** Phone number; spaces, dots, dashes and parentheses are stripped first. */
export function PhoneField(options: PhoneFieldOptions = {}): PropertyDecorator {
  return composeDecorators(
    TransformEach((v) =>
      typeof v === 'string' ? v.replace(/[\s.\-()]/g, '') : v,
    ),
    stringField(
      { maxLength: 20, ...options },
      {},
      IsPhoneNumber(options.region ?? 'VN', { each: options.each }),
    ),
  )
}

export interface PasswordFieldOptions extends BaseFieldOptions {
  /** Default 8. */
  minLength?: number
  /** Default 72 (bcrypt only uses the first 72 bytes). */
  maxLength?: number
  /** Require lowercase, uppercase, number and symbol. Default `false`. */
  strong?: boolean
}

/** Password: never trimmed or case-changed. */
export function PasswordField(
  options: PasswordFieldOptions = {},
): PropertyDecorator {
  const { minLength = 8, maxLength = 72, strong } = options
  return stringField(
    { ...options, minLength, maxLength, trim: false, emptyToUndefined: false },
    { format: 'password' },
    ...(strong
      ? [
          IsStrongPassword(
            {
              minLength,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            },
            { each: options.each },
          ),
        ]
      : []),
  )
}
