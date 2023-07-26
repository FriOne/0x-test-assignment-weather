import { CSSProperties, FC } from 'react';

import classes from './TemperatureRange.module.css';

type Props = {
  from: number;
  to: number;
  current?: number;
};

export const TemperatureRange: FC<Props> = ({ current, from, to }) => {
  const variables: CSSProperties = { '--from': `${from}%`, '--to': `${to}%` };

  if (current) {
    variables['--current'] = `${current}%`;
  }

  return (
    <div className={classes.root} style={variables}>
      <div className={classes.coloredStripe} />
      {current !== undefined && <div className={classes.current} />}
    </div>
  );
};
