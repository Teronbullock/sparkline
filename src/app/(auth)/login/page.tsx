'use client';

import { useActionState } from 'react';
import Form from '@components/Form';
import { BtnLink } from '@components/Btn/BtnLink';
import { Btn } from '@components/Btn/Btn';
import { NextAuthLogin, login } from '@/actions/auth-actions';
import Input from '@components/Input';

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);

  const email = (state?.data && 'email' in state.data && state.data.email) || '';
  const password = (state?.data && 'password' in state.data && state.data.password) || '';

  return (
    <>
      <main>
        <Form className='container mx-auto lg:mt-16 items-center relative' action={action}>
          <div className='mb-4 flex flex-col w-[75%]'>
            <BtnLink type='close' link='/' ariaLabel='back to home button' />
            <h2 className='text-center font-bold text-2xl mb-4'>Login</h2>
            <Input
              type='email'
              name='email'
              placeholder='Enter your email'
              required={true}
              autoFocus
              ariaLabel='email input'
              defaultValue={email}
            />
          </div>
          {state?.errors && 'email' in state.errors && state.errors.email && (
            <p className='mb-4'>{state.errors.email[0]}</p>
          )}
          <div className='mb-4 flex flex-col w-[75%]'>
            <Input
              type='password'
              name='password'
              placeholder='Enter your password'
              required={true}
              defaultValue={password}
              ariaLabel='password input'
            />
          </div>
          {state?.errors && 'password' in state.errors && state.errors.password && (
            <p className='mb-4'>{state.errors.password[0]}</p>
          )}
          <Btn
            type='submit'
            disabled={pending}
            className='rounded-lg bg-red-600 px-8 py-4 text-white hover:border-2 hover:border-red-600 hover:bg-transparent hover:text-white w-[75%]'
          >
            Login
          </Btn>
          <div className='flex justify-between items-center mt-5 mb-2 w-[75%]'>
            <div className='h-px bg-white w-full'></div>
            <p className='p-3'>or</p>
            <div className='h-px bg-white w-full'></div>
          </div>
          <Btn
            className='rounded-lg px-8 py-4 border-2 w-[75%] bg-white text-black'
            ariaLabel='GitHub sign in button'
            onClick={() => NextAuthLogin()}
          >
            Sign in With GitHub
          </Btn>
        </Form>
      </main>
    </>
  );
}
