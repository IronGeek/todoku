import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import type { NextAuthOptions } from 'next-auth';

const UserOrPasswordError = new Error('Invalid user or password');
const UserNotVerifiedError = new Error('Unverified user');

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({
          email: z.email(),
          password: z.string().min(6),
        });

        const { email, password } = schema.parse(credentials);
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user || !user.password) { throw UserOrPasswordError }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) { throw UserOrPasswordError }

        if (!user.verifiedAt) { throw UserNotVerifiedError }
        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
