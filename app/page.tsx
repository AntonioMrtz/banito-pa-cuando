"use client";
import Image from "next/image";
import heroImage from "./assets/images/hero-los-alcazares.jpg";
import { useState, useEffect } from "react";
import { LocationModel } from "./types/locations";
import { getLocations } from "./services/locationService";

export default function Home({}) {
  const [locations, setLocations] = useState<LocationModel[] | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const locations = await getLocations("alcáz");
        setLocations(locations);
      } catch (error) {
        console.error("failed to fetch locations", error);
      }
    }

    fetchLocations();
  }, []);

  return (
    <main className="relative flex bg-secondary-blue-100 min-h-screen w-full items-center justify-center">
      <Image
        src={heroImage}
        alt="Hero of Los Alcazares"
        fill
        sizes="100vw"
        priority
        loading="eager"
        className="object-cover object-center opacity-90 blur-[2px]"
      />

      <div className="relative z-10 m-auto min-w-[60svw] min-h-[60svh] max-h-[60svh] flex flex-col items-center justify-center bg-(--neutral-gray-50)/85 rounded-lg overflow-scroll">
        {locations &&
          locations.map((v) => <span key={v.id}>{v.tags.name}</span>)}
      </div>
    </main>
  );
}
