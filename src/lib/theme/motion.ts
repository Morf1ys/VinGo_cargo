// Durations in seconds (matches the `motion` and `gsap` libraries' default unit).
export const duration = {
  fast: 0.15,
  default: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

// Cubic-bezier curves, expressed as [x1, y1, x2, y2].
export const easing = {
  standard: [0.4, 0, 0.2, 1],
  decelerate: [0, 0, 0.2, 1],
  accelerate: [0.4, 0, 1, 1],
  premium: [0.16, 1, 0.3, 1],
} as const;

export const spring = {
  gentle: { type: "spring", stiffness: 120, damping: 20, mass: 1 },
  snappy: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 },
  soft: { type: "spring", stiffness: 80, damping: 18, mass: 1.2 },
} as const;

/**
 * Override to apply when the user has `prefers-reduced-motion: reduce`.
 * Consumers should swap in this preset rather than skipping motion tokens
 * entirely, keeping transitions consistent but near-instant.
 */
export const reducedMotion = {
  duration: 0,
  easing: easing.standard,
} as const;

export type Duration = typeof duration;
export type Easing = typeof easing;
export type Spring = typeof spring;
