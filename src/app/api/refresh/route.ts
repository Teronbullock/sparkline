// import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { decrypt, verifyRefreshSession, verifySession, createSession } from '@lib/session';

export async function GET(req: Request) {
  const refreshSession = await verifyRefreshSession();
  const session = await verifySession();

  if (!session && !refreshSession) {
    console.log('Session is invalid');
    return NextResponse.json(
      {
        error: 'Session is invalid',
        verified: false,
      },
      { status: 401 }
    );
  }

  if (!session && refreshSession) {
    const userId = refreshSession?.userId;

    if (!userId) {
      console.log('No userId found in refresh session');
      return NextResponse.json(
        {
          error: 'No userId found in refresh session',
          verified: false,
        },
        { status: 401 }
      );
    }

    await createSession(userId);

    return NextResponse.json(
      {
        verified: true,
      },
      { status: 200 }
    );
  }

  const isExpired = new Date(session?.expires as string | number) < new Date();

  if (isExpired) {
    console.log('Session is expired');
    return NextResponse.json(
      {
        error: 'Session is expired',
        verified: false,
      },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      verified: true,
    },
    { status: 200 }
  );
}
