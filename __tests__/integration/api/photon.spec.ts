import { SUPPORTED_COUNTRIES } from "@/src/features/locations/location.constants";
import {} from "@/src/integrations/photon/photon.constants";
import { findLocations } from "@/src/integrations/photon/photon.service";
import { describe, it, expect } from "vitest";

describe("Photon API", () => {
  describe("findLocations", () => {
    it("Should return location when searching for it", async () => {
      const result = await findLocations("Murcia", 5, SUPPORTED_COUNTRIES);
      expect(result.length).toBeGreaterThan(0);
      const murcia = result[0];
      expect(murcia.name).toEqual("Murcia");
      expect(murcia.state).toEqual("Región de Murcia");
    });

    it("Should return an array with a length equal to the limit", async () => {
      const result = await findLocations("Murcia", 3, SUPPORTED_COUNTRIES);
      expect(result.length).toEqual(3);
    });

    it("Should return an empty array if no location is found", async () => {
      const result = await findLocations(
        "non-existing-location",
        5,
        SUPPORTED_COUNTRIES,
      );
      expect(result.length).toEqual(0);
    });

    it("Should return locations from supported countries only", async () => {
      const result = await findLocations("Madrid", 10, SUPPORTED_COUNTRIES);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((location) => {
        expect(location.countryCode).toEqual("ES");
      });
    });
  });
});
