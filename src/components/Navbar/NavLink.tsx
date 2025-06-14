'use Client';

import Link from 'next/link';
import classNames from 'classnames';

interface NavLinkProps {
  children?: React.ReactNode;
  link: string;
  ariaLabel?: string;
  className?: string;
  onClick?: React.MouseEventHandler;
}

export const NavLink = ({
  children,
  className,
  link,
  onClick,
  ariaLabel,
}: NavLinkProps) => {
  const linkClass = classNames(
    'text-center block hover:border-b-[2px] hover:border-color-[#0347c4]',
    className
  );

  return (
    <li className='text-center mb-2 lg:mb-0 lg:me-4'>
      <Link
        href={link}
        className={linkClass}
        aria-label={ariaLabel}
        onClick={onClick}>
        {children}
      </Link>
    </li>
  );
};
