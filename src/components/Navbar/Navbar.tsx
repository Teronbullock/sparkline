'use Client';
import { useState } from 'react';

import classNames from 'classnames';
import { Btn } from '@components/Btn/Btn';
import MenuNavBtn from '@/components/Navbar/NavbarToggle';
import { NavLink } from '@components/Navbar/NavLink';
import { Session } from 'next-auth';
import { NextAuthLogout } from '@/actions/auth-actions';

interface NavProps {
  handleLogout?: () => void;
  navLinkHandler?: () => void;
  session?: Session | null;
}

export const Navbar = ({ handleLogout, session }: NavProps) => {
  const [isToggled, setIsToggled] = useState(false);

  const navClass = classNames(
    'flex bg-white absolute right-0 top-0 w-0 h-full z-50 pt-[4rem] transition-all duration-<100>[transition-timing-function:cubic-bezier(0,0,0,1)] overflow-hidden lg:static lg:w-auto lg:pt-0 lg:items-center',
    { 'w-full': isToggled, '': !isToggled }
  );

  const ulClass = classNames('w-full px-3 flex flex-col lg:flex-row', {
    '': isToggled,
  });

  const handleMobileMenu = () => {
    setIsToggled(isToggled ? false : true);
  };

  return (
    <>
      <MenuNavBtn onClick={handleMobileMenu} isToggled={isToggled} />
      <nav aria-label='Main Navigation' className={navClass}>
        <ul className={ulClass}>
          {session?.user ? (
            <>
              <NavLink
                className=''
                onClick={handleMobileMenu}
                link='/dashboard'>
                Dashboard
              </NavLink>
              <NavLink className='' onClick={handleMobileMenu} link='/workouts'>
                Workouts
              </NavLink>
              <NavLink className='' onClick={handleMobileMenu} link='/meals'>
                Meals
              </NavLink>
              <NavLink className='' onClick={handleMobileMenu} link='/goal'>
                Goals
              </NavLink>
              <NavLink className='' onClick={handleMobileMenu} link='/profile'>
                Profile
              </NavLink>
              <li className='text-center mb-2 lg:mb-0 lg:me-4'>
                <Btn onClick={() => NextAuthLogout()}>Logout</Btn>
              </li>
            </>
          ) : (
            <>
              <NavLink
                className='inline-block me-4 mb-5 lg:mb-0'
                onClick={handleMobileMenu}
                link='/'>
                Home
              </NavLink>
              <NavLink
                className='inline-block me-4 mb-5 lg:mb-0'
                onClick={handleMobileMenu}
                link='/login'>
                Login
              </NavLink>
              <NavLink
                className='inline-block me-4 mb-5 lg:mb-0'
                onClick={handleMobileMenu}
                link='/register'>
                Sign Up
              </NavLink>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};
