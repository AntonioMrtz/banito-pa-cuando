import { ReactNode } from "react";

interface AnimatedVisibilityProps {
  show: boolean;
  children: ReactNode;
  className?: string;
  sx?: React.CSSProperties;
}

export default function AnimatedVisibility({
  show,
  children,
  className = "",
  sx,
}: AnimatedVisibilityProps) {
  return (
    <div
      className={`transition-all duration-200 ease-out transform ${className} ${
        show
          ? "opacity-100 scale-100"
          : "opacity-0 scale-75 pointer-events-none"
      }`}
      style={sx}
      aria-hidden={!show}
    >
      {children}
    </div>
  );
}
