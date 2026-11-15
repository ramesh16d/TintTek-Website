# Legacy redirects and real 404s — 2026-11-06

Two Render dashboard changes, made in this order. Neither needs a code change
beyond what ships in this deploy. Render ignores `public/_redirects`; the rules
below have to be entered in the dashboard (TintTek-Website static site →
Redirects/Rewrites).

## Findings (live, 2026-11-06)

- Legacy URLs such as `/ceramic-coating-garland-tx` return **200 with the
  homepage** (via the `/*` catch-all) instead of 301 to the service page. Google
  treats them as homepage duplicates and any links to them don't reach the
  service pages.
- Unknown URLs return **200 with the homepage** (soft 404s).

## Step 1 — legacy 301s (safe, do first)

Add every row of `render-legacy-redirects.csv` as a **Redirect (301)** rule,
**above** the `/* → /index.html` catch-all. These sources have no file in
`dist/`, so the rules take effect. (www → non-www is already working; no rule needed.)

Verify:

```bash
curl -sI https://tinttekplus.com/ceramic-coating-garland-tx | grep -i '^\(HTTP\|location\)'
# expect: HTTP/2 301, location: /services/ceramic-coating
```

## Step 2 — replace the catch-all with explicit rules (real 404s)

Requires this deploy first: the build now writes `dist/404.html` (the NotFound
screen, `noindex`, no canonical). The old `public/404.html` stub was removed.

1. Make sure every row of `render-rewrites-full.csv` exists, above the catch-all.
   Most already do (see docs 05, 09, 10). Rows **not documented as added before**:
   `/services/tesla-window-tinting`, `/services/vehicle-paint-protection`,
   `/services/windshield-protection-film`, `/gallery`, `/blogs`,
   `/blog/residential-window-tinting-benefits-dfw`,
   `/blog/headlight-tinting-protection-plano-tx`, `/tesla/model-y`,
   `/texas-window-tint-laws`, plus the client-only routes (`/chat`, `/mockup`,
   `/simulators/*`). Compare against the dashboard and add what's missing.
2. Run the checks below **with the catch-all still in place**. Every row must
   return 200 with its own canonical.
3. Delete the `/* → /index.html` catch-all.
4. Run the checks again, then confirm unknown URLs now 404.

```bash
# every rewrite source should be 200
tail -n +2 render-rewrites-full.csv | cut -d, -f1 | tr -d '"' | while read p; do
  printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' "https://tinttekplus.com$p")" "$p"
done | grep -v '^200' || echo "all 200"

# unknown URL should be 404 with the noindex NotFound page
curl -s -o /dev/null -w '%{http_code}\n' https://tinttekplus.com/this-page-does-not-exist
curl -s https://tinttekplus.com/this-page-does-not-exist | grep -o '<meta[^>]*robots[^>]*>'
```

If unknown URLs still return 200 after removing the catch-all, or any listed
route 404s, re-add the catch-all (rollback) and check which rule is missing.

**Note:** any new prerendered page or client-only route added later needs its
own rewrite here, or it will 404 once the catch-all is gone. Regenerate
`render-rewrites-full.csv` from `scripts/prerender-ssr.js` `ROUTES` when that
happens.

## Code changes in this deploy

- `scripts/prerender-ssr.js`: also renders `dist/404.html` from `<NotFound />`,
  without `data-prerendered-path` and without the template's site-wide
  `index, follow` tag; fails the build if the page lacks `noindex`.
- `src/components/NotFound.jsx`: `noindex, follow`, no canonical (also covers
  client-side 404s).
- `src/components/SEO.jsx`: `canonical={false}` omits canonical and `og:url`.
- `src/components/ServicesPage.jsx`, `src/components/BrandPage.jsx`:
  BreadcrumbList no longer references the nonexistent `/services` and `/brands`
  pages (now Home → page).
