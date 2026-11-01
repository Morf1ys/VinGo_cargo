export const base = 8;

export const spacing = {
  0: "0px",
  1: `${base * 0.5}px`,
  2: `${base}px`,
  3: `${base * 1.5}px`,
  4: `${base * 2}px`,
  5: `${base * 3}px`,
  6: `${base * 4}px`,
  7: `${base * 5}px`,
  8: `${base * 6}px`,
  9: `${base * 8}px`,
  10: `${base * 10}px`,
  11: `${base * 12}px`,
  12: `${base * 16}px`,
} as const;

export type Spacing = typeof spacing;
