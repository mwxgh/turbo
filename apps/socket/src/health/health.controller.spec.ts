import { Logger, ServiceUnavailableException } from '@nestjs/common'

import { describe, expect, it, vi } from 'vitest'

import type { Redis } from '@repo/redis'

import { HealthController } from './health.controller'

const controllerWith = (ping: () => Promise<unknown>) =>
  new HealthController({ ping } as unknown as Redis)

describe('HealthController', () => {
  it('is ok when Redis answers', async () => {
    const res = await controllerWith(() => Promise.resolve('PONG')).check()
    expect(res).toMatchObject({
      status: 'ok',
      service: 'socket',
      env: 'dev', // APP_ENV default
      checks: { redis: 'up' },
    })
  })

  it('returns 503 and logs why when Redis is down', async () => {
    const warn = vi.spyOn(Logger.prototype, 'warn').mockImplementation(() => {})
    const check = controllerWith(() =>
      Promise.reject(new Error('ECONNREFUSED')),
    ).check()
    await expect(check).rejects.toBeInstanceOf(ServiceUnavailableException)
    await expect(check).rejects.toMatchObject({
      response: {
        status: 'error',
        service: 'socket',
        checks: { redis: 'down' },
      },
    })
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ECONNREFUSED'))
  })
})
