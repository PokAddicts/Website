// REFERENCE ONLY — this is not part of the Vite build and does not run in Node.
// It's Google Apps Script code: paste it into the product Sheet's
// Extensions -> Apps Script editor, then add an installable "On edit" trigger
// (Triggers icon in the left sidebar -> Add Trigger -> choose this function,
// event source "From spreadsheet", event type "On edit"). The first run will
// ask you to authorize it — that's expected.
//
// NOT WIRED UP YET: this only becomes useful once the site is deployed to a
// server (the planned VPS) with a small webhook endpoint that reruns
// `npm run build` and reloads. Fill in WEBHOOK_URL once that endpoint exists.
// Until then, refresh the site's data manually with `npm run sync-products`
// (or `npm run build`, which does this automatically) after editing the Sheet.

const WEBHOOK_URL = "REPLACE_ME_ONCE_THE_VPS_WEBHOOK_EXISTS";

function onProductSheetEdit(e) {
  if (WEBHOOK_URL.startsWith("REPLACE_ME")) {
    return; // not configured yet — no-op so edits don't error out
  }

  UrlFetchApp.fetch(WEBHOOK_URL, {
    method: "post",
    muteHttpExceptions: true,
  });
}
