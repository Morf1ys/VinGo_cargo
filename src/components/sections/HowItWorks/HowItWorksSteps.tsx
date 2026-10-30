"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easing } from "@/lib/theme/motion";
import { STEPS } from "./HowItWorks.constants";
import { StepCard } from "./StepCard";

// 1 col (mobile) → 2×2 (tablet, md) → single 4-across row with thin
// connectors (desktop, lg). The lg grid has 7 tracks (card, connector,
// card, connector, card, connector, card); connectors are `hidden` below
// lg, so at md/mobile they're removed from grid flow entirely and only the
// 4 real cards participate, naturally reflowing into 2×2 / 1-col while
// keeping DOM order (and therefore reading order) intact.
export function HowItWorksSteps() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : duration.default, ease: easing.standard },
    },
  };

  const connectorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : duration.default, ease: easing.standard },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-0"
    >
      {STEPS.flatMap((step, index) => {
        const card = (
          <motion.div key={step.id} variants={cardVariants} className="min-w-0">
            <StepCard step={step} />
          </motion.div>
        );

        if (index === STEPS.length - 1) return [card];

        // Subtle connecting segment only — not an arrow, progress bar, or
        // timeline. Almost disappears into the background.
        const connector = (
          <motion.div
            key={`${step.id}-connector`}
            variants={connectorVariants}
            aria-hidden="true"
            className="hidden lg:block lg:h-px lg:w-10 lg:self-center lg:bg-linear-to-r lg:from-transparent lg:via-primary/40 lg:to-transparent"
          />
        );

        return [card, connector];
      })}
    </motion.div>
  );
}
