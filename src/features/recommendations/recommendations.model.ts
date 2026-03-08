import { AppError } from "@/src/shared/exceptions";

export {
  InvalidHourlyDataError,
  type GoodDayHourData,
  type GoodDayData,
  Season,
  InvalidDayNumberError,
};

interface GoodDayHourData {
  hour: string;
  apparentTemperature: number;
  precipitation: number;
  windspeed10m: number;
  windgust10m: number;
}

interface GoodDayData {
  goodHours: GoodDayHourData[];
  date: Date;
}

enum Season {
  Spring = "spring",
  Summer = "summer",
  Autumn = "autumn",
  Winter = "winter",
}

class InvalidHourlyDataError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

class InvalidDayNumberError extends AppError {
  constructor(message: string) {
    super(message);
  }
}
