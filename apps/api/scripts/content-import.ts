/**
 * Loads a learning-content file (Studio and / or Lingo) into the database of DATABASE_URL. The
 * only way content enters a database (ADR 0032): no content in TS files or the seed.
 *
 *   pnpm --filter api content:import <file.json> --dry-run   # validate only, writes nothing
 *   pnpm --filter api content:import <file.json>             # local database (apps/api/.env)
 *   DATABASE_URL=… pnpm --filter api content:import <file.json> --remote   # stg / prod
 *
 * File: `{ "studio": { "tracks": [...], "roadmaps": [...] }, "lingo": { "exam", "items",
 * "decks", "tests" } }` (StudioContentDto, lingoContentSchema). Every row is validated before
 * anything is written. Safe to run twice: rows are matched by slug / content hash / title / term.
 * Lingo rows are owned by the first admin user.
 */
import { existsSync, readFileSync } from 'node:fs'
import { parseEnv } from 'node:util'

import { createPrismaClient } from '@repo/db'
import type { PrismaService } from '@repo/db/nest'
import { validateDto } from '@repo/nest-common'

import { AdminService } from '../src/lingo/admin.service'
import { contentIssues, lingoContentSchema } from '../src/lingo/content-file'
import { issueLines } from '../src/lingo/specs/schemas'
import { AdminLearnService } from '../src/studio/admin-learn.service'
import { StudioContentDto } from '../src/studio/dto/learn.dto'

const args = process.argv.slice(2)
const file = args.find((a) => !a.startsWith('--'))
const dryRun = args.includes('--dry-run')
if (!file)
  throw new Error('Usage: content:import <file.json> [--dry-run] [--remote]')

const raw = JSON.parse(readFileSync(file, 'utf8')) as {
  studio?: unknown
  lingo?: unknown
}
const problems: string[] = []

const studio = raw.studio ? validateDto(StudioContentDto, raw.studio) : null
if (studio && !studio.ok)
  problems.push(...studio.errors.map((e) => `studio.${e}`))

const lingo = raw.lingo ? lingoContentSchema.safeParse(raw.lingo) : null
if (lingo && !lingo.success)
  problems.push(...issueLines(lingo.error).map((e) => `lingo.${e}`))
else if (lingo) problems.push(...contentIssues(lingo.data))

if (problems.length) {
  console.error(`${problems.length} problems, nothing written:`)
  for (const line of problems.slice(0, 50)) console.error(`  ${line}`)
  process.exit(1)
}
const counts = {
  tracks: studio?.ok ? (studio.data.tracks?.length ?? 0) : 0,
  lessons: studio?.ok
    ? (studio.data.tracks ?? []).reduce(
        (n, t) => n + (t.lessons?.length ?? 0),
        0,
      )
    : 0,
  roadmaps: studio?.ok ? (studio.data.roadmaps?.length ?? 0) : 0,
  items: lingo?.success
    ? Object.values(lingo.data.items).reduce((n, i) => n + i.length, 0)
    : 0,
  decks: lingo?.success ? lingo.data.decks.length : 0,
  tests: lingo?.success ? lingo.data.tests.length : 0,
}
console.log('Valid:', counts)
if (dryRun) process.exit(0)

const url = process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL is not set')
const target = new URL(url)
console.log(
  `Target: ${target.hostname}:${target.port}${target.pathname} schema=${target.searchParams.get('schema') ?? 'public'}`,
)
// Anything but apps/api/.env (a tunnel to a server is 127.0.0.1 too) needs --remote on purpose
const envFile = new URL('../.env', import.meta.url)
const localUrl = existsSync(envFile)
  ? parseEnv(readFileSync(envFile, 'utf8')).DATABASE_URL
  : undefined
if (url !== localUrl && !args.includes('--remote'))
  throw new Error(
    'Not the database of apps/api/.env: add --remote to write to it',
  )

const prisma = createPrismaClient(url)
try {
  // The services only need the client: no Nest container for a one-off script
  const db = prisma as unknown as PrismaService
  if (studio?.ok)
    console.log(
      'Studio:',
      await new AdminLearnService(db).importContent(studio.data),
    )
  if (lingo?.success) {
    const admin = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
      orderBy: { createdAt: 'asc' },
      select: { id: true },
    })
    if (!admin) throw new Error('No admin user: run `pnpm db:seed` first')
    const { items, cards, tests } = await new AdminService(db).importContent(
      admin.id,
      lingo.data,
    )
    console.log(
      `Lingo items: ${items.succeeded} new, ${items.duplicates} kept, ${items.failed} invalid`,
    )
    console.log(
      `Lingo cards: ${cards.succeeded} new, ${cards.duplicates} updated, in ${cards.decks} decks`,
    )
    console.log(`Lingo tests: ${tests.map((t) => t.title).join(', ') || '–'}`)
  }
} finally {
  await prisma.$disconnect()
}
