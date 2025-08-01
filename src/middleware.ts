import { auth, protectedRoutes, Route } from '@/auth.config'
import { NextResponse } from 'next/server';

import type { NextAuthRequest, Session } from 'next-auth';
import { isFuture } from 'date-fns';

const getMatchedRoute = (path: string): Route => {
  return protectedRoutes.find((route) =>
    (route.pattern instanceof RegExp) ? route.pattern.test(path) : route.pattern === path
  );
}

const isLoggedIn = (session?: Session): Session['user'] => {
  return session?.user && isFuture(session.expires) ? session.user : null;
}

export default auth((req: NextAuthRequest) => {
  const { pathname } = req.nextUrl;
  const match = getMatchedRoute(pathname);

  if (!match && pathname !== '/') {
    // not landing page and path is not protected, continue
    return NextResponse.next()
  }

  const loggedIn = isLoggedIn(req.auth);
  if (!loggedIn) {
    if (pathname === '/') {
      // we're at landing page, continue
      return NextResponse.next()
    }

    // login is required, redirect to signin
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (pathname === '/' || !match?.roles.includes(loggedIn.role)) {
    // we're at landing page, or user does not have sufficient role to access path
    // redirect (user => /home,  admin => /dashboard)
    if (loggedIn.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    } else {
      return NextResponse.redirect(new URL('/home', req.url))
    }
  }

  return NextResponse.next()
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!api|signin|signup|_next\/static|_next\/image|.*\.(?:png|svg)$).*)'
  ],
};
