import React from "react";
import LocationInput from "./LocationInput";
import { LocationModel } from "@/src/features/locations/locations.model";
import LocationSuggestions from "../atoms/LocationSuggestions";

interface Props {
  locations: LocationModel[];
  onLocationChange: (location: string) => void;
}

export default function LocationSelector({
  locations,
  onLocationChange,
}: Props) {
  return (
    // TODO handle arrows and tab navigation between input and suggestions
    <div className="flex flex-col gap-6">
      <LocationInput onLocationChange={onLocationChange} />
      <LocationSuggestions locations={locations} />
    </div>
  );
}
