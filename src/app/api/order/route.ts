import { orderFormSchema } from "@/features/order-form/OrderForm.schema";
import { SERVICE_OPTIONS } from "@/features/order-form/OrderForm.constants";
import { formatUaPhone } from "@/features/order-form/OrderForm.phone";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";

function buildMessage(order: ReturnType<typeof orderFormSchema.parse>): string {
  const service = SERVICE_OPTIONS.find((option) => option.value === order.service)?.label ?? order.service;
  const submittedAt = new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  const lines = [
    "🆕 <b>Нова заявка з сайту</b>",
    "",
    `👤 <b>Ім'я:</b> ${escapeTelegramHtml(order.name)}`,
    `📞 <b>Телефон:</b> ${escapeTelegramHtml(formatUaPhone(order.phone))}`,
    `🛠 <b>Послуга:</b> ${escapeTelegramHtml(service)}`,
  ];

  if (order.address) lines.push(`📍 <b>Адреса:</b> ${escapeTelegramHtml(order.address)}`);
  if (order.comment) lines.push(`💬 <b>Коментар:</b> ${escapeTelegramHtml(order.comment)}`);

  lines.push("", `🕒 ${submittedAt}`);

  return lines.join("\n");
}

// In-memory anti-spam limit, per server instance.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentOrders = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentOrders.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    recentOrders.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentOrders.set(ip, recent);

  if (recentOrders.size > 5000) {
    for (const [key, times] of recentOrders) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) recentOrders.delete(key);
    }
  }
  return false;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot field: hidden from people, filled in by bots.
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.trim() !== ""
  ) {
    return Response.json({ ok: true });
  }

  const parsed = orderFormSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (isRateLimited(clientIp(request))) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    await sendTelegramMessage(buildMessage(parsed.data));
  } catch (error) {
    console.error("[order] Telegram delivery failed:", error);
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
