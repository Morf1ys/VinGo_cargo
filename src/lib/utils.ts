import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Our custom type-scale utilities (text-h1, text-body-small, …) look like
// colours to tailwind-merge by default, so it used to drop them whenever a
// text colour class (text-text-primary) was present — every Typography
// heading silently fell back to 16px. Registering them as font sizes fixes it.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "h4", "body", "body-small", "caption", "overline"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
