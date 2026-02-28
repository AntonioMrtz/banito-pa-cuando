/**
 * Example API call:
 * https://photon.komoot.io/api/?q=los-urru&limit=5&bbox=-9.5,35.9,3.3,43.8&osm_tag=place
 */

import {
  MAINLAND_SPAIN_BBOX,
  SPAIN_CENTER_COORDINATES,
} from "@/src/features/locations/location.constants";

export {
  PHOTON_API_URL,
  DEFAULT_LAYERS,
  DEFAULT_BIAS,
  QUERY_MINIMUM,
  QUERY_MAINLAND_SPAIN_BBOX,
};

// API
const PHOTON_API_URL = "https://photon.komoot.io/api/";

// API filters and defaults
const DEFAULT_LAYERS = ["locality", "district", "city"];
const DEFAULT_BIAS = {
  lat: SPAIN_CENTER_COORDINATES.lat,
  lon: SPAIN_CENTER_COORDINATES.lon,
  zoom: 5,
  location_bias_scale: 0.1,
};
const QUERY_MINIMUM = 20;
const QUERY_MAINLAND_SPAIN_BBOX = [
  MAINLAND_SPAIN_BBOX.minLon,
  MAINLAND_SPAIN_BBOX.minLat,
  MAINLAND_SPAIN_BBOX.maxLon,
  MAINLAND_SPAIN_BBOX.maxLat,
].join(",");
