import { redirect } from 'next/navigation';
// import { isSessionVerified } from '@/app/actions/auth-actions';
import { auth } from '@lib/auth';

export default async function Dashboard() {
  //check if the session is valid
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <>
      <main className='h-screen pt-4'>
        <h2 className='text-4xl font-bold'>Today</h2>
        <p className='mt-4 text-lg'>Welcome to your dashboard!</p>
        <section>
          <h2>Calories</h2>
          <p>Remaining = Foal - Food + Exercise</p>
          <div>
            <div className='progress-bar w-[160px] h-[160px] relative'>
              <div
                className='progress-bar__outer w-[160px] h-[160px] border-1 border-amber-700
                rounded-full flex items-center justify-center px-[20px]'>
                <div className='progress-bar__inner w-[120px] h-[120px] border-2 border-amber-700 rounded-full'>
                  <span className='progress-bar__text '>75%</span>
                </div>
              </div>
              <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='50' cy='50' r='50' />
              </svg>
            </div>
            <div>
              <ul>
                <li>
                  <strong>Goal:</strong> 2000 kcal
                </li>
                <li>
                  <strong>Food:</strong> 1500 kcal
                </li>
                <li>
                  <strong>Exercise:</strong> 300 kcal
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* Marcos section */}
        {/* Workout overview section */}
      </main>
    </>
  );
}
