import { isFuture } from 'date-fns';
import { NextResponse } from 'next/server';

import { auth, protectedRoutes } from '@/auth.config.ts';

import type { NextAuthRequest, Session } from 'next-auth';

import type { Route } from '@/auth.config';

const getMatchedRoute = (path: string): Route => protectedRoutes.find((route) => (route.pattern instanceof RegExp ? route.pattern.test(path) : route.pattern === path));

const isLoggedIn = (session?: Session): Session['user'] => (session?.user && isFuture(session.expires) ? session.user : null);

export default auth((req: NextAuthRequest) => {
  const { pathname } = req.nextUrl;
  const match = getMatchedRoute(pathname);

  if (!match && pathname !== '/') {
    // Not landing page and path is not protected, continue
    return NextResponse.next();
  }

  const loggedIn = isLoggedIn(req.auth);
  if (!loggedIn) {
    if (pathname === '/') {
      // We're at landing page, continue
      return NextResponse.next();
    }

    // Login is required, redirect to signin
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (pathname === '/' || !match?.roles.includes(loggedIn.role)) {
    /*
     * We're at landing page, or user does not have sufficient role to access path
     * redirect (user => /home,  admin => /dashboard)
     */
    if (loggedIn.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.redirect(new URL('/home', req.url));
  }

  return NextResponse.next();
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|signin|signup|_next/static|_next/image|.*.(?:png|svg)$).*)']
};
