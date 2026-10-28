/**
 * Deployment environment the app runs in. Independent of `NODE_ENV`, which
 * only says how Node/Next run (stg and prod are both `production` builds).
 *
 *   dev  – develop branch / local machines
 *   stg  – release/* and hotfix/* (QA, UAT)
 *   prod – tags vX.Y.Z on main
 */
export const AppEnv = {
  Dev: 'dev',
  Stg: 'stg',
  Prod: 'prod',
} as const

export type AppEnv = (typeof AppEnv)[keyof typeof AppEnv]

export const APP_ENVS: readonly AppEnv[] = Object.values(AppEnv)

export function isAppEnv(value: unknown): value is AppEnv {
  return APP_ENVS.includes(value as AppEnv)
}

/** Parse an env var; missing → `fallback`, unknown value → throws (fail fast). */
export function parseAppEnv(
  value: string | undefined,
  fallback: AppEnv = AppEnv.Dev,
): AppEnv {
  if (value === undefined || value === '') return fallback
  if (!isAppEnv(value)) {
    throw new Error(
      `Invalid app environment "${value}". Expected one of: ${APP_ENVS.join(', ')}`,
    )
  }
  return value
}
