import type { ThrottlerStorage } from '@nestjs/throttler'

import type { Redis } from 'ioredis'

/**
 * Fixed window per key, atomic in one round trip. Over the limit, the key is blocked for
 * `blockDuration` (the guard defaults it to `ttl`). Returns hits, window PTTL, blocked, block PTTL.
 */
const SCRIPT = `
local blockTtl = redis.call('PTTL', KEYS[2])
if blockTtl > 0 then
  return { tonumber(redis.call('GET', KEYS[1]) or ARGV[2]), redis.call('PTTL', KEYS[1]), 1, blockTtl }
end
local hits = redis.call('INCR', KEYS[1])
if hits == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end
local ttl = redis.call('PTTL', KEYS[1])
if hits > tonumber(ARGV[2]) then
  local block = tonumber(ARGV[3])
  if block <= 0 then return { hits, ttl, 1, ttl } end
  redis.call('SET', KEYS[2], 1, 'PX', block)
  return { hits, ttl, 1, block }
end
return { hits, ttl, 0, 0 }
`

type ThrottlerStorageRecord = Awaited<ReturnType<ThrottlerStorage['increment']>>

const seconds = (ms: number) => Math.max(0, Math.ceil(ms / 1000))

/**
 * `@nestjs/throttler` storage shared by every instance of an app (the default one is per process).
 * Keys live under the client's `keyPrefix` (per APP_ENV):
 *
 *   ThrottlerModule.forRootAsync({
 *     inject: [REDIS],
 *     useFactory: (redis: Redis) => ({ throttlers: [...], storage: new RedisThrottlerStorage(redis) }),
 *   })
 */
export class RedisThrottlerStorage implements ThrottlerStorage {
  constructor(private readonly redis: Redis) {}

  async increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<ThrottlerStorageRecord> {
    const base = `throttle:${throttlerName}:${key}`
    const [hits, ttlMs, blocked, blockMs] = (await this.redis.eval(
      SCRIPT,
      2,
      base,
      `${base}:block`,
      ttl,
      limit,
      blockDuration,
    )) as [number, number, number, number]
    return {
      totalHits: hits,
      timeToExpire: seconds(ttlMs),
      isBlocked: blocked === 1,
      timeToBlockExpire: seconds(blockMs),
    }
  }
}
