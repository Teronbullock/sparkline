'use client';

import { Session } from 'next-auth';
import logo from '/public/img/sparkline-logo.webp';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar/Navbar';
import Link from 'next/link';

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className='sl-header px-4 py-2 h-[60px]'>
      <div className='2xl flow-row h-inherit container mx-auto flex content-center justify-between'>
        <Link className='me-8 my-auto z-[100]' href='/'>
          <Image
            src={logo}
            className='w-[48px] h-[48px]'
            alt='Site logo'
            width='40'
            height='40'
          />
        </Link>
        <Navbar session={session} />
      </div>
    </header>
  );
}
