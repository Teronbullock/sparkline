'use client';

import classNames from 'classnames';

type FormProps = {
  children?: React.ReactNode;
  className?: string;
  action?: (formData: FormData) => void;
};

export default function Form({ children, className, action }: FormProps) {
  return (
    <form className={classNames('flex flex-col rounded-lg p-8 shadow ring-1 ring-inset', className)} action={action}>
      {children}
    </form>
  );
}
