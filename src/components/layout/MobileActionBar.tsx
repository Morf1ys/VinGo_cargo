"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck, Phone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/Button";
import { MESSENGERS } from "@/components/ui/MessengerLinks";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/theme/motion";

const SHOW_AFTER_PX = 480;

const ICON_ACTION =
  "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-text-primary transition-[color,border-color,background-color] duration-150 ease-standard active:bg-primary/10 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary";

export function MobileActionBar() {
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolledEnough(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.querySelector("[data-order-form-panel]");
    const observer = form
      ? new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.15 })
      : null;
    if (form && observer) observer.observe(form);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = scrolledEnough && !formVisible;

  return (
    <>
      <div aria-hidden="true" className="h-20 lg:hidden" />

      <AnimatePresence>
        {visible && (
          <motion.div
            key="mobile-action-bar"
            initial={{ y: shouldReduceMotion ? 0 : "110%", opacity: shouldReduceMotion ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: shouldReduceMotion ? 0 : "110%", opacity: shouldReduceMotion ? 0 : 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : duration.default, ease: easing.premium }}
            className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.08] bg-[rgba(8,11,12,0.86)] px-gutter-mobile pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(0,0,0,0.35)] backdrop-blur-[18px] md:px-gutter-tablet lg:hidden"
          >
            <nav aria-label="Швидкий зв'язок" className="mx-auto flex max-w-xl items-center gap-2">
              <a href={siteConfig.phone.href} aria-label={`Зателефонувати: ${siteConfig.phone.display}`} className={ICON_ACTION}>
                <Phone className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </a>
              {MESSENGERS.map(({ id, label, href, icon: Icon }) => (
                <a
                  key={id}
                  href={href}
                  target={id === "telegram" ? "_blank" : undefined}
                  rel={id === "telegram" ? "noopener noreferrer" : undefined}
                  aria-label={`Написати у ${label}`}
                  className={ICON_ACTION}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </a>
              ))}
              <a
                href={siteConfig.orderFormHref}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "h-12 flex-1 gap-2 px-4")}
              >
                Заявка
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
