/**
 * Loads the built-in Lingo content (sample items and tests, vocabulary decks) into the database of
 * DATABASE_URL, the same as "Nạp dữ liệu mẫu" on /teach/import. Safe to run twice: existing items,
 * cards, decks and tests are kept.
 *
 *   pnpm --filter api lingo:seed
 *
 * Content is owned by the first admin user (create one with `pnpm db:seed`).
 */
import { createPrismaClient } from '@repo/db'
import type { PrismaService } from '@repo/db/nest'

import { AdminService } from '../src/lingo/admin.service'

const url = process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL is not set')
const prisma = createPrismaClient(url)

try {
  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
    orderBy: { createdAt: 'asc' },
    select: { id: true },
  })
  if (!admin) throw new Error('No admin user: run `pnpm db:seed` first')
  // The service only needs the client: no Nest container for a one-off script
  const service = new AdminService(prisma as unknown as PrismaService)
  const { items, cards, tests } = await service.loadSamples(admin.id)
  console.log(
    `Items: ${items.succeeded} new, ${items.duplicates} kept, ${items.failed} invalid`,
  )
  for (const error of items.errors.slice(0, 10))
    console.log(`  line ${error.line}: ${error.issues.join('; ')}`)
  console.log(
    `Cards: ${cards.succeeded} new, ${cards.duplicates} kept, ${cards.failed} invalid, in ${cards.decks} decks`,
  )
  console.log(`Tests: ${tests.map((t) => t.title).join(', ')}`)
} finally {
  await prisma.$disconnect()
}
