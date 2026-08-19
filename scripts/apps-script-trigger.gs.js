// REFERENCE ONLY — this is not part of the Vite build and does not run in
// Node. It's Google Apps Script code: paste it into the PRODUCTS Sheet's
// Extensions -> Apps Script editor (a separate Apps Script project from the
// one used for scripts/apps-script-log-sheet.gs.js — that one lives on your
// "PokAddicts Submissions" sheet, this one lives on your products sheet).
//
// What this does: every time you edit the products sheet, it tells GitHub
// to rebuild and redeploy the site, so changes go live automatically within
// about a minute — no manual rebuild needed from Claude anymore.
//
// Setup:
// 1. Create a GitHub Personal Access Token scoped ONLY to this repo:
//    GitHub -> Settings (your profile, not the repo) -> Developer settings
//    -> Personal access tokens -> Fine-grained tokens -> Generate new token.
//    - Repository access: "Only select repositories" -> choose "Website".
//    - Permissions -> Repository permissions -> Contents: "Read and write".
//    - Generate, then copy the token (starts with "github_pat_...").
// 2. Paste it into GITHUB_TOKEN below, replacing the placeholder.
// 3. In the Apps Script editor: Triggers (clock icon, left sidebar) ->
//    Add Trigger -> function: onProductSheetEdit -> event source: From
//    spreadsheet -> event type: On edit -> Save. Authorize when prompted
//    (expected — it's your own script acting under your own permissions).
// 4. Add a SECOND trigger the same way, but with event type "On change"
//    instead of "On edit". This one matters specifically for deleting or
//    inserting whole rows/columns — Google treats that as a different kind
//    of event than editing a cell's value, and "On edit" alone can miss it.
//    Both triggers call the same onProductSheetEdit function below.
//
// Security note: unlike the Telegram token / Sheets logging secret, this
// token never touches the site's public code — it lives only inside this
// Apps Script project, which only you can see. That's why there's no need
// to hand it to Claude or put it in a .env file.
//
// Rapid edits (e.g. typing across several cells quickly) will each fire a
// rebuild, but the workflow is configured to cancel an in-progress deploy
// when a newer one starts, so this just settles on the latest state once
// you stop editing — no cleanup needed on your end.

var GITHUB_TOKEN = "REPLACE_ME_WITH_YOUR_FINE_GRAINED_PAT";
var GITHUB_REPO = "PokAddicts/Website";

function onProductSheetEdit(e) {
  if (GITHUB_TOKEN.indexOf("REPLACE_ME") === 0) {
    return; // not configured yet — no-op so edits don't error out
  }

  UrlFetchApp.fetch("https://api.github.com/repos/" + GITHUB_REPO + "/dispatches", {
    method: "post",
    headers: {
      Authorization: "Bearer " + GITHUB_TOKEN,
      Accept: "application/vnd.github+json",
    },
    contentType: "application/json",
    payload: JSON.stringify({ event_type: "products-updated" }),
    muteHttpExceptions: true,
  });
}
