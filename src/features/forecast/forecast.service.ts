import { validateCoordinates } from "../locations/location.service";
import { Coordinates } from "../locations/locations.model";
import { Forecast } from "./forecast.model";
import * as OpenMeteoService from "@/src/integrations/open-meteo/open-meteo.service";

export { getForecast };

const getForecast = async (
  coordinates: Coordinates,
  days: number,
): Promise<Forecast> => {
  validateCoordinates(coordinates);

  const forecast = await OpenMeteoService.getForecast(coordinates, days);
  return forecast;
};
