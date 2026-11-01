export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.4)",
  default: "0 4px 12px -2px rgba(0, 0, 0, 0.5)",
  md: "0 8px 24px -4px rgba(0, 0, 0, 0.55)",
  lg: "0 16px 40px -8px rgba(0, 0, 0, 0.6)",
  xl: "0 24px 64px -12px rgba(0, 0, 0, 0.65)",
  glow: "0 0 24px 0 rgba(24, 160, 111, 0.22)",
} as const;

export type Shadows = typeof shadows;
