# Tax Tracker V6 — Tax Calculator Development Preview

**Development build only — not for live deployment or tax filing.**

This package contains the V5-derived four-tab app, inherited safer restore logic from the V6 foundation, an isolated storage key (`cis-tax-tracker-v6-development`), and the first 2026/27 provisional England tax calculator.

## Contents
- `index.html` — existing app with the provisional Summary tax panel and optional business-use percentage on expenses.
- `tax-engine.js` — separate, testable calculation engine with UK 2026/27 rules.
- `test-engine.js` — Node.js arithmetic tests; run `node test-engine.js`.
- `manifest.webmanifest` — explicitly labelled DEV.

## Current behaviour
- Cash-basis working turnover = bank net + recorded CIS deductions, with withheld retention excluded until received as an ordinary retention-release payment.
- For 2026/27, 55p per mile for first 10,000 qualifying car/van miles and 25p thereafter. Historic 2025/26 rate 45p and 25p. 2027/28 figures intentionally not assumed.
- 2026/27 Income Tax 20%/40%/45%, Personal Allowance taper, Class 4 NI 6%/2%; the calculator is intentionally blocked for other tax years.
- Year-to-date annual-threshold illustration and adjustable full-year projection. Full-year forecast assumptions, payments on account, other credits and adjustments are temporary (not saved).
- Expenses have an optional provisional business-use percentage. Existing V5 expenses remain unchanged and default to 100% in the *calculation* until reviewed (do not assume they are finally deductible).
- Standard Friday payment calculations remain 5% retention then 20% CIS; bonus/release 20% CIS. Contractor-specific configurable rates are **not yet implemented**.

## Verification performed
- `node test-engine.js`: 13 checks passed (synthetic fixtures), including the £25,171.20 turnover / £19,793.74 profit / £3,156.07 illustrative surplus benchmark.
- Application inline JavaScript syntax compiled successfully.
- Not tested: iPhone UI, actual backup content/reconciliation, storage migrations across devices, restore interactions, security auditing, full HMRC filing-stage rounding, other-income and pension cases, final expense/mileage eligibility.

## Testing safely
Do not replace your live `tax-tracker` repository files. Use a **separate hostname/origin**, e.g. a separate account/subdomain for a development site; another GitHub repository under the SAME `brum80.github.io` hostname shares the origin and can potentially expose localStorage data. Our development build uses an isolated key, but separation by origin is safer. For local computer testing, serve the folder with `python3 -m http.server 8000` and open `http://localhost:8000`; never import your production backup into a public test site that you do not control.

Make a copy of the V5 JSON backup, use Restore backup in the DEV app, and compare 25 payments, 8 expenses, bank £20,136.96, CIS £5,034.24, mileage 9,440 and turnover £25,171.20. No original historical amount should change. Be cautious: this is not yet release-tested.

Tax position is not an actual tax refund entitlement or a filing-ready Self Assessment. Cash-basis and retention treatment, qualifying mileage, expenses, other income, payments on account and HMRC filing-stage rounding require further verification.
