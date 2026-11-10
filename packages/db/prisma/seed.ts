import 'dotenv/config'

import { hashPassword } from '@repo/auth'

import { createPrismaClient } from '../src/index.js'

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

async function main() {
  await seedAdmin()
  await seedHellos()
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
