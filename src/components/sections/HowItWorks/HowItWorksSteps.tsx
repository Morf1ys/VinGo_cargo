"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easing } from "@/lib/theme/motion";
import { STEPS } from "./HowItWorks.constants";
import { StepCard } from "./StepCard";

// Vertical timeline at every size: icon markers joined by a thin emerald
// line, each step reading left-to-right. Pairs with the order form beside it.
export function HowItWorksSteps() {
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
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="mx-auto mt-10 flex max-w-xl flex-col md:mt-12 lg:mx-0 short:mt-7 tight:mt-5"
    >
      {STEPS.map((step, index) => (
        <motion.li key={step.id} variants={itemVariants}>
          <StepCard step={step} isLast={index === STEPS.length - 1} />
        </motion.li>
      ))}
    </motion.ol>
  );
}
