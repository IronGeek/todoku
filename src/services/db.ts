import bcrypt from 'bcrypt';

import { PrismaClient } from '@/lib/prisma/client';

import type { OTP, User } from '@/lib/prisma/client';

const prisma = new PrismaClient();

interface CreateOTPResult  {
  readonly otp: string
  readonly record: Omit<OTP, 'id' | 'userId'>
}

const createOTP = async (note: string, expiry: number): Promise<CreateOTPResult> => {
  const now = Date.now();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const code = await bcrypt.hash(otp, 10);
  const createdAt = new Date(now);
  const expiredAt = new Date(now + expiry * 60 * 1000); // 10 minutes

  return { otp, record: { code, note, createdAt, expiredAt } }
}

const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email, deletedAt: null } });
};

const createUser = async (email: string, name: string, passwd: string, expiry: number = 10): Promise<[User, string]> => {
  return await prisma.$transaction(async (tx) => {
    const exist = await tx.user.findUnique({ where: { email, deletedAt: null } });
    if (exist) { throw new Error(`The email (${email}) is already registered with existing account`) }

    const password = await bcrypt.hash(passwd, 10);
    const { otp, record } = await createOTP('user:signup', expiry);

    const user = await tx.user.create({
      data: {
        email,
        password,
        name,
        otp: {
          create: record
        },
      }
    });

    return [user, otp];
  });
};

const createUserOTP = async (email: string, note: string, expiry: number = 10): Promise<string | null> => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { email, deletedAt: null } });
    if (!user) { return null }

    const { otp, record } = await createOTP(note, expiry);
    await tx.oTP.upsert({
      where: { userId: user.id },
      update: record,
      create: { ...record, userId: user.id },
    });

    return otp;
  });
};

const verifyUserPassword = async (email: string, userPassword: string): Promise<User> => {
  const user = await findUserByEmail(email);
  if (!user || !user.password) { return null }

  const valid = await bcrypt.compare(userPassword, user.password);
  if (!valid) { return null }

  return user;
};

const verifyUserOTP = async (email: string, userOTP: string): Promise<boolean> => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { email, deletedAt: null } });
    if (!user) { throw new Error(`The email (${email}) is not a registered account`) }

    const otp = await tx.oTP.findFirst({
      where: {
        userId: user.id,
        expiredAt: { gte: new Date() },
      },
    });

    if (!otp) { return false }
    const valid = await bcrypt.compare(userOTP, otp.code);
    console.log(otp.code, userOTP, valid);
    if (!valid) { return false }

    await tx.oTP.delete({ where: { id: otp.id } });

    await tx.user.update({
      where: { id: user.id },
      data: { verifiedAt: new Date() },
    });

    return true;
  });
};

export { findUserByEmail, createUser, createUserOTP, verifyUserPassword, verifyUserOTP };

