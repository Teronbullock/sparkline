import './columns.scss';

type ColumnsProps = {
  children: React.ReactNode,
  colsClasses?: string,
}

export const Columns = ({ children, colsClasses } : ColumnsProps ) => {
  const classes = colsClasses ? colsClasses : '';

  return (
    <div className={`et-columns flex ${classes}`}>
      {children}
    </div>
  );
}


type ColumnProps = {
  children: React.ReactNode,
  colClasses?: string,
}

export const Column = ({ children, colClasses }: ColumnProps ) => {
  const classes = colClasses ? colClasses : '';
  return(
    <div className={`et-column basis-full ${classes}`}>
    {children}
    </div>
  );
}
