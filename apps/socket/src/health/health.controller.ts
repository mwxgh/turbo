import {
  Controller,
  Get,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common'

import { Public } from '@repo/auth/nest'
import { InjectRedis, type Redis, pingRedis } from '@repo/redis'

import { env } from '../env'

// Load balancers and orchestrators probe without credentials
@Public()
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name)

  constructor(@InjectRedis() private readonly redis: Redis) {}

  /** Liveness: 200 while the process can serve HTTP (never touches Redis). */
  @Get('live')
  live() {
    return {
      status: 'ok',
      service: 'socket',
      env: env.APP_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }
  }

  /**
   * Readiness: 200 when the socket server and Redis (cross-instance rooms) respond; 503 otherwise.
   * `/socket/health` is kept as an alias of `/socket/health/ready`.
   */
  @Get(['', 'ready'])
  async check() {
    const redis = await pingRedis(this.redis, undefined, (error) =>
      this.logger.warn(`Redis check failed: ${String(error)}`),
    )
    if (redis === 'down') {
      throw new ServiceUnavailableException({
        status: 'error',
        service: 'socket',
        checks: { redis: 'down' },
      })
    }
    return {
      status: 'ok',
      service: 'socket',
      env: env.APP_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      checks: { redis: 'up' },
    }
  }
}
