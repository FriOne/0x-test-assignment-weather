import { FC } from 'react';

import classes from './CurrentInfo.module.css';

type Props = {
  className?: string;
  name: string;
  currentTemperature: number;
  condition: string;
  maxTemperature: number;
  minTemperature: number;
};

export const CurrentLocationInfo: FC<Props> = ({
  className = '',
  name,
  currentTemperature,
  condition,
  maxTemperature,
  minTemperature,
}) => (
  <div className={[classes.root, className].join(' ')}>
    <div className={classes.name}>
      {name}
    </div>
    <div className={classes.currentTemperature}>
      {currentTemperature}°
    </div>
    <div className={classes.conditions}>
      {condition}
    </div>
    <div className={classes.dayTemperature}>
      <span>H:{maxTemperature}°</span>
      <span>L:{minTemperature}°</span>
    </div>
  </div>
);
