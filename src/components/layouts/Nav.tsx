import classNames from 'classnames';
import Btn from '@components/Btn';
import { Session } from 'next-auth';
import { NextAuthLogout } from '@/actions/auth-actions';

interface NavProps {
  isToggled?: boolean;
  handleLogout?: () => void;
  navLinkHandler?: () => void;
  session?: Session | null;
}

export default function Nav({ isToggled, handleLogout, navLinkHandler, session }: NavProps) {
  return (
    <nav
      className={classNames(
        'lg:block bg-white absolute lg:static right-0 top-0 w-0 lg:w-auto h-full lg:h-auto z-50 pt-[4rem] lg:pt-0 transition-all duration-200 [transition-timing-function:cubic-bezier(0,0,0,1)] overflow-hidden',
        { 'w-full': isToggled, ' lg:block': !isToggled }
      )}
    >
      <ul className={classNames('flex flex-col lg:flex-row items-center justify-between', { '': isToggled })}>
        {session?.user ? (
          <>
            <li>
              <Btn className='inline-block me-4 mb-5 lg:mb-0' onClick={navLinkHandler} link='/dashboard'>
                Dashboard
              </Btn>
            </li>
            <li>
              <Btn className='inline-block me-4 mb-5 lg:mb-0' onClick={navLinkHandler} link='/add-workout'>
                Add Workout
              </Btn>
            </li>
            <li>
              <Btn className='inline-block me-4 mb-5 lg:mb-0' onClick={navLinkHandler} link='/workout-history'>
                Workout History
              </Btn>
            </li>
            <li>
              <Btn.Button onClick={() => NextAuthLogout()}>Logout</Btn.Button>
            </li>
          </>
        ) : (
          <>
            <li>
              {' '}
              <Btn className='inline-block me-4 mb-5 lg:mb-0' onClick={navLinkHandler} link='/'>
                Home
              </Btn>
            </li>
            <li>
              <Btn className='inline-block me-4 mb-5 lg:mb-0' onClick={navLinkHandler} link='/login'>
                Login
              </Btn>
            </li>
            <li>
              <Btn className='inline-block me-4 mb-5 lg:mb-0' onClick={navLinkHandler} link='/register'>
                Sign Up
              </Btn>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
