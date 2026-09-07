/**
 * RSVP -> Google Sheet handler.
 *
 * Setup:
 *   1. Open your spreadsheet, then Extensions > Apps Script.
 *   2. Delete the boilerplate `myFunction() {}` and paste this whole file in.
 *   3. Save, then Deploy > New deployment > type "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   4. Authorize when prompted (it's your own script, so "Advanced" ->
 *      "Go to project (unsafe)" is expected/safe on Google's warning screen).
 *   5. Copy the Web app URL (ends in /exec) into the site's .env file as
 *      VITE_RSVP_SCRIPT_URL.
 *
 * Each submission is appended as a new row to a sheet tab named "RSVP"
 * (created automatically on first submission) — your existing sheet/tabs
 * are left untouched.
 */

const SHEET_NAME = "RSVP";
const HEADERS = ["Timestamp", "Name", "Attending", "Guests", "Message"];

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const params = (e && e.parameter) || {};

  sheet.appendRow([
    new Date(),
    params.name || "",
    params.attending || "",
    params.guests || "",
    params.message || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput("RSVP endpoint is running.");
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }

  return sheet;
}
