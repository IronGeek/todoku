import { hash } from 'bcrypt';

import { PrismaClient } from '../lib/prisma/client.ts';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  const now = Date.now();
  const justin = await prisma.user.upsert({
    create: {
      email     : 'justin.case@example.com',
      name      : 'Justin Case',
      password  : await hash('87654321', 10),
      role      : 'ADMIN',
      verifiedAt: new Date(now)
    },
    update: {},
    where : { email: 'justin.case@example.com' }
  });
  const john = await prisma.user.upsert({
    create: {
      email     : 'john.doe@example.com',
      name      : 'John Doe',
      password  : await hash('12345678', 10),
      role      : 'USER',
      verifiedAt: new Date(now)
    },
    update: {},
    where : { email: 'john.doe@example.com' }
  });

  console.debug({ john, justin });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
