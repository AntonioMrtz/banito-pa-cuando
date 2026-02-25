import { SUPPORTED_COUNTRIES } from "@/src/features/locations/location.constants";
import {
  DEFAULT_BIAS,
  DEFAULT_LAYERS,
  MAINLAND_SPAIN_BBOX,
  QUERY_MINIMUM,
} from "@/src/integrations/photon/photon.constants";
import {
  buildFindLocationsQuery,
  findLocations,
} from "@/src/integrations/photon/photon.service";
import { describe, it, expect } from "vitest";

describe("Photon service", () => {
  describe("findLocations", () => {
    it("Should return an empty array if no search text is provided", async () => {
      const result = await findLocations("", 5, SUPPORTED_COUNTRIES);
      expect(result.length).toEqual(0);
    });

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

  describe("buildFindLocationsQuery", () => {
    it("Should trim the search text", () => {
      const query = buildFindLocationsQuery("  test  ");
      expect(query).toContain("q=test");
    });

    it("Should remove single whitespaces and replace it with a dash", () => {
      const query = buildFindLocationsQuery("test test");
      expect(query).toContain("q=test-test");
    });

    it("Should remove every multiple whitespaces in a row and replace it with a dash", () => {
      const query = buildFindLocationsQuery("  test   test  ");
      expect(query).toContain("q=test-test");
    });

    it("The query should have all the default layers", () => {
      const query = buildFindLocationsQuery("test");
      DEFAULT_LAYERS.forEach((l) => {
        expect(query).toContain(`layer=${l}`);
      });
    });

    it("Should include lang default parameter", () => {
      const query = buildFindLocationsQuery("test");
      expect(query).toContain("lang=default");
    });

    it("Should include exact bbox default", () => {
      const query = buildFindLocationsQuery("test");
      expect(decodeURIComponent(query)).toContain(
        `bbox=${MAINLAND_SPAIN_BBOX}`,
      );
    });

    it("Should include osm_tag default parameter", () => {
      const query = buildFindLocationsQuery("test");
      expect(query).toContain("osm_tag=place");
    });

    it("Should include exact limit default", () => {
      const query = buildFindLocationsQuery("test");
      expect(query).toContain(`limit=${QUERY_MINIMUM}`);
    });

    it("Should include exact lat default", () => {
      const query = buildFindLocationsQuery("test");
      expect(query).toContain(`lat=${DEFAULT_BIAS.lat}`);
    });

    it("Should include exact lon default", () => {
      const query = buildFindLocationsQuery("test");
      expect(query).toContain(`lon=${DEFAULT_BIAS.lon}`);
    });

    it("Should include exact zoom default", () => {
      const query = buildFindLocationsQuery("test");
      expect(query).toContain(`zoom=${DEFAULT_BIAS.zoom}`);
    });

    it("Should include exact location_bias_scale default", () => {
      const query = buildFindLocationsQuery("test");
      expect(query).toContain(
        `location_bias_scale=${DEFAULT_BIAS.location_bias_scale}`,
      );
    });
  });
});
