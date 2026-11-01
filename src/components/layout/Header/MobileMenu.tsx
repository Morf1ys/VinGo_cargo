"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Headset, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { buttonVariants } from "@/components/ui/Button";
import { MessengerLinks } from "@/components/ui/MessengerLinks";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/theme/motion";
import { siteConfig } from "@/config/site";
import { NAV_ITEMS, NAV_SECTION_IDS, sectionIdOf } from "./Header.constants";
import { useActiveSection } from "./Header.hooks";
import { Logo } from "./Logo";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

// document.body only exists on the client — these let useSyncExternalStore
// report "mounted" as false during SSR and the first client render (so
// hydration matches), then true right after, without a setState-in-effect.
const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// Square glass icon button shared by the open (☰) and close (✕) triggers.
const ICON_BUTTON =
  "inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-text-primary backdrop-blur-sm transition-[color,border-color,background-color] duration-150 ease-standard hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);
  const shouldReduceMotion = useReducedMotion();
  const activeId = useActiveSection(NAV_SECTION_IDS);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = () => setIsOpen(false);

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
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : duration.slow,
      ease: easing.premium,
      delay: shouldReduceMotion ? 0 : delay,
    },
  });

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
        className={cn(ICON_BUTTON, "lg:hidden")}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Portalled to document.body: Header has backdrop-blur (backdrop-filter),
          which establishes a new containing block for fixed-position
          descendants — without the portal, `fixed inset-0` below would
          resolve against Header's own 72px box instead of the viewport. */}
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
                transition={{ duration: shouldReduceMotion ? 0 : duration.default, ease: easing.standard }}
                className="fixed inset-0 z-50 overflow-hidden bg-background-primary lg:hidden"
              >
                {/* Ambient emerald glows + faint grid — same atmosphere as the Hero. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                  <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(57,188,137,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(57,188,137,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
                </div>

                <div
                  ref={panelRef}
                  className="relative flex h-full flex-col overflow-y-auto px-gutter-mobile pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-gutter-tablet"
                >
                  {/* Top bar mirrors the header: logo left, close right. */}
                  <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.06]">
                    <Logo onNavigate={close} />
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={close}
                      aria-label="Закрити меню"
                      className={ICON_BUTTON}
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  <motion.div {...fade(0.05)} className="mt-8 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                    <span className="text-caption text-text-secondary">Приймаємо замовлення</span>
                  </motion.div>

                  <nav aria-label="Основна навігація" className="mt-4">
                    <ul className="flex flex-col">
                      {NAV_ITEMS.map((item, index) => {
                        const isActive = activeId === sectionIdOf(item.href);

                        return (
                          <motion.li key={item.href} {...fade(0.08 + index * 0.05)}>
                            <a
                              href={item.href}
                              onClick={close}
                              aria-current={isActive ? "location" : undefined}
                              className="group flex items-center gap-4 border-b border-white/[0.06] py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
                            >
                              <span className="w-6 text-caption font-semibold tabular-nums text-primary">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span
                                className={cn(
                                  "flex-1 text-h2 font-semibold tracking-tight transition-colors duration-150 ease-standard group-hover:text-primary",
                                  isActive ? "text-primary" : "text-text-primary",
                                )}
                              >
                                {item.label}
                              </span>
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-[color,border-color,transform] duration-200 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:text-primary motion-reduce:transition-none",
                                  isActive ? "border-primary/40 text-primary" : "border-white/10 text-text-secondary",
                                )}
                              >
                                <ArrowUpRight className="h-4 w-4" />
                              </span>
                            </a>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>

                  <motion.div {...fade(0.4)} className="mt-auto pt-8">
                    {/* Contact card in the site's glass-panel language. */}
                    <div className="relative overflow-hidden rounded-md border border-white/8 border-t-white/15 border-l-primary/20 bg-linear-to-br from-white/[0.05] via-surface-default/40 to-background-primary/80 p-4 backdrop-blur-md">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
                      />
                      <a
                        href={siteConfig.phone.href}
                        onClick={close}
                        aria-label={`Зателефонувати: ${siteConfig.phone.display}`}
                        className="group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                          <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-body font-semibold text-text-primary transition-colors duration-150 group-hover:text-primary">
                            {siteConfig.phone.display}
                          </span>
                          <span className="flex items-center gap-1.5 text-caption text-text-secondary">
                            <Headset className="h-3.5 w-3.5" aria-hidden="true" />
                            Підтримка 24/7
                          </span>
                        </span>
                      </a>

                      <MessengerLinks label="" className="mt-4 [&>a]:flex-1 [&>a]:justify-center" />

                      <a
                        href={siteConfig.orderFormHref}
                        onClick={close}
                        className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-3 w-full")}
                      >
                        Залишити заявку
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
