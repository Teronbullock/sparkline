'use client';

import { useActionState } from 'react';
import Form from '@components/Form/Form';
import Btn from '@components/btn/Btn';
import { login } from '@/app/actions/auth';
import Input from '@components/Input/Input';

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);

  const email = (state?.data && 'email' in state.data && state.data.email) || '';
  const password = (state?.data && 'password' in state.data && state.data.password) || '';

  return (
    <>
      <main>
        <Form className='container mx-auto lg:mt-16 items-center relative' action={action}>
          <div className='mb-4 flex flex-col w-[75%]'>
            <Btn.Close link='/' ariaLabel='back to home button' />
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
          <Btn.Submit
            disabled={pending}
            className='rounded-lg bg-red-600 px-8 py-4 text-white hover:border-2 hover:border-red-600 hover:bg-transparent hover:text-white w-[75%]'
          >
            Login
          </Btn.Submit>
        </Form>
      </main>
    </>
  );
}
