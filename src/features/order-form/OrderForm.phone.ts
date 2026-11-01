
const MOBILE_CODES = new Set([
  "39", "50", "63", "66", "67", "68", "73", "77", "89",
  "91", "92", "93", "94", "95", "96", "97", "98", "99",
]);

function toNationalDigits(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("380")) return digits.slice(3);
  if (digits.length === 11 && digits.startsWith("80")) return digits.slice(2);
  if (digits.length === 10 && digits.startsWith("0")) return digits.slice(1);
  if (digits.length === 9 && !digits.startsWith("0")) return digits;

  return null;
}

export function isValidUaPhone(raw: string): boolean {
  const national = toNationalDigits(raw);
  if (!national) return false;

  return /^[3-6]/.test(national) || MOBILE_CODES.has(national.slice(0, 2));
}

export function normalizeUaPhone(raw: string): string | null {
  if (!isValidUaPhone(raw)) return null;
  return `+380${toNationalDigits(raw)}`;
}

function groupNational(national: string): string {
  return [national.slice(0, 2), national.slice(2, 5), national.slice(5, 7), national.slice(7, 9)]
    .filter(Boolean)
    .join(" ");
}

export function formatUaPhone(raw: string): string {
  const normalized = normalizeUaPhone(raw);
  return normalized ? `+380 ${groupNational(normalized.slice(4))}` : raw;
}

export function formatUaPhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, "");

  if (digits.startsWith("380")) digits = digits.slice(3);
  else if (digits.startsWith("38")) digits = digits.slice(2);
  else if (digits.startsWith("80")) digits = digits.slice(2);
  else if (digits.startsWith("3") && digits.length < 3) digits = "";
  else if (digits.startsWith("0")) digits = digits.slice(1);

  if (!digits) return raw.replace(/[^\d+]/g, "").slice(0, 4);

  return `+380 ${groupNational(digits.slice(0, 9))}`;
}
