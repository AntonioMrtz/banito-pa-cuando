import { PhotonFeatureDTO, PhotonFeaturePropertiesDTO } from "./photon.model";
import {
  MAINLAND_SPAIN_BBOX,
  PHOTON_API_URL,
  SUPPORTED_COUNTRIES,
  SupportedCountry,
  QUERY_MINIMUM,
  DEFAULT_BIAS,
  DEFAULT_LAYERS,
} from "./photon.constants";
import { mapLocation } from "./photon.mapper";
import { LocationModel } from "@/src/features/locations/locations.model";

export { findLocations, type PhotonFeaturePropertiesDTO as LocationFeature };

const findLocations = async (
  placeName: string,
  limit: number,
): Promise<LocationModel[]> => {
  if (!placeName.trim()) {
    return [];
  }

  const query = _buildFindLocationsQuery(placeName);
  const response = await fetch(query);
  const json = (await response.json()) as PhotonFeatureDTO;
  const elements = json.features as PhotonFeaturePropertiesDTO[];

  const spainMainlandFiltered = elements.filter((v) =>
    SUPPORTED_COUNTRIES.includes(v.properties.countrycode as SupportedCountry),
  );

  const limitedResults = spainMainlandFiltered.slice(0, limit);

  const locations = limitedResults.map(mapLocation);
  return locations;
};

const _buildFindLocationsQuery = (place: string): string => {
  const sanitized = encodeURIComponent(place.trim().replaceAll(" ", "-"));
  const params = new URLSearchParams({
    q: sanitized,
    lang: "default",
    bbox: MAINLAND_SPAIN_BBOX,
    osm_tag: "place",
    limit: QUERY_MINIMUM.toString(),
    lat: String(DEFAULT_BIAS.lat),
    lon: String(DEFAULT_BIAS.lon),
    zoom: String(DEFAULT_BIAS.zoom),
    location_bias_scale: String(DEFAULT_BIAS.location_bias_scale),
  });

  DEFAULT_LAYERS.forEach((l) => params.append("layer", l));

  return `${PHOTON_API_URL}?${params.toString()}`;
};
