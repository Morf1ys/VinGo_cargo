import { useId } from "react";
import type { Ref, TextareaHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const AUTOFILL_OVERRIDE =
  "[&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-text-primary)] [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0px_1000px_var(--color-surface-default)_inset] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]";

const textareaVariants = cva(
  `w-full resize-y rounded-md border bg-black/30 px-4 py-2 text-body text-text-primary placeholder:text-text-secondary shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.45)] transition-[border-color,background-color,box-shadow] duration-200 ease-standard motion-reduce:transition-none hover:border-white/15 focus-visible:border-primary focus-visible:bg-black/40 focus-visible:shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50 ${AUTOFILL_OVERRIDE}`,
  {
    variants: {
      invalid: {
        true: "border-danger bg-danger/5 focus-visible:border-danger focus-visible:ring-danger",
        false: "border-white/10",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  },
);

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "color">,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({
  label,
  helperText,
  error,
  disabled,
  required,
  rows = 4,
  id,
  className,
  ref,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;
  const isInvalid = Boolean(error);

  const describedBy =
    [error ? errorId : null, helperText ? helperId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-2 block text-body-small font-medium text-text-primary"
        >
          {label}
          {required && (
            <span className="text-danger" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        disabled={disabled}
        required={required}
        rows={rows}
        aria-invalid={isInvalid}
        aria-describedby={describedBy}
        className={cn(textareaVariants({ invalid: isInvalid }), className)}
        {...props}
      />

      {error ? (
        <p id={errorId} className="mt-2 text-body-small text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-2 text-body-small text-text-secondary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
