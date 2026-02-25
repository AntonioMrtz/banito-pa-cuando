import { AppError } from "@/src/shared/exceptions";

export {
  type Forecast,
  type HourlyUnits,
  type HourlyData,
  InvalidCoordinatesError,
};

interface Forecast {
  days: number;
  latitude: number;
  longitude: number;
  hourlyUnits: HourlyUnits;
  hourlyData: HourlyData;
}

interface HourlyUnits {
  apparent_temperature: string;
  precipitation: string;
  windspeed10m: string;
}

interface HourlyData {
  time: string[];
  apparentTemperature: number[];
  precipitation: number[];
  windspeed10m: number[];
}

class InvalidCoordinatesError extends AppError {
  constructor(message: string) {
    super(message);
  }
}
