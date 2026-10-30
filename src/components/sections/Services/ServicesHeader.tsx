"use client";

import { motion, useReducedMotion } from "motion/react";
import { Typography } from "@/components/ui/Typography";
import { duration, easing } from "@/lib/theme/motion";

export function ServicesHeader() {
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
      className="mx-auto max-w-3xl text-center"
    >
      <Typography as="span" variant="overline" weight="semibold" color="accent">
        Послуги
      </Typography>

      <Typography as="h2" variant="h1" weight="semibold" className="mt-5 text-balance max-md:text-h2 lg:mt-4 short:mt-3">
        Все необхідне для комфортного переїзду
      </Typography>

      <Typography as="p" variant="body" color="secondary" className="mx-auto mt-5 max-w-2xl lg:mt-4 short:mt-3">
        Від окремих вантажників до комплексної організації квартирних та офісних переїздів.
      </Typography>
    </motion.div>
  );
}
