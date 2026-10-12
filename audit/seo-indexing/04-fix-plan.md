# Fix plan and scope

| Priority | Change | State / risk |
|---|---|---|
| P0 | Exact vehicle-tint Render rewrite | User applied; live verified |
| P1 | Remove unused service media query and preserve prerendered children | Implemented locally; 12-route hydration check passes |
| P1 | Correct brand sitemap entry | Implemented; inventory regression passes |
| P2 | Encode responsive-image URLs | Implemented; static checks and homepage browser warnings pass |
| P2 | Privacy metadata and semantic landing headings | Implemented; static checks pass |
| P2 | Windows SSR import URL | Implemented; complete production build passes |
| P1 | Ceramic/windshield mobile quote interaction | Verified with touch input; original test clicked the wrong element |
| P1 | Other route rewrites and unknown-route 404 handling | Production configuration pending separate approval |
| P1 | `/quote` and service-specific thank-you paths | Separate functional/conversion work; not silently introduced |

The shared InViewMount keeps lazy imports and Suspense. Direct prerendered visits hydrate existing sections instead of removing them; this can change work timing versus the broken gate. Client-navigation tests observed four initially empty deferred sections, then verified their content appeared. No measured field Core Web Vitals improvement is claimed.

Production-build, slower-loading, navigation, and quote tests have been run. Deployment still requires explicit user approval and post-deploy GSC verification. Do not modify tracking tags, submit real leads, automatically noindex simulators/mockup, or bulk-add unvalidated routes.
