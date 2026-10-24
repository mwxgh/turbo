import type { AppEnv } from '@repo/utils'

/**
 * Non-model shapes of the NestJS API, as seen by the web app.
 *
 * Prisma models come from `@repo/types` as-is (already JSON-shaped: dates are
 * ISO strings, relations optional and depth-limited) – never redeclare them here.
 * Feature-only shapes (request bodies via `Pick<…>`) live next to the feature.
 */

export interface HealthResponse {
  status: 'ok'
  service: string
  env: AppEnv
  uptime: number
  timestamp: string
  /** Dependencies of the service: api → database + redis, socket → redis. */
  checks?: Record<string, 'up' | 'down'>
}

/** Result of a Server Action: API validation messages, or nothing on success. */
export type ActionState = { errors?: string[] }

/** POST /files/uploads: a presigned POST straight to S3. */
export interface PresignedUpload {
  url: string
  fields: Record<string, string>
  key: string
}

/** Error body produced by Nest (ValidationPipe, HttpException, PrismaExceptionFilter). */
export interface ApiErrorBody {
  statusCode: number
  message: string | string[]
  error?: string
}
