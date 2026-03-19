import React from "react";
import searchIcon from "@/src/assets/icons/search.svg";
import closeIcon from "@/src/assets/icons/close.svg";
import sendIcon from "@/src/assets/icons/send.svg";
import RoundedButton from "../atoms/buttons/RoundedButton";
import IconButton from "../atoms/buttons/IconButton";
import Icon from "../atoms/Icon";
import InputTypeAnimation from "./InputTypeAnimation";

interface Props {
  onLocationChange: (location: string) => void;
}

export default function LocationInput({ onLocationChange }: Props) {
  const placeholdersMurcia = [
    "La Manga del Mar Menor",
    "Los Alcázares",
    "Mazarrón",
  ];

  const [locationInputValue, setLocationInputValue] =
    React.useState<string>("");

  const handleInputChange = (value: string) => {
    setLocationInputValue(value);
    onLocationChange(value);
  };

  return (
    <div className="flex flex-row gap-4 w-full p-4 bg-(--neutral-white-200) rounded-xl items-center">
      <Icon
        filterColor="filter-neutral-gray-300"
        src={searchIcon}
        alt="Search"
        width={24}
        height={24}
      />

      <InputTypeAnimation
        placeholders={placeholdersMurcia}
        onChange={handleInputChange}
        value={locationInputValue}
      />

      <IconButton
        src={closeIcon}
        filterColor="filter-neutral-gray-300"
        alt="Close"
        width={18}
        height={18}
        onClick={() => handleInputChange("")}
      />

      {/* TODO disable if no location is selected, does this button have sense? we can't really search by free text */}
      <RoundedButton src={sendIcon} alt="Send" type="primary" />
    </div>
  );
}
