import { buildGetForecastQuery } from "@/src/integrations/open-meteo/open-meteo.service";
import {
  DEFAULT_HOURLY_PARAMS,
  DEFAULT_TIMEZONE,
} from "@/src/integrations/open-meteo/open-meteo.constants";
import { describe, it, expect } from "vitest";

describe("Open Meteo service", () => {
  const coords = { lat: 40.4168, lon: -3.7038 };
  const days = 1;

  describe(buildGetForecastQuery.name, () => {
    it("Should have latitude in the query", () => {
      const query = buildGetForecastQuery(coords, days);
      expect(query).toContain(`latitude=${coords.lat}`);
    });

    it("Should have longitude in the query", () => {
      const query = buildGetForecastQuery(coords, days);
      expect(query).toContain(`longitude=${coords.lon}`);
    });

    it("Should include all default hourly params", () => {
      const query = buildGetForecastQuery(coords, days);
      expect(decodeURIComponent(query)).toContain(
        `hourly=${DEFAULT_HOURLY_PARAMS.join(`,`)}`,
      );
    });

    it("Should use the default timezone", () => {
      const query = buildGetForecastQuery(coords, days);
      expect(query).toContain(`timezone=${DEFAULT_TIMEZONE}`);
    });

    it("Should set forecast_days correctly", () => {
      const query = buildGetForecastQuery(coords, days);
      expect(query).toContain(`forecast_days=${days}`);
    });
  });
});
