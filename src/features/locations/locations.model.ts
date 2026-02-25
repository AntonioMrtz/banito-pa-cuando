export { type LocationModel, type Coordinates, type BoundingBox };

interface LocationModel {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  coordinates: Coordinates;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface BoundingBox {
  minLat: number;
  minLon: number;
  maxLat: number;
  maxLon: number;
}
