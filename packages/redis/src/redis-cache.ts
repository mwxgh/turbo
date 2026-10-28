import { Injectable } from '@nestjs/common'

import type { Redis } from 'ioredis'

import { InjectRedis } from './tokens.js'

/** `*`, `?`, `[`, `]` and `\` are glob syntax in SCAN MATCH. */
const escapeGlob = (value: string) => value.replace(/[*?[\]\\]/g, '\\$&')

/**
 * JSON values in Redis – keys are relative to the client's `keyPrefix`:
 *
 *   const hellos = await cache.getOrSet('hellos:count', 60, () => prisma.hello.count())
 *   await cache.delByPrefix('hellos:') // after a write
 */
@Injectable()
export class RedisCache {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  /** `undefined` when the key is missing. */
  async get<T>(key: string): Promise<T | undefined> {
    const raw = await this.redis.get(key)
    return raw === null ? undefined : (JSON.parse(raw) as T)
  }

  /** Without `ttlSeconds` the value never expires; `undefined` deletes the key. */
  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    // JSON.stringify(undefined) is undefined, which ioredis would store as ''
    if (value === undefined) {
      await this.redis.del(key)
      return
    }
    const raw = JSON.stringify(value)
    if (ttlSeconds) await this.redis.set(key, raw, 'EX', ttlSeconds)
    else await this.redis.set(key, raw)
  }

  /** Cache-aside: the cached value, or `load()`'s result stored for `ttlSeconds`. */
  async getOrSet<T>(
    key: string,
    ttlSeconds: number,
    load: () => Promise<T>,
  ): Promise<T> {
    const cached = await this.get<T>(key)
    if (cached !== undefined) return cached
    const value = await load()
    await this.set(key, value, ttlSeconds)
    return value
  }

  async del(...keys: string[]): Promise<number> {
    return keys.length ? this.redis.del(...keys) : 0
  }

  /** Delete every key starting with `prefix` (SCAN + UNLINK: safe on large databases). */
  async delByPrefix(prefix: string): Promise<number> {
    // keyPrefix is neither applied to SCAN patterns nor stripped from its
    // replies, while UNLINK adds it again: match with it, delete without it
    const keyPrefix = this.redis.options.keyPrefix ?? ''
    const stream = this.redis.scanStream({
      match: `${escapeGlob(keyPrefix + prefix)}*`,
      count: 200,
    })
    let deleted = 0
    for await (const keys of stream as AsyncIterable<string[]>) {
      if (keys.length)
        deleted += await this.redis.unlink(
          ...keys.map((key) => key.slice(keyPrefix.length)),
        )
    }
    return deleted
  }
}
