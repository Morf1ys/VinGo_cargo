"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easing } from "@/lib/theme/motion";
import { FeaturedServiceCard } from "./FeaturedServiceCard";
import { FEATURED_SERVICES } from "./Services.constants";

export function FeaturedServices() {
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
    <div className="relative mt-10 md:mt-12">
      {/* Restrained local glow behind the featured grid only — not a
          section-wide gradient, kept low-opacity so card text contrast is
          unaffected. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-2/3 w-2/3 rounded-full bg-primary/[0.08] blur-[100px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {FEATURED_SERVICES.map((service) => (
          <motion.div key={service.id} variants={itemVariants}>
            <FeaturedServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
