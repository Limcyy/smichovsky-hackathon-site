/**
 * Google Apps Script pro registrace — Maker Faire Brno
 * Sheet: https://docs.google.com/spreadsheets/d/1wm2Pe-4eUV063Hb2OfJ_-_SSAOdCrPwz6d14ZX2NGoE
 *
 * Hlavička řádku 1 (A1–J1):
 * timestamp | teamName | schoolName | motivation | teamSize |
 * captainName | captainEmail | captainPhone | members | membersDetailed
 *
 * Nasazení: Nasadit → Nové nasazení → Webová aplikace
 * Spouštět jako: Já | Kdo má přístup: Kdokoli
 * URL (/exec) vlož do registrace.html → WEB_APP_URL
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const p = e.parameter || {};

    sheet.appendRow([
      new Date(),
      p.teamName || '',
      p.schoolName || '',
      p.motivation || '',
      p.teamSize || '',
      p.captainName || '',
      p.captainEmail || '',
      p.captainPhone || '',
      p.members || '',
      p.membersDetailed || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
