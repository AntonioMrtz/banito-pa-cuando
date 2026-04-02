import { LocationModel } from "@/src/features/locations/locations.model";
import React from "react";
import LocationCard from "../atoms/LocationCard";

interface Props {
  locations: LocationModel[];
  activeIndex?: number | null;
  onItemHover?: (index: number) => void;
  onItemSelect?: (location: LocationModel) => void;
  sx?: React.CSSProperties;
}

export default function LocationAutocomplete({
  locations,
  activeIndex,
  onItemHover,
  onItemSelect,
  sx,
}: Props) {
  return (
    <ul
      className="flex flex-col w-full overflow-hidden rounded-xl"
      style={sx}
      role="listbox"
      aria-activedescendant={
        activeIndex != null ? `autocomplete-item-${activeIndex}` : undefined
      }
    >
      {locations.map((v, index) => (
        <li
          key={v.id}
          id={`autocomplete-item-${index}`}
          role="option"
          aria-selected={activeIndex === index}
          className={`w-full first:rounded-t-xl last:rounded-b-xl ${
            activeIndex === index
              ? "bg-(--primary-orange-100)"
              : "bg-transparent"
          }`}
          onMouseEnter={() => onItemHover?.(index)}
          onClick={() => onItemSelect?.(v)}
        >
          <LocationCard
            name={v.name}
            city={v.city}
            state={v.state}
            coordinates={v.coordinates}
            isHovered={activeIndex === index}
          />
        </li>
      ))}
    </ul>
  );
}
