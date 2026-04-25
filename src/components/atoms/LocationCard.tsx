import Link from "next/link";
import React from "react";
import LocationName from "./LocationDisplayName";
import LocationIcon from "@/src/assets/icons/location.svg";
import Icon from "./Icon";
import { Coordinates } from "@/src/features/locations/locations.model";
import { getLocationNavigationUrl } from "@/src/features/locations/location.service";

interface Props {
  name: string;
  city?: string;
  state?: string;
  coordinates: Coordinates;
  isHovered?: boolean;
  sx?: React.CSSProperties;
}

export default function LocationCard({
  name,
  city,
  state,
  coordinates,
  isHovered,
  sx,
}: Props) {
  const encodedName = encodeURIComponent(name);
  const url = getLocationNavigationUrl(encodedName, coordinates);
  return (
    <Link
      href={url}
      className="flex flex-row gap-4 items-center p-4 bg-transparent group w-full"
      style={sx}
    >
      <Icon
        src={LocationIcon}
        filterColor={`filter-neutral-gray-300 group-hover:filter-primary-orange-500 group-active:filter-primary-orange-500 ${isHovered ? "filter-primary-orange-500" : ""}`}
        alt={`Location ${name}`}
        width={32}
        height={32}
      />
      <div className="flex flex-col gap-1">
        <span
          className={`group-hover:filter-primary-orange-500 group-active:filter-primary-orange-500 ${isHovered ? "filter-primary-orange-500" : ""}`}
        >
          {name}
        </span>
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
