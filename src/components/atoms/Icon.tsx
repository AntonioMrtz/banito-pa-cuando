import React from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  filterColor: string;
}

export default function Icon({ src, alt, width, height, filterColor }: Props) {
  return (
    <Image
      className={`${filterColor}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
