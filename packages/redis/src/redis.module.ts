import {
  type DynamicModule,
  Logger,
  Module,
  type OnApplicationShutdown,
} from '@nestjs/common'

import { Redis, type RedisOptions } from 'ioredis'

import { RedisCache } from './redis-cache.js'
import { InjectRedis, REDIS } from './tokens.js'

export interface RedisModuleOptions extends RedisOptions {
  /** `redis://[user:pass@]host:6379[/db]` (`rediss://` for TLS). */
  url: string
}

/**
 * A client with logged connection events. Without an `error` listener ioredis
 * prints "Unhandled error event" on every failed reconnect.
 */
function createRedis(
  { url, ...options }: RedisModuleOptions,
  logger = new Logger('Redis'),
): Redis {
  const client = new Redis(url, options)
  client.on('ready', () => logger.log('ready'))
  client.on('reconnecting', () => logger.warn('reconnecting…'))
  client.on('error', (error: Error) => logger.error(error.message))
  return client
}

/**
 * One Redis connection per app, injectable everywhere (global):
 *
 *   RedisModule.forRoot({ url: env.REDIS_URL, keyPrefix: env.redisKeyPrefix })
 *
 * Provides `REDIS` (the ioredis client) and `RedisCache` (JSON cache helpers).
 * The connection is closed when the app shuts down.
 */
@Module({})
export class RedisModule implements OnApplicationShutdown {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      global: true,
      providers: [
        { provide: REDIS, useFactory: () => createRedis(options) },
        RedisCache,
      ],
      exports: [REDIS, RedisCache],
    }
  }

  async onApplicationShutdown() {
    // QUIT waits for pending replies; a client that never connected just closes
    if (this.redis.status === 'ready') await this.redis.quit()
    else this.redis.disconnect()
  }
}
