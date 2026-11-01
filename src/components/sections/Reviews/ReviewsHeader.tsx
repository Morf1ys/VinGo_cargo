"use client";

import { motion, useReducedMotion } from "motion/react";
import { Typography } from "@/components/ui/Typography";
import { duration, easing } from "@/lib/theme/motion";

export function ReviewsHeader() {
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
      className="mx-auto max-w-2xl text-center"
    >
      <Typography as="span" variant="overline" weight="semibold" color="accent">
        Відгуки клієнтів
      </Typography>

      <Typography as="h2" variant="h1" weight="semibold" className="mt-5 text-balance max-md:text-h2 short:mt-3">
        Люди, яким ми допомогли з переїздом
      </Typography>

      <Typography as="p" variant="body" color="secondary" className="mx-auto mt-5 short:mt-3 tight:hidden">
        Кожен переїзд — інша історія. Ось декілька з них, розказаних нашими клієнтами з Вінниці.
      </Typography>
    </motion.div>
  );
}
