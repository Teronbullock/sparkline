import classNames from 'classnames';
import { BtnProps } from './types';

/**
 * -- Btn with tag button
 *
 * @param Obj:
 * - children
 * - className
 * - ariaLabel
 * - type default 'button'
 * - onClick
 *
 * @returns - button component
 */

export const Btn = ({ children, className, ariaLabel, type = 'button', onClick }: BtnProps) => {
  return (
    <button type={type} className={classNames('btn rounded', className)} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
};
