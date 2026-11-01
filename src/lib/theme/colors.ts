export const neutral = {
  950: "#0A0A0B",
  900: "#121214",
  850: "#17171A",
  800: "#1E1E22",
  700: "#2A2A2F",
  600: "#3F3F46",
  500: "#6B6B72",
  400: "#9A9AA2",
  300: "#C4C4CB",
  200: "#E4E4E7",
  100: "#F4F4F5",
  0: "#FFFFFF",
} as const;

export const brand = {
  600: "#147D58",
  500: "#18A06F",
  400: "#39BC89",
} as const;

export const feedback = {
  success: "#3FA66E",
  warning: "#D9A441",
  danger: "#D65B5B",
} as const;

export const colors = {
  background: {
    primary: neutral[950],
    secondary: neutral[900],
  },
  surface: {
    default: neutral[850],
    elevated: neutral[800],
  },
  text: {
    primary: neutral[100],
    secondary: neutral[400],
  },
  border: {
    default: neutral[700],
  },
  primary: {
    default: brand[500],
    hover: brand[400],
    deep: brand[600],
  },
  success: feedback.success,
  warning: feedback.warning,
  danger: feedback.danger,
} as const;

export type Colors = typeof colors;
