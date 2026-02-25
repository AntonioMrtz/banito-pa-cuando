export { type PhotonFeatureDTO, type PhotonFeaturePropertiesDTO };

interface PhotonFeatureDTO {
  features: PhotonFeaturePropertiesDTO[];
}

interface PhotonFeaturePropertiesDTO {
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
}
