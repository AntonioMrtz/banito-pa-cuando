import { LocationModel, GetLocationRequest } from "../types/locations";

export { getLocations };

const LOCATIONS_API_BASE_URL = "/api/locations/";

const getLocations = async (
  text?: GetLocationRequest["text"],
): Promise<LocationModel[]> => {
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  const response = await fetch(LOCATIONS_API_BASE_URL + query);
  const json = await response.json();
  return json;
};
