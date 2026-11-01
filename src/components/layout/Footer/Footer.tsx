"use client";

import { Phone } from "lucide-react";
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
      {/* Restrained ambient glow, same opacity class as Hero's dashboard
          reflection (bg-primary/12) rather than a louder bespoke value. */}
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
          {/* 1. Top CTA area — one horizontal composition, not a card. Grid
              (not a capped max-width) so copy anchors to the Container's
              left edge and the action block anchors to its right edge,
              using the full Container width like the rest of the site. */}
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

            <div className="flex shrink-0 flex-col items-start gap-2 lg:items-center">
              <a
                href={`#${siteConfig.orderFormSectionId}`}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full sm:w-auto")}
              >
                Замовити вантажників
              </a>
              <a
                href={siteConfig.phone.href}
                aria-label={`Зателефонувати: ${siteConfig.phone.display}`}
                className="inline-flex items-center gap-2 rounded-sm text-body-small font-medium text-text-secondary transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
              >
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                {siteConfig.phone.display}
              </a>
              <MessengerLinks label="" className="mt-1" />
            </div>
          </div>

          <div className="my-4 h-px w-full bg-border-default/60 lg:my-8" aria-hidden="true" />

          {/* 2. Lower footer area — slogan, navigation, status as one compact
              row at desktop. No wordmark here: the top CTA area already
              opens with the VinGo eyebrow, so repeating the full lockup
              would be redundant. Hidden on mobile for the same reason the
              old brand block was — this row is desktop-only composition.
              Symmetric 1fr/auto/1fr grid (not a capped max-width) spans the
              full Container width: equal side columns put navigation
              visually in the row's true center, not just centered in
              whatever space happens to be left over. */}
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
                Вінниця та область
              </Typography>
            </div>
          </div>

          {/* 3. Copyright row. */}
          <div className="mt-4 border-t border-border-default/60 pt-4 lg:mt-8">
            <Typography as="span" variant="caption" color="secondary">
              © 2026 VinGo
            </Typography>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
