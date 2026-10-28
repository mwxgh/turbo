import { plainToInstance } from 'class-transformer'
import { type ValidationError, validateSync } from 'class-validator'

/** Options shared with Nest's `ValidationPipe` (see apps/api/src/app.setup.ts). */
export const VALIDATOR_OPTIONS = {
  whitelist: true,
  forbidUnknownValues: true,
  /** One message per field instead of one per failed constraint. */
  stopAtFirstError: true,
} as const

export type ValidateResult<T> =
  { ok: true; data: T } | { ok: false; errors: string[] }

/**
 * Flatten class-validator errors into messages. Messages already start with the
 * property name; nested ones get their parent path: `items.0.qty must be ...`.
 */
export function formatErrors(errors: ValidationError[], parent = ''): string[] {
  return errors.flatMap((error) => {
    const path = parent ? `${parent}.${error.property}` : error.property
    const own = Object.values(error.constraints ?? {}).map((message) =>
      parent ? `${parent}.${message}` : message,
    )
    return [...own, ...formatErrors(error.children ?? [], path)]
  })
}

/**
 * Transform + validate a plain value against a DTO class outside Nest's
 * `ValidationPipe` (socket payloads, env, scripts). Unknown keys are stripped.
 */
export function validateDto<T extends object>(
  cls: new () => T,
  plain: unknown,
): ValidateResult<T> {
  if (typeof plain !== 'object' || plain === null || Array.isArray(plain)) {
    return { ok: false, errors: ['payload must be an object'] }
  }
  const instance = plainToInstance(cls, plain)
  const errors = validateSync(instance, VALIDATOR_OPTIONS)
  return errors.length
    ? { ok: false, errors: formatErrors(errors) }
    : { ok: true, data: instance }
}

/**
 * Validate `process.env` against an env class. Property initializers act as
 * defaults. Throws a readable error so the app fails fast at startup.
 */
export function validateEnv<T extends object>(
  cls: new () => T,
  source: Record<string, string | undefined> = process.env,
): T {
  const result = validateDto(cls, { ...source })
  if (!result.ok) {
    throw new Error(
      `Invalid environment variables:\n  ${result.errors.join('\n  ')}`,
    )
  }
  return result.data
}
