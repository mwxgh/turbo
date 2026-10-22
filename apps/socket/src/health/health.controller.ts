import { Controller, Get, ServiceUnavailableException } from '@nestjs/common'

import { InjectRedis, type Redis, pingRedis } from '@repo/redis'
import type { AppEnv } from '@repo/utils'

import { env } from '../config/env.js'

export interface HealthResponse {
  status: 'ok'
  service: string
  env: AppEnv
  uptime: number
  timestamp: string
  checks: { redis: 'up' }
}

@Controller('health')
export class HealthController {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  /** 200 when the socket server and Redis (cross-instance rooms) respond; 503 otherwise. */
  @Get()
  async check(): Promise<HealthResponse> {
    if ((await pingRedis(this.redis)) === 'down') {
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
