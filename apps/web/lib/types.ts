import type { Jsonify } from 'type-fest'

import type { Hello as HelloModel } from '@repo/db/browser'
import type { AppEnv } from '@repo/utils'

/**
 * Response shapes of the NestJS API, as seen by the web app.
 *
 * Prisma models: never redeclare their fields here – derive them from
 * `@repo/db/browser` with `Jsonify` (Date → ISO string, as JSON delivers them).
 * Relations: `Jsonify<Prisma.XGetPayload<{ include: { … } }>>`; columns the API
 * hides: `Omit<…>`. Only non-model shapes (health, errors) are written by hand.
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

export type Hello = Jsonify<HelloModel>

/** Body of POST /hellos (PATCH accepts any subset). */
export type HelloInput = Pick<Hello, 'message'>
