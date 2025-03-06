import { z } from 'zod';

type BaseFormData = {
  email?: string;
  password?: string;
};

type BaseFormErrors = {
  email?: string[];
  password?: string[];
};

export type RegFormState =
  | {
      error?: BaseFormErrors & {
        firstName?: string[];
        lastName?: string[];
        confirmPassword?: string[];
      };
      message?: string;
      data?: BaseFormData & {
        firstName?: string;
        lastName?: string;
        confirmPassword?: string;
      };
    }
  | undefined;

export type LoginFormState =
  | {
      error?: BaseFormErrors;
      message?: string;
      data?: BaseFormData;
    }
  | undefined;

export const RegisterFormSchema = z
  .object({
    firstName: z.string().trim().min(3, { message: 'Name must be at least 3 characters long.' }),
    lastName: z.string().trim().min(3, { message: 'Name must be at least 3 characters long.' }),
    email: z.string().trim().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(8, { message: 'Must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Must be at least 8 characters long' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: 'custom',
        message: 'Passwords do not match',
      });
    }
  });

export const LoginFormSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Must be at least 8 characters long' }),
});
