import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from './generated/prisma/client.js'

export * from './generated/prisma/client.js'
export * from './list-query.js'

/**
 * Build the node-postgres driver adapter from a postgresql:// URL. `?schema=<name>` (as for the
 * Prisma CLI) selects the Postgres schema, so several apps can share one database, one schema each;
 * the adapter ignores it in the URL, so it is passed as an option.
 */
export function createAdapter(databaseUrl: string) {
  const url = new URL(databaseUrl)
  const schema = url.searchParams.get('schema') ?? undefined
  url.searchParams.delete('schema')
  return new PrismaPg(
    {
      connectionString: url.toString(),
      // The adapter reads timestamptz as UTC: a server with another TimeZone would shift them
      options: '-c timezone=UTC',
    },
    { schema },
  )
}

export function createPrismaClient(databaseUrl: string) {
  return new PrismaClient({ adapter: createAdapter(databaseUrl) })
}
