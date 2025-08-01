import bcrypt from 'bcrypt';

import { prisma } from '@/services/db';

import type { OTP, User } from '@/lib/prisma/client';

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

const createUser = async (user: Partial<User>, skipOTP?: boolean, expiry: number = 10): Promise<[User, string]> => {
  return await prisma.$transaction(async (tx) => {
    const { email, name, password: passwd, role = 'USER' } = user;

    const exist = await tx.user.findUnique({ where: { email, deletedAt: null } });
    if (exist) { throw new Error(`The email (${email}) is already registered with existing account`) }

    const password = await bcrypt.hash(passwd, 10);
    if (skipOTP) {
      const user = await tx.user.create({
        data: {
          email,
          password,
          name,
          role,
          verifiedAt: new Date()
        }
      });

      return [user, ''];
    } else {
      const { otp, record } = await createOTP('user:signup', expiry);

      const user = await tx.user.create({
        data: {
          email,
          password,
          name,
          role,
          otp: {
            create: record
          },
        }
      });

      return [user, otp];
    }
  });
};

const updateUser = async (user: Partial<User>): Promise<User> => {
  return await prisma.$transaction(async (tx) => {
    const { id, email, name, password: passwd, role = 'USER' } = user;
    const password = passwd ? await bcrypt.hash(passwd, 10) : undefined;

    const updated = await tx.user.update({
      where: { id, deletedAt: null },
      data: {
        name, email, role, password,
      }
    })

    return updated;
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
    if (!valid) { return false }

    await tx.oTP.delete({ where: { id: otp.id } });

    await tx.user.update({
      where: { id: user.id },
      data: { verifiedAt: new Date() },
    });

    return true;
  });
};

const getUsers = async (pageIndex: number = 0, pageSize: number = 10): Promise<User[]> => {
  return await prisma.user.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
  });
};

const removeUserById = async (id: string): Promise<void> => {
  await prisma.user.delete({ where: { id } });
};

export {
  findUserByEmail, createUser, updateUser, createUserOTP, verifyUserPassword, verifyUserOTP,
  getUsers, removeUserById
};

