import { CheckCircle2, ClipboardCheck, MessageCircle, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const STEPS: readonly Step[] = [
  {
    id: "request",
    number: "01",
    title: "Залишаєте заявку",
    description: "Коротко описуєте завдання або телефонуєте нам.",
    icon: ClipboardCheck,
  },
  {
    id: "align",
    number: "02",
    title: "Узгоджуємо деталі",
    description: "Швидко уточнюємо обсяг робіт, адресу та вартість.",
    icon: MessageCircle,
  },
  {
    id: "execute",
    number: "03",
    title: "Виконуємо переїзд",
    description: "Приїжджаємо у домовлений час і виконуємо всі роботи.",
    icon: Truck,
  },
  {
    id: "done",
    number: "04",
    title: "Готово",
    description: "Ви приймаєте виконану роботу без зайвого клопоту.",
    icon: CheckCircle2,
  },
];
