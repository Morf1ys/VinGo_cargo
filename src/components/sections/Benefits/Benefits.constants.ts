import { Clock3, Headset, ShieldCheck, Truck, UserRoundCheck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

// Six equal benefits rendered as a symmetric 3×2 grid on desktop. Order is
// reading order: the most important trust message comes first.
export const BENEFITS: readonly Benefit[] = [
  {
    id: "on-time",
    title: "Приїжджаємо у домовлений час",
    description: "Виїжджаємо точно у визначений час.",
    icon: Clock3,
  },
  {
    id: "careful-handling",
    title: "Бережно ставимося до ваших речей",
    description: "Акуратно переносимо меблі та техніку.",
    icon: ShieldCheck,
  },
  {
    id: "fixed-price",
    title: "Фіксована вартість без прихованих платежів",
    description: "Вартість узгоджуємо ще до початку робіт.",
    icon: Wallet,
  },
  {
    id: "own-fleet",
    title: "Власний транспорт різних розмірів",
    description: "Обираємо авто під обсяг вантажу.",
    icon: Truck,
  },
  {
    id: "experienced-loaders",
    title: "Досвідчені вантажники",
    description: "Працюють лише перевірені фахівці.",
    icon: UserRoundCheck,
  },
  {
    id: "available-24-7",
    title: "Працюємо 24/7",
    description: "Приймаємо заявки у будь-який час доби.",
    icon: Headset,
  },
];
