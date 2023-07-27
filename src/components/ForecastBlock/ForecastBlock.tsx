import { FC, PropsWithChildren } from 'react';

import { ReactComponent as CalendarIcon } from '../../icons/calendar.svg';
import classes from './ForecastBlock.module.css';

type Props = PropsWithChildren<{
  className?: string;
  title?: string;
}>;

export const ForecastBlock: FC<Props> = ({
  className = '',
  title,
  children,
}) => (
  <div className={[classes.root, className].join(' ')}>
    {title && (
      <div className={classes.title}>
        <CalendarIcon className={classes.titleIcon} /> {title}
      </div>
    )}
    {children}
  </div>
);
