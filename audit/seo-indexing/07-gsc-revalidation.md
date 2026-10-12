# Google Search Console follow-up

After an approved deployment and successful HTTP/browser checks:

1. Inspect the exact no-slash vehicle-window-tinting canonical and run a fresh Live Test.
2. Confirm HTTP 200, crawl allowed, indexing allowed, correct service title and canonical in tested HTML, visible service content in the screenshot, and no React hydration errors.
3. Inspect failed resources by domain. Third-party ad robots/CORS failures alone are not a reason to block indexing or remove tracking.
4. If rendering is sound, request indexing once for this important page. Repeat for the other priority services only after their routing checks pass.
5. Submit/check the sitemap after its supported brand URL is deployed. Do not manufacture last-modified dates or submit invalid routes to raise URL totals.
6. Revisit URL Inspection after Google recrawls. Record last crawl, user-declared and Google-selected canonical, indexing status, and actual indexed content when available. A successful live test is not an indexing guarantee.

Needed exports: the exact 23 discovered URLs and four crawled-not-indexed URLs with last-crawl dates; indexed URL-level history; any relevant prior inspection HTML. The supplied counts do not identify every affected URL or establish deployment causality. No GSC API access was used.

Track qualified organic visits and successful service-specific leads separately from index totals. Do not trigger real conversions for this audit. The four proposed thank-you subroutes do not exist in this checkout.

Reference: https://support.google.com/webmasters/answer/9012289
