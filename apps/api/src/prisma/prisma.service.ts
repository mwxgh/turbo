import { Injectable, type OnModuleDestroy } from '@nestjs/common'

import { PrismaClient, createAdapter } from '@repo/db'

import { env } from '../config/env.js'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super({ adapter: createAdapter(env.DATABASE_URL) })
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
