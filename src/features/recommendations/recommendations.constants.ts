import { HourlyUnits } from "../forecast/forecast.model";
import { Season } from "./recommendations.model";

export { WEATHER_CONSTRAINTS, Season, KEY_HOURS, MINIMUM_GOOD_HOURS };

const WEATHER_CONSTRAINTS: Record<keyof HourlyUnits, number> = {
  apparentTemperature: 22,
  precipitation: 0.1,
  windspeed10m: 10,
  windgust10m: 30,
} as const;

const KEY_HOURS: Record<Season, { start: number; end: number }> = {
  [Season.Spring]: { start: 10, end: 18 },
  [Season.Summer]: { start: 10, end: 20 },
  [Season.Autumn]: { start: 10, end: 18 },
  [Season.Winter]: { start: 11, end: 16 },
} as const;

const MINIMUM_GOOD_HOURS = 4;
