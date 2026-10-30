import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { Step } from "./HowItWorks.constants";

interface StepCardProps {
  step: Step;
  isLast?: boolean;
}

// One row of the vertical timeline: glass icon marker (with the connector
// line running down to the next step) + number, title and description.
export function StepCard({ step, isLast = false }: StepCardProps) {
  const Icon = step.icon;

  return (
    <div className="group flex gap-5">
      <div className="flex flex-col items-center">
        <div className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-primary/25 opacity-40 blur-md transition-opacity duration-300 ease-standard motion-reduce:transition-none group-hover:opacity-100"
          />
          <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </div>
        {!isLast && (
          <div
            aria-hidden="true"
            className="my-2 w-px flex-1 bg-linear-to-b from-primary/40 to-primary/5"
          />
        )}
      </div>

      <div className={cn("flex min-w-0 flex-col gap-1 pt-1", !isLast && "pb-8 short:pb-5")}>
        <span className="text-caption font-semibold text-primary/60">{step.number}</span>
        <Typography as="h3" variant="h3" weight="semibold">
          {step.title}
        </Typography>
        <Typography as="p" variant="body" color="secondary">
          {step.description}
        </Typography>
      </div>
    </div>
  );
}
