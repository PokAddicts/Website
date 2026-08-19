// REFERENCE ONLY — this is Google Apps Script code, not part of the Vite build.
//
// Setup:
// 1. Create a new Google Sheet (separate from the products one) — name it
//    something like "PokAddicts Submissions". Leave it empty; this script
//    creates the "Orders", "Reservations", and "Business Enquiries" tabs
//    (and their header rows) automatically on first submission of each kind.
// 2. In that Sheet: Extensions -> Apps Script. Delete the placeholder code
//    and paste this whole file in.
// 3. Deploy -> New deployment -> gear icon -> Web app.
//    - Execute as: Me
//    - Who has access: Anyone
//    Click Deploy, authorize when prompted (expected — it's your own script
//    acting on your own Sheet), then copy the Web App URL it gives you.
// 4. Give that URL to Claude to wire into the site (VITE_SHEETS_LOG_URL).
//
// TEST-ONLY security note: like the Telegram bot token, this URL ends up in
// the site's public JS. Anyone who extracts it could POST junk rows into
// your sheet — low stakes (it's your own bookkeeping, not sensitive data),
// but worth moving server-side once the VPS exists.

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheetName = payload.sheet;
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
