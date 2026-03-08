/**
 * Example API call:
 * https://api.open-meteo.com/v1/forecast?latitude=37.9922&longitude=-1.1307&hourly=apparent_temperature,precipitation,windspeed_10m&timezone=auto&forecast_days=16
 */

import { BoundingBox } from "./locations.model";

export {
  SUPPORTED_COUNTRIES,
  type SupportedCountry,
  SPAIN_CENTER_COORDINATES,
  MAINLAND_SPAIN_BBOX,
};

// Supported countries
const SUPPORTED_COUNTRIES = ["ES"] as const;
type SupportedCountry = (typeof SUPPORTED_COUNTRIES)[number];

// Spain data for location biasing and bounding box filtering
const SPAIN_CENTER_COORDINATES = { lat: 40.463667, lon: -3.74922 };
const MAINLAND_SPAIN_BBOX: BoundingBox = {
  minLat: 35.95,
  minLon: -9.37,
  maxLat: 43.82,
  maxLon: 3.39,
};
