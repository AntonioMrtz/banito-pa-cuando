import { SPAIN_CENTER_COORDINATES } from "@/src/features/locations/location.constants";
import { getForecast } from "@/src/integrations/open-meteo/open-meteo.service";
import { ZodError } from "zod";
import { afterEach, describe, it, expect, vi } from "vitest";

const HOURS_PER_DAY = 24;

describe("Forecast API", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe(getForecast.name, () => {
    it("Should return forecast for valid coordinates", async () => {
      const { lat, lon } = SPAIN_CENTER_COORDINATES;
      const forecast = await getForecast({ lat, lon });
      expect(forecast).toBeDefined();
    });

    it("Should return units for all parameters", async () => {
      const forecast = await getForecast(SPAIN_CENTER_COORDINATES);
      expect(Object.keys(forecast.hourlyUnits).length).toBeGreaterThan(0);
    });

    it("Should return correct number of hourly data points for apparent temperature", async () => {
      const forecastDays = 3;
      const forecastHours = forecastDays * HOURS_PER_DAY;
      const forecast = await getForecast(
        SPAIN_CENTER_COORDINATES,
        forecastDays,
      );
      expect(forecast.hourlyData.apparentTemperature.length).toBe(
        forecastHours,
      );
    });

    it("Should return correct number of hourly data points for precipitation", async () => {
      const forecastDays = 3;
      const forecastHours = forecastDays * HOURS_PER_DAY;
      const forecast = await getForecast(
        SPAIN_CENTER_COORDINATES,
        forecastDays,
      );
      expect(forecast.hourlyData.precipitation.length).toBe(forecastHours);
    });

    it("Should return correct number of hourly data points for windspeed", async () => {
      const forecastDays = 3;
      const forecastHours = forecastDays * HOURS_PER_DAY;
      const forecast = await getForecast(
        SPAIN_CENTER_COORDINATES,
        forecastDays,
      );
      expect(forecast.hourlyData.windspeed10m.length).toBe(forecastHours);
    });

    it("Should throw a ZodError when API payload has invalid shape", async () => {
      const invalidPayload = {
        latitude: 40.4168,
        longitude: -3.7038,
        generationtime_ms: 1,
        utc_offset_seconds: 0,
        timezone: "UTC",
        timezone_abbreviation: "UTC",
        elevation: 667,
        hourly_units: {
          time: "iso8601",
          apparent_temperature: "°C",
          precipitation: "mm",
          windspeed_10m: "km/h",
          wind_gusts_10m: "km/h",
        },
        hourly: {
          time: ["2026-03-08T00:00"],
          apparent_temperature: [18],
          precipitation: [0],
          windspeed_10m: "12",
          wind_gusts_10m: [20],
        },
      };

      vi.spyOn(global, "fetch").mockResolvedValue({
        json: async () => invalidPayload,
      } as Response);

      await expect(
        getForecast(SPAIN_CENTER_COORDINATES),
      ).rejects.toBeInstanceOf(ZodError);
    });
  });
});
