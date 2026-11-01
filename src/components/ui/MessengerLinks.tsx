import { MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Neutral icons (paper plane / chat bubble) with text labels rather than the
// messengers' trademarked logos.
export const MESSENGERS = [
  { id: "telegram", label: "Telegram", href: siteConfig.telegram.href, icon: Send },
  { id: "viber", label: "Viber", href: siteConfig.viber.href, icon: MessageCircle },
] as const;

const PILL =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-body-small font-medium text-text-secondary backdrop-blur-sm transition-[color,border-color,background-color] duration-150 ease-standard hover:border-primary/40 hover:bg-primary/[0.06] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary";

interface MessengerLinksProps {
  label?: string;
  className?: string;
}

/** "Або напишіть нам: [Telegram] [Viber]" row of glass pills. */
export function MessengerLinks({ label = "Або напишіть:", className }: MessengerLinksProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {label && <span className="text-body-small text-text-secondary">{label}</span>}
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
