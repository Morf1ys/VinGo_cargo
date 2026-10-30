import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/theme/motion";
import type { FAQItemData } from "./FAQ.constants";

interface FAQItemProps {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const buttonId = `faq-question-${item.id}`;
  const panelId = `faq-answer-${item.id}`;

  return (
    <li>
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-4 rounded-sm px-5 py-5 text-left short:py-4 transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary sm:px-6 sm:py-6"
        >
          <Typography
            as="span"
            variant="body"
            weight={isOpen ? "semibold" : "medium"}
            className="text-balance"
          >
            {item.question}
          </Typography>

          <Plus
            aria-hidden="true"
            className={cn(
              "h-5 w-5 shrink-0 transition-[transform,color] duration-200 ease-standard motion-reduce:transition-none group-hover:text-primary",
              isOpen ? "rotate-45 text-primary" : "text-text-secondary",
            )}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : duration.default,
              ease: easing.standard,
            }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <Typography as="p" variant="body" color="secondary">
                {item.answer}
              </Typography>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
