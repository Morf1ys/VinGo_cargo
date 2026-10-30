"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/theme/motion";
import { siteConfig } from "@/config/site";
import { NAV_ITEMS } from "./Header.constants";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

// document.body only exists on the client — these let useSyncExternalStore
// report "mounted" as false during SSR and the first client render (so
// hydration matches), then true right after, without a setState-in-effect.
const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);
  const shouldReduceMotion = useReducedMotion();
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label="Відкрити меню"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary lg:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Portalled to document.body: Header has backdrop-blur (backdrop-filter),
          which establishes a new containing block for fixed-position
          descendants — without the portal, `fixed inset-0` below resolves
          against Header's own 72px box instead of the viewport, collapsing
          the overlay to a sliver instead of covering the screen. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                id={menuId}
                role="dialog"
                aria-modal="true"
                aria-label="Меню навігації"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : duration.fast, ease: easing.standard }}
                className="fixed inset-0 z-50 bg-background-primary/95 backdrop-blur-lg lg:hidden"
                onClick={(event) => {
                  if (event.target === event.currentTarget) setIsOpen(false);
                }}
              >
                <motion.div
                  ref={panelRef}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  transition={{ duration: shouldReduceMotion ? 0 : duration.default, ease: easing.premium }}
                  // pointer-events-none here (and on the flex-1 centering
                  // wrapper below) so clicks on the genuinely empty space
                  // around the nav links fall through to the backdrop's own
                  // onClick instead of being swallowed by this full-height
                  // layout div — only the three actual content rows
                  // (re-enabled below) capture pointer events.
                  className="pointer-events-none flex h-full flex-col overflow-y-auto px-gutter-mobile pt-6 pb-10"
                >
                  <div className="pointer-events-auto flex items-center justify-end">
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={() => setIsOpen(false)}
                      aria-label="Закрити меню"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-10 flex flex-1 flex-col justify-center">
                    <nav aria-label="Основна навігація" className="pointer-events-auto">
                      <ul className="flex flex-col gap-1">
                        {NAV_ITEMS.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block rounded-md px-2 py-3 text-h3 font-medium text-text-primary transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  <div className="pointer-events-auto flex flex-col gap-4 border-t border-border-default pt-6">
                    <a
                      href={siteConfig.phone.href}
                      onClick={() => setIsOpen(false)}
                      aria-label={`Зателефонувати: ${siteConfig.phone.display}`}
                      className="inline-flex items-center gap-2 rounded-sm text-body font-medium text-text-secondary transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {siteConfig.phone.display}
                    </a>

                    <a
                      href={`#${siteConfig.orderFormSectionId}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
                    >
                      Замовити
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
