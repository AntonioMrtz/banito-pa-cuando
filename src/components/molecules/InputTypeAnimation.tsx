import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

interface Props {
  value: string;
  placeholders: string[];
  placeholderDelay?: number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  sx?: React.CSSProperties;
}

export default function InputTypeAnimation({
  value,
  placeholders,
  placeholderDelay,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  sx,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full relative" style={sx}>
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
        onChange={(e) => {
          const value = e.target.value;
          onChange(value);
        }}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
