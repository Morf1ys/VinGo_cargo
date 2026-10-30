import { Clock3, Headset, ShieldCheck, Truck, UserRoundCheck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type BenefitTier = "featured" | "medium" | "compact";

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tier: BenefitTier;
}

// The featured benefit is its own centered "hero" card, separate from the
// supporting grid below it — not part of a shared column-spanning grid.
export const FEATURED_BENEFIT: Benefit = {
  id: "on-time",
  title: "Приїжджаємо у домовлений час",
  description: "Виїжджаємо точно у визначений час.",
  icon: Clock3,
  tier: "featured",
};

// Order drives both the visual hierarchy (two medium, then three compact)
// and DOM order in the grid below the featured card.
export const SUPPORTING_BENEFITS: readonly Benefit[] = [
  {
    id: "careful-handling",
    title: "Бережно ставимося до ваших речей",
    description: "Акуратно переносимо меблі та техніку.",
    icon: ShieldCheck,
    tier: "medium",
  },
  {
    id: "fixed-price",
    title: "Фіксована вартість без прихованих платежів",
    description: "Вартість узгоджуємо ще до початку робіт.",
    icon: Wallet,
    tier: "medium",
  },
  {
    id: "own-fleet",
    title: "Власний транспорт різних розмірів",
    description: "Обираємо авто під обсяг вантажу.",
    icon: Truck,
    tier: "compact",
  },
  {
    id: "experienced-loaders",
    title: "Досвідчені вантажники",
    description: "Працюють лише перевірені фахівці.",
    icon: UserRoundCheck,
    tier: "compact",
  },
  {
    id: "available-24-7",
    title: "Працюємо 24/7",
    description: "Приймаємо заявки у будь-який час доби.",
    icon: Headset,
    tier: "compact",
  },
];
