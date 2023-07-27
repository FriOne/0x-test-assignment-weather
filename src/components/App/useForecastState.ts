import { useIsMountedRef } from '../../hooks/useIsMountedRef';
import { useEffect, useMemo, useReducer } from 'react';
import { Coords, ForecastState } from '../../types';
import { fetchWeather } from '../../utils/fetchWeather';
import { getWeatherCache, setWeatherCache } from '../../utils/currentWeatherStorage';
import { isToday } from '../../utils/isToday';

type State = {
  isLoading: boolean;
  error?: string;
  forecastState?: ForecastState;
  isDefaultLocationLoaded?: boolean;
};

const enum ActionType {
  initGeolocation = 'initGeolocation',
  initGeolocationError = 'initGeolocationError',
  startLoading = 'startLoading',
  loadingSuccess = 'loadingSuccess',
  loadingError = 'loadingError',
}

type Action = {
  type: ActionType.initGeolocationError | ActionType.startLoading;
  payload?: undefined;
} | {
  type: ActionType.initGeolocation;
  payload: { silent: boolean };
} | {
  type: ActionType.loadingSuccess;
  payload: ForecastState;
} | {
  type: ActionType.loadingError;
  payload: string;
};

export function useForecastState() {
  const cachedWeather = useMemo(() => getWeatherCache(), []);
  const isCacheValid = !!cachedWeather?.current?.last_updated_epoch
    && isToday(cachedWeather?.current.last_updated_epoch * 1000);
  const initialState = {
    isLoading: !isCacheValid,
    error: window.navigator.onLine ? undefined : (isCacheValid ? 'Have no data to show it offline' : undefined),
    forecastState: isCacheValid ? cachedWeather : undefined,
  };

  const isMounted = useIsMountedRef();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (window.navigator.onLine) {
      dispatch({ type: ActionType.initGeolocation, payload: { silent: isCacheValid } });
      navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
    }

    async function onGeolocationSuccess(position: GeolocationPosition) {
      const { latitude: lat, longitude: lng } = position.coords;

      void fetchInitialWeather({ lat, lng }, true);
    }

    function onGeolocationError() {
      dispatch({ type: ActionType.initGeolocationError });

      // It is London because rain probability is high.
      const defaultLocation = { lat: 51.509865, lng: -0.118092 };

      void fetchInitialWeather(defaultLocation);
    }

    async function fetchInitialWeather(coords: Coords, needToSaveInCache = false) {
      if (!isMounted.current) {
        return;
      }

      try {
        dispatch({ type: ActionType.startLoading });
        const loadedState = await fetchWeather(coords);

        if (needToSaveInCache) {
          setWeatherCache(loadedState);
        }

        if (!isMounted.current) {
          return;
        }

        dispatch({ type: ActionType.loadingSuccess, payload: loadedState });
      } catch(error) {
        dispatch({ type: ActionType.loadingError, payload: 'Error while loading weather' });
      }
    }
  }, []);

  return state;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.initGeolocation:
      return {
        ...state,
        isLoading: !action.payload.silent,
      };
    case ActionType.initGeolocationError:
      return {
        ...state,
        isDefaultLocationLoaded: true,
      };
    case ActionType.loadingSuccess:
      return {
        ...state,
        isLoading: false,
        forecastState: action.payload
      };
    case ActionType.loadingError:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
  }

  return state;
}
