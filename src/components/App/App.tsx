import { CurrentLocationInfo } from '../CurrentLocationInfo/CurrentInfo';
import { HourlyForecast } from '../HourlyForecast/HourlyForecast';
import { DailyForecast } from '../DailyForecast/DailyForecast';
import { ForecastBlock } from '../ForecastBlock/ForecastBlock';
import { Spinner } from '../Spinner/Spinner';
import { useMainBackgroundColor } from './useMainBackgroundColor';
import { useForecastState } from './useForecastState';
import { setWeatherCache } from '../../utils/currentWeatherStorage';

import classes from './App.module.css';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default function App() {
  const {
    isLoading,
    error,
    forecastState,
    isDefaultLocationLoaded,
  } = useForecastState();
  useMainBackgroundColor();

  if (isLoading) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.error}>
        <ForecastBlock>
          {error}
        </ForecastBlock>
      </div>
    );
  }

  const {
    location,
    current,
    forecast,
  } = forecastState!;
  const dayForecast = forecast.forecastday[0];

  const handleCacheCleanClick = () => {
    setWeatherCache(null);
  };

  return (
    <div className={classes.root}>
      <CurrentLocationInfo
        className={classes.currentLocationInfo}
        name={location.region}
        currentTemperature={current.temp_c}
        condition={current.condition.text}
        maxTemperature={dayForecast.day.maxtemp_c}
        minTemperature={dayForecast.day.mintemp_c}
      />

      {isDefaultLocationLoaded && (
        <ForecastBlock className={classes.defaultLocationWarning}>
          Default Location is loaded because we need browser permission to get your location.
        </ForecastBlock>
      )}

      <HourlyForecast
        className={classes.hourlyForecast}
        forecast={dayForecast.hour}
      />

      <DailyForecast
        className={classes.dailyForecast}
        forecast={forecast.forecastday}
      />

      {isDev && (
        <button className={classes.cleanCacheButton} onClick={handleCacheCleanClick}>
          Clean Cache
        </button>
      )}
    </div>
  );
}
