import { findLocations } from "@/src/features/locations/location.service";
import { describe, expect, it } from "vitest";

describe("Location API", () => {
  it("Should return an empty array if no search text is provided", async () => {
    const result = await findLocations("", 5);
    expect(result.length).toEqual(0);
  });

  it("Should return location when searching for it", async () => {
    const result = await findLocations("Murcia", 5);
    expect(result.length).toBeGreaterThan(0);
    const murcia = result[0];
    expect(murcia.name).toEqual("Murcia");
    expect(murcia.state).toEqual("Región de Murcia");
  });

  it("Should return an array with a length equal to the limit", async () => {
    const LIMIT = 3;
    const result = await findLocations("Murcia", LIMIT);
    expect(result.length).toEqual(LIMIT);
  });

  it("Should return an empty array if no location is found", async () => {
    const result = await findLocations("non-existing-location", 5);
    expect(result.length).toEqual(0);
  });

  it("Should return locations from supported countries only", async () => {
    const result = await findLocations("Madrid", 10);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((location) => {
      expect(location.countryCode).toEqual("ES");
    });
  });
});
