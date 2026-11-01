"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { easing } from "@/lib/theme/motion";

const sweepVariants: Variants = {
  hidden: { x: "-120%", opacity: 0 },
  visible: {
    x: "120%",
    opacity: [0, 0.7, 0],
    transition: { duration: 0.3, ease: easing.standard },
  },
};

const wordmarkVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easing.premium, delay: 0.12 },
  },
};

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (window.location.pathname !== "/") return;
    event.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label="VinGo — на початок сторінки"
      className="inline-flex items-center rounded-sm transition-[filter] duration-150 ease-standard hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
    >
      <span className="relative inline-block overflow-hidden py-1">
        <motion.span
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          variants={wordmarkVariants}
          className="text-h4 font-semibold tracking-tight text-text-primary"
        >
          Vin<span className="text-primary">Go</span>
        </motion.span>

        {!shouldReduceMotion && (
          <motion.span
            aria-hidden="true"
            initial="hidden"
            animate="visible"
            variants={sweepVariants}
            className="pointer-events-none absolute inset-y-0 left-0 w-10 skew-x-[-20deg] bg-linear-to-r from-transparent via-primary/50 to-transparent"
          />
        )}
      </span>
    </Link>
  );
}
