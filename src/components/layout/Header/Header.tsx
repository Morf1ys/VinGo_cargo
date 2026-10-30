"use client";

import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./DesktopNav";
import { HEADER_SCROLL_THRESHOLD_PX } from "./Header.constants";
import { useScrolled } from "./Header.hooks";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const isScrolled = useScrolled(HEADER_SCROLL_THRESHOLD_PX);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ease-standard motion-reduce:transition-none",
        isScrolled
          ? "border-white/[0.06] bg-[rgba(8,11,12,0.78)] shadow-[0_10px_35px_rgba(0,0,0,0.24)] backdrop-blur-[18px]"
          : "border-white/[0.04] bg-[rgba(8,10,11,0.22)] shadow-none backdrop-blur-[8px]",
      )}
    >
      {/* Same local max-width as the Hero container, kept in sync manually
          since Container's shared "wide" size stays at 960px for other
          sections. */}
      <Container size="wide" className="min-[1440px]:max-w-[1320px]">
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Logo />

          <DesktopNav />

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={siteConfig.phone.href}
              aria-label={`Зателефонувати: ${siteConfig.phone.display}`}
              className="inline-flex items-center gap-2 rounded-sm text-body-small font-medium text-text-secondary transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone.display}
            </a>

            <a
              href={`#${siteConfig.orderFormSectionId}`}
              className={cn(
                buttonVariants({ variant: "primary", size: "md" }),
                "transition-[color,background-color,border-color,box-shadow,transform] duration-150 hover:scale-[1.02] motion-reduce:hover:scale-100",
              )}
            >
              Замовити
            </a>
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
