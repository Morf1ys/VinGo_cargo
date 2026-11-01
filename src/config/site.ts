export const siteConfig = {
  name: "VinGo",
  // Set NEXT_PUBLIC_SITE_URL to the production domain; until then the
  // host's own address is used
  // (Netlify: URL, Vercel: VERCEL_PROJECT_PRODUCTION_URL).
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),
  city: "Вінниця",
  serviceArea: "Вінниця та область",
  phone: {
    display: "+38 (097) 336-37-33",
    href: "tel:+380973363733",
  },
  telegram: {
    display: "@VinGo_Cargo",
    href: "https://t.me/VinGo_Cargo",
  },
  viber: {
    display: "+38 (097) 336-37-33",
    href: "viber://chat?number=%2B380973363733",
  },
  orderFormSectionId: "order-form",
  orderFormHref: "/#order-form",
} as const;

export type SiteConfig = typeof siteConfig;
