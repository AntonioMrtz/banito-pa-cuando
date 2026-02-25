import { InvalidCoordinatesError } from "../forecast/forecast.model";
import { MAINLAND_SPAIN_BBOX, SUPPORTED_COUNTRIES } from "./location.constants";
import { Coordinates, LocationModel } from "./locations.model";
import * as PhotonService from "@/src/integrations/photon/photon.service";

export { findLocations, validateCoordinates };

const findLocations = async (
  placeName: string,
  limit: number,
): Promise<LocationModel[]> => {
  placeName = placeName.trim();
  if (!placeName) {
    return [];
  }
  return PhotonService.findLocations(placeName, limit, SUPPORTED_COUNTRIES);
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
