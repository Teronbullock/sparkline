import classNames from 'classnames';

interface IAuthLayout {
  children: React.ReactNode;
  sectionClass?: string;
  containerClass?: string;
}

export default function AuthLayout({ children, sectionClass, containerClass }: IAuthLayout) {
  return (
    <section
      className={classNames(
        'sl-section h-lvh bg-sky-600 lg:py-32 text-white px-4 md:px-0 overflow-hidden',
        sectionClass
      )}
    >
      <div className={classNames('container mx-auto mt-[3rem] max-w-screen-md', containerClass)}>{children}</div>
    </section>
  );
}
