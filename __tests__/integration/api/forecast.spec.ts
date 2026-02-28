import { InvalidCoordinatesError } from "@/src/features/forecast/forecast.model";
import { getForecast } from "@/src/features/forecast/forecast.service";
import { SPAIN_CENTER_COORDINATES } from "@/src/features/locations/location.constants";
import { describe, expect, it } from "vitest";

describe("Forecast API", () => {
  it("Should return exception if coordinates are outside of Spain", async () => {
    const invalidCoordinates = { lat: 0, lon: 0 };
    await expect(getForecast(invalidCoordinates, 1)).rejects.toThrow(
      InvalidCoordinatesError,
    );
  });

  it("Should return forecast if coordinates are valid", async () => {
    const forecastDays = 2;
    const forecastHours = forecastDays * 24;

    const forecast = await getForecast(SPAIN_CENTER_COORDINATES, forecastDays);

    expect(forecast.days).toBe(forecastDays);
    expect(forecast.hourlyData.apparentTemperature.length).toBe(forecastHours);
    expect(Object.keys(forecast.hourlyUnits).length).toBeGreaterThan(0);
  });
});
