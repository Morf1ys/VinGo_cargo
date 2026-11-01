import { MessengerLinks } from "@/components/ui/MessengerLinks";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { OrderForm } from "./OrderForm";

// The glass panel around the order form (moved out of app/page.tsx so it can
// sit next to the "How it works" steps).
export function OrderFormPanel({ id, className }: { id?: string; className?: string }) {
  return (
    <div id={id} data-order-form-panel className={cn("relative w-full", className)}>
      {/* Soft ambient emerald glow OUTSIDE the panel, small and close to the
          corner — edge lighting, not a spotlight. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 -top-8 -z-10 h-36 w-36 rounded-full bg-primary/16 blur-2xl"
      />

      {/* Base glass: nearly opaque near-black fill; per-side border carries a
          faint cool-white highlight on top and a thin emerald cast on the left. */}
      <div className="relative overflow-hidden rounded-md border border-white/8 border-t-white/20 border-l-primary/25 bg-linear-to-br from-background-primary/88 via-background-secondary/90 to-background-primary/95 p-7 shadow-[0_30px_70px_-32px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-9 short:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 -top-6 -z-10 h-28 w-28 rounded-full bg-primary/10 blur-xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
        />

        <div className="mb-7 short:mb-5">
          <Typography as="h2" variant="h2" weight="semibold">
            Залиште заявку
          </Typography>
          <Typography as="p" variant="body" color="secondary" className="mt-2">
            Опишіть завдання — ми уточнимо деталі та зорієнтуємо щодо вартості.
          </Typography>
        </div>
        <OrderForm />

        <div className="mt-6 border-t border-white/[0.06] pt-5 short:mt-5 short:pt-4">
          <MessengerLinks label="Зручніше в месенджері?" />
        </div>
      </div>
    </div>
  );
}
