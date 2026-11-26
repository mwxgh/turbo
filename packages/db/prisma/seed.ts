import 'dotenv/config'

import { hashPassword } from '@repo/nest-common/auth'

import { createPrismaClient } from '../src/index.js'
import { STUDIO_ROADMAPS, STUDIO_TRACKS } from './studio-content.js'

const prisma = createPrismaClient(process.env.DATABASE_URL!)

/** First admin from ADMIN_EMAIL / ADMIN_USERNAME / ADMIN_PASSWORD (skipped when unset). */
async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const username = process.env.ADMIN_USERNAME?.trim().toLowerCase() || null
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    console.log(
      'ADMIN_EMAIL / ADMIN_PASSWORD not set, skipping the admin user.',
    )
    return
  }
  if (password.length < 8) throw new Error('ADMIN_PASSWORD needs 8+ characters')
  if (await prisma.user.findUnique({ where: { email } })) {
    console.log(`Admin ${email} already exists, skipping.`)
    return
  }
  await prisma.user.create({
    data: {
      email,
      username,
      name: 'Admin',
      role: 'ADMIN',
      passwordHash: await hashPassword(password),
    },
  })
  console.log(`Seeded admin ${email}.`)
}

async function seedHellos() {
  if ((await prisma.hello.count()) > 0) {
    console.log('hellos already seeded, skipping.')
    return
  }
  await prisma.hello.createMany({
    data: [{ message: 'Hello, world!' }, { message: 'Xin chào!' }],
  })
  console.log('Seeded hellos.')
}

/** Studio starter content: only tracks / roadmaps whose slug is missing (admin edits are kept). */
async function seedStudio() {
  let added = 0
  for (const [order, { lessons, ...track }] of STUDIO_TRACKS.entries()) {
    if (await prisma.studioTrack.findUnique({ where: { slug: track.slug } }))
      continue
    await prisma.studioTrack.create({
      data: {
        ...track,
        order,
        status: 'PUBLISHED',
        lessons: {
          create: lessons.map(({ questions, ...lesson }, lessonOrder) => ({
            ...lesson,
            order: lessonOrder,
            status: 'PUBLISHED',
            questions: {
              create: questions.map((question, i) => ({
                ...question,
                order: i,
              })),
            },
          })),
        },
      },
    })
    added++
  }
  for (const [order, { steps, ...roadmap }] of STUDIO_ROADMAPS.entries()) {
    if (
      await prisma.studioRoadmap.findUnique({ where: { slug: roadmap.slug } })
    )
      continue
    const tracks = await prisma.studioTrack.findMany({
      where: { slug: { in: steps.flatMap((step) => step.track ?? []) } },
      select: { id: true, slug: true },
    })
    const idOf = new Map(tracks.map((track) => [track.slug, track.id]))
    await prisma.studioRoadmap.create({
      data: {
        ...roadmap,
        order,
        status: 'PUBLISHED',
        steps: {
          create: steps.map(({ track, ...step }, i) => ({
            ...step,
            order: i,
            trackId: (track && idOf.get(track)) ?? null,
          })),
        },
      },
    })
    added++
  }
  console.log(`Seeded ${added} Studio tracks / roadmaps.`)
}

/** `tsx prisma/seed.ts studio`: Studio content only (the e2e database, apps/e2e/prepare-db.ts). */
async function main() {
  if (process.argv[2] === 'studio') return seedStudio()
  await seedAdmin()
  await seedHellos()
  await seedStudio()
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
