import { compare, hash } from 'bcrypt';

import { prisma } from '@/services/db.ts';

import type { OTP, User } from '@/lib/prisma/client';

interface CreateOTPResult {
  readonly otp: string
  readonly record: Omit<OTP, 'id' | 'userId'>
}
const MIN_OTP = 100000;
const MAX_OTP = 900000;

const createOTP = async (note: string, expiry: number): Promise<CreateOTPResult> => {
  const now = Date.now();
  const otp = Math.floor(MIN_OTP + Math.random() * MAX_OTP).toString();
  const code = await hash(otp, 10);
  const createdAt = new Date(now);
  const expiredAt = new Date(now + expiry * 60 * 1000); // 10 minutes

  return { otp, record: { code, createdAt, expiredAt, note }};
};

const findUserByEmail = async (email: string): Promise<User | null> => prisma.user.findUnique({ where: { email, deletedAt: null }});

const createUser = async (data: Partial<User>, skipOTP?: boolean, expiry: number = 10): Promise<[User, string]> => await prisma.$transaction(async (tx) => {
  const { email, name, password: passwd, role = 'USER' } = data;

  const exist = await tx.user.findUnique({ where: { email, deletedAt: null }});
  if (exist) { throw new Error(`The email (${email}) is already registered with existing account`) }

  const password = await hash(passwd, 10);
  if (skipOTP) {
    const user = await tx.user.create({
      data: {
        email,
        name,
        password,
        role,
        verifiedAt: new Date()
      }
    });

    return [user, ''];
  }

  const { otp, record } = await createOTP('user:signup', expiry);

  const user = await tx.user.create({
    data: {
      email,
      name,
      password,
      role,
      otp: {
        create: record
      }
    }
  });

  return [user, otp];
});

const updateUser = async (user: Partial<User>): Promise<User> => await prisma.$transaction(async (tx) => {
  const { id, email, name, password: passwd, role = 'USER' } = user;

  const password = passwd ? await hash(passwd, 10) : undefined;

  const updated = await tx.user.update({
    data: {
      email, name, password, role
    },
    where: { id, deletedAt: null }
  });

  return updated;
});

const createUserOTP = async (email: string, note: string, expiry: number = 10): Promise<string | null> => await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUnique({ where: { email, deletedAt: null }});
  if (!user) { return null }

  const { otp, record } = await createOTP(note, expiry);

  await tx.oTP.upsert({
    create: { ...record, userId: user.id },
    update: record,
    where : { userId: user.id }
  });

  return otp;
});

const verifyUserPassword = async (email: string, userPassword: string): Promise<User> => {
  const user = await findUserByEmail(email);
  if (!user || !user.password) { return null }

  const valid = await compare(userPassword, user.password);
  if (!valid) { return null }

  return user;
};

const verifyUserOTP = async (email: string, userOTP: string): Promise<boolean> => await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUnique({ where: { email, deletedAt: null }});
  if (!user) { throw new Error(`The email (${email}) is not a registered account`) }

  const otp = await tx.oTP.findFirst({
    where: {
      expiredAt: { gte: new Date() },
      userId   : user.id
    }
  });

  if (!otp) { return false }

  const valid = await compare(userOTP, otp.code);
  if (!valid) { return false }

  await tx.oTP.delete({ where: { id: otp.id }});

  await tx.user.update({
    data : { verifiedAt: new Date() },
    where: { id: user.id }
  });

  return true;
});

const getUsers = async (pageIndex: number = 0, pageSize: number = 10): Promise<User[]> => await prisma.user.findMany({
  skip: pageIndex * pageSize,
  take: pageSize
});

const removeUserById = async (id: string): Promise<void> => {
  await prisma.user.delete({ where: { id }});
};

export {
  findUserByEmail, createUser, updateUser, createUserOTP, verifyUserPassword, verifyUserOTP,
  getUsers, removeUserById
};
