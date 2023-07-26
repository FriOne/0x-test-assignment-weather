import { createContext } from 'react';

export const ForecastTemperatureContext = createContext({
  min: 0,
  max: 50,
});
