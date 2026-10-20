import 'dotenv/config'

import { createPrismaClient } from '../src/index.js'

const prisma = createPrismaClient(process.env.DATABASE_URL!)

async function main() {
  if ((await prisma.hello.count()) > 0) {
    console.log('hellos already seeded, skipping.')
    return
  }
  await prisma.hello.createMany({
    data: [{ message: 'Hello, world!' }, { message: 'Xin chào!' }],
  })
  console.log('Seeded hellos.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
