"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { duration, easing } from "@/lib/theme/motion";
import { FAQItem } from "./FAQItem";
import { FAQ_ITEMS } from "./FAQ.constants";

export function FAQAccordion() {
  const shouldReduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : duration.default, ease: easing.standard },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      className="mt-10 overflow-hidden rounded-md border border-border-default/60 bg-white/[0.02] backdrop-blur-sm md:mt-12"
    >
      <ul className="divide-y divide-border-default/60">
        {FAQ_ITEMS.map((item) => (
          <FAQItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
          />
        ))}
      </ul>
    </motion.div>
  );
}
