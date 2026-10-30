export const siteConfig = {
  phone: {
    display: "+38 (097) 336-37-33",
    href: "tel:+380973363733",
  },
  orderFormSectionId: "order-form",
} as const;

export type SiteConfig = typeof siteConfig;
