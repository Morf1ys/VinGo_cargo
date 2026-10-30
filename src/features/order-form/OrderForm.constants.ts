export const SERVICE_VALUES = ["loaders", "cargo", "moving"] as const;

export const SERVICE_OPTIONS: ReadonlyArray<{
  value: (typeof SERVICE_VALUES)[number];
  label: string;
}> = [
  { value: "loaders", label: "Вантажники" },
  { value: "cargo", label: "Вантажне перевезення" },
  { value: "moving", label: "Комплексний переїзд" },
];

export const AGREEMENT_TEXT = "Я погоджуюся з";
export const AGREEMENT_LINK_TEXT = "політикою конфіденційності";
// Privacy policy page is not built yet — route is a placeholder destination.
export const AGREEMENT_LINK_HREF = "/privacy";

export const ORDER_FORM_DEFAULT_VALUES = {
  name: "",
  phone: "",
  service: undefined,
  address: "",
  comment: "",
  agreement: false,
};
