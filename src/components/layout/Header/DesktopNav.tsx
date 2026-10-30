"use client";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, NAV_SECTION_IDS } from "./Header.constants";
import { useActiveSection } from "./Header.hooks";

export function DesktopNav() {
  const activeId = useActiveSection(NAV_SECTION_IDS);

  return (
    <nav aria-label="Основна навігація" className="hidden lg:block">
      <ul className="flex items-center gap-6 xl:gap-8">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.href.slice(1);

          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className="group relative inline-flex items-center rounded-sm py-2 text-body-small font-medium text-text-secondary transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
              >
                <span className={cn(isActive && "text-primary")}>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-[220ms] ease-standard motion-reduce:transition-none group-hover:scale-x-100",
                    isActive && "scale-x-100",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
