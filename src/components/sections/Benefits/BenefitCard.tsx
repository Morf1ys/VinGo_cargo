import { cva } from "class-variance-authority";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { Benefit, BenefitTier } from "./Benefits.constants";

// Same glass language as the Services cards (translucent surface, soft
// blur, layered top-left reflection, thin border, restrained hover lift) —
// only the tier layout/sizing differs.
const cardVariants = cva(
  "group relative flex h-full overflow-hidden rounded-md border border-white/8 border-t-white/14 bg-linear-to-br from-white/[0.05] via-surface-default/35 to-background-primary/85 shadow-[0_16px_36px_-24px_rgba(0,0,0,0.5)] backdrop-blur-md transition-[transform,border-color,background-color,box-shadow] duration-300 ease-standard motion-reduce:transition-none hover:-translate-y-1 hover:border-white/[0.16] hover:from-white/[0.09] hover:shadow-[0_20px_44px_-24px_rgba(0,0,0,0.55)]",
  {
    variants: {
      tier: {
        // All three tiers share the same centered icon → title →
        // description composition now — they differ only in padding, gap,
        // and (via the lookups below) icon/title size and weight, so the
        // family reads as one coherent set at every level.
        featured: "flex-col items-center gap-5 p-8 text-center",
        medium: "flex-col items-center gap-4 p-5 text-center",
        compact: "flex-col items-center gap-3 p-4 text-center",
      },
    },
  },
);

const ICON_BOX_SIZE: Record<BenefitTier, string> = {
  featured: "h-14 w-14",
  medium: "h-12 w-12",
  compact: "h-10 w-10",
};

const ICON_SIZE: Record<BenefitTier, string> = {
  featured: "h-7 w-7",
  medium: "h-6 w-6",
  compact: "h-5 w-5",
};

const TITLE_VARIANT: Record<BenefitTier, "h2" | "h3" | "h4"> = {
  featured: "h2",
  medium: "h3",
  compact: "h4",
};

// Weight is the other lever (with spacing) distinguishing medium from
// compact — featured stays boldest as the primary trust message.
const TITLE_WEIGHT: Record<BenefitTier, "bold" | "semibold" | "medium"> = {
  featured: "bold",
  medium: "semibold",
  compact: "medium",
};

// Description size stays the same for medium/compact by design (only
// weight/spacing/content differ per the polish brief) — featured gets the
// larger body size to match its bigger, bolder title.
const DESCRIPTION_VARIANT: Record<BenefitTier, "body" | "bodySmall"> = {
  featured: "body",
  medium: "bodySmall",
  compact: "bodySmall",
};

const TEXT_GAP: Record<BenefitTier, string> = {
  featured: "gap-2",
  medium: "gap-1.5",
  compact: "gap-1.5",
};

interface BenefitCardProps {
  benefit: Benefit;
}

export function BenefitCard({ benefit }: BenefitCardProps) {
  const Icon = benefit.icon;

  return (
    <div className={cardVariants({ tier: benefit.tier })}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/[0.04] blur-2xl"
      />

      <div
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary",
          ICON_BOX_SIZE[benefit.tier],
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-primary/25 opacity-40 blur-md transition-opacity duration-300 ease-standard motion-reduce:transition-none group-hover:opacity-100"
        />
        <Icon className={ICON_SIZE[benefit.tier]} strokeWidth={1.5} aria-hidden="true" />
      </div>

      <div className={cn("flex min-w-0 flex-1 flex-col", TEXT_GAP[benefit.tier])}>
        <Typography
          as="h3"
          variant={TITLE_VARIANT[benefit.tier]}
          weight={TITLE_WEIGHT[benefit.tier]}
          className="text-balance"
        >
          {benefit.title}
        </Typography>
        <Typography as="p" variant={DESCRIPTION_VARIANT[benefit.tier]} color="secondary">
          {benefit.description}
        </Typography>
      </div>
    </div>
  );
}
