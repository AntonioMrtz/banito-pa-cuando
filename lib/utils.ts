import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for combining className values and removing duplicates/styles
 * conflicts using Tailwind's merging logic. This is typically what
 * components import as `cn` from `@/lib/utils`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
