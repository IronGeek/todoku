import { auth, protectedRoutes } from '@/auth.config'
import { NextAuthRequest } from 'next-auth';
import { NextResponse } from 'next/server';

const isRouteMatch = (route: string): boolean => {
  return protectedRoutes.some((pattern) => (
    pattern instanceof RegExp) ? pattern.test(route) : route.startsWith(pattern)
  );
}

export default auth((req: NextAuthRequest) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = isRouteMatch(req.nextUrl.pathname);

  if (!isProtectedRoute || isLoggedIn) { return NextResponse.next() }

  return NextResponse.redirect(new URL('/signin', req.url));
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!api|signin|signup|_next\/static|_next\/image|.*\.(?:png|svg)$).+)'
  ],
};
