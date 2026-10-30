import type { z } from "zod";
import type { orderFormSchema } from "./OrderForm.schema";

export type OrderFormValues = z.infer<typeof orderFormSchema>;

export type SubmitStatus = "idle" | "submitting" | "success" | "error";
