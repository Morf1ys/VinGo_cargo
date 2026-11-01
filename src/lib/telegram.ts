// Server-only: reads the bot token from env.

const TELEGRAM_API = "https://api.telegram.org";

export function escapeTelegramHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendTelegramMessage(html: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (!token || chatIds.length === 0) {
    throw new Error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.");
  }

  await Promise.all(
    chatIds.map(async (chatId) => {
      const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: html,
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true },
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        const details = await response.text().catch(() => "");
        throw new Error(`Telegram sendMessage failed (${response.status}) for chat ${chatId}: ${details}`);
      }
    }),
  );
}
