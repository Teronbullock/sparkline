import Link from 'next/link';
import classNames from 'classnames';

interface NavProps {
  isToggled?: boolean;
  handleLogout?: () => void;
  navLinkHandler?: () => void;
  isLoggedIn?: boolean;
}

export default function Nav({ isToggled, handleLogout, navLinkHandler, isLoggedIn }: NavProps) {
  return (
    <nav
      className={classNames(
        'lg:block bg-white absolute lg:static right-0 top-0 w-0 lg:w-auto h-full lg:h-auto z-50 pt-[4rem] lg:pt-0 transition-all duration-200 [transition-timing-function:cubic-bezier(0,0,0,1)] overflow-hidden',
        { 'w-full': isToggled, ' lg:block': !isToggled }
      )}
    >
      <ul className={classNames('flex flex-col lg:flex-row items-center justify-between', { '': isToggled })}>
        <li>
          {' '}
          <Link className='inline-block me-4 mb-5 lg:mb-0' onClick={navLinkHandler} href='/'>
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link className='inline-block me-4 mb-5 lg:mb-0' onClick={navLinkHandler} href='/dashboard'>
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className='inline-block me-4 mb-5 lg:mb-0' onClick={navLinkHandler} href='/login'>
                Login
              </Link>
            </li>
            <li>
              <Link className='inline-block me-4 mb-5 lg:mb-0' onClick={navLinkHandler} href='/register'>
                Sign Up
              </Link>
            </li>
          </>
        )}
        {/* {isLoggedIn && pathname === 'dashboard' && (
                    <>
                        <li className="mr-4">
                            <Link to="/add-workout">Add Workout</Link>
                        </li>
                        <li className="mr-4">
                            <Link to="/">Workout History</Link>
                        </li>
                    </>
                )}
                {isLoggedIn && pathname === 'add-workout' && (
                    <>
                        <li className="mr-4">
                            <Link to="/add-exercise">Add Exercise</Link>
                        </li>
                        <li className="mr-4">
                            <Link to="">Reorder</Link>
                        </li>
                        <li className="mr-4">
                            <Link to="">Complete/Save</Link>
                        </li>
                    </>
                )} */}
      </ul>
    </nav>
  );
}
