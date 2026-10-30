"use client";

import { motion, useReducedMotion } from "motion/react";
import { Typography } from "@/components/ui/Typography";
import { duration, easing } from "@/lib/theme/motion";

export function FAQHeader() {
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
      className="text-center lg:sticky lg:top-[calc(var(--vingo-header-height)+2rem)] lg:text-left"
    >
      <Typography as="span" variant="overline" weight="semibold" color="accent">
        FAQ
      </Typography>

      <Typography as="h2" variant="h1" weight="semibold" className="mt-5 text-balance max-md:text-h2 short:mt-3">
        Відповіді на часті запитання
      </Typography>

      <Typography as="p" variant="body" color="secondary" className="mx-auto mt-5 lg:mx-0 short:mt-3">
        Все, що варто знати перед замовленням вантажників або переїзду.
      </Typography>
    </motion.div>
  );
}
