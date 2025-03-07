import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@lib/auth';
// import { cookies } from 'next/headers';
import { decrypt } from '@lib/session';
import { updateSession } from '@lib/session';

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/dashboard'];
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  if (isProtectedRoute) {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Check if the user is authenticated
    // const cookie = req.cookies.get('session')?.value;
    // const session = await decrypt(cookie);
    // if (!session?.userId) {
    //   return NextResponse.redirect(new URL('/login', req.nextUrl));
    // }
    // Update the session expiration time
    // const updatedSession = await updateSession();
  }

  return NextResponse.next();
}

// Exclude middleware from running on static, API, and image routes.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
