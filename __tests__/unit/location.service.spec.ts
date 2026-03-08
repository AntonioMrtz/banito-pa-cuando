import { InvalidCoordinatesError } from "@/src/features/forecast/forecast.model";
import { SPAIN_CENTER_COORDINATES } from "@/src/features/locations/location.constants";
import { validateCoordinates } from "@/src/features/locations/location.service";
import { describe, it, expect } from "vitest";

describe("Location service", () => {
  describe(validateCoordinates.name, () => {
    it("Should not throw an error if coordinates are valid", () => {
      expect(() =>
        validateCoordinates({
          lat: SPAIN_CENTER_COORDINATES.lat,
          lon: SPAIN_CENTER_COORDINATES.lon,
        }),
      ).not.toThrow();
    });
  });

  it("Should throw an error if coordinates are outside of Spain", () => {
    expect(() =>
      validateCoordinates({
        lat: SPAIN_CENTER_COORDINATES.lat - 10,
        lon: SPAIN_CENTER_COORDINATES.lon,
      }),
    ).toThrow(InvalidCoordinatesError);
  });
});
