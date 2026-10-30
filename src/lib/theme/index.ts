export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./radius";
export * from "./motion";
export * from "./shadows";
export * from "./layout";

import { colors } from "./colors";
import { spacing } from "./spacing";
import {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  typeScale,
} from "./typography";
import { radius } from "./radius";
import { duration, easing, spring, reducedMotion } from "./motion";
import { shadows } from "./shadows";
import { containerWidth, contentWidth, sectionSpacing } from "./layout";

export const theme = {
  colors,
  spacing,
  typography: {
    fontFamily,
    fontWeight,
    fontSize,
    lineHeight,
    letterSpacing,
    typeScale,
  },
  radius,
  motion: { duration, easing, spring, reducedMotion },
  shadows,
  layout: { containerWidth, contentWidth, sectionSpacing },
} as const;

export type Theme = typeof theme;
