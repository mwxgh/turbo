import { Controller, Get } from '@nestjs/common'

import type { AppEnv } from '@repo/utils'

import { env } from '../config/env.js'

export interface HealthResponse {
  status: 'ok'
  service: string
  env: AppEnv
  uptime: number
  timestamp: string
}

@Controller('health')
export class HealthController {
  @Get()
  check(): HealthResponse {
    return {
      status: 'ok',
      service: 'socket',
      env: env.APP_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }
  }
}
