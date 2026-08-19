// REFERENCE ONLY — this is Google Apps Script code, not part of the Vite build.
//
// Setup:
// 1. Create a new Google Sheet (separate from the products one) — name it
//    something like "PokAddicts Submissions". Leave it empty; this script
//    creates the "Orders", "Reservations", and "Business Enquiries" tabs
//    (and their header rows) automatically on first submission of each kind.
// 2. In that Sheet: Extensions -> Apps Script. Delete the placeholder code
//    and paste this whole file in.
// 3. Replace SHARED_SECRET below with the value Claude gives you (also goes
//    into VITE_SHEETS_LOG_SECRET in .env — the two must match exactly).
// 4. Deploy -> New deployment -> gear icon -> Web app.
//    - Execute as: Me
//    - Who has access: Anyone
//    Click Deploy, authorize when prompted (expected — it's your own script
//    acting on your own Sheet), then copy the Web App URL it gives you.
// 5. Give that URL to Claude to wire into the site (VITE_SHEETS_LOG_URL).
//
// TEST-ONLY security note: like the Telegram bot token, this URL (and the
// shared secret) end up in the site's public JS — Vite inlines env vars as
// plain text, visible via View Source or the browser's Network tab. The
// ALLOWED_SHEETS whitelist and secret check below only filter out generic
// bots that scan for exposed Apps Script URLs and spam them blindly; they
// don't stop someone who specifically inspects this site's code. This
// endpoint can only append rows (no read access), so the real risk is junk
// rows in your sheet, not data theft. Move this server-side once the VPS
// exists for the real fix.

var SHARED_SECRET = "k2ive5bcj6370w9mqrnylda4thzsuop1";
var ALLOWED_SHEETS = ["Orders", "Reservations", "Business Enquiries"];

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    if (payload.secret !== SHARED_SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Forbidden" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheetName = payload.sheet;
    if (ALLOWED_SHEETS.indexOf(sheetName) === -1) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Unknown sheet" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = payload.data || {};

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    var headers;
    if (sheet.getLastRow() === 0) {
      headers = ["Timestamp"].concat(Object.keys(data));
      sheet.appendRow(headers);
    } else {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    var row = headers.map(function (header) {
      if (header === "Timestamp") return new Date();
      return Object.prototype.hasOwnProperty.call(data, header) ? data[header] : "";
    });
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
