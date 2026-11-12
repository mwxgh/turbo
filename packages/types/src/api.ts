import type { AppEnv } from '@repo/utils'

import type { User } from './generated/models.js'

// Hand-written API contracts that are not Prisma models (models come from ./generated).

/**
 * GET /health (= /health/ready) of api (database + redis) and socket (redis);
 * GET /health/live answers the same shape without `checks`.
 */
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

/**
 * POST /auth/login, /auth/register, /auth/refresh. Browsers get the tokens as httpOnly cookies;
 * native clients sending `x-auth-transport: token` get them here.
 */
export interface AuthResponse {
  user: User
  /** Access token lifetime in seconds. */
  expiresIn: number
  accessToken?: string
  refreshToken?: string
}

/** GET /auth/methods: how clients may sign in (drives the sign-in screen). */
export interface AuthMethods {
  /** Enabled providers (`google`, `facebook`, `github`), as in `/auth/oauth/:provider`. */
  providers: string[]
  /** `POST /auth/register` is open. */
  registration: boolean
}
