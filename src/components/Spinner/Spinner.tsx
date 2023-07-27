import { FC } from 'react';

import { ReactComponent as SunIcon } from '../../icons/sun.svg';

import classes from './Spinner.module.css';

type Props = {
  className?: string;
};

export const Spinner: FC<Props> = ({ className = '' }) => (
  <SunIcon className={[classes.root, className].join(' ')} />
);
