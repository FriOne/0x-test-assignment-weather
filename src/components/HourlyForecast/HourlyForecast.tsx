import { FC } from 'react';

import { ForecastBlock } from '../ForecastBlock/ForecastBlock';
import { ConditionUrlIcon } from '../ConditionUrlIcon/ConditionUrlIcon';
import { getTimeByTimestamp } from '../../utils/getTimeByTimestamp';
import { WeatherInfoWithTime } from '../../types';

import classes from './HourlyForecast.module.css';

type Props = {
  className?: string;
  forecast: WeatherInfoWithTime[];
};

export const HourlyForecast: FC<Props> = ({
  className = '',
  forecast,
}) => {
  return (
    <ForecastBlock className={className} title="Hourly forecast">
      <div className={classes.hoursInfo}>
        {forecast.map(({ time_epoch, temp_c, condition }, index) => (
          <div className={classes.hourInfo} key={time_epoch}>
            <div className={classes.hourText}>
              {getTimeByTimestamp(time_epoch * 1000)}
            </div>
            <div className={classes.hourIcon}>
              <ConditionUrlIcon condition={condition} />
            </div>
            <div className={classes.hourTemperature}>
              {parseInt(temp_c.toString())}°
            </div>
          </div>
        ))}
      </div>
    </ForecastBlock>
  );
};