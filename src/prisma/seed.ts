import bcrypt from 'bcrypt';

import { PrismaClient } from '../lib/prisma/client.ts';

const prisma = new PrismaClient()
async function main() {
  const now = Date.now()
  const justin = await prisma.user.upsert({
    where: { email: 'justin.case@example.com' },
    update: {},
    create: {
      email: 'justin.case@example.com',
      name: 'Justin Case',
      role: 'ADMIN',
      verifiedAt: new Date(now),
      password: await bcrypt.hash('87654321', 10)
    },
  })
  const john = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'USER',
      verifiedAt: new Date(now),
      password: await bcrypt.hash('12345678', 10)
    },
  })
  console.log({ justin, john })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
