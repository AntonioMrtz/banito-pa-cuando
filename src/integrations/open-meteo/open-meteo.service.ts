import "server-only";
import { Forecast } from "@/src/features/forecast/forecast.model";
import { Coordinates } from "@/src/features/locations/locations.model";
import {
  DEFAULT_HOURLY_PARAMS,
  DEFAULT_TIMEZONE,
  OPEN_METEO_API_URL,
  OPEN_METEO_FORECAST_DAYS,
} from "./open-meteo.constants";
import { OpenMeteoForecastSchema } from "./open-meteo.model";
import { mapForecast } from "./open-meteo.mapper";

export { getForecast, buildGetForecastQuery };

const getForecast = async (
  coordinates: Coordinates,
  days: number = OPEN_METEO_FORECAST_DAYS,
): Promise<Forecast> => {
  const query = buildGetForecastQuery(coordinates, days);
  const response = await fetch(query);
  const json: unknown = await response.json();
  const dto = OpenMeteoForecastSchema.parse(json);

  const forecast = mapForecast(dto, days);
  return forecast;
};

const buildGetForecastQuery = (
  coordinates: Coordinates,
  days: number,
): string => {
  const { lat, lon } = coordinates;
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: DEFAULT_HOURLY_PARAMS.join(","),
    timezone: DEFAULT_TIMEZONE,
    forecast_days: String(days),
  });
  return `${OPEN_METEO_API_URL}?${params.toString()}`;
};
