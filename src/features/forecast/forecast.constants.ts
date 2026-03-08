import { HourlyUnits } from "./forecast.model";

export { FORECAST_DAYS, FORECAST_EXPECTED_UNITS };

const FORECAST_DAYS = 16;

const FORECAST_EXPECTED_UNITS: Record<keyof HourlyUnits, string> = {
  apparentTemperature: "°C",
  precipitation: "mm",
  windspeed10m: "km/h",
  windgust10m: "km/h",
} as const;
