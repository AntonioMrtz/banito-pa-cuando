import "server-only";
import { validateCoordinates } from "../locations/location.service";
import { Coordinates } from "../locations/locations.model";
import { FORECAST_EXPECTED_UNITS } from "./forecast.constants";
import {
  Forecast,
  InvalidDayNumberError,
  InvalidForecastDataError,
  InvalidUnitsForecastError,
} from "./forecast.model";
import * as OpenMeteoService from "@/src/integrations/open-meteo/open-meteo.service";

export { getForecast };

const getForecast = async (
  coordinates: Coordinates,
  days?: number,
): Promise<Forecast> => {
  validateCoordinates(coordinates);

  const forecast = await OpenMeteoService.getForecast(coordinates, days);
  validateDayNumber(forecast.days);
  validateUnits(forecast);
  validateForecastData(forecast);

  return forecast;
};

const validateDayNumber = (days: number): void => {
  if (!Number.isInteger(days) || days <= 0) {
    throw new InvalidDayNumberError(`Invalid day number: ${days}`);
  }
};

const validateUnits = (forecast: Forecast): void => {
  for (const [k, v] of Object.entries(forecast.hourlyUnits)) {
    const expectedUnit =
      FORECAST_EXPECTED_UNITS[k as keyof typeof FORECAST_EXPECTED_UNITS];

    if (!expectedUnit || v !== expectedUnit) {
      throw new InvalidUnitsForecastError(
        `Unexpected unit ${v} in forecast hourly units`,
      );
    }
  }
};

const validateForecastData = (forecast: Forecast): void => {
  const expectedDataLength = forecast.days * 24;

  for (const [k, v] of Object.entries(forecast.hourlyData)) {
    if (v.length !== expectedDataLength) {
      throw new InvalidForecastDataError(
        `Unexpected data length for ${k} in forecast hourly data, expected ${expectedDataLength} but got ${v.length}`,
      );
    }
  }
};
