import { FC, useMemo } from 'react';

import { ForecastTemperatureContext } from '../../contexts/ForecastTemperatureContext';
import { DayForecastView } from '../DayForecastView/DayForecastView';
import { ForecastBlock } from '../ForecastBlock/ForecastBlock';
import { DayForecast } from '../../types';

import classes from './DailyForecast.module.css';

type Props = {
  className?: string;
  forecast: DayForecast[];
};

export const DailyForecast: FC<Props> = ({
  className = '',
  forecast,
}) => {
  const forecastTemperatureContextValue = useMemo(() => {
    if (forecast.length === 0) {
      return { min: 0, max: 0, current: 0 };
    }

    let min, max;

    for (const { day } of forecast) {
      if (!min || day.mintemp_c < min) {
        min = parseInt(day.mintemp_c.toString());
      }
      if (!max || day.maxtemp_c > max) {
        max = parseInt(day.maxtemp_c.toString());
      }
    }

    const currentHour = forecast[0].hour.find(({ time_epoch }) => {
      return new Date(time_epoch * 1000).getHours() === new Date().getHours();
    })!;

    return { min: min ?? 0, max: max ?? 0, current: parseInt(currentHour.temp_c.toString()) };
  }, [forecast]);

  return (
    <ForecastBlock className={[classes.root, className].join(' ')} title="10-Day forecast">
      <ForecastTemperatureContext.Provider value={forecastTemperatureContextValue}>
        <div className={classes.daysInfo}>
          {forecast.map(({ day, date, date_epoch }) => {
            const {
              maxtemp_c,
              mintemp_c,
              condition,
              daily_chance_of_rain,
              daily_chance_of_snow,
            } = day;

            return (
              <DayForecastView
                key={date}
                className={classes.dayInfo}
                timestamp={date_epoch * 1000}
                condition={condition}
                minTemperature={parseInt(mintemp_c.toString())}
                maxTemperature={parseInt(maxtemp_c.toString())}
                precipitationProbability={Math.max(daily_chance_of_rain, daily_chance_of_snow)}
                isToday={false}
              />
            )
          })}
        </div>
      </ForecastTemperatureContext.Provider>
    </ForecastBlock>
  );
};
