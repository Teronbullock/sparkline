import { redirect } from 'next/navigation';
import { isSessionVerified } from '@/app/actions/auth-actions';
import { auth } from '@lib/auth';

export default async function Dashboard() {
  //check if the session is valid
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <>
      <main className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl font-bold'>Dashboard</h1>
        <p className='mt-4 text-lg'>Welcome to your dashboard!</p>
      </main>
    </>
  );
}
