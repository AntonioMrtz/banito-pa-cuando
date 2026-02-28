import { SPAIN_CENTER_COORDINATES } from "@/src/features/locations/location.constants";
import { getForecast } from "@/src/integrations/open-meteo/open-meteo.service";
import { describe, it, expect } from "vitest";

const HOURS_PER_DAY = 24;

describe("Forecast API", () => {
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
  });
});
