import type { AppEnv } from '@repo/utils'

// Hand-written API contracts that are not Prisma models (models come from ./generated).

/** GET /health of api (database + redis) and socket (redis). */
export interface HealthResponse {
  status: 'ok'
  service: string
  env: AppEnv
  uptime: number
  timestamp: string
  checks?: Record<string, 'up' | 'down'>
}

/** Error body produced by Nest (ValidationPipe, HttpException, PrismaExceptionFilter). */
export interface ApiErrorBody {
  statusCode: number
  message: string | string[]
  error?: string
}

/** POST /files/uploads: a presigned POST straight to S3. */
export interface PresignedUpload {
  url: string
  fields: Record<string, string>
  key: string
}
