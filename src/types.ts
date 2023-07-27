export type Coords = {
  lat: number;
  lng: number;
};

export type Condition = {
  code: number;
  icon: string;
  text: string;
}

export type LocationInfo = {
  name: string;
  region: string;
  country: string;
};

export type WeatherInfo = {
  last_updated_epoch: number;
  humidity: number;
  wind_dir: string;
  wind_kph: number;
  uv: number;
  temp_c: number;
  condition: Condition;
};

export type WeatherInfoWithTime = WeatherInfo & {
  time_epoch: number;
  time: string;
};

export type AvgWeatherInfo = {
  avghumidity: number;
  uv: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxtemp_c: number;
  mintemp_c: number;
  condition: Condition;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
};

export type DayForecast = {
  date: string;
  date_epoch: number;
  day: AvgWeatherInfo;
  hour: WeatherInfoWithTime[];
};

export type Forecast = {
  forecastday: DayForecast[];
};

export type ForecastState = {
  location: LocationInfo;
  current: WeatherInfo;
  forecast: Forecast;
};
