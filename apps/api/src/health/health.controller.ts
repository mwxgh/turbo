import {
  Controller,
  Get,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common'

import { InjectRedis, type Redis, pingRedis } from '@repo/redis'

import { env } from '../config/env.js'
import { PrismaService } from '../prisma/prisma.service.js'

type Status = 'up' | 'down'

const TIMEOUT_MS = 2_000

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name)

  constructor(
    private readonly prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /** 200 when the API, its database and Redis respond; 503 otherwise (load balancers / Docker). */
  @Get()
  async check() {
    const [database, redis] = await Promise.all([
      this.pingDatabase(),
      pingRedis(this.redis, TIMEOUT_MS),
    ])
    if (database === 'down' || redis === 'down') {
      throw new ServiceUnavailableException({
        status: 'error',
        service: 'api',
        checks: { database, redis },
      })
    }
    return {
      status: 'ok',
      service: 'api',
      env: env.APP_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      checks: { database, redis },
    }
  }

  private async pingDatabase(): Promise<Status> {
    let timer: NodeJS.Timeout | undefined
    try {
      await Promise.race([
        this.prisma.$queryRaw`SELECT 1`,
        new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS)
        }),
      ])
      return 'up'
    } catch (error) {
      this.logger.warn(`Database check failed: ${String(error)}`)
      return 'down'
    } finally {
      clearTimeout(timer)
    }
  }
}
