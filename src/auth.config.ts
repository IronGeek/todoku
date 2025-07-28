import NextAuth, { CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

class CredentialsError extends CredentialsSignin {
  constructor(error?: Error) {
    super('credentials', { cause: error });
    this.code = 'credentials';
    this.stack = undefined;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const apiRouteUrl = new URL('/api/auth/verify-password', req.url).toString();

        const response = await fetch(apiRouteUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ credentials })
        });

        if (response.ok) {
          return await response.json();
        }

        throw new CredentialsError();
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  secret: process.env.NEXTAUTH_SECRET,
});

export const protectedRoutes: (string | RegExp)[] = [
  /^\/(?:home|today|upcoming|done|pin|archive|l\/.*?)$/u
];
