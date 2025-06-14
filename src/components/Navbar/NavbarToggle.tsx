'use client';
import classNames from 'classnames';

interface NavbarToggleProps {
  onClick?: () => void;
  btnClassProp?: string;
  barClassProp?: string;
  isToggled?: boolean;
}

export default function NavbarToggle({
  onClick,
  btnClassProp,
  barClassProp,
  isToggled = false,
}: NavbarToggleProps) {
  const barClass =
    'h-[3px] w-[28px] absolute transition-all duration-400 [transition-timing-function:cubic-bezier(0,0,0,1)] left-[10px] bg-black';

  return (
    <button
      className={classNames(
        'btn-mobile-toggle m-[6px] w-[48px] h-[48px] cursor-pointer z-[500] outline-none absolute right-0 top-0 select-none transition-all duration-400 [transition-timing-function:cubic-bezier(0,0,0,1)] lg:hidden',
        { 'transform-none': !isToggled },
        { 'transform-[rotate(-90deg)]': isToggled },
        btnClassProp
      )}
      onClick={onClick}
      tabIndex={0}>
      <div
        className={classNames(
          barClass,
          'top-[15px]',
          { '[transform:rotate(-45deg)_translate(-5px,6.5px)]': isToggled },
          barClassProp
        )}></div>
      <div
        className={classNames(
          barClass,
          'top-[22.5px]',
          { 'transform-[scaleX(0)]': isToggled },
          barClassProp
        )}></div>
      <div
        className={classNames(
          barClass,
          'top-[30px]',
          {
            ' [transform:rotate(45deg)_translate(-5px,-6.5px)]': isToggled,
          },
          barClassProp
        )}></div>
    </button>
  );
}
