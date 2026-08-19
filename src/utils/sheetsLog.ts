// TEST-ONLY wiring: posts directly to a Google Apps Script Web App from the
// browser. See scripts/apps-script-log-sheet.gs.js for the server-side setup
// and the security tradeoff (same as src/utils/telegram.ts).

export type LogSheetName = "Orders" | "Reservations" | "Business Enquiries";

export async function logToSheet(
  sheet: LogSheetName,
  data: Record<string, string | number>
): Promise<void> {
  const url = import.meta.env.VITE_SHEETS_LOG_URL;

  if (!url) {
    console.warn("[sheetsLog] VITE_SHEETS_LOG_URL not set — skipping log.");
    return;
  }

  try {
    // text/plain avoids a CORS preflight (Apps Script Web Apps don't handle
    // OPTIONS requests), and no-cors avoids the browser blocking the opaque
    // response Apps Script sends back. We can't read success/failure from
    // this — it's fire-and-forget, same as the Telegram notifications.
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ sheet, data }),
      mode: "no-cors",
    });
  } catch (err) {
    console.error("[sheetsLog] failed:", err);
  }
}
