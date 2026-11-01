"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MessengerLinks } from "@/components/ui/MessengerLinks";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/theme/motion";
import { FooterNav } from "./FooterNav";

export function Footer() {
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
    <Section
      as="footer"
      spacing="compact"
      className="relative overflow-hidden border-t border-border-default/60 bg-background-primary"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[280px] w-[640px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/12 blur-3xl"
      />

      <Container size="wide" className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={variants}
          className="flex flex-col"
        >
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
            <div className="max-w-xl">
              <Typography as="span" variant="overline" weight="semibold" color="accent">
                VinGo
              </Typography>
              <Typography as="h2" variant="h2" weight="semibold" className="mt-2 text-balance">
                Потрібна допомога з переїздом?
              </Typography>
              <Typography as="p" variant="body" color="secondary" className="mt-2">
                Залиште заявку — уточнимо деталі та зорієнтуємо щодо вартості.
              </Typography>
            </div>

            <div className="mt-3 flex w-full shrink-0 flex-col gap-3 sm:w-auto lg:mt-0">
              <a
                href={siteConfig.orderFormHref}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
              >
                Замовити вантажників
              </a>
              <MessengerLinks
                label=""
                withPhone
                className="max-lg:[&>a]:flex-1 max-lg:[&>a]:justify-center max-lg:[&>a:first-child]:basis-full lg:flex-nowrap"
              />
            </div>
          </div>

          <div className="my-4 h-px w-full bg-border-default/60 lg:my-8" aria-hidden="true" />

          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-6">
            <div className="hidden lg:block">
              <Typography as="p" variant="bodySmall" color="secondary" className="max-w-[18rem]">
                Переїзд без стресу. Швидко. Безпечно. Вчасно.
              </Typography>
            </div>

            <FooterNav />

            <div className="flex flex-col gap-1.5 lg:items-end">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                <Typography as="span" variant="bodySmall" color="secondary">
                  Працюємо 24/7
                </Typography>
              </span>
              <Typography as="span" variant="bodySmall" color="secondary">
                {siteConfig.serviceArea}
              </Typography>
            </div>
          </div>

          <div className="mt-4 border-t border-border-default/60 pt-4 lg:mt-8">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <Typography as="span" variant="caption" color="secondary">
                © 2026 VinGo
              </Typography>
              <Link
                href="/privacy"
                className="rounded-sm text-caption text-text-secondary transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Політика конфіденційності
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
