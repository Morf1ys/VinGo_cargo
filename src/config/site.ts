export const siteConfig = {
  name: "VinGo",
  // Production address of the site. Set NEXT_PUBLIC_SITE_URL in the hosting
  // env (e.g. https://vingo.com.ua) — used for canonical URLs, sitemap,
  // social previews and structured data.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  city: "Вінниця",
  phone: {
    display: "+38 (097) 336-37-33",
    href: "tel:+380973363733",
  },
  telegram: {
    display: "@MorFiyss",
    href: "https://t.me/MorFiyss",
  },
  viber: {
    display: "+38 (097) 336-37-33",
    // Opens a chat with this number in the Viber app (mobile and desktop).
    href: "viber://chat?number=%2B380973363733",
  },
  orderFormSectionId: "order-form",
  // Root-relative so the link also works from other pages (e.g. /privacy);
  // on the home page it's a plain same-page anchor jump.
  orderFormHref: "/#order-form",
} as const;

export type SiteConfig = typeof siteConfig;
