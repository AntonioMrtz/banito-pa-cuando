/**
 * Example API call:
 * https://photon.komoot.io/api/?q=los-urru&limit=5&bbox=-9.5,35.9,3.3,43.8&osm_tag=place
 */

export {
  PHOTON_API_URL,
  SPAIN_CENTER_COORDINATES,
  MAINLAND_SPAIN_BBOX,
  DEFAULT_LAYERS,
  DEFAULT_BIAS,
  QUERY_MINIMUM,
};

// API
const PHOTON_API_URL = "https://photon.komoot.io/api/";

// API filters and defaults
const SPAIN_CENTER_COORDINATES = { lat: 40.463667, lon: -3.74922 };
const MAINLAND_SPAIN_BBOX = "-9.37,35.95,3.39,43.82";
const DEFAULT_LAYERS = ["locality", "district", "city"];
const DEFAULT_BIAS = {
  lat: SPAIN_CENTER_COORDINATES.lat,
  lon: SPAIN_CENTER_COORDINATES.lon,
  zoom: 5,
  location_bias_scale: 0.1,
};
const QUERY_MINIMUM = 20;

console.log();
const x = { a: 1 };
const y = { a: 1 };
