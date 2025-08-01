import { join } from 'node:path';
import { defineConfig } from 'prisma/config';

import 'dotenv/config';

export default defineConfig({
  schema: join("src/prisma", "schema.prisma"),
  migrations: {
    path: join("src/prisma", "migrations"),
    seed: "node src/prisma/seed.ts"
  }
});
