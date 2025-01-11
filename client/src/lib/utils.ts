import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const formatslug = (slug: string): string => {
  let slugs = slug.split("-");
  slugs = slugs.map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase());
  return slugs.join(" ");
};
