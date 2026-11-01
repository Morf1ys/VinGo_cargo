export const siteConfig = {
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
} as const;

export type SiteConfig = typeof siteConfig;
