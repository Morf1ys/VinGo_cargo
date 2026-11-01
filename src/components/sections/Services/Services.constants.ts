import { Building2, CircleCheck, House, Truck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FeaturedService {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FEATURED_SERVICES: readonly FeaturedService[] = [
  {
    id: "loaders",
    title: "Вантажники",
    description:
      "Акуратне завантаження, розвантаження та перенесення меблів, техніки й особистих речей.",
    icon: Users,
  },
  {
    id: "apartment-moving",
    title: "Квартирний переїзд",
    description:
      "Допомога з перенесенням, завантаженням і перевезенням речей під час квартирного переїзду.",
    icon: House,
  },
  {
    id: "office-moving",
    title: "Офісний переїзд",
    description:
      "Організоване перевезення меблів, техніки та робочих місць із мінімальними затримками.",
    icon: Building2,
  },
  {
    id: "cargo-taxi",
    title: "Вантажне таксі",
    description: "Оперативне перевезення меблів, техніки та інших великогабаритних вантажів.",
    icon: Truck,
  },
];

export interface AdditionalService {
  id: string;
  label: string;
}

export const ADDITIONAL_SERVICES: readonly AdditionalService[] = [
  { id: "furniture-transport", label: "Перевезення меблів" },
  { id: "materials-lifting", label: "Підйом будматеріалів" },
  { id: "rigging", label: "Такелажні роботи" },
  { id: "demolition", label: "Демонтаж" },
  { id: "waste-removal", label: "Вивіз сміття" },
];

export const ADDITIONAL_SERVICE_ICON: LucideIcon = CircleCheck;
