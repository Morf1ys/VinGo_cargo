// Isometric wireframe geometry for the Hero van, in abstract "van units".
// x = length (0 = front bumper → 100 = rear), y = width (0 = near side →
// W = far side), z = height (0 = ground). The camera looks from the
// front-left, so the van faces lower-left and its near side faces the viewer.

type Vec3 = readonly [number, number, number];

const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);
const SCALE = 3;

export const W = 42;

export function project([x, y, z]: Vec3): [number, number] {
  return [COS * (x - y) * SCALE, (-SIN * (x + y) - z) * SCALE];
}

function fmt(n: number): string {
  return (Math.round(n * 10) / 10).toString();
}

/** Open (or closed) polyline through 3D points → SVG path data. */
export function line(points: readonly Vec3[], close = false): string {
  const d = points
    .map((p, i) => {
      const [sx, sy] = project(p);
      return `${i === 0 ? "M" : "L"}${fmt(sx)} ${fmt(sy)}`;
    })
    .join(" ");
  return close ? `${d} Z` : d;
}

/** Points along a circle lying in the side (x–z) plane at a given y. */
function sideArc(cx: number, cz: number, r: number, y: number, from: number, to: number, steps = 24): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = from + ((to - from) * i) / steps;
    pts.push([cx + r * Math.cos(t), y, cz + r * Math.sin(t)]);
  }
  return pts;
}

const WHEELS = [18, 80] as const;
const WHEEL_Z = 8.5;
const ARCH_R = 10.5;

/** Side silhouette (x, z) of the van, front → over the roof → rear → underside with wheel arches. */
function profile(y: number): Vec3[] {
  const p = (x: number, z: number): Vec3 => [x, y, z];
  return [
    p(0, 9),
    p(0, 21),
    p(2, 23.5),
    p(13, 26.5),
    p(28.5, 46.5),
    p(31, 48),
    p(97.5, 48),
    p(100, 45.5),
    p(100, 9),
    p(WHEELS[1] + ARCH_R, 9),
    ...sideArc(WHEELS[1], 9, ARCH_R, y, 0, Math.PI),
    p(WHEELS[0] + ARCH_R, 9),
    ...sideArc(WHEELS[0], 9, ARCH_R, y, 0, Math.PI),
    p(0, 9),
  ];
}

const near = profile(0);
const far = profile(W);

const across = (x: number, z: number): Vec3[] => [
  [x, 0, z],
  [x, W, z],
];

// ─── Body: drawn in the intro sequence, brightest strokes ─────────────────
export const bodyPaths: string[] = [
  line(near),
  // Far-side edges that are actually visible: front, hood, windshield, roof.
  line(far.slice(0, 7)),
  // Width-wise edges at the profile's visible corners.
  line(across(0, 9)),
  line(across(0, 21)),
  line(across(13, 26.5)),
  line(across(31, 48)),
  line(across(97.5, 48)),
  line(across(100, 45.5)),
];

// ─── Hidden edges: very faint dashed "blueprint" lines ────────────────────
export const hiddenPaths: string[] = [
  line(far.slice(6, 10)),
  line([[100, 0, 9], [100, W, 9]]),
  line([[WHEELS[0] - ARCH_R, W, 9], [0, W, 9]]),
];

// ─── Details: windows, seams, wheels, front fascia ─────────────────────────
const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const wsBottom = (y: number): Vec3 => [13, y, 26.5];
const wsTop = (y: number): Vec3 => [28.5, y, 46.5];

export const detailPaths: string[] = [
  // Cab side window + door seam (B-pillar).
  line([[17, 0, 29.5], [28, 0, 44], [40, 0, 44], [40, 0, 29.5]], true),
  line([[43, 0, 10], [43, 0, 46]]),
  // Sliding door seam + rail + belt line.
  line([[68, 0, 10], [68, 0, 46]]),
  line([[45, 0, 37], [96, 0, 37]]),
  line([[40, 0, 27.5], [98, 0, 27.5]]),
  // Door handles.
  line([[37, 0, 25.5], [40, 0, 25.5]]),
  line([[63, 0, 25.5], [66, 0, 25.5]]),
  // Rear light on the near side.
  line([[99.5, 0, 30], [99.5, 0, 40]]),
  // Windshield inset.
  line(
    [
      lerp3(wsBottom(2.5), wsTop(2.5), 0.08),
      lerp3(wsBottom(2.5), wsTop(2.5), 0.92),
      lerp3(wsBottom(W - 2.5), wsTop(W - 2.5), 0.92),
      lerp3(wsBottom(W - 2.5), wsTop(W - 2.5), 0.08),
    ],
    true,
  ),
  // Side mirror.
  line([[15, 0, 31], [15, -4.5, 31], [15, -4.5, 37], [15, 0, 37]]),
  // Front bumper line + grille.
  line(across(0, 13)),
  line([[0, 14, 15], [0, 28, 15], [0, 28, 19], [0, 14, 19]], true),
  line([[0, 14, 17], [0, 28, 17]]),
];

/** Wheels: tyre (filled dark) + hub, slightly proud of the body side. */
export const wheelPaths = WHEELS.map((cx) => ({
  tyre: line(sideArc(cx, WHEEL_Z, 8.5, -0.8, 0, Math.PI * 2, 40), true),
  hub: line(sideArc(cx, WHEEL_Z, 3.6, -0.8, 0, Math.PI * 2, 28), true),
}));

// ─── Headlights (front face, x = 0) ───────────────────────────────────────
const headlight = (y0: number, y1: number): string =>
  line([[0, y0, 15], [0, y1, 15], [0, y1, 19.5], [0, y0, 19.5]], true);

export const headlightPaths = [headlight(3, 11), headlight(31, 39)];
export const headlightCenters = [project([0, 7, 17.25]), project([0, 35, 17.25])];

/** One soft light pool on the road ahead of both headlights. */
export const beamPath = line(
  [
    [0, 3, 0],
    [-75, -18, 0],
    [-75, W + 18, 0],
    [0, W - 3, 0],
  ],
  true,
);
export const beamGradient = { from: project([0, W / 2, 0]), to: project([-75, W / 2, 0]) };

// ─── Faces: opaque dark fills so the road/grid don't show through ─────────
// Bands between consecutive near/far profile points cover the front,
// hood, windshield and roof; tone picks a fill per band.
const BAND_TONES = ["front", "front", "hood", "glass", "roof", "roof", "roof", "roof"] as const;
export type FaceTone = "side" | (typeof BAND_TONES)[number];

export const facePaths: { d: string; tone: FaceTone }[] = [
  { d: line(near, true), tone: "side" },
  ...BAND_TONES.map((tone, i) => ({
    d: line([near[i], near[i + 1], far[i + 1], far[i]], true),
    tone,
  })),
];

// ─── Ground ───────────────────────────────────────────────────────────────
export const shadowPath = line(
  [
    [-2, -3, 0],
    [102, -3, 0],
    [102, W + 3, 0],
    [-2, W + 3, 0],
  ],
  true,
);

/** Lane markings running along the van, scrolled with stroke-dashoffset. */
export const lanePaths = [
  { d: line([[-140, -18, 0], [230, -18, 0]]), opacity: 0.55 },
  { d: line([[-140, W + 20, 0], [230, W + 20, 0]]), opacity: 0.25 },
];

/** Faint isometric ground grid (static). */
export const gridPaths: string[] = (() => {
  const paths: string[] = [];
  for (let y = -80; y <= 120; y += 20) paths.push(line([[-120, y, 0], [220, y, 0]]));
  for (let x = -120; x <= 220; x += 20) paths.push(line([[x, -80, 0], [x, 120, 0]]));
  return paths;
})();

export const VIEWBOX = (() => {
  const xs: number[] = [];
  const ys: number[] = [];
  for (const p of [...near, ...far, [-70, -15, 0] as Vec3, [-70, 57, 0] as Vec3]) {
    const [sx, sy] = project(p);
    xs.push(sx);
    ys.push(sy);
  }
  const pad = 24;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  return {
    minX,
    minY,
    width: Math.max(...xs) - minX + pad,
    height: Math.max(...ys) - minY + pad,
  };
})();
