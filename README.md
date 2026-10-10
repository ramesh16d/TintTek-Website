# Tint Tek Plus website

React/Vite frontend with a Node/Express backend and external TintWiz quote forms.

This README was verified against local source on October 10, 2026. The current deployed version and hosting settings have not been confirmed. See the [code-verified audit and PPC plan](../TintTek-Plus-SEO-Audit.md) for findings, evidence limits, and the work requested by Cory.

## Start the UI locally

For Cory's quote-routing work, follow [the local quote test guide](TESTING-QUOTES.md)
and use `npm run dev:quotes`. This substitutes local test forms and disables
Google/Meta tracking. The regular dev command below uses real external embeds.

Run these commands from this repository:

```powershell
npm ci
npm run dev
```

Open the URL printed by Vite. The backend is not required to view the UI or work on routes and thank-you pages.

**External connections remain live:** quote forms embed TintWiz, chatbot/review components call a hardcoded Render backend, and index.html loads the production GTM container. Use test forms and an agreed development analytics configuration when testing submissions/tracking.

## Main files

| File | Purpose |
|---|---|
| index.html | HTML template, GTM container, and entry-client.jsx bootstrapping. |
| src/entry-client.jsx | React hydration/client rendering. |
| src/App.jsx | Routes and shared UI; service pages use /services/:serviceId. |
| src/components/ServicesPage.jsx | Service content and conditional quote components. |
| src/components/TeslaCTA.jsx | Quote dialogs for Tesla tint, vehicle tint, PPF, residential tint. |
| src/components/VideoCTA.jsx | Quote dialogs for ceramic, commercial tint, headlights, windshield film. |
| src/components/ImageCTA.jsx | Paint-correction quote dialog. |
| src/components/SubContact.jsx | Shared contact section with another embedded quote form. |
| src/components/ThankYou.jsx | Generic and service-specific thank-you pages. |
| src/components/QuoteForm.jsx | Shared TintWiz embed configuration and local test form. |
| src/data/quoteServices.js | Service names, destination paths, and form settings. |
| src/utils/analytics.js | Tracking helpers and previous-page storage. |
| src/hooks/useRouteTracking.js | React-navigation tracking. |
| src/data/ | Brand, city, Tesla-model, and blog data. |
| src/backend/Server.js | Chat/review API, persistence, and optional static serving. |
| src/entry-server.jsx | Build-time React rendering, separate from the API server. |

src/main.jsx is also present, but index.html currently references src/entry-client.jsx.

## Quote-form flow

The browser embeds a form hosted by TintWiz. TintWiz receives the submission; this project's backend does not handle quote submissions.

The service dialog and the bottom contact section are separate form entry points:

- Vehicle and Tesla tint dialogs use form ID gwnvrcfde7mplcffmgqi7sfqo8pcyt1t.
- PPF, paint-correction, and ceramic dialogs use ossbvx1pgf73ldzcej0iw4iryailzpad.
- Bottom SubContact sections use gwnvrcfde7mplcffmgqi7sfqo8pcyt1t, including on PPF/ceramic/paint-correction pages.

Actual successful-submit redirects are configured externally and have not been verified. Changing one shared form can affect multiple services.

The generic /thank-you and service paths /thank-you/vehicletint,
/thank-you/teslatint, /thank-you/ppf, /thank-you/ceramic, and
/thank-you/paint-correction are now implemented. PPF and paint correction remain
separate. Shared configuration in src/data/quoteServices.js and optional public
VITE_TINTWIZ_*_FORM_URL values connect service popup, contact, footer, package,
and mobile-menu entry points to each approved
TintWiz embed. The external success redirects still need TintWiz configuration.

## Build and preview

```powershell
npm run build
npm run preview
```

The build runs:

1. Vite client build into dist.
2. Vite SSR build into dist-ssr.
3. scripts/prerender-ssr.js generates route-specific nested index.html files.
4. generate-sitemap.cjs writes both public/sitemap.xml and dist/sitemap.xml.

Prerendering and sitemap generation maintain separate route lists. They still
disagree on PurePPF versus Gtechniq. Thank-you pages are now prerendered but excluded
from the sitemap; simulator routes remain absent from the prerender list.

Vite preview checks the built frontend, but production hosting rewrites/status behavior needs separate verification.

`npm run lint` is the existing lint command. `npm run test:quotes` runs focused
configuration tests, and tests/quote-flow.browser.mjs exercises the local simulation.

## Backend

Install dependencies from the repository root and use the root command:

```powershell
npm start
```

Server.js reads the repository-root .env. Configure secrets through your local environment/hosting secret settings; do not commit them.

| Variable | Used for |
|---|---|
| OPENAI_API_KEY | Chatbot and FAQ embeddings. |
| MONGODB_URI | Chat-message persistence. |
| GOOGLE_PLACE_ID | Google review lookup. |
| GOOGLE_PLACES_API_KEY | Google review lookup authorization. |
| PORT | Optional; defaults to 5001. |

The server preloads FAQ embeddings before listening, which can make external API calls. Its routes include POST /chat and GET /api/google-reviews.

The nested src/backend/package.json is not a reliable standalone setup yet: its start script references lowercase server.js and omits mongoose. Root npm start points to the correctly cased file and root dependencies include mongoose.

Frontend API URLs are hardcoded to the remote Render service. Starting a local backend does not automatically switch the frontend to it.

## Tracking and deployment

- index.html installs GTM-M93ZKCLX.
- analytics.js uses VITE_GA_MEASUREMENT_ID with fallback G-N4QT9CLD9T and optional VITE_META_PIXEL_ID.
- Inspect GTM to establish the actual Google tag configuration. Quote-test mode removes GTM from the dev HTML and suppresses external tracking calls.
- VITE_ values are bundled into frontend code; do not use them for secrets.
- Existing thank-you effects run on page mount; they are not proof of a new successful submission.
- Several phone actions hardcode the original tel number; forwarding-number integration must update visible text and the dial target.

package.json contains a gh-pages deployment command, public/_redirects contains static-host rules, and Express can serve dist. Confirm which deployment process is actually used before publishing. `npm run deploy` publishes via gh-pages; it is not a local test command.

The initial documentation review changed no application code. Subsequent local
quote-routing work added the service confirmation pages, shared form configuration,
and an isolated test mode. External TintWiz/GTM/GA4 settings and production
deployment have not been changed. Follow TESTING-QUOTES.md for the remaining integration.
