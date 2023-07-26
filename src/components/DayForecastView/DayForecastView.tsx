import { FC, useContext } from 'react';

import { ConditionUrlIcon } from '../ConditionUrlIcon/ConditionUrlIcon';
import { TemperatureRange } from '../TemperatureRange/TemperatureRange';
import { getDayNameByTimestamp } from '../../utils/getDayNameByTimestamp';
import { Condition } from '../../types';

import classes from './DayForecastView.module.css';
import { ForecastTemperatureContext } from '../../contexts/ForecastTemperatureContext';

type Props = {
  className?: string;
  timestamp: number;
  condition: Condition;
  minTemperature: number;
  maxTemperature: number;
  precipitationProbability: number;
  isToday: boolean;
};

export const DayForecastView: FC<Props> = ({
  className = '',
  condition,
  timestamp,
  minTemperature,
  maxTemperature,
  precipitationProbability,
}) => {
  const { min, max } = useContext(ForecastTemperatureContext);
  const onePercent = (max - min) / 100;

  return (
    <div className={[classes.root, className].join(' ')}>
      <div className={classes.day}>
        {getDayNameByTimestamp(timestamp)}
      </div>
      <div className={classes.condition}>
        <ConditionUrlIcon condition={condition} />
        {precipitationProbability !== 0 && (
          <div className={classes.precipitationProbability}>
            {precipitationProbability}%
          </div>
        )}
      </div>

      <div className={classes.temperatureInfo}>
        <div className={classes.minTemperature}>{parseInt(minTemperature.toString())}°</div>
        <TemperatureRange from={(minTemperature - min) / onePercent} to={(maxTemperature - min) / onePercent} />
        <div className={classes.maxTemperature}>{parseInt(maxTemperature.toString())}°</div>
      </div>
    </div>
  );
};
