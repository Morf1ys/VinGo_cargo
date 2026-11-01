"use client";

import { Truck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { easing } from "@/lib/theme/motion";

const DASH = 14;
const GAP = 12;

export function OrderSentAnimation() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div aria-hidden="true" className="relative mx-auto h-20 w-full max-w-xs overflow-hidden">
      <svg className="absolute inset-x-0 bottom-3 h-px w-full overflow-visible" preserveAspectRatio="none">
        <motion.line
          x1="-40"
          x2="400"
          y1="0"
          y2="0"
          stroke="var(--color-primary-hover)"
          strokeOpacity={0.5}
          strokeWidth={2}
          strokeDasharray={`${DASH} ${GAP}`}
          animate={reduce ? undefined : { strokeDashoffset: [0, DASH + GAP] }}
          transition={reduce ? undefined : { duration: 0.6, ease: "linear", repeat: Infinity }}
        />
      </svg>

      <motion.div
        className="absolute bottom-4 left-1/2 -ml-7"
        initial={reduce ? false : { x: -220 }}
        animate={{ x: 0 }}
        transition={{ duration: 1.1, ease: easing.premium }}
      >
        <motion.span
          className="absolute right-0 top-1/2 h-6 w-10 -translate-y-1/2 translate-x-6 rounded-full bg-[#cdf7e4]/40 blur-md"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: reduce ? 0.6 : [0, 1, 0.2, 1, 0.6] }}
          transition={{ delay: reduce ? 0 : 1, duration: 0.9 }}
        />
        <motion.div
          animate={reduce ? undefined : { y: [0, -1.5, 0] }}
          transition={reduce ? undefined : { delay: 1.1, duration: 0.5, ease: "easeInOut", repeat: Infinity }}
          className="relative flex h-14 w-14 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary shadow-[0_0_24px_-6px_rgba(24,160,111,0.6)]"
        >
          <Truck className="h-7 w-7" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
}
