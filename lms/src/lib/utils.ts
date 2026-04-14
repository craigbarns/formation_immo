import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind avec clsx + tailwind-merge.
 * Permet de composer des classes sans conflit.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
