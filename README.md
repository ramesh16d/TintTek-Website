# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Quote thank-you routes and tracking

The four campaign destinations are registered in `src/data/quoteServices.js`:

| Quote source | Thank-you destination |
| --- | --- |
| `/services/vehicle-window-tinting` | `/thank-you/vehicletint` |
| `/services/tesla-window-tinting` | `/thank-you/teslatint` |
| `/services/vehicle-paint-correction` | `/thank-you/ppf` |
| `/services/ceramic-coating` | `/thank-you/ceramic` |

Thank-you pages are prerendered, excluded from the sitemap, and marked
`noindex, follow`. Their `thank_you_page_view` data-layer event describes a page
view only; it is **not proof of a successful form submission and must not be
configured as a lead conversion**. A destination visit can be direct or repeated
on refresh. The embedded TintWiz form is cross-origin, so the website cannot
observe its success state or safely manufacture a submission ID.

Before using these URLs for live conversion goals, configure each appropriate
TintWiz form to redirect the top-level browser to its destination only after
successful submission. Test a successful submission and a failed/invalid
submission, and verify that the lead appears in TintWiz. Shared TintWiz form IDs
may need separate provider-side forms/configurations to support different
destinations. Those provider settings are not part of this repository.

Google Tag Manager, GA4, Ads conversions, and Google Call Forwarding also need
account-side review. Decide whether Ads conversions are direct or imported from
GA4, avoid counting both, and do not mark thank-you page views as conversions
until a reliable success signal and any required per-submission deduplication are
available. Verify call forwarding and number replacement in Ads/GTM; the source
repository alone cannot confirm those account settings.

`npm run test:quotes` checks the route mapping. `npm run build` prerenders the
pages; verify direct URL loads and refresh behavior on the actual staging host
before production deployment. The current code changes do not configure
TintWiz, Google accounts, or the live hosting service.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
