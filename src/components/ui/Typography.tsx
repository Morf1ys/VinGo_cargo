import { createElement } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      display: "text-display",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      body: "text-body",
      bodySmall: "text-body-small",
      caption: "text-caption",
      overline: "text-overline uppercase",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      accent: "text-primary",
      danger: "text-danger",
      success: "text-success",
    },
  },
  defaultVariants: {
    variant: "body",
    weight: "regular",
    color: "primary",
  },
});

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>;

const defaultElement: Record<TypographyVariant, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  bodySmall: "p",
  caption: "span",
  overline: "span",
};

export interface TypographyProps
  extends Omit<HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  as?: ElementType;
  children: ReactNode;
}

export function Typography({
  as,
  variant,
  weight,
  color,
  className,
  children,
  ...props
}: TypographyProps) {
  const resolvedVariant = variant ?? "body";
  const Component = as ?? defaultElement[resolvedVariant];

  return createElement(
    Component,
    {
      className: cn(
        typographyVariants({ variant: resolvedVariant, weight, color }),
        className,
      ),
      ...props,
    },
    children,
  );
}
