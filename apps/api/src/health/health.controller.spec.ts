import { Logger, ServiceUnavailableException } from '@nestjs/common'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { Redis } from '@repo/redis'

import type { PrismaService } from '../prisma/prisma.service.js'
import { HealthController } from './health.controller.js'

const controllerWith = (
  $queryRaw: () => Promise<unknown>,
  ping: () => Promise<unknown> = () => Promise.resolve('PONG'),
) =>
  new HealthController(
    { $queryRaw } as unknown as PrismaService,
    { ping } as unknown as Redis,
  )

describe('HealthController', () => {
  beforeEach(() => {
    // Expected warnings for the failure cases
    vi.spyOn(Logger.prototype, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('is ok when the database answers', async () => {
    const res = await controllerWith(() => Promise.resolve([1])).check()
    expect(res).toMatchObject({
      status: 'ok',
      service: 'api',
      env: 'dev', // APP_ENV default
      checks: { database: 'up', redis: 'up' },
    })
  })

  it('returns 503 naming the failed dependency when Redis is down', async () => {
    const check = controllerWith(
      () => Promise.resolve([1]),
      () => Promise.reject(new Error('ECONNREFUSED')),
    ).check()
    await expect(check).rejects.toMatchObject({
      response: { checks: { database: 'up', redis: 'down' } },
    })
  })

  it('returns 503 when the database query fails', async () => {
    const check = controllerWith(() =>
      Promise.reject(new Error('down')),
    ).check()
    await expect(check).rejects.toBeInstanceOf(ServiceUnavailableException)
  })

  it('returns 503 when the database does not answer within 2s', async () => {
    vi.useFakeTimers()
    const check = controllerWith(() => new Promise(() => {})).check()
    const assertion = expect(check).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    )
    await vi.advanceTimersByTimeAsync(2_000)
    await assertion
  })
})
