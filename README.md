# Tax Tracker V6 — Data Safety development update (2 November 2026)

Development-only build, based on `tax-tracker-v6-cis-rates-final.zip`.

Changes:
- Validates expense business-use percentages, including numeric type and 0–100 bounds.
- Scans imported data for missing site references and inconsistent payment arithmetic. These are **review warnings**, not automatic rejection, because historical sites can legitimately have been removed and CIS/material exceptions can exist.
- Restore confirmation previews import counts, current counts, and up to five warnings.
- On restore, saves the previous raw development database to a separate isolated rollback localStorage key, and triggers a downloadable backup. Checks the new write before switching the in-memory database.
- When startup encounters corrupt data, a recovery screen provides both raw export and a button to restore a valid backup. A successful recovery reloads the app.
- No changes to existing tax formulas, Friday payments, Sites, or V5 storage key.

**Important limitations**
- This is a development build, not HMRC filing software.
- Financial discrepancies generate warnings because exceptions may be legitimate. Do not treat a warning-free file as tax-verified.
- Browser-download completion cannot be guaranteed by code; physically check that the pre-restore JSON file exists before relying on it.
- Rollback storage is not a substitute for a separately saved JSON backup.
- No browser/iPhone tests of these new recovery controls have yet been performed.
- The safety check tests use *synthetic fixtures only*. No personal bookkeeping JSON is bundled or meant to be uploaded to a public repository.

Testing: `node test-engine.js && node test-sites.js && node test-friday.js && node test-safety.js`.

**Deployment:** Update only the separate `tax-tracker-v6-dev` repository after exporting a clean V6 backup. Keep V5 untouched. Test validation/restore on a disposable browser profile or isolated test origin, not in the primary iPhone development storage.
