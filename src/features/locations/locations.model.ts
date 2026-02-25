export { type LocationModel };

interface LocationModel {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}
