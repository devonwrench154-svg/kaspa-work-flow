/**
 * Kaspaflow — Google Sheets backend
 *
 * SETUP (one-time, ~3 minutes)
 * ────────────────────────────
 * 1. Go to script.google.com and create a new project.
 * 2. Paste this entire file, replacing any existing content.
 * 3. Click Deploy → New deployment.
 *    Type:              Web app
 *    Execute as:        Me
 *    Who has access:    Anyone
 * 4. Click Deploy, grant permissions when prompted.
 * 5. Copy the Web app URL (looks like https://script.google.com/macros/s/…/exec).
 * 6. Open sections.jsx and paste that URL into SHEETS_ENDPOINT.
 *
 * The script auto-creates two sheets:
 *   "Enquiries"  — contact form submissions
 *   "Bookings"   — slot reservations
 *
 * To update after code changes: Deploy → Manage deployments → edit the
 * existing deployment, change version to "New version".
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === 'enquiry') {
      writeEnquiry(ss, data);
    } else if (data.type === 'booking') {
      writeBooking(ss, data);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message });
  }
}

function writeEnquiry(ss, d) {
  const sheet = getOrCreateSheet(ss, 'Enquiries', [
    'Submitted At', 'Name', 'Firm', 'Position', 'Email',
    'Desk Size', 'Modules', 'Notes',
  ]);
  sheet.appendRow([
    d.submittedAt, d.name, d.firm, d.position, d.email,
    d.deskSize, d.modules, d.notes,
  ]);
}

function writeBooking(ss, d) {
  const sheet = getOrCreateSheet(ss, 'Bookings', [
    'Submitted At', 'Name', 'Email', 'Slot Date', 'Slot Time',
  ]);
  sheet.appendRow([d.submittedAt, d.name, d.email, d.slotDay, d.slotTime]);
}

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#003A70')
      .setFontColor('#ffffff');
  }
  return sheet;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: run this function once manually to test the sheet setup.
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  writeEnquiry(ss, {
    submittedAt: new Date().toISOString(),
    name: 'Test User', firm: 'Test Firm', position: 'Director',
    email: 'test@example.com', deskSize: '6–15',
    modules: 'Kaspaflow Hub', notes: 'This is a test row.',
  });
  writeBooking(ss, {
    submittedAt: new Date().toISOString(),
    name: 'Test User', email: 'test@example.com',
    slotDay: 'Mon 5 May', slotTime: '09:30',
  });
  Logger.log('Test rows written successfully.');
}
