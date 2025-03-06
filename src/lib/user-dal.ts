import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import dbConnect from '@/lib/database';
import User from '@/lib/models/user-model';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    // Connect to the database
    await dbConnect();
    console.log('Database connected');

    const data = await User.findOne({ _id: session.userId }, { id: 1, name: 1, email: 1 });

    const user = data[0];
    console.log('user test', user);
    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});
