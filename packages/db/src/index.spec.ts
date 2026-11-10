import { PrismaPg } from '@prisma/adapter-pg'
import { describe, expect, it } from 'vitest'

import { createAdapter, createPrismaClient } from './index.js'

// Construction is lazy: no database connection is opened by these tests.
const URL = 'postgresql://user:pass@localhost:5432/app?schema=public'

describe('@repo/db', () => {
  it('creates a node-postgres driver adapter', () => {
    expect(createAdapter(URL)).toBeInstanceOf(PrismaPg)
  })

  it('takes the Postgres schema from ?schema= (not left in the connection string)', () => {
    const adapter = createAdapter(
      'postgresql://user:pass@db.example.com:5432/app?schema=turbo&sslmode=require',
    ) as unknown as {
      config: { connectionString: string; options: string }
      options: { schema?: string }
    }
    expect(adapter.options.schema).toBe('turbo')
    expect(adapter.config.connectionString).toBe(
      'postgresql://user:pass@db.example.com:5432/app?sslmode=require',
    )
    expect(adapter.config.options).toBe('-c timezone=UTC')
  })

  it('creates a Prisma client exposing the hello model', async () => {
    // Prisma 7 returns an extended client object, so check its API instead of
    // `instanceof PrismaClient`.
    const client = createPrismaClient(URL)
    expect(typeof client.$connect).toBe('function')
    expect(typeof client.$transaction).toBe('function')
    expect(typeof client.hello.findMany).toBe('function')
    await client.$disconnect()
  })
})
