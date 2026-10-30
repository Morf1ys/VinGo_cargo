"use client";

import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { easing } from "@/lib/theme/motion";
import {
  VIEWBOX,
  beamGradient,
  beamPath,
  bodyPaths,
  detailPaths,
  facePaths,
  gridPaths,
  headlightCenters,
  headlightPaths,
  hiddenPaths,
  lanePaths,
  shadowPath,
  wheelPaths,
  type FaceTone,
} from "./vanGeometry";

// Line colour = --color-primary-hover; light colour is a pale tint of it.
const LINE = "var(--color-primary-hover)";
const LIGHT = "#cdf7e4";
const LANE_DASH = [18, 22] as const;
const LANE_PERIOD = LANE_DASH[0] + LANE_DASH[1];

const FACE_FILLS: Record<Exclude<FaceTone, "side">, string> = {
  front: "#0d100f",
  hood: "#101513",
  glass: "#0b1813",
  roof: "#111614",
};

// Intro timeline (seconds): grid → body draws itself → details → panels
// solidify → headlights flash twice and stay on.
const T = {
  body: 0.2,
  details: 1.1,
  faces: 1.5,
  lights: 2.3,
} as const;

/**
 * Decorative isometric "blueprint" van for the desktop Hero. Pure SVG +
 * `motion`; no extra dependencies. Respects prefers-reduced-motion (renders
 * the finished frame, no loops) and pauses its loops when off-screen.
 */
export function HeroVan({ className }: { className?: string }) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion() ?? false;
  const loop = inView && !reduce;

  const draw = (delay: number, length = 1.4) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { delay, duration: length, ease: easing.premium },
            opacity: { delay, duration: 0.2 },
          },
        };

  const fadeIn = (delay: number, length = 0.8) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay, duration: length, ease: easing.standard },
        };

  // Headlights: off → two quick flashes → steady, then a very slow "breath".
  const lightIntro = { opacity: [0, 1, 0.15, 1, 0.15, 1] };
  const lightTransition = {
    delay: T.lights,
    duration: 1.1,
    times: [0, 0.15, 0.3, 0.45, 0.6, 1],
    ease: "easeOut" as const,
  };

  const v = VIEWBOX;

  return (
    <div ref={ref} aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      <svg
        viewBox={`${v.minX} ${v.minY} ${v.width} ${v.height}`}
        className="h-full w-full overflow-visible"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <radialGradient id={`${id}-fade`} cx="50%" cy="62%" r="55%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${id}-mask`}>
            <rect x={v.minX} y={v.minY} width={v.width} height={v.height} fill={`url(#${id}-fade)`} />
          </mask>
          <linearGradient
            id={`${id}-beam`}
            gradientUnits="userSpaceOnUse"
            x1={beamGradient.from[0]}
            y1={beamGradient.from[1]}
            x2={beamGradient.to[0]}
            y2={beamGradient.to[1]}
          >
            <stop offset="0" stopColor={LIGHT} stopOpacity="0.2" />
            <stop offset="1" stopColor={LIGHT} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#11201a" />
            <stop offset="1" stopColor="#0b0d0c" />
          </linearGradient>
          <filter id={`${id}-beamBlur`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id={`${id}-shadow`} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id={`${id}-glow`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Ground: faint grid + lane markings that slowly scroll past. */}
        <motion.g mask={`url(#${id}-mask)`} {...fadeIn(0, 1)}>
          {gridPaths.map((d) => (
            <path key={d} d={d} stroke={LINE} strokeOpacity={0.07} strokeWidth={0.8} />
          ))}
          {lanePaths.map((lane) => (
            <motion.path
              key={lane.d}
              d={lane.d}
              stroke={LINE}
              strokeOpacity={lane.opacity}
              strokeWidth={2}
              strokeDasharray={LANE_DASH.join(" ")}
              animate={loop ? { strokeDashoffset: [0, -LANE_PERIOD] } : { strokeDashoffset: 0 }}
              transition={loop ? { duration: 1.6, ease: "linear", repeat: Infinity } : { duration: 0 }}
            />
          ))}
        </motion.g>

        <motion.path d={shadowPath} fill="#000" fillOpacity={0.55} filter={`url(#${id}-shadow)`} {...fadeIn(T.faces)} />

        <motion.path
          d={beamPath}
          fill={`url(#${id}-beam)`}
          filter={`url(#${id}-beamBlur)`}
          initial={reduce ? false : { opacity: 0 }}
          animate={lightIntro}
          transition={reduce ? { duration: 0 } : lightTransition}
        />

        {/* Van — a barely-there suspension bob sells the "driving" feel. */}
        <motion.g
          animate={loop ? { y: [0, -1.2, 0] } : { y: 0 }}
          transition={loop ? { duration: 2.4, ease: "easeInOut", repeat: Infinity } : { duration: 0 }}
        >
          <motion.g {...fadeIn(T.faces, 0.9)}>
            {facePaths.map((face) => (
              <path
                key={face.d}
                d={face.d}
                fill={face.tone === "side" ? `url(#${id}-side)` : FACE_FILLS[face.tone]}
              />
            ))}
          </motion.g>

          <motion.g {...fadeIn(T.faces + 0.3)}>
            {hiddenPaths.map((d) => (
              <path key={d} d={d} stroke={LINE} strokeOpacity={0.18} strokeWidth={1} strokeDasharray="3 5" />
            ))}
          </motion.g>

          {detailPaths.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke={LINE}
              strokeOpacity={0.5}
              strokeWidth={1.1}
              {...draw(T.details + i * 0.04, 0.9)}
            />
          ))}

          {wheelPaths.map((wheel, i) => (
            <g key={wheel.tyre}>
              <motion.path d={wheel.tyre} fill="#0b0d0c" {...fadeIn(T.faces)} />
              <motion.path d={wheel.tyre} stroke={LINE} strokeOpacity={0.7} strokeWidth={1.2} {...draw(T.details + i * 0.1, 1)} />
              <motion.path d={wheel.hub} stroke={LINE} strokeOpacity={0.45} strokeWidth={1} {...draw(T.details + 0.3 + i * 0.1, 0.8)} />
            </g>
          ))}

          {bodyPaths.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke={LINE}
              strokeOpacity={0.95}
              strokeWidth={1.6}
              {...draw(T.body + i * 0.08, i === 0 ? 1.8 : 1.1)}
            />
          ))}

          {/* Headlights: lenses + soft glow. */}
          <motion.g
            initial={reduce ? false : { opacity: 0 }}
            animate={lightIntro}
            transition={reduce ? { duration: 0 } : lightTransition}
          >
            {headlightPaths.map((d) => (
              <path key={d} d={d} fill={LIGHT} fillOpacity={0.9} stroke={LIGHT} strokeWidth={1} />
            ))}
            {headlightCenters.map(([cx, cy]) => (
              <motion.circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={10}
                fill={LIGHT}
                filter={`url(#${id}-glow)`}
                initial={false}
                animate={loop ? { opacity: [0.7, 0.45, 0.7] } : { opacity: 0.7 }}
                transition={
                  loop
                    ? { delay: T.lights + 1.2, duration: 4, ease: "easeInOut", repeat: Infinity }
                    : { duration: 0 }
                }
              />
            ))}
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
