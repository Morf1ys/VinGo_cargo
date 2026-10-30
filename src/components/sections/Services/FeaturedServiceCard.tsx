import { Typography } from "@/components/ui/Typography";
import type { FeaturedService } from "./Services.constants";

interface FeaturedServiceCardProps {
  service: FeaturedService;
}

export function FeaturedServiceCard({ service }: FeaturedServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className="group relative flex h-full flex-col justify-start gap-6 overflow-hidden rounded-md border border-white/8 border-t-white/14 bg-linear-to-br from-white/[0.05] via-surface-default/35 to-background-primary/85 p-6 shadow-[0_16px_36px_-24px_rgba(0,0,0,0.5)] backdrop-blur-md transition-[transform,border-color,background-color] duration-300 ease-standard motion-reduce:transition-none hover:-translate-y-1 hover:border-white/[0.16] hover:from-white/[0.09] short:gap-3 short:p-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
      />
      {/* Soft top-left reflection — physically-plausible falloff rather than
          a directional border tint, paired with the darker bg gradient stop
          toward the bottom-right for layered glass depth. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/[0.04] blur-2xl"
      />

      <div className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-primary/25 opacity-40 blur-md transition-opacity duration-300 ease-standard motion-reduce:transition-none group-hover:opacity-100"
        />
        <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="h3" weight="semibold">
          {service.title}
        </Typography>
        <Typography as="p" variant="body" color="secondary">
          {service.description}
        </Typography>
      </div>
    </div>
  );
}
