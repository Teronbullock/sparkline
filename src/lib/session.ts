import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

interface DecryptPayload {
  userId?: string;
  [key: string]: any;
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const cookieOpts = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  path: '/',
};

/**
 * -- Encrypt --
 *
 * @description Encrypts the payload using the secret key and returns a JWT.

 * @param payload - UserId 
  * @param expires - Expiration date (e.g. '15m', '1h', '1d', '1w')
 * @returns
 */
export async function encrypt(payload: { userId: string; expires: Date }, expires: string): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(encodedKey);
}

/**
 * -- Decrypt --
 *
 * @description Decrypts the JWT using the secret key and returns the payload.
 * @param session
 * @returns
 */
export async function decrypt(session: string | undefined = ''): Promise<DecryptPayload | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (err) {
    console.log('Failed to verify session', err);
  }
}

/**
 * -- Create session --
 *
 * @description Creates a session for the user and sets a cookie with the session data.
 * @param userId - The ID of the user to create a session for.
 * @returns
 */
export async function createSession(userId: string) {
  // exp is set to 15 minutes
  const expires = new Date(Date.now() + 1000 * 60 * 15);
  const session = await encrypt({ userId, expires }, '15m');
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    ...cookieOpts,
    expires,
  });
}

/**
 * -- Create refresh session --
 *
 * @description Creates a refresh session for the user and sets a cookie with the session data.
 * @param userId - The ID of the user to create a session for.
 * @returns
 */
export async function createRefreshSession(userId: string) {
  // exp is set to 1 week
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encrypt({ userId, expires }, '7d');
  const cookieStore = await cookies();
  cookieStore.set('refreshSession', session, {
    ...cookieOpts,
    expires,
  });
}

/**
 * -- Update session --
 *
 * @description Updates the session for the user and sets a cookie with the session data.
 * @param userId - The ID of the user to create a session for.
 * @returns
 */
export async function updateSession() {
  const session = (await cookies()).get('session')?.value;
  const refreshSession = (await cookies()).get('refreshSession')?.value;

  if (!session && !refreshSession) {
    console.log('No session found');
    return false;
  }

  // const refreshPayload = await decrypt(refreshSession);
  // const userId = payload?.userId;
  // // await createSession(userId);

  // console.log('New Session created');
  // return true;

  // const payload = await decrypt(session);
  // const isExpiredvaild = new Date(payload?.expires as string | number) > new Date();

  // if (isExpiredvaild) {
  //   console.log('Session is valid');
  //   return true;
  // }

  // const isExpired = payloadExp < (now - 1000 * 60 * 5);

  //   const expires = new Date(Date.now() + 1000 * 60 * 10);

  //   const cookieStore = await cookies();

  //   cookieStore.set('session', session, {
  //     ...cookieOpts.options,
  //     expires,
  //   });
}

export async function verifySession() {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) {
    console.log('No session found');
    return null;
  }

  const session = await decrypt(cookie);

  return session;
}

export async function verifyRefreshSession() {
  const cookie = (await cookies()).get('refreshSession')?.value;

  if (!cookie) {
    console.log('No refresh session found');
    return null;
  }

  const session = await decrypt(cookie);
  return session;
}

/**
 * -- Delete session --
 * @description Deletes the session for the user and removes the cookie with the session data.
 * @returns
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');

  console.log('Session deleted', cookieStore.get('session'));
}
