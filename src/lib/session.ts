import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const cookieOpts = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
  },
};

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (err) {
    console.log('Failed to verify session', err);
  }
}

export async function createSession(userId: string) {
  // exp is set to 15 minutes
  const expires = new Date(Date.now() + 1000 * 60 * 15);
  const session = await encrypt({ userId, expires });
  const cookieStore = await cookies();

  cookieStore.set(cookieOpts.name, session, {
    ...cookieOpts.options,
    expires,
  });
}

export async function createRefreshSession(userId: string) {
  // exp is set to 1 week
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encrypt({ userId, expires });
  const cookieStore = await cookies();
  cookieStore.set('refreshSession', session, {
    ...cookieOpts.options,
    expires,
  });
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value;

  if (!session) {
    return null;
  }

  const payload = await decrypt(session);
  console.log('Test payload', payload);
  const expires = new Date(Date.now() + 1000 * 60 * 10);

  const cookieStore = await cookies();

  cookieStore.set(cookieOpts.name, session, {
    ...cookieOpts.options,
    expires,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
