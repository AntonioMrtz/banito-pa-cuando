import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LocationModel } from "@/src/features/locations/locations.model";
import LocationAutocomplete from "./LocationAutocomplete";
import LocationInput from "./LocationInput";
import AnimatedVisibility from "../atoms/AnimatedVisibility";
import { getLocationNavigationUrl } from "@/src/features/locations/location.service";

interface Props {
  locations: LocationModel[];
  placeholders: string[];
  onLocationChange: (location: string) => void;
}

export default function LocationInputAutocomplete({
  locations,
  placeholders,
  onLocationChange,
}: Props) {
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  const router = useRouter();

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onLocationChange(value);
    setActiveIndex(null);
    setShowAutocomplete(true);
  };

  const selectLocation = (location: LocationModel) => {
    setInputValue(location.name);
    onLocationChange(location.name);
    setShowAutocomplete(false);
    setActiveIndex(null);

    const encodedName = encodeURIComponent(location.name);
    const url = getLocationNavigationUrl(encodedName, location.coordinates);

    router.push(url);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!locations || locations.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setShowAutocomplete(true);
      setActiveIndex((prev) => {
        if (prev === null) return 0;
        if (prev >= locations.length - 1) return 0;
        return Math.min(prev + 1, locations.length - 1);
      });
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => {
        if (prev === null) return locations.length - 1;
        if (prev === 0) return locations.length - 1;
        if (prev <= 0) return null;
        return prev - 1;
      });
    }

    if (event.key === "Enter") {
      if (activeIndex != null && locations[activeIndex]) {
        event.preventDefault();
        selectLocation(locations[activeIndex]);
      }
    }

    if (event.key === "Escape") {
      setShowAutocomplete(false);
      setActiveIndex(null);
    }
  };

  const handleFocusInput = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setShowAutocomplete(true);
  };

  const handleBlurInput = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    blurTimeoutRef.current = setTimeout(() => {
      setShowAutocomplete(true);
      blurTimeoutRef.current = null;
    }, 120);
  };

  const autoCompleteStyles: React.CSSProperties = {
    width: "100%",
    display: "flex",
    position: "absolute",
    top: "120%",
    left: 0,
    zIndex: 10,
    backgroundColor: "var(--neutral-white-200)",
    borderRadius: "1rem",
  };

  return (
    <div className="flex flex-col w-full bg-(--neutral-white-200) rounded-xl items-center">
      <div className="flex w-full relative">
        <LocationInput
          value={inputValue}
          placeholders={placeholders}
          handleBlurInput={handleBlurInput}
          handleFocusInput={handleFocusInput}
          handleInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <AnimatedVisibility
          show={showAutocomplete && locations.length > 0}
          sx={autoCompleteStyles}
        >
          <LocationAutocomplete
            locations={locations}
            activeIndex={activeIndex}
            onItemHover={setActiveIndex}
            onItemSelect={selectLocation}
          />
        </AnimatedVisibility>
      </div>
    </div>
  );
}
