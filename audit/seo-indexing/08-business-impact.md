# Business impact and remaining content review

The strongest immediate benefit is delivering the actual vehicle-tint, Tesla-tint, PPF and ceramic service content at their canonical URLs. Stable hydration removes avoidable content replacement and gives users and crawlers a more reliable first view. Indexing and traffic improvements cannot be guaranteed.

Preserve TintWiz, navigation, chatbot and analytics integrations. The four core service quote dialogs work in mobile and desktop tests; ceramic and windshield also pass touch tests. The city quote action scrolls to its existing embedded form. External form contents and submissions were not tested. The `/quote` route currently renders a 404 view and deserves a separate functional repair. GTM presence is not evidence of successful lead conversion tracking.

Content categories:

- A: nine service pages and homepage: important indexable acquisition pages. Quote access is commercially important, but the missing `/quote` implementation must be resolved before recommending its indexability.
- B: Tesla models, brands, locations and articles: retain provisionally; evaluate distinct usefulness, factual claims and internal links.
- C: privacy, support, gallery, blogs listing, mockup, simulators and chat: decide based on real user purpose. Do not automatically noindex useful tools.
- D: thank-you is intentionally noindex in React; invalid routes should receive genuine HTTP 404. Unsupported brand entries should not be in the sitemap.

Specific content concerns: `CityPage.jsx` reuses a shared `landing-pages/Hero.jsx` headline across cities and interpolates city names in several service-benefit paragraphs; `src/data/cityData.js` provides some distinct data, so this is a review flag, not proof all cities are duplicates. Tesla and brand templates use separate data files and shared service sections. Static body hashes are distinct across 42 routes, but that only rules out exact duplicates, not near-duplicate or thin content. No mass-produced city copy has been added. The privacy text and Texas-law assertions were not substantively edited or legally verified.

Performance: module splitting remains; existing SSR content stays mounted. Field CWV, LCP/CLS comparisons, full mobile device coverage and all simulator interactions remain unmeasured. Prioritize reliable lead access and useful content over an increased indexed-URL count.
