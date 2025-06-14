export interface Btn {
  className?: string;
  ariaLabel?: string;
}

export interface BtnLinkProps extends Btn {
  children?: React.ReactNode;
  link: string | URL;
  onClick?: React.MouseEventHandler;
  type?: string | null;
}

export interface BtnProps extends Btn {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
