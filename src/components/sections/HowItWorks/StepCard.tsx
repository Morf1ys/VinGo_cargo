import { Typography } from "@/components/ui/Typography";
import type { Step } from "./HowItWorks.constants";

interface StepCardProps {
  step: Step;
}

// Same glass language as Services/Benefits cards (translucent surface, soft
// blur, layered top-left reflection, thin border, restrained hover lift) —
// all four steps are equal-tier, so unlike Benefits there's no size/weight
// hierarchy between them, only the number → icon → title → description
// composition and the connectors (see HowItWorksSteps) distinguish this
// section.
export function StepCard({ step }: StepCardProps) {
  const Icon = step.icon;

  return (
    <div className="group relative flex h-full min-w-0 flex-col items-center gap-2 overflow-hidden rounded-md border border-white/8 border-t-white/14 bg-linear-to-br from-white/[0.05] via-surface-default/35 to-background-primary/85 p-4 text-center shadow-[0_16px_36px_-24px_rgba(0,0,0,0.5)] backdrop-blur-md transition-[transform,border-color,background-color,box-shadow] duration-300 ease-standard motion-reduce:transition-none hover:-translate-y-1 hover:border-white/[0.16] hover:from-white/[0.09] hover:shadow-[0_20px_44px_-24px_rgba(0,0,0,0.55)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/[0.04] blur-2xl"
      />

      <div className="flex flex-col items-center gap-1.5">
        {/* Small, muted label — not a headline number */}
        <span className="text-caption font-semibold text-primary/50">{step.number}</span>

        <div className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-primary/25 opacity-40 blur-md transition-opacity duration-300 ease-standard motion-reduce:transition-none group-hover:opacity-100"
          />
          <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Typography variant="h3" weight="semibold">
          {step.title}
        </Typography>
        <Typography as="p" variant="bodySmall" color="secondary">
          {step.description}
        </Typography>
      </div>
    </div>
  );
}
