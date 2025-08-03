import type { DefaultSession, Role } from 'next-auth';

declare module 'next-auth' {
  declare type Role = 'USER' | 'ADMIN' | 'SYSTEM';

  interface Session {
    user: {
      id: string
      role: Role
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: Role
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
  }
}
