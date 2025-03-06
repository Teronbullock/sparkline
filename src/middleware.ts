import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { updateSession } from '@/lib/session';

export default async function middleware(req: NextRequest) {
  // 1. Specify protected and public routes
  const protectedRoutes = ['/dashboard'];
  const publicRoutes = ['/login', '/signup', '/'];

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute) {
    // Check if the user is authenticated
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Update the session expiration time
    const updatedSession = await updateSession();
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
