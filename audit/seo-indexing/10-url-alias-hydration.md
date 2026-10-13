# Direct index.html aliases and complete prerender routing

The static build creates 42 route documents. Direct requests to their
`index.html` URLs served the right HTML, but React Router did not recognize
those paths and replaced the page with the NotFound screen during hydration.
An HTTP-only canonical check did not detect that failure.

The browser entry now normalizes an alias of the document's
`data-prerendered-path` before hydration. It uses history replacement to avoid
adding a back-button entry and preserves query parameters, fragments and
history state. Unknown fallback paths and client-only routes are untouched.
Clean URLs remain the canonical URLs in server HTML and the sitemap.

This is client URL normalization, **not an HTTP 301**. Render documents that
existing files take precedence over redirect/rewrite rules:
https://render.com/docs/redirects-rewrites
Consequently, adding dashboard redirects for existing index.html files would
not fix this. The original HTML remains fully rendered for clients without JS.

Ten additional exact production rewrites were added before the catch-all:

- /services/commercial-window-tinting
- /services/residential-window-tinting
- /services/vehicle-paint-correction
- /services/headlight-services
- /services/ceramic-coating
- /support
- /blog/llumar-vs-xpel-window-tint-dallas
- /blog/5-reasons-tint-car-windows-dallas-tx
- /tesla/cybertruck
- /brands/gtechniq

Each destination is the same path plus /index.html. Together with the earlier
rules, these cover every non-home prerender route.

Validation commands:

```powershell
node scripts/seo-path-normalization.test.mjs
npm run build
npm run test:seo:static
$env:CHROME_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'
node scripts/seo-url-variants-check.mjs
# Set SEO_BASE_URL=https://tinttekplus.com to repeat against production.
```

The variant browser suite tests every generated route's clean, slash and
index.html forms, waits beyond hydration, checks initial and final canonicals,
page content, query/fragment preservation and absence of the 404 screen. It
also confirms an unknown URL does not get normalized to the homepage. All
external and non-GET requests are blocked; no leads are submitted.

Local verification: production build and 42-route static checks passed;
126 browser cases passed (125 generated-page variants plus the unknown-route
guard); 10 normalization unit cases passed; changed application files passed
ESLint. Service/Tesla alias quote dialogs, chat opening and client navigation
passed, as did a desktop service alias quote check. Three existing static
warnings remain for missing H1 elements on gallery, support and blog listing.

Remaining separate limitation: the SPA catch-all still returns HTTP 200 for
unknown URLs. Changing that requires preserving the simulator, chat, thank-you
and other non-prerendered application routes while introducing proper 404
responses. It is not solved by this alias fix.
