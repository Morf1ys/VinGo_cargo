import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  // duration-150 mirrors src/lib/theme/motion.ts duration.fast (0.15s).
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-[color,background-color,border-color,box-shadow,filter] duration-150 ease-standard motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:saturate-50",
  {
    variants: {
      variant: {
        // Gradient stays within the from-primary-hover..primary range (both
        // proven >=5.9:1 contrast against text-background-primary) across the
        // whole visible width; primary-deep only appears in the final stop so
        // the darkest tone is confined near the trailing edge padding, never
        // under the label. Inset highlight/darkening + a deep-green-tinted
        // outer shadow carry the "forest green" depth without risking text
        // contrast. rgba values mirror --color-primary-deep (#147d58).
        primary:
          "bg-linear-to-r from-primary-hover from-0% via-primary via-70% to-primary-deep to-100% text-background-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),inset_0_-6px_10px_-6px_rgba(0,0,0,0.35),0_10px_24px_-10px_rgba(20,125,88,0.55)] hover:brightness-110 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),inset_0_-6px_10px_-6px_rgba(0,0,0,0.4),0_14px_30px_-10px_rgba(20,125,88,0.65)] active:brightness-95 active:shadow-[inset_0_2px_5px_0_rgba(0,0,0,0.4)]",
        secondary: "bg-surface-default text-text-primary hover:bg-surface-elevated",
        outline:
          "border border-border-default bg-surface-elevated/40 text-text-primary backdrop-blur-sm hover:border-primary/40 hover:bg-primary/10 hover:text-primary active:bg-primary/15",
        ghost: "bg-transparent text-text-primary hover:bg-surface-default",
      },
      size: {
        sm: "h-9 px-3 text-body-small",
        md: "h-10 px-4 text-body",
        lg: "h-12 px-6 text-body",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant,
  size,
  type = "button",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        buttonVariants({ variant: variant ?? "primary", size: size ?? "md" }),
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
        </span>
      )}
      <span className={cn("inline-flex items-center justify-center gap-2", loading && "invisible")}>
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    </button>
  );
}
