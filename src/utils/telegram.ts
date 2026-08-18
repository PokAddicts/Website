// TEST-ONLY wiring: calls the Telegram Bot API directly from the browser.
// The bot token is bundled into the public JS (Vite's VITE_ prefix does this
// intentionally) — fine for a low-stakes notification bot during testing,
// but should move to a real backend before this handles anything sensitive.

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[telegram] VITE_TELEGRAM_BOT_TOKEN / VITE_TELEGRAM_CHAT_ID not set — skipping notification.");
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      console.error("[telegram] sendMessage failed:", await res.text());
    }
  } catch (err) {
    console.error("[telegram] sendMessage errored:", err);
  }
}
