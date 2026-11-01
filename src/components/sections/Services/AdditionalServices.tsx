"use client";

import { motion, useReducedMotion } from "motion/react";
import { Typography } from "@/components/ui/Typography";
import { duration, easing } from "@/lib/theme/motion";
import { ADDITIONAL_SERVICE_ICON, ADDITIONAL_SERVICES } from "./Services.constants";

export function AdditionalServices() {
  const shouldReduceMotion = useReducedMotion();
  const Icon = ADDITIONAL_SERVICE_ICON;

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
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className="mt-12 border-t border-border-default/60 pt-8 md:mt-12 md:pt-10 lg:mt-10 lg:pt-8 short:mt-5 short:pt-4"
    >
      <Typography as="h3" variant="h4" weight="semibold" className="text-center">
        Також допоможемо з
      </Typography>

      <ul className="mx-auto mt-6 flex max-w-[54rem] flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {ADDITIONAL_SERVICES.map((service) => (
          <li
            key={service.id}
            className="group inline-flex items-center gap-1.5 text-text-secondary transition-colors duration-150 ease-standard hover:text-primary"
          >
            <Icon
              className="h-4 w-4 shrink-0 text-primary/70 transition-colors duration-150 ease-standard group-hover:text-primary"
              aria-hidden="true"
            />
            <span className="text-body-small font-medium">{service.label}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
