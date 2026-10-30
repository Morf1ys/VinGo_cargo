import { NAV_ITEMS } from "@/components/layout/Header/Header.constants";

export function FooterNav() {
  return (
    <nav aria-label="Розділи сторінки">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 lg:flex lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-5 lg:gap-y-2 xl:gap-x-6">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="rounded-sm text-body-small font-medium text-text-secondary transition-colors duration-150 ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
