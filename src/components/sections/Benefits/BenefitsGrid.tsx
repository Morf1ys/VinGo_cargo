"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easing } from "@/lib/theme/motion";
import { BenefitCard } from "./BenefitCard";
import { SUPPORTING_BENEFITS } from "./Benefits.constants";
import type { BenefitTier } from "./Benefits.constants";

// 6-column base grid holding only the five supporting cards (the featured
// benefit renders separately, centered, above this grid — see
// BenefitsFeatured). The two medium cards split a row evenly (3+3), the
// three compact cards split a row evenly (2+2+2) — each row's spans sum to
// exactly 6, so grid auto-flow produces the 2 → 3 rhythm without explicit
// row placement. Collapses to a single column below md.
const COLUMN_SPAN: Record<BenefitTier, string> = {
  featured: "md:col-span-6",
  medium: "md:col-span-3",
  compact: "md:col-span-2",
};

export function BenefitsGrid() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const itemVariants = {
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
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 md:mt-6 md:grid-cols-6 md:gap-x-7 md:gap-y-5 lg:gap-x-8"
    >
      {SUPPORTING_BENEFITS.map((benefit) => (
        <motion.div key={benefit.id} variants={itemVariants} className={COLUMN_SPAN[benefit.tier]}>
          <BenefitCard benefit={benefit} />
        </motion.div>
      ))}
    </motion.div>
  );
}
