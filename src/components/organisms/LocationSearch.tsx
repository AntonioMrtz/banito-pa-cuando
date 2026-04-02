"use client";
import { LocationModel } from "@/src/features/locations/locations.model";
import { findLocations } from "@/src/features/locations/location.service";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";
import LocationInputAutocomplete from "../molecules/LocationInputAutocomplete";

const MAX_ITEMS = 5;

const INPUT_PLACEHOLDERS = [
  "La Manga del Mar Menor",
  "Los Alcázares",
  "Mazarrón",
];

export default function LocationSearch() {
  const [locations, setLocations] = useState<LocationModel[]>([]);

  // Client side request as rate limit is strict on this API.
  const debouncedSearch = useRef(
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
      setLocations([]);
      return;
    }
    debouncedSearch.current(text);
  };

  useEffect(() => {
    const debounced = debouncedSearch.current;
    return () => {
      debounced.cancel();
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <LocationInputAutocomplete
        locations={locations}
        placeholders={INPUT_PLACEHOLDERS}
        onLocationChange={handleInputLocationChange}
      />
    </div>
  );
}
