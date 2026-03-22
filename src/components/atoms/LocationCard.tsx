import Link from "next/link";
import React from "react";
import LocationName from "./LocationDisplayName";
import LocationIcon from "@/src/assets/icons/location.svg";
import Icon from "./Icon";
import { Coordinates } from "@/src/features/locations/locations.model";

interface Props {
  name: string;
  city?: string;
  state?: string;
  coordinates: Coordinates;
}

export default function LocationCard({
  name,
  city,
  state,
  coordinates,
}: Props) {
  const encodedName = encodeURIComponent(name);
  return (
    <Link
      href={`/locations/${encodedName}/${coordinates.lat}/${coordinates.lon}`}
      className="flex flex-row gap-4 items-center p-4"
    >
      <Icon
        src={LocationIcon}
        filterColor="filter-neutral-gray-300"
        alt={`Location ${name}`}
        width={32}
        height={32}
      />
      <div className="flex flex-col gap-1">
        <span>{name}</span>
        <LocationName
          textSize="sm"
          textColor="text-[var(--neutral-gray-300)]"
          city={city}
          state={state}
        />
      </div>
    </Link>
  );
}
