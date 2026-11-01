# Tax Tracker V6 — CIS Rate Update (DEV ONLY)

- Payment note is shown only for **Additional** entries; on Normal payments it is hidden. Previously saved notes on Normal records are preserved when edited.
- Friday form now has a CIS rate selector: **20% default**, **0%**, **30%**. Same Normal and Additional options.
- New payments save the applied `cisRate` alongside the recorded net, CIS and turnover reconstruction. No retention ledger.
- Existing V5 records remain unchanged unless edited. For legacy records with no rate, editing a note at 20% preserves the saved gross/CIS/retention amounts. Selecting a different rate intentionally recalculates the selected payment; check the contractor statement before doing so.
- Optional income CSV column `CIS Rate` (0, 20, 30). Rows with unsupported rates are skipped; default is 20%.
- For illustration: £700 net at 30% produces £300 CIS and £1,000 turnover; £700 net at 0% produces £0 CIS and £700 turnover. No other deductions or materials adjustments are supported.
- The selected rate is a payment-level override, not automatically linked to site/contractor; contractor defaults can be considered later.
- **Never deploy over live V5.** Make a fresh V6 JSON backup before replacing files in the separate `tax-tracker-v6-dev` repository.
- Replace `index.html`, `tax-engine.js` and test files in the dev repository root. `manifest.webmanifest` unchanged. Keep your private backups out of public GitHub.
- Automated tests are code-level only; test new 0%, 20%, 30% entries and editing on iPhone before treating the update as accepted. All tax estimates remain provisional.
