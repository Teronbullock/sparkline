import Link from 'next/link';
import classNames from 'classnames';

interface IBtn {
  className?: string;
  ariaLabel?: string;
}

interface IBtnLink extends IBtn {
  children?: React.ReactNode;
  link: string | URL;
}

interface IBtnButton extends IBtn {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

/**
 * --- Btn ---
 *
 * @param param0
 * @returns
 */
export default function Btn({ children, link, className, ariaLabel }: IBtnLink) {
  return (
    <Link href={link} className={classNames('btn rounded', className)} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/**
 * -- Btn with tag button
 */

Btn.Button = function Button({ children, className, ariaLabel, type = 'button' }: IBtnButton) {
  return (
    <button type={type} className={classNames('btn rounded', className)} aria-label={ariaLabel}>
      {children}
    </button>
  );
};

/**
 * --- BtnSubmit ---
 *
 * @param param0
 * @returns
 */
Btn.Submit = function Button({ children, className, ariaLabel, disabled }: IBtnButton) {
  return (
    <button type='submit' className={classNames('btn rounded', className)} aria-label={ariaLabel}>
      {children}
    </button>
  );
};

/**
 * --- BtnClose ---
 *
 * @param param0
 * @returns
 */
Btn.Close = function Close({ link, className, ariaLabel }: IBtnLink) {
  return (
    <Link
      href={link}
      className={classNames(
        'btn rounded',
        'right-[1.5rem] top-[1rem] absolute text-white text-xl md:text-2xl xl:text-3xl hover:border-2',
        className
      )}
      aria-label={ariaLabel}
    >
      X
    </Link>
  );
};
