# Render routing and rollback

The user already applied and we verified this order:

1. `/thank-you` → `/index.html` — Rewrite
2. `/services/vehicle-window-tinting` → `/services/vehicle-window-tinting/index.html` — Rewrite
3. `/*` → `/index.html` — Rewrite

Keep this successful single-route change. The code fix requires a separately approved build/deployment; changing a rewrite cannot fix hydration code.

For the next approved service rollout, verify each destination first, then add exact source-to-index rewrites above the catch-all for:

- `/services/tesla-window-tinting`
- `/services/vehicle-paint-protection`
- `/services/ceramic-coating`
- `/services/windshield-protection-film`
- `/services/commercial-window-tinting`
- `/services/residential-window-tinting`
- `/services/vehicle-paint-correction`
- `/services/headlight-services`

For each source above the destination is exactly `<source>/index.html`, action Rewrite. Add one at a time; validate HEAD/GET, body, canonical, schema and browser behavior. The remaining route inventory is in the CSV. Do not apply all routes automatically.

Maintainability: generating explicit rules from the verified prerender inventory is safer than manually maintaining duplicate lists. Render documents wildcard and placeholder substitutions, but broad section rules also match invalid slugs and need staging validation. Do not assume a missing rewrite destination falls through safely. A longer-term configuration should enumerate client-only routes and serve genuine 404 responses elsewhere; preview that before removing the catch-all.

Rollback: remove only the newly added rule(s). For source deployment, restore the prior successful Render deploy. Preserve thank-you and existing customer flows. Validate rollback by current content, not a historical fixed hash.

Caching: responses use `max-age=0, s-maxage=300`. Inspect cache state and body after a rule change. A Cloudflare response header does not establish a customer-managed Cloudflare zone. Render invalidates its CDN on successful deploys. Do not require or perform a blanket external purge without confirming ownership and approval.

Documentation: https://render.com/docs/redirects-rewrites and https://render.com/docs/static-sites
