"use client";

import {
  Clock3,
  ClipboardCheck,
  Headset,
  LockKeyhole,
  MapPin,
  Phone,
  ShieldCheck,
  UserRoundCheck,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MessengerLinks } from "@/components/ui/MessengerLinks";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/theme/motion";
import { HeroVan } from "./HeroVan/HeroVan";

const BENEFITS: { icon: LucideIcon; text: string }[] = [
  { icon: UserRoundCheck, text: "Досвідчені вантажники" },
  { icon: ShieldCheck, text: "Дбайливе ставлення до майна" },
  { icon: Wallet, text: "Без прихованих платежів" },
];

const DASHBOARD_ROWS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Clock3, label: "Орієнтовний приїзд", value: "від 30 хв" },
  { icon: MapPin, label: "Зона обслуговування", value: "Вінниця та область" },
  { icon: Headset, label: "Підтримка 24/7", value: "Завжди на зв'язку" },
];

function BrandStatusRow() {
  return (
    <div className="flex items-center gap-3">
      <Typography as="span" variant="overline" weight="semibold" color="secondary">
        VINGO
      </Typography>
      <span className="h-4 w-px bg-border-default" aria-hidden="true" />
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
        <Typography as="span" variant="caption" color="secondary">
          Приймаємо замовлення
        </Typography>
      </span>
    </div>
  );
}

function HeroDashboard() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-6 -z-10 h-2/3 w-2/3 rounded-full bg-primary/12 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-md border border-white/8 border-t-white/15 border-l-primary/15 bg-linear-to-br from-background-primary/50 via-background-secondary/40 to-background-primary/48 p-6 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.55)] backdrop-blur-lg short:p-5 tight:p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
        />
        <div className="flex flex-col divide-y divide-white/5">
          {DASHBOARD_ROWS.map((row, index) => (
            <div key={row.label} className="flex items-center justify-between gap-3 py-5 first:pt-0 last:pb-0 short:py-3.5 tight:py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <row.icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
                <Typography as="span" variant="bodySmall" color="secondary" className="truncate">
                  {row.label}
                </Typography>
              </div>
              <Typography
                as="span"
                variant="bodySmall"
                weight="semibold"
                color={index === 0 ? "accent" : undefined}
                className="shrink-0 whitespace-nowrap"
              >
                {row.value}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroContent() {
  return (
    <div className="relative">
      <div className="relative z-10">
        <BrandStatusRow />

        <Typography
          as="h1"
          variant="h2"
          weight="semibold"
          className="mt-6 max-w-sm sm:max-w-md sm:text-4xl lg:max-w-xl lg:text-display short:mt-4 short:text-5xl tight:mt-3 tight:text-[2.75rem]"
        >
          Вантажники та переїзди у Вінниці
        </Typography>

        <Typography as="p" variant="body" weight="medium" color="accent" className="mt-3">
          Акуратно. Вчасно. Без зайвих витрат.
        </Typography>

        <Typography as="p" variant="body" color="secondary" className="mt-3 max-w-md md:mt-4 xl:max-w-lg">
          Вантажники для квартирних і офісних переїздів, підйому меблів, техніки та
          будівельних матеріалів у Вінниці та області. Працюємо акуратно, приїжджаємо в узгоджений час
          і підбираємо транспорт лише тоді, коли він справді потрібен.
        </Typography>

        <div className="relative mt-6 md:mt-8 short:mt-5 tight:hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 top-1/2 h-40 w-56 -translate-y-1/2 opacity-70 min-[420px]:-right-6 min-[420px]:h-44 min-[420px]:w-60 [mask-image:linear-gradient(to_left,black_55%,transparent_100%)] sm:right-0 sm:h-60 sm:w-80 sm:opacity-90 lg:hidden"
          >
            <HeroVan className="absolute inset-0" />
          </div>

          <ul className="relative z-10 flex flex-col gap-3 short:gap-2.5">
            {BENEFITS.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border-default bg-surface-elevated/70 ring-1 ring-inset ring-primary/10 backdrop-blur-sm">
                  <benefit.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </span>
                <Typography as="span" variant="bodySmall" color="secondary">
                  {benefit.text}
                </Typography>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 lg:hidden">
          <HeroDashboard />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 short:mt-7 tight:mt-5">
          <a
            href={siteConfig.orderFormHref}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full gap-2 sm:w-auto")}
          >
            Замовити зараз
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.phone.href}
            aria-label={`Зателефонувати: ${siteConfig.phone.display}`}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full gap-2 sm:w-auto")}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Зателефонувати
          </a>
        </div>

        <MessengerLinks className="mt-5 short:mt-4" />

        <div className="mt-4 flex items-center gap-2">
          <LockKeyhole className="h-3.5 w-3.5 shrink-0 text-text-secondary" aria-hidden="true" />
          <Typography as="p" variant="caption" color="secondary">
            Ваші дані використовуються лише для обробки заявки.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.default, ease: easing.standard },
    },
  };

  return (
    <Section
      spacing="compact"
      fill
      className="relative overflow-hidden bg-linear-to-b from-background-primary to-background-secondary"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent"
      />

      <Container size="wide" className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.85fr)] lg:items-stretch lg:gap-12 xl:gap-16"
        >
          <motion.div variants={itemVariants} className="lg:flex lg:flex-col lg:justify-center">
            <HeroContent />
          </motion.div>

          <motion.div variants={itemVariants} className="hidden lg:flex lg:flex-col lg:gap-4">
            <div className="relative min-h-[260px] flex-1 lg:-ml-10 xl:-ml-20">
              <HeroVan className="absolute inset-0" />
            </div>
            <HeroDashboard />
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
