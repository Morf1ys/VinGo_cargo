import { createElement } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("", {
  variants: {
    spacing: {
      none: "py-section-none-mobile md:py-section-none-tablet lg:py-section-none-desktop",
      compact:
        "py-section-compact-mobile md:py-section-compact-tablet lg:py-section-compact-desktop",
      default:
        "py-section-default-mobile md:py-section-default-tablet lg:py-section-default-desktop",
      spacious:
        "py-section-spacious-mobile md:py-section-spacious-tablet lg:py-section-spacious-desktop",
    },
    // Desktop only: the section fills the screen below the sticky header
    // and centres its content, so each block reads as one "page".
    fill: {
      true: "lg:flex lg:min-h-[calc(100svh-var(--vingo-header-height))] lg:flex-col lg:justify-center short:py-10 tight:py-6",
      false: "",
    },
  },
  defaultVariants: {
    spacing: "default",
    fill: false,
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: ElementType;
  children: ReactNode;
}

export function Section({
  as = "section",
  spacing,
  fill,
  className,
  children,
  ...props
}: SectionProps) {
  const resolvedSpacing = spacing ?? "default";

  return createElement(
    as,
    { className: cn(sectionVariants({ spacing: resolvedSpacing, fill }), className), ...props },
    children,
  );
}
