"use client";

import { motion, useReducedMotion } from "motion/react";
import { Typography } from "@/components/ui/Typography";
import { duration, easing } from "@/lib/theme/motion";

export function BenefitsHeader() {
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
      className="mx-auto max-w-[800px] text-center"
    >
      <Typography as="span" variant="overline" weight="semibold" color="accent">
        Переваги
      </Typography>

      <Typography as="h2" variant="h1" weight="semibold" className="mt-5 text-balance">
        Чому клієнти обирають VinGo
      </Typography>

      {/* No max-width of its own (was max-w-narrow/640px, which forced an
          awkward wrap) — inherits the wrapper's 800px cap so the sentence
          fits on one line at desktop widths, while narrower viewports still
          constrain it naturally via the Container's own gutters. */}
      <Typography as="p" variant="body" color="secondary" className="mx-auto mt-5">
        Надійність, пунктуальність і дбайливе ставлення важливі для нас так само, як і сам переїзд.
      </Typography>
    </motion.div>
  );
}
