import { memo } from "react";

export interface LocationNameProps {
  name: string;
  city: string;
  state: string;
}

export function formatLocationName(
  name: string,
  city: string,
  state: string,
): string {
  return [name, city, state]
    .filter((part) => part && part.trim() !== "")
    .join(", ");
}

function LocationNameComponent({ name, city, state }: LocationNameProps) {
  return <span>{formatLocationName(name, city, state)}</span>;
}

export const LocationName = memo(LocationNameComponent);

export default LocationName;
