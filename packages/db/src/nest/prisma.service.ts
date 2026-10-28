import { Inject, Injectable, type OnModuleDestroy } from '@nestjs/common'

import { PrismaClient } from '../generated/prisma/client.js'
import { createAdapter } from '../index.js'

export const PRISMA_OPTIONS = Symbol('PRISMA_OPTIONS')

export interface PrismaModuleOptions {
  /** postgresql:// connection string */
  url: string
}

/** PrismaClient as a Nest provider; disconnects on shutdown. */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(@Inject(PRISMA_OPTIONS) { url }: PrismaModuleOptions) {
    super({ adapter: createAdapter(url) })
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
