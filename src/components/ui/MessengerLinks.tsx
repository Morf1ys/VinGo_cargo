import { MessageCircle, Phone, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const MESSENGERS = [
  { id: "telegram", label: "Telegram", href: siteConfig.telegram.href, icon: Send },
  { id: "viber", label: "Viber", href: siteConfig.viber.href, icon: MessageCircle },
] as const;

const PILL =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-body-small font-medium text-text-secondary backdrop-blur-sm transition-[color,border-color,background-color] duration-150 ease-standard hover:border-primary/40 hover:bg-primary/[0.06] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary";

const PHONE_PILL =
  "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-2 text-body-small font-semibold text-text-primary shadow-[0_0_20px_-8px_rgba(24,160,111,0.6)] transition-[color,border-color,background-color,box-shadow] duration-150 ease-standard hover:border-primary/70 hover:bg-primary/15 hover:shadow-[0_0_24px_-6px_rgba(24,160,111,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary";

interface MessengerLinksProps {
  label?: string;
  withPhone?: boolean;
  className?: string;
}

export function MessengerLinks({ label = "Або напишіть:", withPhone = false, className }: MessengerLinksProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {label && <span className="text-body-small text-text-secondary">{label}</span>}
      {withPhone && (
        <a
          href={siteConfig.phone.href}
          aria-label={`Зателефонувати: ${siteConfig.phone.display}`}
          className={PHONE_PILL}
        >
          <Phone className="h-4 w-4 text-primary" strokeWidth={1.75} aria-hidden="true" />
          {siteConfig.phone.display}
        </a>
      )}
      {MESSENGERS.map(({ id, label: name, href, icon: Icon }) => (
        <a
          key={id}
          href={href}
          target={id === "telegram" ? "_blank" : undefined}
          rel={id === "telegram" ? "noopener noreferrer" : undefined}
          aria-label={`Написати у ${name}`}
          className={PILL}
        >
          <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} aria-hidden="true" />
          {name}
        </a>
      ))}
    </div>
  );
}
