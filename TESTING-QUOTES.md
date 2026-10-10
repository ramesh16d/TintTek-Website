# Test quote destinations locally

## Verified on October 10, 2026

- Production build: passed; 48 pages prerendered, zero failures.
- Configuration tests: all five passed.
- Browser checks across targeted runs: popup and bottom forms for all five
  services on desktop and mobile; footer and mobile-menu forms for all five;
  vehicle/Tesla package estimate forms on desktop. Validation, destination,
  service/source events, and refresh behavior passed in those flows.
- All five built service destinations returned their own HTML with a single
  noindex robots tag and the expected canonical. They are absent from the sitemap.
- Focused lint and whitespace checks passed. Full-repository lint remains failing
  (337 errors and six warnings in the earlier run); this is not a clean-repository
  lint certification.
- Actual TintWiz submissions, GA4/Ads account setup, and deployed hosting are
  still unverified. No deployment or Google Call Forwarding change was made.

## 1. Start the local simulation

From PowerShell:

```powershell
Set-Location 'C:\code\Tint Tech Plus\prod code\TintTek-Website'
npm ci
npm run dev:quotes
```

Use the localhost address Vite prints (normally http://127.0.0.1:5173).
`npm run dev:quotes` uses a clearly labelled local form in place of the TintWiz
iframes. It does not send leads, and Google Tag Manager/Meta tracking are disabled
in this mode. Other website content such as maps still belongs to external services.
The mock form is enabled only by the development server's `quote-test` mode;
production builds use the real TintWiz embeds.

## 2. Test each service and its quote entry points

| Open this path | Expected destination |
|---|---|
| /services/vehicle-window-tinting | /thank-you/vehicletint |
| /services/tesla-window-tinting | /thank-you/teslatint |
| /services/vehicle-paint-protection | /thank-you/ppf |
| /services/ceramic-coating | /thank-you/ceramic |
| /services/vehicle-paint-correction | /thank-you/paint-correction |

1. Open a service page and click its **Get a Free Quote** button to open the popup.
2. Confirm the form says **Local test** with the correct service name.
3. Click **Simulate successful submission** with empty fields. Browser validation
   should prevent navigation. An invalid email must also fail validation.
4. Enter `Local Test` and `test@example.com`, then submit.
5. Check that the main browser address becomes the expected thank-you path and the
   heading names the correct service. The page explicitly says no real request was sent.
6. Return to the service page and repeat using the form in the bottom contact section.
7. Refresh the thank-you page: it should still render the same service. A refresh
   is a destination view, not another form submission.
8. Open `/thank-you/not-a-service`: it should show the existing not-found UI.

Also test the lower **Get a Free Quote** button, **Get an Estimate** in vehicle/Tesla
packages, and **GET A QUOTE** in the mobile navigation menu. They use the same
service configuration, including when the header is outside the service route.

Paint correction is deliberately separate from PPF. Cory still needs to clarify
whether his third campaign targets paint correction, PPF, or both.

## 3. Inspect local tracking

Open browser Developer Tools (F12), select Console, and run:

```javascript
window.dataLayer.filter(event =>
  ['quote_test_submit', 'thank_you_page_view', 'page_view'].includes(event.event)
)
```

For one simulated submission, expect one `quote_test_submit`, one destination
`page_view`, and one `thank_you_page_view`. The destination event includes `service`,
`page_path`, `source_page`, and `test_mode: true`. No name/email is recorded.
After a full reload the in-memory array resets; a new destination view appears,
but there must be no new `quote_test_submit`.

This demonstrates local events only. They will not appear in GA4 DebugView while
using this isolated mode. No Google Ads conversions are created by these tests.

## 4. Automated checks

```powershell
npm run test:quotes
# With dev:quotes still running in another terminal:
node tests/quote-flow.browser.mjs
# Optional mobile viewport and touch-input checks:
$env:QUOTE_TEST_MOBILE='true'
node tests/quote-flow.browser.mjs
Remove-Item Env:QUOTE_TEST_MOBILE
npm run build
npm run preview
```

The browser test uses the project's Puppeteer dependency, blocks external requests,
and covers all five services through popup, bottom-contact, and footer entry
points, plus the vehicle/Tesla package forms and the mobile navigation menu.
It can use an installed Chrome/Edge on Windows. If npm ci fails only on Puppeteer's
browser download, run `$env:PUPPETEER_SKIP_DOWNLOAD='true'` in PowerShell and retry
`npm ci`; the test will fall back to an installed browser.
If Vite selected a different port, set `QUOTE_TEST_ORIGIN` to that local origin
before running the browser test.

The regular production preview contains real TintWiz embeds and production tracking.
Use it for direct URL/rendering checks; do not submit real forms as a local simulation.
Generated `dist/thank-you/<slug>/index.html` files should contain the correct title,
heading, canonical, and a single `noindex, nofollow` robots tag. Thank-you paths
must not be listed in `dist/sitemap.xml`.

## 5. Connect real TintWiz forms before deployment

Local simulation does not configure or prove TintWiz's actual success behavior.

1. In TintWiz, obtain a separate approved form URL for each service whose success
   redirect differs. Set its successful-submit redirect to the corresponding full
   URL, e.g. `https://tinttekplus.com/thank-you/vehicletint`.
2. Confirm the redirect changes the top-level browser URL, not only the iframe.
   Use only provider-supported redirect/callback settings; the code does not
   guess query parameters or treat iframe load as success.
3. Copy `.env.example` to `.env.local` and put those embed URLs in the matching
   `VITE_TINTWIZ_*_FORM_URL` variables. Set the same build-time variables in hosting.
   Values are public embed URLs, not backend credentials.
4. Restart/rebuild after changing configuration. Service quote entry points read
   the same service setting. Blank settings preserve the existing URLs and therefore
   do not complete the live integration.
5. Check other services still use their intended forms; shared existing TintWiz
   forms must not be globally redirected to the wrong campaign.
6. Coordinate a labelled test lead using a test form/staging destination first.
   Verify the lead in TintWiz and its actual success redirect.
7. Cory configures one GA4 key event per destination and the intended Ads goals.
   Audit existing GTM triggers for duplicates before publishing.

The new paths send a `thank_you_page_view` data-layer event with service identity;
they do not automatically send a separate `Form` lead event. The old generic
`/thank-you` retains its legacy `Form` behavior. Destination-based conversions can
count direct/repeated visits according to the account's counting configuration.
Do not claim strict per-submission deduplication without a reliable submission ID.

The production host must serve each exact destination correctly. `_redirects`
includes explicit confirmation-page mappings for hosts supporting that format;
the Express route allowlist is also updated. Confirm the actual hosting platform
and test its responses after deployment. No deployment is performed by these steps.
