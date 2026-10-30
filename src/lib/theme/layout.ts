import { base, spacing } from "./spacing";

export const containerWidth = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1440px",
} as const;

export const contentWidth = {
  narrow: "640px",
  default: "768px",
  wide: "960px",
} as const;

/**
 * Vertical section spacing, mobile-first. Mirrored as Tailwind
 * `--padding-section-*-{mobile,tablet,desktop}` theme entries in
 * src/app/globals.css — keep both in sync when changing a value here.
 */
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
    // 56px / 72px fall between named spacing steps — derived from the same
    // 8px base rather than hardcoded.
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

/**
 * Responsive horizontal container gutters. Mirrored as Tailwind `--padding-*`
 * theme entries in src/app/globals.css — keep both in sync when changing a
 * value here.
 */
export const gutter = {
  mobile: spacing[4],
  tablet: spacing[5],
  desktop: spacing[6],
} as const;

export type ContainerWidth = typeof containerWidth;
export type ContentWidth = typeof contentWidth;
export type SectionSpacing = typeof sectionSpacing;
export type Gutter = typeof gutter;
