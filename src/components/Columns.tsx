type ColumnsProps = {
  children: React.ReactNode;
  colsClasses?: string;
};

type ColumnProps = {
  children: React.ReactNode;
  colClasses?: string;
};

export const Columns = ({ children, colsClasses }: ColumnsProps) => {
  const classes = colsClasses ? colsClasses : '';

  return <div className={`sl-columns flex ${classes}`}>{children}</div>;
};

export const Column = ({ children, colClasses }: ColumnProps) => {
  const classes = colClasses ? colClasses : '';
  return <div className={`sl-column basis-full ${classes}`}>{children}</div>;
};
