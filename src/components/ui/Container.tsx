import { createElement } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva(
  "mx-auto w-full px-gutter-mobile md:px-gutter-tablet lg:px-gutter-desktop",
  {
    variants: {
      size: {
        default: "max-w-default",
        narrow: "max-w-narrow",
        wide: "max-w-wide",
        full: "max-w-none",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface ContainerProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  as?: ElementType;
  children: ReactNode;
}

export function Container({
  as = "div",
  size,
  className,
  children,
  ...props
}: ContainerProps) {
  const resolvedSize = size ?? "default";

  return createElement(
    as,
    { className: cn(containerVariants({ size: resolvedSize }), className), ...props },
    children,
  );
}
