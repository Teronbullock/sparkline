'use client';

import { useActionState } from 'react';
import Form from '@/components/Form';
import Btn from '@/app/components/Btn';
import { signup } from '@/app/actions/auth-actions';
import Input from '@/app/components/Input';

export default function Registration() {
  const [state, action, pending] = useActionState(signup, undefined);

  const firstName = (state?.data && 'firstName' in state.data && state.data.firstName) || '';
  const lastName = (state?.data && 'lastName' in state.data && state.data.lastName) || '';
  const email = (state?.data && 'email' in state.data && state.data.email) || '';

  return (
    <>
      <main>
        <Form className='container mx-auto ring-gray-300 items-center relative' action={action}>
          <div className='mb-4 flex flex-col w-[75%]'>
            <Btn.Close link='/' ariaLabel='back to home button' />
            <h2 className='text-center font-bold text-2xl mb-6'>Create Your Account</h2>
            <Input
              placeholder='First Name'
              autoFocus={true}
              ariaLabel='first name input'
              name='firstName'
              defaultValue={firstName}
            />
          </div>
          {state?.errors && 'firstName' in state.errors && state.errors.firstName && (
            <p className='mb-4'>{state.errors.firstName[0]}</p>
          )}

          <div className='mb-4 flex flex-col w-[75%]'>
            <Input placeholder='Last Name' ariaLabel='last name input' name='lastName' defaultValue={lastName} />
          </div>
          {state?.errors && 'lastName' in state.errors && state.errors.lastName && (
            <p className='mb-4'>{state.errors.lastName}</p>
          )}
          <div className='mb-4 flex flex-col w-[75%]'>
            <Input type='email' placeholder='Email' ariaLabel='email input' name='email' defaultValue={email} />
          </div>
          {state?.errors && 'email' in state.errors && state.errors.email && (
            <p className='mb-4'>{state.errors.email}</p>
          )}
          <div className='mb-4 flex flex-col w-[75%]'>
            <Input type='password' placeholder='Password' ariaLabel='password input' name='password' />
          </div>
          {state?.errors && 'password' in state.errors && state?.errors?.password && (
            <div className='mb-4'>
              <p>Password Error:</p>
              <ul>
                {state.errors.password.map(error => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className='mb-4 flex flex-col w-[75%]'>
            <Input
              type='password'
              placeholder='Confirm Password'
              ariaLabel='confirm password input'
              name='confirmPassword'
            />
          </div>
          {state?.errors && 'confirmPassword' in state.errors && state?.errors?.confirmPassword && (
            <div className='mb-4'>
              <p>Confirm Password Error:</p>
              <ul>
                {state.errors.confirmPassword.map(error => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <Btn.Submit
            disabled={pending}
            className='rounded-lg w-[75%] bg-red-600 px-8 py-4 text-white hover:border-2 hover:border-red-600 hover:bg-transparent hover:text-white'
          >
            Register
          </Btn.Submit>
        </Form>
      </main>
    </>
  );
}
