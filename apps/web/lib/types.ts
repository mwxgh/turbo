import type { AppEnv } from '@repo/utils'

/** Response shapes of the NestJS API, as seen by the web app (dates are ISO strings). */

export interface HealthResponse {
  status: 'ok'
  service: string
  env: AppEnv
  uptime: number
  timestamp: string
  checks?: { database: 'up' | 'down' }
}

/** Error body produced by Nest (ValidationPipe, HttpException, PrismaExceptionFilter). */
export interface ApiErrorBody {
  statusCode: number
  message: string | string[]
  error?: string
}

export interface Hello {
  id: string
  message: string
  createdAt: string
  updatedAt: string
}
