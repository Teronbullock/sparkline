import { verifySession } from '@/lib/user-dal';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await verifySession();

  if (!session) {
    redirect('/login');
  }

  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Dashboard</h1>
      <p className='mt-4 text-lg'>Welcome to your dashboard!</p>
    </main>
  );
}
