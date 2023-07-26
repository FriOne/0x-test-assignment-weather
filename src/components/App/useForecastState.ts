import { useIsMountedRef } from '../../hooks/useIsMountedRef';
import { useEffect, useReducer } from 'react';
import { Coords, ForecastState } from '../../types';
import { fetchWeather } from '../../utils/fetchWeather';

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
  type: ActionType.initGeolocation | ActionType.initGeolocationError | ActionType.startLoading;
  payload?: undefined;
} | {
  type: ActionType.loadingSuccess;
  payload: ForecastState;
} | {
  type: ActionType.loadingError;
  payload: string;
};

export function useForecastState() {
  const isMounted = useIsMountedRef();
  const [state, dispatch] = useReducer(reducer, { isLoading: true });

  useEffect(() => {
    dispatch({ type: ActionType.initGeolocation });
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);

    async function onGeolocationSuccess(position: GeolocationPosition) {
      const { latitude: lat, longitude: lng } = position.coords;

      void fetchInitialWeather({ lat, lng });
    }

    function onGeolocationError() {
      dispatch({ type: ActionType.initGeolocationError });

      // It is London because rain probability is high.
      const defaultLocation = { lat: 51.509865, lng: -0.118092 };

      void fetchInitialWeather(defaultLocation);
    }

    async function fetchInitialWeather(coords: Coords) {
      if (!isMounted.current) {
        return;
      }

      try {
        dispatch({ type: ActionType.startLoading });
        const loadedState = await fetchWeather(coords);

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
        isLoading: true,
      };
    case ActionType.initGeolocationError:
      return {
        ...state,
        isDefaultLocationLoaded: true,
      };
    case ActionType.startLoading:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.loadingSuccess:
      return {
        ...state,
        isLoading: false,
        forecastState: action.payload
      };
    case ActionType.loadingError:
      return {
        isLoading: true,
        error: action.payload,
      };
  }

  return state;
}
