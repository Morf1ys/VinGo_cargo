"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easing } from "@/lib/theme/motion";
import { BenefitCard } from "./BenefitCard";
import { BENEFITS } from "./Benefits.constants";

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
      className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 short:mt-8 short:gap-4"
    >
      {BENEFITS.map((benefit) => (
        <motion.div key={benefit.id} variants={itemVariants}>
          <BenefitCard benefit={benefit} />
        </motion.div>
      ))}
    </motion.div>
  );
}
