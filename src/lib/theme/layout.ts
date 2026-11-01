import { base, spacing } from "./spacing";

export const containerWidth = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1440px",
} as const;

export const contentWidth = {
  narrow: "40rem",
  default: "48rem",
  wide: "82.5rem",
} as const;

export const sectionSpacing = {
  none: {
    mobile: spacing[0],
    tablet: spacing[0],
    desktop: spacing[0],
  },
  compact: {
    mobile: spacing[7],
    tablet: spacing[8],
    desktop: spacing[9],
  },
  default: {
    mobile: `${base * 7}px`,
    tablet: `${base * 9}px`,
    desktop: spacing[11],
  },
  spacious: {
    mobile: spacing[9],
    tablet: spacing[11],
    desktop: spacing[12],
  },
} as const;

export const gutter = {
  mobile: spacing[4],
  tablet: spacing[5],
  desktop: spacing[6],
} as const;

export type ContainerWidth = typeof containerWidth;
export type ContentWidth = typeof contentWidth;
export type SectionSpacing = typeof sectionSpacing;
export type Gutter = typeof gutter;
