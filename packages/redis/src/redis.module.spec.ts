import { Test } from '@nestjs/testing'

import type { Redis } from 'ioredis'
import { describe, expect, it } from 'vitest'

import { REDIS, RedisCache, RedisModule, pingRedis } from './index.js'

// lazyConnect: nothing connects unless a command is sent
const options = {
  url: 'redis://127.0.0.1:1',
  keyPrefix: 'unit:',
  lazyConnect: true,
  retryStrategy: () => null, // give up at once: no reconnect loop in tests
}

describe('RedisModule', () => {
  it('provides one shared client and the cache, globally', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RedisModule.forRoot(options)],
    }).compile()
    const redis = moduleRef.get<Redis>(REDIS)

    expect(redis.options.keyPrefix).toBe('unit:')
    expect(redis.options.port).toBe(1)
    expect(moduleRef.get(RedisCache)).toBeInstanceOf(RedisCache)

    await moduleRef.close() // shutdown hook: closes a never-connected client
    expect(redis.status).toBe('end')
  })

  it('reports an unreachable server as down without throwing', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RedisModule.forRoot(options)],
    }).compile()
    expect(await pingRedis(moduleRef.get<Redis>(REDIS), 200)).toBe('down')
    await moduleRef.close()
  })
})
