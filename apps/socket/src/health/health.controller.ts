import {
  Controller,
  Get,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common'

import { InjectRedis, type Redis, pingRedis } from '@repo/redis'

import { env } from '../env'

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name)

  constructor(@InjectRedis() private readonly redis: Redis) {}

  /** 200 when the socket server and Redis (cross-instance rooms) respond; 503 otherwise. */
  @Get()
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
