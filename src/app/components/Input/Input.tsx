import classNames from 'classnames';

interface IInput {
  className?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  name?: string;
  autoFocus?: boolean;
  ariaLabel?: string;
  required?: boolean;
  defaultStyle?: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
}

export default function Input({
  type = 'text',
  name,
  className,
  autoFocus = false,
  defaultStyle = true,
  ariaLabel,
  ...props
}: IInput) {
  return (
    <>
      <input
        name={name}
        id={name}
        type={type}
        className={classNames({ 'rounded-lg border-gray-300 border mb-4 p-4 text-white-600': defaultStyle }, className)}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        {...props}
      />
    </>
  );
}
