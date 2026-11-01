export interface NavItem {
  label: string;
  /** Root-relative anchor ("/#id") so nav works from every page. */
  href: string;
}

/** Section id a nav href points at ("/#faq" → "faq"). */
export const sectionIdOf = (href: string): string => href.split("#")[1] ?? "";

// No "Контакти" entry: the phone number and the "Замовити" CTA (both
// rendered alongside this nav in Header.tsx) already cover the direct path
// to OrderForm. Real contact info belongs in the Footer once it exists.
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Послуги", href: "/#services" },
  { label: "Переваги", href: "/#benefits" },
  { label: "Як працюємо", href: "/#how-it-works" },
  { label: "Відгуки", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
];

export const NAV_SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => sectionIdOf(item.href));

export const HEADER_HEIGHT_PX = 72;
export const HEADER_SCROLL_THRESHOLD_PX = 40;
