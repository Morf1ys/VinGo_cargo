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
      <Container size="wide">
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Logo />

          <DesktopNav />

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={siteConfig.phone.href}
              aria-label={`Зателефонувати: ${siteConfig.phone.display}`}
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4 transition-[border-color,background-color,box-shadow] duration-150 ease-standard hover:border-primary/40 hover:bg-primary/[0.06] hover:shadow-[0_0_24px_-8px_rgba(24,160,111,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary transition-colors duration-150 group-hover:bg-primary/25">
                <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.6875rem] font-medium text-text-secondary">Дзвоніть 24/7</span>
                <span className="text-body-small font-semibold text-text-primary transition-colors duration-150 group-hover:text-primary">
                  {siteConfig.phone.display}
                </span>
              </span>
            </a>

            <a
              href={siteConfig.orderFormHref}
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
