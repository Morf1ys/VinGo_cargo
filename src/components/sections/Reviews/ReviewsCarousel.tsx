"use client";

import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { easing } from "@/lib/theme/motion";
import { ReviewCard } from "./ReviewCard";
import { REVIEWS } from "./Reviews.constants";

// Task calls for a ~350-450ms transition — outside the fast/default/slow
// steps in src/lib/theme/motion.ts, so a literal is used here rather than
// stretching an existing token to fit.
const TRANSITION_SECONDS = 0.4;
const SLIDE_OFFSET_PX = 16;
const SWIPE_THRESHOLD_PX = 60;

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * SLIDE_OFFSET_PX }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -SLIDE_OFFSET_PX }),
};

export function ReviewsCarousel() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const shouldReduceMotion = useReducedMotion();
  const pointerStartX = useRef<number | null>(null);

  const goTo = (nextIndex: number, dir: number) => {
    const normalized = (nextIndex + REVIEWS.length) % REVIEWS.length;
    setSlide([normalized, dir]);
  };

  const goPrev = () => goTo(index - 1, -1);
  const goNext = () => goTo(index + 1, 1);
  const goToDot = (targetIndex: number) => {
    if (targetIndex === index) return;
    goTo(targetIndex, targetIndex > index ? 1 : -1);
  };

  // Plain pointer tracking (not motion's `drag` gesture) — `drag` drives the
  // same x transform the enter/exit variants animate, and the two fight for
  // control of that motion value across a slide swap. Reading raw pointer
  // coordinates keeps swipe-to-navigate without touching x outside variants.
  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (deltaX < -SWIPE_THRESHOLD_PX) {
      goNext();
    } else if (deltaX > SWIPE_THRESHOLD_PX) {
      goPrev();
    }
  };

  const activeReview = REVIEWS[index];

  return (
    <div>
      <span className="sr-only" aria-live="polite">
        Відгук {index + 1} з {REVIEWS.length}
      </span>

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={activeReview.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: shouldReduceMotion ? 0 : TRANSITION_SECONDS,
              ease: easing.standard,
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStartX.current = null;
            }}
            className="touch-pan-y select-none"
          >
            <ReviewCard review={activeReview} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5 sm:mt-10 short:mt-6 tight:mt-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Попередній відгук"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface-elevated/40 text-text-secondary backdrop-blur-sm transition-colors duration-150 ease-standard hover:border-primary/30 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2" role="group" aria-label="Вибір відгуку">
          {REVIEWS.map((review, dotIndex) => (
            <button
              key={review.id}
              type="button"
              onClick={() => goToDot(dotIndex)}
              aria-label={`Показати відгук ${dotIndex + 1} з ${REVIEWS.length}`}
              aria-current={dotIndex === index ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-standard motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
                dotIndex === index ? "w-6 bg-primary" : "w-2 bg-white/20 hover:bg-white/35",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Наступний відгук"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface-elevated/40 text-text-secondary backdrop-blur-sm transition-colors duration-150 ease-standard hover:border-primary/30 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
