import {
  InvalidCoordinatesError,
  InvalidSearchTextError,
} from "../forecast/forecast.model";
import { MAINLAND_SPAIN_BBOX, SUPPORTED_COUNTRIES } from "./location.constants";
import { Coordinates, LocationModel } from "./locations.model";
import * as PhotonService from "@/src/integrations/photon/photon.service";

export { findLocations, validateCoordinates, validateTextInput };

const findLocations = async (
  placeName: string,
  limit: number,
): Promise<LocationModel[]> => {
  placeName = placeName.trim();
  if (!placeName) {
    return [];
  }
  validateTextInput(placeName);
  return PhotonService.findLocations(placeName, limit, SUPPORTED_COUNTRIES);
};

const validateTextInput = (input: string): string => {
  if (input.length < 3 || input.length > 30) {
    throw new InvalidSearchTextError("Invalid input length");
  }
  return input;
};

const validateCoordinates = (coordinates: Coordinates) => {
  const { lat, lon } = coordinates;
  const areCoordinatesValid =
    lat >= MAINLAND_SPAIN_BBOX.minLat &&
    lat <= MAINLAND_SPAIN_BBOX.maxLat &&
    lon >= MAINLAND_SPAIN_BBOX.minLon &&
    lon <= MAINLAND_SPAIN_BBOX.maxLon;

  if (!areCoordinatesValid) {
    throw new InvalidCoordinatesError(
      `Coordinates (${lat}, ${lon}) are outside of the mainland Spain bounding box.`,
    );
  }
};
