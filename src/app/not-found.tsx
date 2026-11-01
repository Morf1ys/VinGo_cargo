import type { Metadata } from "next";
import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Сторінку не знайдено",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="flex-1">
      <Section spacing="default" fill className="relative overflow-hidden bg-background-primary">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-96 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(57,188,137,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(57,188,137,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        </div>

        <Container size="default" className="relative py-16 text-center lg:py-0">
          <p
            aria-hidden="true"
            className="bg-linear-to-b from-primary-hover to-primary-deep/40 bg-clip-text text-[7rem] leading-none font-semibold tracking-tight text-transparent sm:text-[9rem]"
          >
            404
          </p>

          <Typography as="h1" variant="h1" weight="semibold" className="mt-6 text-balance max-md:text-h2">
            Схоже, ця сторінка переїхала
          </Typography>
          <Typography as="p" variant="body" color="secondary" className="mx-auto mt-4 max-w-md">
            Такої сторінки немає. Поверніться на головну або зателефонуйте — допоможемо з переїздом
            у Вінниці та області.
          </Typography>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "gap-2")}>
              <Home className="h-4 w-4" aria-hidden="true" />
              На головну
            </Link>
            <a
              href={siteConfig.phone.href}
              aria-label={`Зателефонувати: ${siteConfig.phone.display}`}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone.display}
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
