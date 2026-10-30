import { z } from "zod";
import { SERVICE_VALUES } from "./OrderForm.constants";
import { isValidUaPhone } from "./OrderForm.phone";

// Letters (Ukrainian, Latin, Russian), spaces, hyphens and apostrophes —
// covers names like "Ганна-Марія", "Мар'яна", "Ольга Петрівна".
const NAME_PATTERN = /^[\p{L}\s'’ʼ-]+$/u;

export const orderFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Введіть, будь ласка, ваше ім'я.")
    .max(50, "Ім'я занадто довге.")
    .regex(NAME_PATTERN, "Ім'я може містити лише літери, пробіл, дефіс або апостроф."),
  phone: z
    .string()
    .trim()
    .min(1, "Введіть номер телефону.")
    .refine(isValidUaPhone, "Введіть український номер у форматі +380 XX XXX XX XX."),
  service: z.enum(SERVICE_VALUES, "Оберіть послугу."),
  address: z.string().trim().max(200, "Адреса занадто довга.").optional(),
  comment: z.string().trim().max(1000, "Коментар занадто довгий.").optional(),
  agreement: z
    .boolean()
    .refine((value) => value === true, "Потрібно погодитися з політикою конфіденційності."),
});
