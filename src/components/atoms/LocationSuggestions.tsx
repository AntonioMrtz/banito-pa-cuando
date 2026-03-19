import { LocationModel } from "@/src/features/locations/locations.model";
import React from "react";
import LocationCard from "./LocationCard";

interface Props {
  locations: LocationModel[];
}

export default function LocationSuggestions({ locations }: Props) {
  return (
    <div className="flex flex-col gap-2 bg-(--neutral-white-200) rounded-xl">
      {/* TODO display suggestions */}
      {!locations.length && <div>No se han encontrado resultados</div>}
      {locations &&
        locations.map((v) => (
          <LocationCard
            name={v.name}
            city={v.city}
            state={v.state}
            coordinates={v.coordinates}
            key={v.id}
          />
        ))}
    </div>
  );
}
