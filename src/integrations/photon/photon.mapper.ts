import { LocationModel } from "@/src/features/locations/locations.model";
import { PhotonFeaturePropertiesDTO } from "./photon.model";

export { mapLocation };

const mapLocation = (feature: PhotonFeaturePropertiesDTO): LocationModel => {
  return {
    id: feature.properties.osm_id,
    name: feature.properties.name,
    city: feature.properties.city,
    state: feature.properties.state,
    country: feature.properties.countrycode,
    coordinates: {
      lat: feature.geometry.coordinates[1],
      lon: feature.geometry.coordinates[0],
    },
  };
};
