import "server-only";
import { Coordinates } from "../locations/locations.model";
import * as ForecastService from "@/src/features/forecast/forecast.service";
import {
  GoodDayData,
  GoodDayHourData,
  InvalidDayNumberError,
  InvalidHourlyDataError,
} from "./recommendations.model";
import {
  KEY_HOURS,
  MINIMUM_GOOD_HOURS,
  Season,
  WEATHER_CONSTRAINTS,
} from "./recommendations.constants";
import { DayForecast, HourlyData } from "../forecast/forecast.model";

export {
  getFirstGoodDay,
  isGoodDay,
  getSeason,
  getKeyHours,
  getKeyHoursForSeason,
  getDailyForecastFromHourlyData,
};

const getFirstGoodDay = async (
  location: Coordinates,
): Promise<GoodDayData | null> => {
  const forecast = await ForecastService.getForecast(location);

  const goodDays: DayForecast[] = [];

  for (let i = 0; i < forecast.days; i++) {
    const dayForecast: DayForecast = getDailyForecastFromHourlyData(
      i,
      forecast.hourlyData,
    );
    const goodDayData = isGoodDay(dayForecast);
    if (goodDayData) {
      goodDays.push(dayForecast);
    }
  }

  if (goodDays.length === 0) {
    return null;
  }

  const goodDayHours: GoodDayHourData[] = goodDays[0].data.time.map(
    (hour, i) => ({
      hour,
      apparentTemperature: goodDays[0].data.apparentTemperature[i],
      precipitation: goodDays[0].data.precipitation[i],
      windspeed10m: goodDays[0].data.windspeed10m[i],
      windgust10m: goodDays[0].data.windgust10m[i],
    }),
  );

  const result: GoodDayData = {
    goodHours: goodDayHours,
    date: new Date(goodDays[0].data.time[0]),
  };

  return result;
};

const isGoodDay = (forecast: DayForecast): GoodDayHourData[] | null => {
  const { data } = forecast;

  const keyHours = getKeyHours(data);

  const goodHours: GoodDayHourData[] = keyHours.time
    .map(
      (hour, i) =>
        ({
          hour,
          apparentTemperature: keyHours.apparentTemperature[i],
          precipitation: keyHours.precipitation[i],
          windspeed10m: keyHours.windspeed10m[i],
          windgust10m: keyHours.windgust10m[i],
        }) as GoodDayHourData,
    )
    .filter(
      (h) =>
        h.apparentTemperature >= WEATHER_CONSTRAINTS.apparentTemperature &&
        h.precipitation <= WEATHER_CONSTRAINTS.precipitation &&
        h.windspeed10m <= WEATHER_CONSTRAINTS.windspeed10m &&
        h.windgust10m <= WEATHER_CONSTRAINTS.windgust10m,
    );

  if (goodHours.length >= MINIMUM_GOOD_HOURS) {
    return goodHours;
  }

  return null;
};

const getKeyHours = (hourlyData: HourlyData): HourlyData => {
  const { apparentTemperature, precipitation, windspeed10m, windgust10m } =
    hourlyData;

  const EXPECTED_AMOUNT_OF_HOURS = 24;

  if (
    apparentTemperature.length < EXPECTED_AMOUNT_OF_HOURS ||
    precipitation.length < EXPECTED_AMOUNT_OF_HOURS ||
    windspeed10m.length < EXPECTED_AMOUNT_OF_HOURS ||
    windgust10m.length < EXPECTED_AMOUNT_OF_HOURS
  ) {
    throw new InvalidHourlyDataError("Invalid hourly data");
  }

  const season = getSeason(new Date());
  const keyHours: HourlyData = getKeyHoursForSeason(season, hourlyData);

  return keyHours;
};

const getSeason = (date: Date): Season => {
  const month = date.getMonth() + 1;

  if (month >= 3 && month <= 5) {
    return Season.Spring;
  } else if (month >= 6 && month <= 8) {
    return Season.Summer;
  } else if (month >= 9 && month <= 11) {
    return Season.Autumn;
  } else {
    return Season.Winter;
  }
};

const getKeyHoursForSeason = (
  season: Season,
  hourlyData: HourlyData,
): HourlyData => {
  const { start, end } = KEY_HOURS[season];

  const endSliceIndex = end + 1; // to include the end hour

  const keyHours: HourlyData = {
    time: hourlyData.time.slice(start, endSliceIndex),
    apparentTemperature: hourlyData.apparentTemperature.slice(
      start,
      endSliceIndex,
    ),
    precipitation: hourlyData.precipitation.slice(start, endSliceIndex),
    windspeed10m: hourlyData.windspeed10m.slice(start, endSliceIndex),
    windgust10m: hourlyData.windgust10m.slice(start, endSliceIndex),
  };

  return keyHours;
};

const getDailyForecastFromHourlyData = (
  dayNumber: number,
  hourlyData: HourlyData,
  dataPerDay = 24,
): DayForecast => {
  if (dayNumber < 0 || dayNumber >= hourlyData.time.length / dataPerDay) {
    throw new InvalidDayNumberError("Invalid day number");
  }

  const startIndex = dayNumber * dataPerDay;
  const endIndex = (dayNumber + 1) * dataPerDay;

  const dayForecast: DayForecast = {
    data: {
      time: hourlyData.time.slice(startIndex, endIndex),
      apparentTemperature: hourlyData.apparentTemperature.slice(
        startIndex,
        endIndex,
      ),
      precipitation: hourlyData.precipitation.slice(startIndex, endIndex),
      windspeed10m: hourlyData.windspeed10m.slice(startIndex, endIndex),
      windgust10m: hourlyData.windgust10m.slice(startIndex, endIndex),
    },
  };

  return dayForecast;
};
