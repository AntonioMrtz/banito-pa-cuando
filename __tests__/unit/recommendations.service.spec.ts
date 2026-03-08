import { Forecast, HourlyUnits } from "@/src/features/forecast/forecast.model";
import * as ForecastService from "@/src/features/forecast/forecast.service";
import {
  KEY_HOURS,
  WEATHER_CONSTRAINTS,
} from "@/src/features/recommendations/recommendations.constants";
import {
  GoodDayHourData,
  InvalidDayNumberError,
  InvalidHourlyDataError,
  Season,
} from "@/src/features/recommendations/recommendations.model";
import {
  getDailyForecastFromHourlyData,
  getFirstGoodDay,
  getKeyHours,
  getKeyHoursForSeason,
  getSeason,
  isGoodDay,
} from "@/src/features/recommendations/recommendations.service";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("@/src/features/forecast/forecast.service", () => ({
  getForecast: vi.fn(),
}));

const TIMES_24 = Array.from(
  { length: 24 },
  (_, i) => `2026-03-06T${String(i).padStart(2, "0")}:00:00.000Z`,
);

const makeHourlyData = (
  temp: number,
  precipitation: number,
  wind: number,
  gust: number,
) => ({
  time: TIMES_24,
  apparentTemperature: Array(24).fill(temp),
  precipitation: Array(24).fill(precipitation),
  windspeed10m: Array(24).fill(wind),
  windgust10m: Array(24).fill(gust),
});

describe("Recommendations Service", () => {
  describe(getSeason.name, () => {
    it("Should return Winter for January", () => {
      expect(getSeason(new Date(2023, 0, 1))).toBe(Season.Winter);
    });

    it("Should return Spring for April", () => {
      expect(getSeason(new Date(2023, 3, 1))).toBe(Season.Spring);
    });

    it("Should return Summer for July", () => {
      expect(getSeason(new Date(2023, 6, 1))).toBe(Season.Summer);
    });

    it("Should return Autumn for October", () => {
      expect(getSeason(new Date(2023, 9, 1))).toBe(Season.Autumn);
    });
  });

  describe(getDailyForecastFromHourlyData.name, () => {
    const mockHourlyData = {
      time: [
        // generate 24 hourly times
        "2026-02-10T14:00:00.000Z",
        "2026-02-10T15:00:00.000Z",
        "2026-02-10T16:00:00.000Z",
        "2026-02-10T17:00:00.000Z",
        "2026-02-10T18:00:00.000Z",
        "2026-02-10T19:00:00.000Z",
        "2026-02-10T20:00:00.000Z",
        "2026-02-10T21:00:00.000Z",
        "2026-02-10T22:00:00.000Z",
        "2026-02-10T23:00:00.000Z",
        "2026-02-11T00:00:00.000Z",
        "2026-02-11T01:00:00.000Z",
        "2026-02-11T02:00:00.000Z",
        "2026-02-11T03:00:00.000Z",
        "2026-02-11T04:00:00.000Z",
        "2026-02-11T05:00:00.000Z",
        "2026-02-11T06:00:00.000Z",
        "2026-02-11T07:00:00.000Z",
        "2026-02-11T08:00:00.000Z",
        "2026-02-11T09:00:00.000Z",
        "2026-02-11T10:00:00.000Z",
        "2026-02-11T11:00:00.000Z",
        "2026-02-11T12:00:00.000Z",
        "2026-02-11T13:00:00.000Z",
      ],
      apparentTemperature: [
        12, 15, 14, 18, 16, 25, 13, 17, 19, 20, 21, 22, 23, 24, 18, 17, 16, 15,
        14, 13, 12, 11, 10, 9,
      ],
      precipitation: [
        0.0, 1.2, 0.5, 0.0, 2.3, 1.0, 0.1, 0.0, 0.3, 0.2, 0.0, 0.4, 0.6, 0.8,
        0.9, 1.1, 0.7, 0.5, 0.2, 0.0, 0.0, 0.1, 0.0, 0.0,
      ],
      windspeed10m: [
        8, 12, 10, 15, 9, 20, 11, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 31,
      ],
      windgust10m: [
        15, 20, 18, 25, 17, 35, 19, 21, 23, 27, 29, 31, 33, 35, 37, 39, 41, 43,
        45, 47, 49, 51, 53, 55,
      ],
    };

    it("Should throw error if dayNumber is negative", () => {
      expect(() => getDailyForecastFromHourlyData(-1, mockHourlyData)).toThrow(
        InvalidDayNumberError,
      );
    });

    it("Should throw error if dayNumber is greater than or equal to the number of days in hourlyData", () => {
      expect(() =>
        getDailyForecastFromHourlyData(1, {
          time: ["2023-01-01T00:00:00Z"],
          apparentTemperature: [25],
          precipitation: [5],
          windspeed10m: [5],
          windgust10m: [5],
        }),
      ).toThrow(InvalidDayNumberError);
    });

    it("Should return correct daily forecast for valid first day", () => {
      const result = getDailyForecastFromHourlyData(0, mockHourlyData, 2);
      expect(result).toEqual({
        data: {
          time: [mockHourlyData.time[0], mockHourlyData.time[1]],
          apparentTemperature: [
            mockHourlyData.apparentTemperature[0],
            mockHourlyData.apparentTemperature[1],
          ],
          precipitation: [
            mockHourlyData.precipitation[0],
            mockHourlyData.precipitation[1],
          ],
          windspeed10m: [
            mockHourlyData.windspeed10m[0],
            mockHourlyData.windspeed10m[1],
          ],
          windgust10m: [
            mockHourlyData.windgust10m[0],
            mockHourlyData.windgust10m[1],
          ],
        },
      });
    });

    it("Should return correct daily forecast for valid last day", () => {
      const result = getDailyForecastFromHourlyData(2, mockHourlyData, 2);
      expect(result).toEqual({
        data: {
          time: [mockHourlyData.time[4], mockHourlyData.time[5]],
          apparentTemperature: [
            mockHourlyData.apparentTemperature[4],
            mockHourlyData.apparentTemperature[5],
          ],
          precipitation: [
            mockHourlyData.precipitation[4],
            mockHourlyData.precipitation[5],
          ],
          windspeed10m: [
            mockHourlyData.windspeed10m[4],
            mockHourlyData.windspeed10m[5],
          ],
          windgust10m: [
            mockHourlyData.windgust10m[4],
            mockHourlyData.windgust10m[5],
          ],
        },
      });
    });

    it("Should return correct daily forecast for valid intermediate day", () => {
      const result = getDailyForecastFromHourlyData(1, mockHourlyData, 2);
      expect(result).toEqual({
        data: {
          time: [mockHourlyData.time[2], mockHourlyData.time[3]],
          apparentTemperature: [
            mockHourlyData.apparentTemperature[2],
            mockHourlyData.apparentTemperature[3],
          ],
          precipitation: [
            mockHourlyData.precipitation[2],
            mockHourlyData.precipitation[3],
          ],
          windspeed10m: [
            mockHourlyData.windspeed10m[2],
            mockHourlyData.windspeed10m[3],
          ],
          windgust10m: [
            mockHourlyData.windgust10m[2],
            mockHourlyData.windgust10m[3],
          ],
        },
      });
    });
  });

  describe(getKeyHoursForSeason.name, () => {
    const mockHourlyData = makeHourlyData(20, 0.1, 5, 10);

    it("Should return correct key hours for Spring", () => {
      const springStartHour = KEY_HOURS[Season.Spring].start;
      const springEndHour = KEY_HOURS[Season.Spring].end;

      const result = getKeyHoursForSeason(Season.Spring, mockHourlyData);
      const startHour = new Date(result.time[0]).getUTCHours();
      const endHour = new Date(
        result.time[result.time.length - 1],
      ).getUTCHours();

      expect(startHour).toBe(springStartHour);
      expect(endHour).toBe(springEndHour);
    });

    it("Should return correct key hours for Winter", () => {
      const winterStartHour = KEY_HOURS[Season.Winter].start;
      const winterEndHour = KEY_HOURS[Season.Winter].end;

      const result = getKeyHoursForSeason(Season.Winter, mockHourlyData);
      const startHour = new Date(result.time[0]).getUTCHours();
      const endHour = new Date(
        result.time[result.time.length - 1],
      ).getUTCHours();

      expect(startHour).toBe(winterStartHour);
      expect(endHour).toBe(winterEndHour);
    });

    it("Should return correct key hours for Summer", () => {
      const summerStartHour = KEY_HOURS[Season.Summer].start;
      const summerEndHour = KEY_HOURS[Season.Summer].end;

      const result = getKeyHoursForSeason(Season.Summer, mockHourlyData);
      const startHour = new Date(result.time[0]).getUTCHours();
      const endHour = new Date(
        result.time[result.time.length - 1],
      ).getUTCHours();

      expect(startHour).toBe(summerStartHour);
      expect(endHour).toBe(summerEndHour);
    });

    it("Should return correct key hours for Autumn", () => {
      const autumnStartHour = KEY_HOURS[Season.Autumn].start;
      const autumnEndHour = KEY_HOURS[Season.Autumn].end;

      const result = getKeyHoursForSeason(Season.Autumn, mockHourlyData);
      const startHour = new Date(result.time[0]).getUTCHours();
      const endHour = new Date(
        result.time[result.time.length - 1],
      ).getUTCHours();

      expect(startHour).toBe(autumnStartHour);
      expect(endHour).toBe(autumnEndHour);
    });
  });

  describe(isGoodDay.name, () => {
    const currentSeason = getSeason(new Date());
    const KEY_START = KEY_HOURS[currentSeason].start;
    const KEY_END = KEY_HOURS[currentSeason].end;

    const goodAtThreshold: Record<keyof typeof WEATHER_CONSTRAINTS, number> = {
      apparentTemperature: WEATHER_CONSTRAINTS.apparentTemperature,
      precipitation: WEATHER_CONSTRAINTS.precipitation,
      windspeed10m: WEATHER_CONSTRAINTS.windspeed10m,
      windgust10m: WEATHER_CONSTRAINTS.windgust10m,
    };

    const bad = {
      apparentTemperature: WEATHER_CONSTRAINTS.apparentTemperature - 1,
      precipitation: WEATHER_CONSTRAINTS.precipitation + 0.1,
      windspeed10m: WEATHER_CONSTRAINTS.windspeed10m + 1,
      windgust10m: WEATHER_CONSTRAINTS.windgust10m + 1,
    };

    it("Should throw InvalidHourlyDataError when hourly data has fewer than 24 entries", () => {
      expect(() =>
        isGoodDay({
          data: {
            time: [TIMES_24[0]],
            apparentTemperature: [goodAtThreshold.apparentTemperature],
            precipitation: [goodAtThreshold.precipitation],
            windspeed10m: [goodAtThreshold.windspeed10m],
            windgust10m: [goodAtThreshold.windgust10m],
          },
        }),
      ).toThrow(InvalidHourlyDataError);
    });

    it("Should accept temperature when it is equal to the configured threshold", () => {
      const result = isGoodDay({
        data: makeHourlyData(
          goodAtThreshold.apparentTemperature,
          goodAtThreshold.precipitation,
          goodAtThreshold.windspeed10m,
          goodAtThreshold.windgust10m,
        ),
      });

      expect(result).not.toBeNull();
    });

    it("Should reject temperature when it is below the configured threshold", () => {
      const result = isGoodDay({
        data: makeHourlyData(
          bad.apparentTemperature,
          goodAtThreshold.precipitation,
          goodAtThreshold.windspeed10m,
          goodAtThreshold.windgust10m,
        ),
      });

      expect(result).toBeNull();
    });

    it("Should accept precipitation when it is equal to the configured threshold", () => {
      const result = isGoodDay({
        data: makeHourlyData(
          goodAtThreshold.apparentTemperature,
          goodAtThreshold.precipitation,
          goodAtThreshold.windspeed10m,
          goodAtThreshold.windgust10m,
        ),
      });

      expect(result).not.toBeNull();
    });

    it("Should reject precipitation when it is above the configured threshold", () => {
      const result = isGoodDay({
        data: makeHourlyData(
          goodAtThreshold.apparentTemperature,
          bad.precipitation,
          goodAtThreshold.windspeed10m,
          goodAtThreshold.windgust10m,
        ),
      });

      expect(result).toBeNull();
    });

    it("Should accept wind speed when it is equal to the configured threshold", () => {
      const result = isGoodDay({
        data: makeHourlyData(
          goodAtThreshold.apparentTemperature,
          goodAtThreshold.precipitation,
          goodAtThreshold.windspeed10m,
          goodAtThreshold.windgust10m,
        ),
      });

      expect(result).not.toBeNull();
    });

    it("Should reject wind speed when it is above the configured threshold", () => {
      const result = isGoodDay({
        data: makeHourlyData(
          goodAtThreshold.apparentTemperature,
          goodAtThreshold.precipitation,
          bad.windspeed10m,
          goodAtThreshold.windgust10m,
        ),
      });

      expect(result).toBeNull();
    });

    it("Should accept wind gust when it is equal to the configured threshold", () => {
      const result = isGoodDay({
        data: makeHourlyData(
          goodAtThreshold.apparentTemperature,
          goodAtThreshold.precipitation,
          goodAtThreshold.windspeed10m,
          goodAtThreshold.windgust10m,
        ),
      });

      expect(result).not.toBeNull();
    });

    it("Should reject wind gust when it is above the configured threshold", () => {
      const result = isGoodDay({
        data: makeHourlyData(
          goodAtThreshold.apparentTemperature,
          goodAtThreshold.precipitation,
          goodAtThreshold.windspeed10m,
          bad.windgust10m,
        ),
      });

      expect(result).toBeNull();
    });

    it("Should return several good hours when multiple key hours are valid", () => {
      const temps = Array(24).fill(bad.apparentTemperature);
      const precipitation = Array(24).fill(bad.precipitation);
      const winds = Array(24).fill(bad.windspeed10m);
      const gusts = Array(24).fill(bad.windgust10m);

      const goodIndices = [
        KEY_START,
        KEY_START + 1,
        KEY_START + 2,
        KEY_START + 3,
      ];

      goodIndices.forEach((i) => {
        temps[i] = goodAtThreshold.apparentTemperature;
        precipitation[i] = goodAtThreshold.precipitation;
        winds[i] = goodAtThreshold.windspeed10m;
        gusts[i] = goodAtThreshold.windgust10m;
      });

      const result = isGoodDay({
        data: {
          time: TIMES_24,
          apparentTemperature: temps,
          precipitation,
          windspeed10m: winds,
          windgust10m: gusts,
        },
      });

      expect(result).not.toBeNull();
      expect(result).toHaveLength(goodIndices.length);
      expect(result?.[0]).toEqual({
        hour: TIMES_24[KEY_START],
        apparentTemperature: goodAtThreshold.apparentTemperature,
        precipitation: goodAtThreshold.precipitation,
        windspeed10m: goodAtThreshold.windspeed10m,
        windgust10m: goodAtThreshold.windgust10m,
      } as GoodDayHourData);
    });

    it("Should only evaluate hours within the key hour range", () => {
      const temps = Array(24).fill(goodAtThreshold.apparentTemperature);
      const precipitation = Array(24).fill(goodAtThreshold.precipitation);
      const winds = Array(24).fill(goodAtThreshold.windspeed10m);
      const gusts = Array(24).fill(goodAtThreshold.windgust10m);

      for (let i = KEY_START; i <= KEY_END; i++) {
        temps[i] = bad.apparentTemperature;
        precipitation[i] = bad.precipitation;
        winds[i] = bad.windspeed10m;
        gusts[i] = bad.windgust10m;
      }

      const result = isGoodDay({
        data: {
          time: TIMES_24,
          apparentTemperature: temps,
          precipitation,
          windspeed10m: winds,
          windgust10m: gusts,
        },
      });

      expect(result).toBeNull();
    });
  });

  describe(getKeyHours.name, () => {
    it("Should throw InvalidHourlyDataError when hourly data has fewer than 24 entries", () => {
      expect(() => {
        const invalidHourlyData = makeHourlyData(20, 0.1, 5, 10);
        invalidHourlyData.apparentTemperature.pop();
        getKeyHours(invalidHourlyData);
      }).toThrow(InvalidHourlyDataError);
    });

    it("Should return correct key hours for the current season", () => {
      const currentSeason = getSeason(new Date());
      const keyHoursForSeason = KEY_HOURS[currentSeason];

      const hourlyData = makeHourlyData(20, 0.1, 5, 10);
      const result = getKeyHours(hourlyData);

      const startHour = new Date(result.time[0]).getUTCHours();
      const endHour = new Date(
        result.time[result.time.length - 1],
      ).getUTCHours();

      expect(startHour).toBe(keyHoursForSeason.start);
      expect(endHour).toBe(keyHoursForSeason.end);
    });
  });

  describe(getFirstGoodDay.name, () => {
    const units: HourlyUnits = {
      apparentTemperature: "°C",
      precipitation: "mm",
      windspeed10m: "km/h",
      windgust10m: "km/h",
    };
    const NO_GOOD_DAYS_FORECAST: Forecast = {
      days: 3,
      latitude: 0,
      longitude: 0,
      hourlyUnits: units,
      hourlyData: {
        time: TIMES_24.concat(TIMES_24).concat(TIMES_24),
        apparentTemperature: Array(72).fill(
          WEATHER_CONSTRAINTS.apparentTemperature - 1,
        ),
        precipitation: Array(72).fill(WEATHER_CONSTRAINTS.precipitation + 0.1),
        windspeed10m: Array(72).fill(WEATHER_CONSTRAINTS.windspeed10m + 1),
        windgust10m: Array(72).fill(WEATHER_CONSTRAINTS.windgust10m + 1),
      },
    };

    const GOOD_DAY_FORECAST: Forecast = {
      days: 1,
      latitude: 0,
      longitude: 0,
      hourlyUnits: units,
      hourlyData: {
        time: TIMES_24,
        apparentTemperature: Array(24).fill(
          WEATHER_CONSTRAINTS.apparentTemperature + 1,
        ),
        precipitation: Array(24).fill(WEATHER_CONSTRAINTS.precipitation - 0.1),
        windspeed10m: Array(24).fill(WEATHER_CONSTRAINTS.windspeed10m - 1),
        windgust10m: Array(24).fill(WEATHER_CONSTRAINTS.windgust10m - 1),
      },
    };

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("Should return null when no good days are found in the forecast", async () => {
      vi.mocked(ForecastService.getForecast).mockResolvedValue(
        NO_GOOD_DAYS_FORECAST,
      );
      const result = await getFirstGoodDay({ lat: 0, lon: 0 });
      expect(result).toBeNull();
    });

    it("Should return the first good day found in the forecast", async () => {
      vi.mocked(ForecastService.getForecast).mockResolvedValue(
        GOOD_DAY_FORECAST,
      );

      const result = await getFirstGoodDay({ lat: 0, lon: 0 });

      expect(result).not.toBeNull();
      expect(result?.date).toEqual(new Date(TIMES_24[0]));
      expect(result?.goodHours).toHaveLength(24);
      expect(result?.goodHours[0]).toEqual({
        hour: TIMES_24[0],
        apparentTemperature: WEATHER_CONSTRAINTS.apparentTemperature + 1,
        precipitation: WEATHER_CONSTRAINTS.precipitation - 0.1,
        windspeed10m: WEATHER_CONSTRAINTS.windspeed10m - 1,
        windgust10m: WEATHER_CONSTRAINTS.windgust10m - 1,
      } as GoodDayHourData);
    });
  });
});
