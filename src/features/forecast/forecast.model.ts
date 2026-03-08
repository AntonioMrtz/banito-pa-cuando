import { AppError } from "@/src/shared/exceptions";

export {
  type Forecast,
  type HourlyUnits,
  type HourlyData,
  type DayForecast,
  InvalidCoordinatesError,
  InvalidUnitsForecastError,
  InvalidForecastDataError,
  InvalidDayNumberError,
};

interface Forecast {
  days: number;
  latitude: number;
  longitude: number;
  hourlyUnits: HourlyUnits;
  hourlyData: HourlyData;
}

interface HourlyUnits {
  apparentTemperature: string;
  precipitation: string;
  windspeed10m: string;
  windgust10m: string;
}

interface HourlyData {
  time: string[];
  apparentTemperature: number[];
  precipitation: number[];
  windspeed10m: number[];
  windgust10m: number[];
}

interface DayForecast {
  data: HourlyData;
}

class InvalidCoordinatesError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

class InvalidUnitsForecastError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

class InvalidForecastDataError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

class InvalidDayNumberError extends AppError {
  constructor(message: string) {
    super(message);
  }
}
