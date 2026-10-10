import clsx, { type ClassValue } from "clsx";

/**
 * Combines conditional class names cleanly with low dependencies using clsx.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
