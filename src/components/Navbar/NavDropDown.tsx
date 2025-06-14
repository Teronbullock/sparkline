'use Client';

import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

interface NavDropDownProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
  link: string;
  onClick?: React.MouseEventHandler;
  // isHidden?: boolean;
}

export const NavDropDown = ({
  children,
  className,
  title,
  link,
  onClick,
}: NavDropDownProps) => {
  const [isHidden, setIsHidden] = useState(true);

  const liClass = classNames('text-center mb-2');

  const linkClass = classNames('mb-2 inline-block');

  const ulClass = classNames(
    'w-full',
    { 'border border-black rounded-[4px] p-2': !isHidden },
    { hidden: isHidden },
    className
  );

  return (
    <li
      className={liClass}
      onMouseEnter={() => setIsHidden(false)}
      onMouseLeave={() => setIsHidden(true)}>
      <Link className={linkClass} href={link} onClick={onClick}>
        {title}
      </Link>
      <ul className={ulClass}>{children}</ul>
    </li>
  );
};
