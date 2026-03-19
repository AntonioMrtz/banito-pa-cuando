"use client";
import { LocationModel } from "@/src/features/locations/locations.model";
import { findLocations } from "@/src/features/locations/location.service";
import debounce from "lodash.debounce";
import React from "react";
import LocationSelector from "../molecules/LocationSelector";

const MAX_ITEMS = 5;

export default function LocationSearch() {
  const [locations, setLocations] = React.useState<LocationModel[]>([]);

  // Client side request as rate limit is strict on this API.
  const debouncedSearch = React.useRef(
    debounce(
      async (value: string) => {
        try {
          const locations = await findLocations(value, MAX_ITEMS);
          setLocations(locations);
        } catch (error) {
          console.error("failed to fetch locations", error);
          setLocations([]);
        }
      },
      350,
      { leading: true, trailing: true },
    ),
  );

  const handleInputLocationChange = (location: string) => {
    const text = location;
    // Do not trigger search if text is too short
    if (text.length < 3) {
      return;
    }
    debouncedSearch.current(text);
  };

  React.useEffect(() => {
    const debounced = debouncedSearch.current;
    return () => {
      debounced.cancel();
    };
  }, []);

  return (
    <div className="w-[50%]">
      <LocationSelector
        onLocationChange={handleInputLocationChange}
        locations={locations}
      />
    </div>
  );
}
