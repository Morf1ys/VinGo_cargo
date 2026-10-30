"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easing } from "@/lib/theme/motion";
import { BenefitCard } from "./BenefitCard";
import { FEATURED_BENEFIT } from "./Benefits.constants";

// Centered, capped width (not full-width) — its job is emphasis through
// isolation, not through filling the row. Animated on its own so it reads
// as the section's single visual stop before the supporting grid stagger.
export function BenefitsFeatured() {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : duration.default, ease: easing.standard },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={variants}
      className="mx-auto mt-10 max-w-[560px] md:mt-8"
    >
      <BenefitCard benefit={FEATURED_BENEFIT} />
    </motion.div>
  );
}
