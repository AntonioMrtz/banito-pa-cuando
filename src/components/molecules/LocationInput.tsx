import searchIcon from "@/src/assets/icons/search.svg";
import closeIcon from "@/src/assets/icons/close.svg";
import IconButton from "../atoms/buttons/IconButton";
import AnimatedVisibility from "../atoms/AnimatedVisibility";
import Icon from "../atoms/Icon";
import InputTypeAnimation from "./InputTypeAnimation";
import { useState, useEffect } from "react";

interface Props {
  value: string;
  placeholders: string[];
  handleFocusInput: () => void;
  handleBlurInput: () => void;
  handleInputChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function LocationInput({
  value,
  handleFocusInput,
  handleBlurInput,
  handleInputChange,
  placeholders,
  onKeyDown,
}: Props) {
  const [showCloseButton, setShowCloseButton] = useState(false);

  const handleCloseButtonClick = () => {
    handleInputChange("");
    setShowCloseButton(false);
  };

  const onValueChange = (value: string) => {
    handleInputChange(value);
    setShowCloseButton(value.length > 0);
  };

  useEffect(() => {
    setShowCloseButton(value.length > 0);
  }, [value]);

  return (
    <div className="flex flex-row gap-4 w-full p-4 rounded-xl items-center">
      <Icon
        filterColor="filter-neutral-gray-300"
        src={searchIcon}
        alt="Search"
        width={24}
        height={24}
      />

      <InputTypeAnimation
        value={value}
        placeholders={placeholders}
        onChange={onValueChange}
        onBlur={handleBlurInput}
        onFocus={handleFocusInput}
        onKeyDown={onKeyDown}
        ariaLabel="Location search input"
        ariaLabelledBy="location-search-label"
        ariaAutocomplete="list"
        role="listbox"
      />

      <AnimatedVisibility show={showCloseButton}>
        <IconButton
          src={closeIcon}
          filterColor="filter-neutral-gray-300"
          alt="Close"
          width={18}
          height={18}
          onClick={handleCloseButtonClick}
        />
      </AnimatedVisibility>
    </div>
  );
}
