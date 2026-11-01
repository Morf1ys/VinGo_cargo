export interface NavItem {
  label: string;
  href: string;
}

export const sectionIdOf = (href: string): string => href.split("#")[1] ?? "";

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
