'use client';

import { Session } from 'next-auth';
import { useState } from 'react';
import logo from '/public/img/sparkline-logo.webp';
import { useUserContext } from '@/context/useUserContext';
import Image from 'next/image';
import Nav from '@components/layouts/Nav';
import Link from 'next/link';
import MenuNavBtn from '@components/MenuNavBtn/MenuNavBtn';

import classNames from 'classnames';
import { set } from 'mongoose';

export default function Header({ session }: { session: Session | null }) {
  const [isToggled, setIsToggled] = useState(false);

  // const { isLoggedIn, setIsLoggedIn, setCurrentUser, setTokenInfo } = useUserContext();

  // const handleLogout = () => {
  //   localStorage.removeItem('userData');
  //   setIsLoggedIn(false);
  //   setCurrentUser(null);
  //   setTokenInfo(null);
  //   // navigate('/');
  // };

  const handleMobileMenu = () => {
    setIsToggled(isToggled ? false : true);
  };

  const navLinkHandler = () => {
    setIsToggled(isToggled ? false : true);
  };

  return (
    <header className='sl-header px-4 h-[48px]'>
      <div className='2xl flow-row h-inherit container mx-auto flex content-center justify-between items-center'>
        <Link className='me-8' href='/'>
          <Image src={logo} className='w-[38px] h-[38px]' alt='Site logo' width='40' height='40' />
        </Link>
        <MenuNavBtn onClick={handleMobileMenu} isToggled={isToggled} />
        <Nav isToggled={isToggled} navLinkHandler={navLinkHandler} session={session} />
      </div>
    </header>
  );
}
