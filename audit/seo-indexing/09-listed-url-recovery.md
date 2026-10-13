# Listed URL recovery — 2026-10-12

## Verified production findings

The user supplied all 23 URLs. Of these, 22 have real generated pages. Vehicle window tinting already serves its correct page. The other 21 canonical URLs return homepage HTML and canonical; all 21 /index.html destinations return HTTP 200 and their correct canonicals. PurePPF has no page: its generated destination returns 404; its bare URL falls back to the homepage.

## Render changes applied

Applied these 21 exact rules in the existing TintTek-Website Render static site, ABOVE the /* → /index.html catch-all. Keep the existing vehicle and thank-you rules. Do not create a second service or replace unrelated rules. The checked-in public/_redirects is not a substitute for configuring Render dashboard rules.

| Source | Destination | Action |
| --- | --- | --- |
| /blog/headlight-restoration-protection-film-garland-tx | /blog/headlight-restoration-protection-film-garland-tx/index.html | Rewrite |
| /blog/paint-protection-film-dallas-texas | /blog/paint-protection-film-dallas-texas/index.html | Rewrite |
| /brands/exoshield | /brands/exoshield/index.html | Rewrite |
| /brands/llumar | /brands/llumar/index.html | Rewrite |
| /brands/stek | /brands/stek/index.html | Rewrite |
| /locations/addison | /locations/addison/index.html | Rewrite |
| /locations/allen | /locations/allen/index.html | Rewrite |
| /locations/carrollton | /locations/carrollton/index.html | Rewrite |
| /locations/frisco | /locations/frisco/index.html | Rewrite |
| /locations/mckinney | /locations/mckinney/index.html | Rewrite |
| /locations/mesquite | /locations/mesquite/index.html | Rewrite |
| /locations/murphy | /locations/murphy/index.html | Rewrite |
| /locations/plano | /locations/plano/index.html | Rewrite |
| /locations/richardson | /locations/richardson/index.html | Rewrite |
| /locations/rowlett | /locations/rowlett/index.html | Rewrite |
| /locations/sachse | /locations/sachse/index.html | Rewrite |
| /locations/wylie | /locations/wylie/index.html | Rewrite |
| /privacy-policy | /privacy-policy/index.html | Rewrite |

| /tesla/model-3 | /tesla/model-3/index.html | Rewrite |
| /tesla/model-s | /tesla/model-s/index.html | Rewrite |
| /tesla/model-x | /tesla/model-x/index.html | Rewrite |

The first blog rule was applied and verified before the remaining rules were saved. All 22 real URLs then passed live checks. Rollback removes only these added rules. No wildcard group rules are needed.

## PurePPF

Excluded from the current sitemap and internal links. The user is unsure whether this brand is offered: create an accurate page only if offered; otherwise retire the obsolete URL with a genuine 404/410. Do not redirect to Gtechniq: these are different brands. Do not submit this nonexistent URL for indexing.

## Verification and indexing

After applying rules, run the HTTP check below. All 22 existing pages must return their own canonical and no noindex directive. The suite also checks trailing-slash and index.html variants. Then run Search Console Test Live URL on representative blog, brand, location, privacy and vehicle pages. Submit sitemap.xml and request indexing for priority corrected pages; repeated requests do not accelerate crawling. Indexing cannot be guaranteed.

```powershell
$env:SEO_ROUTES = '/blog/headlight-restoration-protection-film-garland-tx,/blog/paint-protection-film-dallas-texas,/brands/exoshield,/brands/llumar,/brands/stek,/locations/addison,/locations/allen,/locations/carrollton,/locations/frisco,/locations/mckinney,/locations/mesquite,/locations/murphy,/locations/plano,/locations/richardson,/locations/rowlett,/locations/sachse,/locations/wylie,/privacy-policy,/services/vehicle-window-tinting,/tesla/model-3,/tesla/model-s,/tesla/model-x'
$env:SEO_OUTPUT = 'seo-listed-after.local'
npm run test:seo:http
```

## Source change

Shared quick links expose all 12 existing service-area pages four real brand pages and five Tesla model pages as ordinary anchor links in prerendered HTML. Navigation no longer starts at opacity zero waiting for an intersection event. City labels describe service areas, not additional shop locations. This improves discovery but cannot substitute for the Render routing repair.

## Status

Production routing is fixed for all 22 real URLs in the supplied list. HTTP validation passed 66 variants / 132 requests, with zero failures. Google Search Console confirmed sitemap.xml was submitted successfully on October 12, 2026. Google also confirmed "Indexing requested" for https://tinttekplus.com/brands/llumar and added it to the priority crawl queue. Other URLs were submitted through the sitemap, not individually. Neither result proves inclusion in the index.

Additional source fixes: Tesla and privacy heroes use bounded viewport heights. The city hero starts visible rather than requiring its entrance animation to reveal the main content. Robots.txt allows crawling, and the live sitemap contains all 22 real URLs and excludes PurePPF.

## Local verification of supporting source changes

Production build: 42 prerenders, zero failures. Static checks: all 42 passed (existing missing-H1 warnings for gallery/support/blogs remain). Browser checks: five representative routes passed, including quote interactions where present. JavaScript-disabled checks: city, privacy and Tesla pages all passed. All 21 existing location/brand/Tesla routes have real href links in homepage HTML. Browser checks now reject headings hidden by zero-opacity ancestors. External requests and submissions were blocked during local tests. Evidence is in listed-static.json, listed-browser.json, listed-nojs.json and listed-urls-after.json.

Supporting source changes require merging and deploying the fix branch; the Render routing changes are already live. PurePPF is not resolved or submitted: no page exists, the user is unsure whether the brand is offered, and the bare URL still inherits the existing catch-all. Other unlisted routes and unknown-route 404 behavior remain outside these exact rewrites.
