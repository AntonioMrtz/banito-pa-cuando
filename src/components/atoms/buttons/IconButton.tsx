import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  onClick: () => void;
  width: number;
  height: number;
  filterColor: string;
  disabled?: boolean;
}

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
      className="cursor-pointer group disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      <Image
        className={`${filterColor} group-hover:filter-primary-orange-500 transition-[filter] duration-200`}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </button>
  );
}
