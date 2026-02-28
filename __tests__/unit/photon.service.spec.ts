import {
  DEFAULT_BIAS,
  DEFAULT_LAYERS,
  QUERY_MAINLAND_SPAIN_BBOX,
  QUERY_MINIMUM,
} from "@/src/integrations/photon/photon.constants";
import { buildFindLocationsQuery } from "@/src/integrations/photon/photon.service";
import { describe, it, expect } from "vitest";

describe("Photon service", () => {
  describe(buildFindLocationsQuery.name, () => {
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

    it("Should have all the default layers in the query", () => {
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
        `bbox=${QUERY_MAINLAND_SPAIN_BBOX}`,
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
