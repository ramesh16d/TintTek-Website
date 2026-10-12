# Evidence matrix — October 12, 2026

Work branch: `fix/seo-hydration-recovery`. No code has been deployed.

| Observation | Evidence | Confidence |
|---|---|---|
| Before the user added the single Render rule, all 41 non-home prerender paths returned byte-identical homepage HTML | Independent HEAD/GET checks; SHA-256 and canonical comparison | Confirmed at test time |
| Vehicle tint now returns dedicated HTML at the no-slash, slash and index.html variants | Post-rule live HTTP checks; `evidence/live-http.json` | Confirmed |
| Other no-slash public routes still return homepage content | `evidence/live-http.json`; inspect each row rather than assuming deployment state | Confirmed at test time |
| Correct service HTML still generated React #421 | Production Chrome, supplied GSC messages, and local production baseline | Confirmed |
| Removing the unused service-level media-query subscription replaced #421 with #418/#422 in the isolation test | `evidence/isolation-browser.json` | Confirmed; more than one cause |
| Initial InViewMount children differ between SSR and the client in five files | Source and baseline Model Y/LLumar browser failures | Confirmed |
| Combined fix retains original headings without hydration errors on 12 representative routes | `evidence/fixed-browser.json` | Confirmed in this test environment |
| Initial quote tests missed mobile buttons after scrolling | Captured click landed on video container; touch tests open ceramic/windshield dialogs | Test issue resolved; no form code changed |
| GSC's five failed resources are advertising/analytics requests | User-provided GSC resource list | Confirmed from supplied evidence |
| Four previously reported dynamic chunks return HTTP 200 JavaScript | Independent live GET checks | Confirmed now, not proof of historical availability |
| Sitemap contains pureppf while source and prerender contain gtechniq | Source, live sitemap, and failing static regression | Confirmed |
| Windows prerender fails on raw drive-letter dynamic import | `seo-baseline-build.log`; ERR_UNSUPPORTED_ESM_URL_SCHEME | Confirmed; fixed using pathToFileURL |
| Google indexed 19 URLs and excluded 37 | User-provided GSC summary | Not independently authenticated |

All nine Puku reports were located in `../archive/p0-googlebot-rendering/`. Their missing-deployment-files and stale-chunk explanations are contradicted or unsupported by later checks. No GSC credentials, Render dashboard inspection, Google-selected canonicals, or field Core Web Vitals data were available. Browser tests block external requests and never submit leads.
