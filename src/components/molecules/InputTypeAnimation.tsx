import React from "react";
import { TypeAnimation } from "react-type-animation";

interface Props {
  placeholders: string[];
  placeholderDelay?: number;
  onChange: (value: string) => void;
  value: string;
}

export default function InputTypeAnimation({
  placeholders,
  placeholderDelay,
  onChange,
  value,
}: Props) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="w-full relative">
      {!value && !isFocused && (
        <TypeAnimation
          sequence={placeholders.flatMap((p) => [p, placeholderDelay ?? 2000])}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex w-full filter-neutral-gray-300 pointer-events-none select-none z-0"
        />
      )}
      <input
        className="relative z-10 w-full bg-transparent focus:outline-none"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
