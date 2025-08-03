import NextAuth, { CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import type { Role } from 'next-auth';

class CredentialsError extends CredentialsSignin {
  constructor(error?: Error) {
    super('credentials', { cause: error });
    this.code = 'credentials';
    this.stack = undefined;
  }
}

const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }

      if (token.role) {
        session.user.role = token.role as Role;
      }

      return session;
    }
  },
  pages    : { signIn: '/signin' },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const apiRouteUrl = new URL('/api/auth/verify-password', req.url).toString();

        const response = await fetch(apiRouteUrl, {
          body   : JSON.stringify({ credentials }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });

        if (response.ok) {
          return await response.json();
        }

        throw new CredentialsError();
      },
      credentials: {
        email   : { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      name: 'Credentials'
    })
  ],
  secret : process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' }
});

interface Route {
  pattern: string | RegExp
  roles: Role[]
}

const protectedRoutes: Route[] = [
  {
    // /home, /today, /upcoming, /done, /pin, /archive, and /l/*
    pattern: /^\/(?:home|today|upcoming|done|pin|archive|l\/.*?)$/u,
    roles  : ['USER', 'ADMIN']
  },
  {
    // All routes under /dashboard
    pattern: /^\/dashboard/u,
    roles  : ['ADMIN']
  }
];

export { auth, handlers, signIn, signOut, protectedRoutes };
export type { Route };
