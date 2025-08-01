import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  type Role = 'USER' | 'ADMIN' | 'SYSTEM'

  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession['user']
  }

  interface User {
    id: string;
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
  }
}
