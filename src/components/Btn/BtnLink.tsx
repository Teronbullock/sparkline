import Link from 'next/link';
import classNames from 'classnames';
import { BtnLinkProps } from './types';

/**
 * --- BtnLink ---
 *
 * @param Obj:
 * - children
 * - className
 * - ariaLabel
 * - link
 * - onClick
 * - type
 *
 * @returns - Link component
 */
export const BtnLink = ({ children, className, ariaLabel, link, type, onClick }: BtnLinkProps) => {
  const isCloseBtn = type === 'close';

  const btnClass = classNames('btn rounded', className, {
    'right-[1.5rem] top-[1rem] absolute text-white text-xl md:text-2xl xl:text-3xl hover:border-2': isCloseBtn,
  });

  return (
    <Link href={link} className={btnClass} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </Link>
  );
};
