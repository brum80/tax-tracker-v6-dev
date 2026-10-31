# Tax Tracker V6 — Friday Payments (Development only)

Update dated 31 October 2026. NOT filing software. Do not upload personal tax JSON records to a public GitHub repository.

## Changes
- Friday payment selection is now **Normal** or **Additional**.
- An optional payment note appears on both payment types.
- New payments reconstruct CIS from bank receipts using the existing 20% default, without maintaining a running retention balance. For £760 bank receipt: £190 CIS, £950 cash-basis turnover.
- The form shows bank received, CIS deducted and cash-basis turnover rather than contractual gross and retention.
- Notes are saved in JSON backups and are exported/imported with an optional `Note` column in income CSV.
- Original V5 `bonus` and `retention` types remain valid and display under Additional when editing; unchanged legacy financial amounts are preserved during note-only editing.
- The existing Sites improvements and calculator remain included.

## Safeguards
- This is a full development package, based on the V6 Site Edit Hotfix. Do not deploy to live V5.
- Export a fresh V6 JSON backup from the iPhone before updating the dev repository.
- Upload index.html, tax-engine.js, test-engine.js, test-sites.js, test-friday.js, manifest.webmanifest, README.md to **tax-tracker-v6-dev** root (replacing older copies).
- Refresh development Safari tab and check Normal/Additional buttons, notes, Summary and prior records.
- The app still lacks contractor-specific CIS selection and exemption/material deduction controls; use this development build only with the known 20% and no-other-deductions working model.
- Older stored payments remain unchanged unless edited. New normal payment `gross` stores the amount before CIS (net+CIS), and `held` is zero; historical records retain their previous `gross` and `held`. Do not use the mixed `gross` fields as a consistent contractual-gross series. Use net+CIS for turnover.
- No live repository actions performed.

## Tests run
- `node test-engine.js` 16 calculation checks
- `node test-sites.js` 6 site and migration checks
- `node test-friday.js` 4 payment and legacy-compatibility checks
- Extracted inline JavaScript passed `node --check`.
- Browser touch interaction and full backup restore on iPhone are not tested yet for this version.
