import React from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  onClick?: () => void;
  width?: number;
  height?: number;
  type: "primary" | "secondary";
  disabled?: boolean;
}

export default function RoundedButton({
  src,
  alt,
  onClick,
  width,
  height,
  type,
  disabled,
}: Props) {
  const bgColorClass =
    type === "primary"
      ? "bg-(--primary-orange-500)"
      : "bg-(--secondary-blue-600)";
  return (
    <button
      className={`rounded-full ${bgColorClass} hover:opacity-80 p-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50 transition-opacity duration-200`}
      onClick={onClick}
      disabled={disabled}
    >
      <Image
        className="filter-white"
        src={src}
        alt={alt}
        width={width || 28}
        height={height || 28}
      />
    </button>
  );
}
