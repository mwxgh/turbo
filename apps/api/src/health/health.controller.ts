import {
  Controller,
  Get,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common'

import { PrismaService } from '@repo/db/nest'
import { InjectRedis, type Redis, pingRedis } from '@repo/redis'
import { probe } from '@repo/utils'

import { env } from '../env'

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
      probe(
        () => this.prisma.$queryRaw`SELECT 1`,
        TIMEOUT_MS,
        (error) => this.logger.warn(`Database check failed: ${String(error)}`),
      ),
      pingRedis(this.redis, TIMEOUT_MS, (error) =>
        this.logger.warn(`Redis check failed: ${String(error)}`),
      ),
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
}
