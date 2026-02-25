"use client";
import Image from "next/image";
import heroImage from "@/src/assets/images/hero-los-alcazares.jpg";
import { useState, ChangeEvent, useRef } from "react";
import debounce from "lodash.debounce";
import { InputGroup } from "@/src/components/atoms/InputGroup";
import LocationName from "@/src/components/atoms/LocationName";
import Link from "next/link";
import { LocationModel } from "@/src/features/locations/locations.model";
import { findLocations } from "@/src/features/locations/location.service";

const MAX_ITEMS = 5;

export default function Home({}) {
  const [locations, setLocations] = useState<LocationModel[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputGroupChange = (
    e: ChangeEvent<HTMLInputElement, Element>,
  ) => {
    const text = e.target.value;
    setSearchTerm(text);
    debouncedSearch(text);
  };

  const debouncedSearch = useRef(
    debounce(
      async (value: string) => {
        try {
          const locations = await findLocations(value, MAX_ITEMS);
          setLocations(locations);
        } catch (error) {
          console.error("failed to fetch locations", error);
        }
      },
      350,
      { leading: true, trailing: true },
    ),
  ).current;

  return (
    <main className="relative flex bg-secondary-blue-100 min-h-screen w-full items-center justify-center">
      <Image
        src={heroImage}
        alt="Hero Beach"
        fill
        sizes="100vw"
        priority
        loading="eager"
        className="object-cover object-center opacity-90 blur-[2px]"
      />

      <div className="relative z-10 m-auto min-w-[60svw] min-h-[60svh] max-h-[60svh] flex flex-col items-center justify-center bg-(--neutral-gray-50)/85 rounded-lg overflow-y-scroll">
        <InputGroup
          value={searchTerm}
          onChange={handleInputGroupChange}
          resultsText={locations ? "" : "searching..."}
        />
        {locations &&
          locations.map((v) => (
            <Link href={`/locations/${v.id}`} key={v.id}>
              <LocationName name={v.name} city={v.city} state={v.state} />
            </Link>
          ))}
      </div>
    </main>
  );
}
