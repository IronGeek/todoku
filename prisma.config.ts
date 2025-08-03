import { join } from 'node:path';

import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  migrations: {
    path: join('src/prisma', 'migrations'),
    seed: 'node src/prisma/seed.ts'
  },
  schema: join('src/prisma', 'schema.prisma')
});
