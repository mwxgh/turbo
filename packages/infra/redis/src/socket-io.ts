import type { INestApplicationContext } from '@nestjs/common'
import { IoAdapter } from '@nestjs/platform-socket.io'

import { createAdapter } from '@socket.io/redis-adapter'
import type { Redis } from 'ioredis'
import type { Server, ServerOptions } from 'socket.io'

/**
 * Socket.IO over several socket instances: emits to rooms / namespaces are
 * relayed through Redis pub/sub, so clients connected to any instance get them.
 */
export class RedisIoAdapter extends IoAdapter {
  // A subscribed connection cannot run other commands: one each for pub and sub
  private readonly pub: Redis
  private readonly sub: Redis

  /**
   * @param channel Pub/sub channel prefix. Channels are not keys, so the
   *   client's keyPrefix does not apply: include the environment in it.
   */
  constructor(
    app: INestApplicationContext,
    redis: Redis,
    private readonly channel: string,
  ) {
    super(app)
    this.pub = redis.duplicate()
    this.sub = redis.duplicate()
  }

  override createIOServer(port: number, options?: ServerOptions): Server {
    const server = super.createIOServer(port, options)
    server.adapter(createAdapter(this.pub, this.sub, { key: this.channel }))
    return server
  }

  override async dispose() {
    await super.dispose()
    await Promise.all([this.pub.quit(), this.sub.quit()])
  }
}
