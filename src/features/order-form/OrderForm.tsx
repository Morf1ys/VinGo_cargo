"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Boxes, ChevronDown, PlusCircle, Truck, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Typography } from "@/components/ui/Typography";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/theme/motion";
import { orderFormSchema } from "./OrderForm.schema";
import { formatUaPhoneInput } from "./OrderForm.phone";
import {
  AGREEMENT_LINK_HREF,
  AGREEMENT_LINK_TEXT,
  AGREEMENT_TEXT,
  ORDER_FORM_DEFAULT_VALUES,
  SERVICE_OPTIONS,
} from "./OrderForm.constants";
import type { OrderFormValues, SubmitStatus } from "./OrderForm.types";

// Decorative only — identifies the service option, not part of the form data model.
const SERVICE_ICONS: Record<(typeof SERVICE_OPTIONS)[number]["value"], LucideIcon> = {
  loaders: UserRound,
  cargo: Truck,
  moving: Boxes,
};

// Sends the order to the server route, which re-validates it and forwards
// it to the Telegram bot. `website` is a honeypot field for spam bots.
async function onSubmit(values: OrderFormValues, website: string): Promise<void> {
  const response = await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, website }),
  });

  if (!response.ok) {
    throw new Error(`Order request failed with status ${response.status}`);
  }
}

export function OrderForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [isOptionalOpen, setIsOptionalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const serviceGroupId = useId();
  const agreementId = useId();
  const optionalFieldsId = useId();
  const serviceErrorId = `${serviceGroupId}-error`;
  const agreementErrorId = `${agreementId}-error`;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: ORDER_FORM_DEFAULT_VALUES,
  });

  const selectedService = useWatch({ control, name: "service" });
  const phoneField = register("phone");

  const submitHandler = handleSubmit(async (values, event) => {
    const form = event?.target;
    const website =
      form instanceof HTMLFormElement ? String(new FormData(form).get("website") ?? "") : "";

    try {
      setStatus("submitting");
      await onSubmit(values, website);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div
        role="status"
        className="w-full rounded-md border border-border-default bg-surface-elevated/60 p-6 text-center shadow-card ring-1 ring-inset ring-primary/10 backdrop-blur-sm"
      >
        <Typography as="p" variant="h3" className="mb-2">
          Дякуємо!
        </Typography>
        <Typography as="p" variant="body" color="secondary">
          Ваша заявка надіслана.
        </Typography>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submitHandler} className="flex w-full flex-col gap-5">
      {/* Honeypot — hidden from people and assistive tech, filled only by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Ім'я"
          placeholder="Ваше ім'я"
          autoComplete="name"
          required
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Телефон"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+380 XX XXX XX XX"
          maxLength={17}
          required
          error={errors.phone?.message}
          {...phoneField}
          onChange={(event) => {
            event.target.value = formatUaPhoneInput(event.target.value);
            return phoneField.onChange(event);
          }}
        />
      </div>

      <div className="mt-1.5">
        <span className="mb-2 block text-body-small font-medium text-text-primary">
          Послуга
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        </span>

        <div
          role="radiogroup"
          aria-label="Послуга"
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? serviceErrorId : undefined}
          className="grid gap-2 sm:grid-cols-3"
        >
          {SERVICE_OPTIONS.map((option) => {
            const isSelected = selectedService === option.value;
            const Icon = SERVICE_ICONS[option.value];

            return (
              <label
                key={option.value}
                className={cn(
                  "group flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-[border-color,background-color,box-shadow] duration-150 ease-standard motion-reduce:transition-none focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background-primary",
                  isSelected
                    ? "border-primary bg-primary/[0.07] shadow-[0_0_0_1px_rgba(24,160,111,0.2),0_4px_14px_-8px_rgba(24,160,111,0.35)]"
                    : "border-border-default bg-surface-default/40 hover:border-primary/30 hover:bg-surface-default",
                )}
              >
                <input type="radio" value={option.value} className="sr-only" {...register("service")} />

                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-[color,background-color,border-color,box-shadow] duration-150 ease-standard motion-reduce:transition-none",
                    isSelected
                      ? "border-primary/30 bg-primary/15 text-primary"
                      : "border-border-default bg-surface-elevated text-text-secondary group-hover:text-primary",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>

                <Typography as="span" variant="bodySmall" weight={isSelected ? "semibold" : "medium"}>
                  {option.label}
                </Typography>
              </label>
            );
          })}
        </div>

        {errors.service && (
          <p id={serviceErrorId} className="mt-2 text-body-small text-danger">
            {errors.service.message}
          </p>
        )}
      </div>

      <div className="mt-1.5">
        <button
          type="button"
          onClick={() => setIsOptionalOpen((open) => !open)}
          aria-expanded={isOptionalOpen}
          aria-controls={optionalFieldsId}
          className="flex w-full items-center justify-between gap-2 rounded-md border border-white/10 bg-black/30 px-4 py-3 text-body-small font-medium text-text-secondary transition-colors duration-150 ease-standard hover:bg-black/40 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
        >
          <span className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Додати адресу або коментар
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-150 ease-standard motion-reduce:transition-none",
              isOptionalOpen && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence initial={false}>
          {isOptionalOpen && (
            <motion.div
              key="optional-fields"
              id={optionalFieldsId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : duration.default,
                ease: easing.standard,
              }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2">
                <Input
                  label="Адреса"
                  placeholder="Вкажіть адресу (необов'язково)"
                  error={errors.address?.message}
                  {...register("address")}
                />

                <Textarea
                  label="Коментар"
                  placeholder="Додаткові деталі (необов'язково)"
                  rows={3}
                  className="min-h-24"
                  error={errors.comment?.message}
                  {...register("comment")}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={agreementId}
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 rounded-[4px] accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
            aria-invalid={Boolean(errors.agreement)}
            aria-describedby={errors.agreement ? agreementErrorId : undefined}
            {...register("agreement")}
          />
          <label htmlFor={agreementId} className="text-body-small text-text-secondary">
            {AGREEMENT_TEXT}{" "}
            <Link
              href={AGREEMENT_LINK_HREF}
              className="text-primary underline underline-offset-2 transition-colors duration-150 ease-standard hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
            >
              {AGREEMENT_LINK_TEXT}
            </Link>
            .
          </label>
        </div>

        {errors.agreement && (
          <p id={agreementErrorId} className="mt-2 text-body-small text-danger">
            {errors.agreement.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-body-small text-danger">
          Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам:{" "}
          <a
            href={siteConfig.phone.href}
            className="whitespace-nowrap font-medium underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {siteConfig.phone.display}
          </a>
          .
        </p>
      )}

      {/* Form-specific override — the shared primary Button gradient reads
          too bright/mint for this darker glass panel, so only this instance
          is restyled to a darker forest-green fill; the Hero CTA keeps the
          approved shared styling untouched. */}
      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        disabled={isSubmitting}
        rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
        className="mt-1.5 bg-none bg-primary-deep text-text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_-4px_10px_-4px_rgba(0,0,0,0.4),0_0_0_1px_rgba(24,160,111,0.18),0_10px_26px_-14px_rgba(20,125,88,0.55)] hover:brightness-110 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),inset_0_-4px_10px_-4px_rgba(0,0,0,0.45),0_0_0_1px_rgba(24,160,111,0.25),0_14px_30px_-14px_rgba(20,125,88,0.65)] active:brightness-95 active:shadow-[inset_0_2px_5px_0_rgba(0,0,0,0.4)]"
      >
        Надіслати заявку
      </Button>
    </form>
  );
}
