import { LocationModel } from "./locations.model";
import * as PhotonService from "@/src/integrations/photon/photon.service";

export { findLocations };

const findLocations = async (
  placeName: string,
  limit: number,
): Promise<LocationModel[]> => {
  placeName = placeName.trim();
  if (!placeName) {
    return [];
  }
  return PhotonService.findLocations(placeName, limit);
};
