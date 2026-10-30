"use client";

import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/theme/motion";

export function ServicesCTA() {
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
      className="relative mt-14 overflow-hidden rounded-md border border-white/8 border-t-white/14 bg-linear-to-br from-background-primary/75 via-background-secondary/65 to-background-primary/90 p-8 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.55)] backdrop-blur-lg sm:p-10 md:mt-12 lg:mt-8 lg:px-10 lg:py-8 short:mt-6 short:py-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 -top-8 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
      />

      {/* Capped and centered so text/button stay in a natural relationship
          instead of stretching to the panel's full width with an empty
          middle. */}
      <div className="mx-auto flex max-w-4xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Typography variant="h3" weight="semibold">
            Не знайшли потрібну послугу?
          </Typography>
          <Typography as="p" variant="body" color="secondary" className="mt-2 max-w-md">
            Опишіть своє завдання — ми допоможемо підібрати відповідний формат робіт.
          </Typography>
        </div>

        <a
          href={`#${siteConfig.orderFormSectionId}`}
          className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full shrink-0 sm:w-auto")}
        >
          Отримати консультацію
        </a>
      </div>
    </motion.div>
  );
}
