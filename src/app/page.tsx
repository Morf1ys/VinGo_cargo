import { Benefits } from "@/components/sections/Benefits";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";
import { siteConfig } from "@/config/site";
import { OrderForm } from "@/features/order-form";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <Benefits />
      <HowItWorks />
      <Section
        id={siteConfig.orderFormSectionId}
        spacing="default"
        className="relative overflow-hidden bg-linear-to-b from-background-secondary to-background-primary"
      >
        <Container size="default" className="relative">
          <div className="relative mx-auto max-w-[40rem]">
            {/* Soft ambient emerald glow OUTSIDE the panel, small and close
                to the corner — edge lighting, not a spotlight. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-8 -top-8 -z-10 h-36 w-36 rounded-full bg-primary/16 blur-2xl"
            />

            {/* Base glass: nearly opaque near-black fill (subtle translucency
                only) so the panel itself stays dark; per-side border carries
                a faint cool-white highlight on top and a thin emerald cast
                on the left, instead of a uniform ring around the panel. */}
            <div className="relative overflow-hidden rounded-md border border-white/8 border-t-white/20 border-l-primary/25 bg-linear-to-br from-background-primary/88 via-background-secondary/90 to-background-primary/95 p-7 shadow-[0_30px_70px_-32px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-9">
              {/* Internal reflection: a small, faint emerald tint tucked
                  into the corner itself — negative z so it sits above the
                  base fill but below the static text content — decays well
                  before the name/service fields. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 -top-6 -z-10 h-28 w-28 rounded-full bg-primary/10 blur-xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
              />

              <div className="mb-7">
                <Typography as="h2" variant="h2" weight="semibold">
                  Залиште заявку
                </Typography>
                <Typography as="p" variant="body" color="secondary" className="mt-2">
                  Опишіть завдання — ми уточнимо деталі та зорієнтуємо щодо вартості.
                </Typography>
              </div>
              <OrderForm />
            </div>
          </div>
        </Container>
      </Section>
      <Reviews />
      <FAQ />
    </main>
  );
}
