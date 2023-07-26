import { ForecastState } from '../types';

const CACHE_KEY = 'weather';

export function getWeatherCache() {
  const cachedStringValue = localStorage.getItem(CACHE_KEY);

  try {
    return JSON.parse(cachedStringValue!) as ForecastState;
  } catch {}

  return null;
}

export function setWeatherCache(state: ForecastState | null) {
  if (state) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(state));
  } else {
    localStorage.removeItem(CACHE_KEY);
  }
}
