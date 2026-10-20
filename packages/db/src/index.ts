import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from './generated/prisma/client.js'

export * from './generated/prisma/client.js'
export * from './list-query.js'

/** Build the node-postgres driver adapter from a postgresql:// URL. */
export function createAdapter(connectionString: string) {
  return new PrismaPg({ connectionString })
}

export function createPrismaClient(databaseUrl: string) {
  return new PrismaClient({ adapter: createAdapter(databaseUrl) })
}
