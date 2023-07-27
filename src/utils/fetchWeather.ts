import { WEATHER_API_KEY } from '../constants';
import { Coords, ForecastState } from '../types';

type Response = ForecastState;

export async function fetchWeather({ lat, lng }: Coords) {
  const urlParams = new URLSearchParams({
    q: `${lat},${lng}`,
    days: '10',
    key: WEATHER_API_KEY,
  });

  const response = await fetch('http://api.weatherapi.com/v1/forecast.json?' + urlParams.toString());
  const data = await response.json() as unknown;

  if (response.status !== 200) {
    throw new Error(`Request error`);
  }

  return data as Response;
}
