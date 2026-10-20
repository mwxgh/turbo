import {
  Controller,
  Get,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common'

import type { AppEnv } from '@repo/utils'

import { env } from '../config/env.js'
import { PrismaService } from '../prisma/prisma.service.js'

export interface HealthResponse {
  status: 'ok'
  service: string
  env: AppEnv
  uptime: number
  timestamp: string
  checks: { database: 'up' }
}

const DB_TIMEOUT_MS = 2_000

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name)

  constructor(private readonly prisma: PrismaService) {}

  /** 200 when the API and its database respond; 503 otherwise (for load balancers / Docker). */
  @Get()
  async check(): Promise<HealthResponse> {
    let timer: NodeJS.Timeout | undefined
    try {
      await Promise.race([
        this.prisma.$queryRaw`SELECT 1`,
        new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error('timeout')), DB_TIMEOUT_MS)
        }),
      ])
    } catch (error) {
      this.logger.warn(`Database check failed: ${String(error)}`)
      throw new ServiceUnavailableException({
        status: 'error',
        service: 'api',
        checks: { database: 'down' },
      })
    } finally {
      clearTimeout(timer)
    }

    return {
      status: 'ok',
      service: 'api',
      env: env.APP_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      checks: { database: 'up' },
    }
  }
}
