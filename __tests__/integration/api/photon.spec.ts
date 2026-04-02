import { SUPPORTED_COUNTRIES } from "@/src/features/locations/location.constants";
import { findLocations } from "@/src/integrations/photon/photon.service";
import { ZodError } from "zod";
import { afterEach, describe, it, expect, vi } from "vitest";

describe("Photon API", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

    it("Should throw a ZodError when API payload has invalid shape", async () => {
      const invalidPayload = {
        features: [
          {
            type: "Feature",
            properties: {
              osm_type: "N",
              osm_id: 1,
              osm_key: "place",
              osm_value: "city",
              type: "city",
              postcode: "28001",
              countrycode: "ES",
              name: "Madrid",
              district: "Center",
              city: "Madrid",
              county: "Madrid",
              state: "Community of Madrid",
              country: "Spain",
            },
            geometry: {
              type: "Point",
              coordinates: "-3.7038,40.4168",
            },
          },
        ],
      };

      vi.spyOn(global, "fetch").mockResolvedValue({
        json: async () => invalidPayload,
      } as Response);

      await expect(
        findLocations("Madrid", 5, SUPPORTED_COUNTRIES),
      ).rejects.toBeInstanceOf(ZodError);
    });
  });
});
