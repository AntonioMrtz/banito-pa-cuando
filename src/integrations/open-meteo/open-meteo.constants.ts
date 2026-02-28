export {
  OPEN_METEO_API_URL,
  DEFAULT_TIMEZONE,
  DEFAULT_HOURLY_PARAMS,
  OPEN_METEO_FORECAST_DAYS,
};

// API
const OPEN_METEO_API_URL = "https://api.open-meteo.com/v1/forecast";

// Filters and defaults
const OPEN_METEO_FORECAST_DAYS = 16;
const DEFAULT_TIMEZONE = "auto"; // Use the local timezone of the coordinates
const DEFAULT_HOURLY_PARAMS = [
  "apparent_temperature",
  "precipitation",
  "windspeed_10m",
];
