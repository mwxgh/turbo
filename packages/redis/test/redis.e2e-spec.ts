import { randomUUID } from 'node:crypto'

import { Test } from '@nestjs/testing'

import type { Redis } from 'ioredis'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { REDIS, RedisCache, RedisModule, pingRedis } from '../src/index.js'

describe('@repo/redis against a real Redis', () => {
  // A unique prefix per run: tests never see or delete other keys
  const keyPrefix = `e2e:${randomUUID()}:`
  let redis: Redis
  let cache: RedisCache
  let close: () => Promise<void>

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot({ url: process.env.REDIS_URL!, keyPrefix }),
      ],
    }).compile()
    redis = moduleRef.get(REDIS)
    cache = moduleRef.get(RedisCache)
    close = () => moduleRef.close()
  })

  afterAll(async () => {
    await cache.delByPrefix('')
    await close()
  })

  it('answers the health ping', async () => {
    expect(await pingRedis(redis)).toBe('up')
  })

  it('stores JSON under the key prefix, with an optional TTL', async () => {
    await cache.set('user:1', { id: 1, name: 'Ann' }, 60)
    expect(await cache.get('user:1')).toEqual({ id: 1, name: 'Ann' })
    expect(await cache.get('missing')).toBeUndefined()
    // Really stored as <keyPrefix>user:1, expiring
    expect(await redis.ttl('user:1')).toBeGreaterThan(0)
    const raw = redis.duplicate({ keyPrefix: '' })
    expect(await raw.exists(`${keyPrefix}user:1`)).toBe(1)
    await raw.quit()
  })

  it('getOrSet loads once, then serves the cache (null included)', async () => {
    const load = vi.fn(() => Promise.resolve({ total: 3 }))
    expect(await cache.getOrSet('count', 60, load)).toEqual({ total: 3 })
    expect(await cache.getOrSet('count', 60, load)).toEqual({ total: 3 })
    expect(load).toHaveBeenCalledTimes(1)

    const none = vi.fn(() => Promise.resolve(null))
    await cache.getOrSet('none', 60, none)
    expect(await cache.getOrSet('none', 60, none)).toBeNull()
    expect(none).toHaveBeenCalledTimes(1)
  })

  it('set(undefined) deletes the key instead of storing an unreadable value', async () => {
    await cache.set('gone', 1)
    await cache.set('gone', undefined)
    expect(await cache.get('gone')).toBeUndefined()

    const load = vi.fn(() => Promise.resolve(undefined))
    expect(await cache.getOrSet('void', 60, load)).toBeUndefined()
    expect(await cache.get('void')).toBeUndefined()
  })

  it('delByPrefix removes only matching keys of this prefix', async () => {
    for (let i = 0; i < 250; i++) await cache.set(`hellos:${i}`, i) // > one SCAN page
    await cache.set('hellos*literal', 'glob chars are escaped')
    await cache.set('other:1', 'kept')
    const neighbour = redis.duplicate({ keyPrefix: `${keyPrefix}x` }) // e2e:<id>:xhellos:…
    await neighbour.set('hellos:1', 'not ours')

    expect(await cache.delByPrefix('hellos:')).toBe(250)
    expect(await cache.get('hellos:0')).toBeUndefined()
    expect(await cache.get('hellos*literal')).toBe('glob chars are escaped')
    expect(await cache.get('other:1')).toBe('kept')
    expect(await neighbour.get('hellos:1')).toBe('not ours')
    await neighbour.del('hellos:1')
    await neighbour.quit()
  })
})
