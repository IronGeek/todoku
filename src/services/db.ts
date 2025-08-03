import { PrismaClient } from '@/lib/prisma/client.ts';

const prisma = new PrismaClient();

export { prisma };
