# V6 Sites development update — 30 October 2026

This is a DEVELOPMENT package only; DO NOT deploy to live V5.

Changes from the deployed V6 hotfix:
- Sites form has optional **Contractor paying you** and **Principal contractor** fields.
- Repeated site names are accepted; Friday dropdown distinguishes them by paying contractor.
- New Friday normal payments snapshot both contractor labels from the chosen site. Existing V5 and V6 payment records are not backfilled with invented values. If an existing payment is edited without changing site, its historical contractor snapshots remain unchanged.
- Editing site details does NOT rewrite historical payment snapshots or miles.
- CSV import of a name shared by multiple sites is considered ambiguous and requires clarification rather than picking an arbitrary site. Use a distinct site name in CSV until future imports support IDs.
- Expenses form mentions provisional business-use estimates, including home broadband **20%**; no percentages are silently applied to old records.
- An explicit £130,000 trading profit test expects income tax £44,703, Class 4 NI £3,856.60, combined £48,559.60.

Safety:
- Uses the existing isolated V6 development localStorage key. Restore/backup formats remain compatible with V5 records.
- Historical V5 fields, including gross/held/CIS, remain intact.
- Tax calculations still use provisional cash-basis turnover `net + cis`, not the historical held amount.
- No upload of personal JSON to GitHub. Before updating, export a fresh backup of V6 from its Summary.
- New fields are optional to preserve all 17 historic sites.

Deploy to tax-tracker-v6-dev only: replace index.html, tax-engine.js, test-engine.js, manifest.webmanifest, README.md in the development repo; DO NOT deploy to brum80/tax-tracker.

Testing: `node test-engine.js`. User acceptance pending: edit a site, add two namesake sites with different payers, create a test payment, check its site/contractor record then delete it, export/restore a backup and verify 25 payments / 8 expenses / 17 original sites and the unchanged £3,156.07 illustration.

Not yet implemented: CIS-rate selection by contractor, full MTD compliance, filing-stage rounding, external browser/device automation.
