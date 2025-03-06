'use server';

import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/database';
import User from '@/lib/models/user-model';
import { RegisterFormSchema, LoginFormSchema, RegFormState, LoginFormState } from '@/lib/definitions';
import { createSession, createRefreshSession, deleteSession } from '@/lib/session';

// Initialize DOMPurify for Next.js (Node.js environment)
const { window } = new JSDOM('');
const purify = DOMPurify(window);

export async function signup(state: RegFormState, formData: FormData) {
  try {
    // Connect to the database
    await dbConnect();
    console.log('Database connected');

    // get the form data
    const rawData = {
      firstName: String(formData.get('firstName') ?? ''),
      lastName: String(formData.get('lastName') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
    };

    // Validate form fields
    const validatedFields = RegisterFormSchema.safeParse(rawData);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        data: {
          firstName: rawData.firstName,
          lastName: rawData.lastName,
          email: rawData.email,
        },
      };
    }

    const { firstName, lastName, email, password } = validatedFields.data;
    const sanitizedData = {
      firstName: purify.sanitize(firstName),
      lastName: purify.sanitize(lastName),
      email,
      password: '',
    };

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email: sanitizedData.email });

    if (existingUser) {
      return {
        errors: { email: ['Email already exists'] },
        data: {
          firstName: sanitizedData.firstName ?? '',
          lastName: sanitizedData.lastName ?? '',
          email: sanitizedData.email ?? '',
          password: '',
        },
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // add hashed password to sanitized data
    sanitizedData.password = hashedPassword;

    // Create the user in the database
    const newUser = await User.create(sanitizedData);
    if (!newUser) {
      return {
        errors: { message: ['Error creating user'] },
        data: {
          firstName: sanitizedData.firstName,
          lastName: sanitizedData.lastName,
          email: sanitizedData.email,
        },
      };
    }

    // Create a session for the new user
    await createSession(newUser._id);

    // Create a refresh session for the new user
    await createRefreshSession(newUser._id);
  } catch (error) {
    console.error('Signup error:', error); // Log for debugging

    return {
      errors: {
        message: ['An unexpected error occurred. Please try again.'],
      },
      data: {
        firstName: String(formData.get('firstName')) ?? '',
        lastName: String(formData.get('lastName')) ?? '',
        email: String(formData.get('email')) ?? '',
      },
    };
  }
  // Redirect to the dashboard
  redirect('/dashboard');
}

export async function login(state: LoginFormState, formData: FormData) {
  try {
    // Connect to the database
    await dbConnect();
    console.log('Database connected');

    // get the form data
    const rawData = {
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    };

    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        data: {
          email: rawData.email,
          password: rawData.password,
        },
      };
    }

    const { email, password } = validatedFields.data;
    const sanitizedData = {
      email: purify.sanitize(email),
      password: '',
    };

    // Check if the user exists in the database
    const existingUser = await User.findOne({ email: sanitizedData.email });

    if (!existingUser) {
      console.log('Email does not exist');
      return {
        errors: { email: ['Email does not exist'] },
        data: {
          email: sanitizedData.email,
          password: '',
        },
      };
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return {
        errors: { password: ['Invalid password'] },
        data: {
          email: sanitizedData.email,
          password: '',
        },
      };
    }

    // Create a session for the user
    await createSession(existingUser._id);

    // Create a refresh session for the user
    await createRefreshSession(existingUser._id);

    console.log('Session created for user');
  } catch (err) {
    console.log('Login error:', err);

    return {
      errors: {
        message: ['An unexpected error occurred. Please try again.'],
      },
      data: {
        email: String(formData.get('email')) ?? '',
        password: '',
      },
    };
  }

  redirect('/dashboard');
}

export async function logout() {
  deleteSession();
  redirect('/');
}
