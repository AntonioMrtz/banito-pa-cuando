import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  onClick: () => void;
  width?: number;
  height?: number;
  filterColor: string;
  disabled?: boolean;
}

// TODO: hover effect not working
export default function IconButton({
  src,
  alt,
  onClick,
  width,
  height,
  filterColor,
  disabled,
}: Props) {
  return (
    <button
      className="cursor-pointer group"
      onClick={onClick}
      disabled={disabled}
    >
      <Image
        className={`group-hover:filter-primary-orange-900 ${filterColor}`}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </button>
  );
}
