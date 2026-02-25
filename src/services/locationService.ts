import { LIMIT_LOCATIONS } from "../constants/location";
import { LocationModel, GetLocationRequest } from "../types/locations";

export { findMunicipalities, findPlaces, type LocationFeature };

const LOCATIONS_API_BASE_URL = "/api/locations/";

const findMunicipalities = async ({
  text,
}: GetLocationRequest): Promise<LocationModel[]> => {
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  const response = await fetch(LOCATIONS_API_BASE_URL + query);
  const json = await response.json();
  return json;
};

// https://photon.komoot.io/api/?q=los-urru&limit=5&bbox=-9.5,35.9,3.3,43.8&osm_tag=place
const findPlaces = async (
  { text }: GetLocationRequest,
  limit: number = LIMIT_LOCATIONS,
): Promise<LocationFeature[]> => {
  if (!text) {
    return [];
  }
  const queryText = _parsePlaceNameForQuery(text);
  const query = _buildFindPlacesQuery(queryText);

  const response = await fetch(query);
  const json = (await response.json()) as LocationFeatureResponse;
  const elements = json.features as LocationFeature[];

  const spainMainlandFiltered = elements.filter(
    (v) => v.properties.countrycode === "ES",
  );

  const slicedResult = spainMainlandFiltered.slice(0, limit);

  return slicedResult;
};

const _buildFindPlacesQuery = (place: string): string => {
  const baseUrl = "https://photon.komoot.io/api/";
  // Spain center coordinates
  const spainCenter = { lat: 40.463667, lon: -3.74922 };
  // TODO add Canarias and Baleares
  const filterMainlandSpain = "&bbox=-9.37,35.95,3.39,43.82";
  const filterOnlyPlaces = "&osm_tag=place";
  const filterLayer = "&layer=locality&layer=district&layer=city";
  const filterLimit = `&limit=20`; // Get more places than displayed because we can obtain places from other countries.
  const filterPlaceName = `?q=${place}`;
  const filterBias = `&lat=${spainCenter.lat}&lon=${spainCenter.lon}&zoom=5&location_bias_scale=0.1`; // Strong Spain bias.
  const selectLanguage = "&lang=default";

  return `${baseUrl}${filterPlaceName}${filterBias}${filterMainlandSpain}${filterOnlyPlaces}${filterLayer}${filterLimit}${selectLanguage}`;
};

const _parsePlaceNameForQuery = (place: string): string => {
  const parsedPlace = place.trim().replaceAll(" ", "-");
  return parsedPlace;
};

type LocationFeature = {
  type: "Feature";
  properties: {
    osm_type: string;
    osm_id: number;
    osm_key: string;
    osm_value: string;
    type: string;
    postcode: string;
    countrycode: string;
    name: string;
    district: string;
    city: string;
    county: string;
    state: string;
    country: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

type LocationFeatureResponse = {
  features: LocationFeature[];
};
