# Test results and how to reproduce

## Checkout and base

The fixes are in `C:\code\Tint Tech Plus\prod code\TintTek-Website` on branch `fix/seo-hydration-recovery`, based on local `main` / `origin/main` commit `cce7d08e9f56a26e3b63ef8a9e753deea275c51d` at transfer time. The newer Render endpoint changes are preserved. The existing staged `coneversation.md` is excluded from the SEO commit.

## Verification after transfer (2026-10-12)

- Production build: PASS, 42 prerenders, zero failures.
- Static SEO checks: PASS, 42 routes; existing H1 warnings for gallery, support and blogs remain.
- Mobile browser suite: PASS, 12/12 routes with 500 ms lazy-script delay; no captured hydration errors or sampled heading disappearance. Quote interactions passed.
- Navigation/chatbot: PASS, 1/1; chatbot opens and deferred content appears after client navigation. External requests and submissions were blocked.
- Git verification at transfer time: branch HEAD equaled local main at `cce7d08`; newer endpoint files were unchanged. Only the user's original empty `coneversation.md` was staged. This verification preceded the subsequently requested commit and branch push; no deployment was performed.
- Evidence: `evidence/transfer-static.json`, `evidence/transfer-mobile.json`, and `evidence/transfer-navigation.json`. Screenshots: `seo-transfer-mobile.local/` and `seo-transfer-navigation.local/` in this checkout.

Desktop, throttled CPU and JavaScript-disabled results below were obtained in the original audit checkout; those suites were not repeated after transfer. Production routing still requires its separately documented deployment steps.

## Original audit-checkout results

- Final production build: PASS, 42 prerenders and zero prerender failures. Windows import failure is corrected with pathToFileURL.
- Static SEO suite: PASS, 42 routes. Remaining H1 warnings: gallery, support and blogs.
- Final mobile suite: **12/12 PASS**, 412×732, 500 ms lazy-script delay. No captured hydration errors, srcset warnings, failed local resources or sampled H1 disappearance. Original H1 nodes were retained.
- Desktop: **4/4 PASS** for vehicle tint, Tesla tint, ceramic and PPF, including opening/closing quote dialogs.
- Slower-loading test: **3/3 PASS**, 3-second lazy-script delays and 4× CPU throttle, vehicle tint / Model Y / LLumar.
- JavaScript-disabled checks: **3/3 PASS** for meaningful body and visible headings on the same three pages. This does not assert interactive behavior; the no-JS mobile header still uses a desktop layout and clips visually.
- Navigation/chatbot: **1/1 PASS**. Chat input opens without sending a message. BrowserRouter history navigation retains the document; four deferred sections start empty with active IntersectionObservers, then their product content appears. Near-viewport sections can reveal before scrolling, as designed.
- Quote tests use touch on mobile and pointer input on desktop. Ceramic/windshield initial failures were a test-coordinate problem: the click landed on the video container. Correct touch input opens both dialogs. City CTA correctly scrolls to its embedded TintWiz form instead of opening a dialog.
- External requests are blocked. No live leads, messages or conversion requests were sent. Form contents/submissions and actual analytics delivery are NOT validated.
- Earlier live route suite: 136 variants / 272 HEAD+GET requests, 44 failed expectations. Local source is not deployed; those failures are production routing follow-ups, not local build failures.
- Full repository lint previously failed with 1,646 findings including generated SSR output. Final comparison of changed source files: **69 existing errors reduced to 58**, warning count unchanged; new InViewMount has zero lint errors/warnings. Full-repository lint is not clean.
- Observer-unavailable fallback, full simulator interactions and field Core Web Vitals are not tested. No indexing improvement is claimed until production/GSC verification.

Baseline and isolation evidence is retained: baseline vehicle tint #421; Model Y/LLumar #418/#422 with replaced headings. Removing the unused media-query subscription alone removed #421 but exposed the child mismatch. The combined correction passes the final suites above. The earlier approval-service usage block was resolved when work resumed.

Evidence JSON is in `evidence/`; screenshots are in `seo-final-mobile.local/`, `seo-final-nojs.local/`, etc. Local directory-index serving is deliberate and does not prove Render routing configuration.

## Run locally (PowerShell)

From the preferred checkout:

```powershell
Set-Location 'C:\code\Tint Tech Plus\prod code\TintTek-Website'
npm ci --ignore-scripts
npm run build
npm run test:seo:static
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:SEO_DELAY = '500'
npm run test:seo:browser
```

If Chrome is elsewhere, set CHROME_PATH to that executable. Alternatively install Puppeteer's pinned browser with `npx puppeteer browsers install chrome` and omit CHROME_PATH.

Focused delayed-chunk test:

```powershell
$env:SEO_ROUTES = '/services/vehicle-window-tinting,/tesla/model-y,/brands/llumar'
$env:SEO_DELAY = '3000'
$env:SEO_CPU = '4'
$env:SEO_OUTPUT = 'seo-stress.local'
npm run test:seo:browser
```

Remove the SEO_ROUTES/SEO_CPU overrides for the default suite. Set SEO_DESKTOP=1 for desktop. The stress and desktop scenarios above were executed successfully; rerun them after further changes.

For visual review, open the PNG screenshots in `seo-final-mobile.local/` or watch a safe automated run:

```powershell
$env:SEO_HEADFUL = '1'
$env:SEO_ROUTES = '/services/vehicle-window-tinting'
npm run test:seo:browser
```

This opens an isolated Chrome window, runs the test and closes it. External tracking, frame requests and submissions remain blocked. The dialog shell and form URL are verified; a blank external iframe is expected in this mode. Avoid using ordinary Vite preview to test conversions, because it loads real tracking unless separately blocked. No preview server is a substitute for production Render HTTP checks.

Read-only production routing check:

```powershell
$env:SEO_ROUTES = '/services/vehicle-window-tinting'
npm run test:seo:http
```

Omit SEO_ROUTES to check the full inventory. Failures on other production routes are expected until routing is corrected. Tests exit nonzero on failed assertions.
