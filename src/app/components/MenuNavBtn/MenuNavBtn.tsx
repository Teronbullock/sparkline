'use client';
import classNames from 'classnames';

interface MenuNavBtnProps {
  onClick?: () => void;
  btnClassProp?: string;
  barClassProp?: string;
  isToggled?: boolean;
}

export default function MenuNavBtn({
  onClick,
  btnClassProp,
  barClassProp,
  isToggled = false,
}: MenuNavBtnProps) {
  const btnClass =
    'btn-mobile-toggle w-[48px] h-[48px] cursor-pointer z-[500] outline-none absolute right-0 select-none transition-all duration-400 [transition-timing-function:cubic-bezier(0,0,0,1)] lg:hidden';

  const barClass =
    'h-[3px] w-[28px] absolute transition-all duration-400 [transition-timing-function:cubic-bezier(0,0,0,1)] left-[10px] bg-black';

  return (
    <button
      className={classNames(
        [btnClass],
        btnClassProp,
        { 'transform-none': !isToggled },
        { 'transform-[rotate(-90deg)]': isToggled }
      )}
      onClick={onClick}
      tabIndex={0}
    >
      <div
        className={classNames(
          barClass,
          'top-[15px]',
          { '[transform:rotate(-45deg)_translate(-7.07px,7.07px)]': isToggled },
          barClassProp
        )}
      ></div>
      <div
        className={classNames(
          barClass,
          'top-[25px]',
          { 'transform-[scaleX(0)]': isToggled },
          barClassProp
        )}
      ></div>
      <div
        className={classNames(
          barClass,
          'top-[35px]',
          {
            ' [transform:rotate(45deg)_translate(-7.07px,-7.07px)]': isToggled,
          },
          barClassProp
        )}
      ></div>
    </button>
  );
}
