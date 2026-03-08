import { FORECAST_EXPECTED_UNITS } from "@/src/features/forecast/forecast.constants";
import {
  InvalidCoordinatesError,
  InvalidDayNumberError,
  InvalidUnitsForecastError,
  InvalidForecastDataError,
  type Forecast,
} from "@/src/features/forecast/forecast.model";
import { getForecast } from "@/src/features/forecast/forecast.service";
import { SPAIN_CENTER_COORDINATES } from "@/src/features/locations/location.constants";
import * as OpenMeteoService from "@/src/integrations/open-meteo/open-meteo.service";
import { afterEach, describe, expect, it, vi } from "vitest";

const TIMES_24 = Array.from(
  { length: 24 },
  (_, i) => `2026-03-06T${String(i).padStart(2, "0")}:00:00.000Z`,
);

const forecastWithInvalidUnits: Forecast = {
  days: 1,
  latitude: SPAIN_CENTER_COORDINATES.lat,
  longitude: SPAIN_CENTER_COORDINATES.lon,
  hourlyUnits: {
    apparentTemperature: "invalid_unit",
    precipitation: FORECAST_EXPECTED_UNITS.precipitation,
    windspeed10m: FORECAST_EXPECTED_UNITS.windspeed10m,
    windgust10m: FORECAST_EXPECTED_UNITS.windgust10m,
  },
  hourlyData: {
    time: TIMES_24,
    apparentTemperature: Array(24).fill(20),
    precipitation: Array(24).fill(0),
    windspeed10m: Array(24).fill(10),
    windgust10m: Array(24).fill(15),
  },
};

const forecastWithInvalidHourlyData: Forecast = {
  days: 1,
  latitude: SPAIN_CENTER_COORDINATES.lat,
  longitude: SPAIN_CENTER_COORDINATES.lon,
  hourlyUnits: {
    apparentTemperature: FORECAST_EXPECTED_UNITS.apparentTemperature,
    precipitation: FORECAST_EXPECTED_UNITS.precipitation,
    windspeed10m: FORECAST_EXPECTED_UNITS.windspeed10m,
    windgust10m: FORECAST_EXPECTED_UNITS.windgust10m,
  },
  hourlyData: {
    time: TIMES_24,
    apparentTemperature: Array(10).fill(20), // Invalid length, should be 24
    precipitation: Array(24).fill(0),
    windspeed10m: Array(24).fill(10),
    windgust10m: Array(24).fill(15),
  },
};

const validForecast: Forecast = {
  days: 1,
  latitude: SPAIN_CENTER_COORDINATES.lat,
  longitude: SPAIN_CENTER_COORDINATES.lon,
  hourlyUnits: {
    apparentTemperature: FORECAST_EXPECTED_UNITS.apparentTemperature,
    precipitation: FORECAST_EXPECTED_UNITS.precipitation,
    windspeed10m: FORECAST_EXPECTED_UNITS.windspeed10m,
    windgust10m: FORECAST_EXPECTED_UNITS.windgust10m,
  },
  hourlyData: {
    time: TIMES_24,
    apparentTemperature: Array(24).fill(20),
    precipitation: Array(24).fill(0),
    windspeed10m: Array(24).fill(10),
    windgust10m: Array(24).fill(15),
  },
};

describe("Forecast API", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe("Coordinates validation", () => {
    it("Should return InvalidCoordinatesError if coordinates are outside of Spain", async () => {
      const invalidCoordinates = { lat: 0, lon: 0 };
      await expect(getForecast(invalidCoordinates, 1)).rejects.toThrow(
        InvalidCoordinatesError,
      );
    });

    it("Should return forecast if coordinates are valid", async () => {
      const forecast = await getForecast(SPAIN_CENTER_COORDINATES);

      expect(forecast).toBeDefined();
      expect(forecast.latitude).toBeCloseTo(SPAIN_CENTER_COORDINATES.lat, 1);
      expect(forecast.longitude).toBeCloseTo(SPAIN_CENTER_COORDINATES.lon, 1);
    });
  });

  describe("Units validation", () => {
    it("Should return forecast with expected units", async () => {
      const forecast = await getForecast(SPAIN_CENTER_COORDINATES, 1);
      expect(forecast).toBeDefined();
    });

    it("Should return InvalidUnitsForecastError if forecast has unexpected units", async () => {
      vi.spyOn(
        OpenMeteoService,
        OpenMeteoService.getForecast.name as keyof typeof OpenMeteoService,
      ).mockResolvedValue(forecastWithInvalidUnits);

      await expect(getForecast(SPAIN_CENTER_COORDINATES, 1)).rejects.toThrow(
        InvalidUnitsForecastError,
      );
    });
  });

  describe("Hourly data validation", () => {
    it("Should return InvalidForecastDataError if hourly data is invalid", async () => {
      vi.spyOn(
        OpenMeteoService,
        OpenMeteoService.getForecast.name as keyof typeof OpenMeteoService,
      ).mockResolvedValue(forecastWithInvalidHourlyData);

      await expect(getForecast(SPAIN_CENTER_COORDINATES, 1)).rejects.toThrow(
        InvalidForecastDataError,
      );
    });

    it("Should return forecast with expected data", async () => {
      const forecast = await getForecast(SPAIN_CENTER_COORDINATES, 1);

      expect(forecast).toBeDefined();

      expect(forecast.hourlyData.apparentTemperature.length).toBe(24);
      expect(forecast.hourlyData.precipitation.length).toBe(24);
      expect(forecast.hourlyData.windspeed10m.length).toBe(24);
      expect(forecast.hourlyData.windgust10m.length).toBe(24);
    });
  });

  describe("Forecast days validation", () => {
    it("Should return forecast if coordinates are valid", async () => {
      const forecastDays = 2;

      const forecast = await getForecast(
        SPAIN_CENTER_COORDINATES,
        forecastDays,
      );

      expect(forecast.days).toBe(forecastDays);
    });

    it("Should return InvalidDayNumberError if day number is invalid", async () => {
      const invalidForecastDays = -1;

      vi.spyOn(
        OpenMeteoService,
        OpenMeteoService.getForecast.name as keyof typeof OpenMeteoService,
      ).mockResolvedValue({
        ...validForecast,
        days: invalidForecastDays,
      });

      await expect(
        getForecast(SPAIN_CENTER_COORDINATES, invalidForecastDays),
      ).rejects.toThrow(InvalidDayNumberError);
    });
  });
});
