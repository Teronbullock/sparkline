import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from '@lib/session';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import dbConnect from '@lib/database';
import User from '@lib/models/user-model';

type CreateUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

/**
 * -- Get user by email --
 *
 * @param email - The email of the user to retrieve
 * @returns The user object if found, null otherwise
 */
export const getUserByEmail = cache(async (email: string) => {
  // Connect to the database
  await dbConnect();
  console.log('Database connected');

  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }
  return user;
});

/**
 * -- Create a new user --
 *
 * @param userData - The data of the user to create
 * The userData must contain the following fields:
 * - firstName: The first name of the user
 * - lastName: The last name of the user
 * - email: The email of the user
 * - password: The password of the user
 *
 * @returns The created user object if successful, false otherwise
 */
export const createUser = cache(async (userData: CreateUserData) => {
  // Connect to the database
  await dbConnect();
  console.log('Database connected');

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    throw new Error('Missing required fields');
  }

  try {
    return await User.create(userData);
  } catch (err) {
    console.error('Failed to create user');
    return false;
  }
});

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
