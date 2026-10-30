import { Quote, Star } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import type { Review } from "./Reviews.constants";

interface ReviewCardProps {
  review: Review;
}

// Same glass surface language as BenefitCard/FeaturedServiceCard (translucent
// gradient fill, top highlight line, soft corner reflection, thin border) —
// only the composition differs: one large, centered, text-dominant card
// instead of an icon-led grid tile.
export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      data-testid={review.id}
      className="relative flex h-full flex-col items-center gap-6 overflow-hidden rounded-md border border-white/8 border-t-white/14 bg-linear-to-br from-white/[0.05] via-surface-default/35 to-background-primary/85 p-8 text-center shadow-[0_20px_48px_-24px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-10 md:p-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-white/[0.04] blur-2xl"
      />
      <Quote
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-6 h-10 w-10 text-primary/15 sm:left-8 sm:top-8"
        fill="currentColor"
        strokeWidth={0}
      />

      <div
        className="relative flex items-center gap-1"
        role="img"
        aria-label={`Оцінка ${review.rating} з 5`}
      >
        {Array.from({ length: review.rating }).map((_, index) => (
          <Star
            key={index}
            className="h-4 w-4 text-primary sm:h-5 sm:w-5"
            fill="currentColor"
            strokeWidth={0}
            aria-hidden="true"
          />
        ))}
      </div>

      <Typography
        as="p"
        variant="body"
        weight="medium"
        className="relative max-w-[36rem] text-balance sm:text-lg md:text-xl"
      >
        «{review.quote}»
      </Typography>

      <div className="relative flex flex-col items-center gap-1">
        <Typography as="span" variant="body" weight="semibold">
          {review.name}
        </Typography>
        <Typography as="span" variant="bodySmall" color="secondary">
          {review.location}
        </Typography>
      </div>
    </div>
  );
}
