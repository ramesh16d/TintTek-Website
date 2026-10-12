# Root causes

1. **P0: production routing returns the wrong initial document.** The no-slash URL is the intended canonical, but the catch-all serves home HTML. The user-added exact vehicle-tint rewrite corrected that route. Other routes need their own approved configuration rollout. This is not proof of why Google excluded every URL.
2. **P1: unnecessary service-page update during hydration.** `ServicesPage` subscribed to `useMediaQuery` but never used its result. Removing it eliminated #421 in the isolated delayed-chunk test, exposing a separate child mismatch. Responsive styling and actually used mobile hooks remain.
3. **P1: mismatched initial deferred sections.** Five copies of InViewMount used `useState(typeof window === 'undefined')`: children exist on the server and disappear on the first client render. A shared component now initializes ready for the prerendered route, identified by a static root attribute. It never unmounts those children merely to defer them. Other client-navigated routes retain IntersectionObserver gating, and reveals use startTransition. The observer-unavailable fallback is implemented but has not yet been browser-tested.
4. **P1: inconsistent route inventories.** Sitemap lists an unsupported brand slug. Fixed to match the existing Gtechniq route; regression checks compare inventories.
5. **P2: invalid srcset URL tokens.** Spaces in three homepage service-image paths split candidates. URL encoding fixes the grammar without renaming assets or removing responsive candidates. Intrinsic width-descriptor accuracy remains a separate check.
6. **P2: missing privacy metadata.** The privacy page lacked SEO metadata and an H1. Added page-specific metadata and semantic heading; no legal copy changed. Shared landing hero now uses an H1 without changing appearance.

The GSC blank screenshot is consistent with rendering trouble, but its exact timing and mechanism have not been reproduced under Google's environment. Advertising-domain robots/CORS messages do not establish a rendering cause. No historical deployment is blamed for all exclusions.

Remaining: `/quote` has no router entry and displays NotFound; unknown paths return HTTP 200 through Render's catch-all; thank-you noindex is client-rendered; full content-quality, schema accuracy, simulator purpose, and conversion tracking reviews remain open.
