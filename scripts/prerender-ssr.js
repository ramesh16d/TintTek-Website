/**
 * SSR-based static site generation.
 * Replaces the old Puppeteer prerender approach:
 *   - No headless browser required
 *   - Fast, reliable, runs in plain Node.js
 *   - Properly injects per-route <head> tags from react-helmet-async
 *   - Injects MUI/emotion critical CSS to eliminate FOUC
 *
 * Build pipeline:
 *   npm run build:client  →  vite build          (dist/)
 *   npm run build:ssr     →  vite build --ssr     (dist-ssr/)
 *   npm run prerender     →  node scripts/prerender-ssr.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const clientDist = path.join(rootDir, 'dist');
const serverDist = path.join(rootDir, 'dist-ssr');

const ROUTES = [
  '/',
  '/services/vehicle-window-tinting',
  '/services/tesla-window-tinting',
  '/services/commercial-window-tinting',
  '/services/residential-window-tinting',
  '/services/vehicle-paint-correction',
  '/services/vehicle-paint-protection',
  '/services/headlight-services',
  '/services/ceramic-coating',
  '/services/windshield-protection-film',
  '/gallery',
  '/support',
  '/blogs',
  '/blog/llumar-vs-xpel-window-tint-dallas',
  '/blog/5-reasons-tint-car-windows-dallas-tx',
  '/blog/residential-window-tinting-benefits-dfw',
  '/blog/paint-protection-film-dallas-texas',
  '/blog/headlight-restoration-protection-film-garland-tx',
  '/blog/headlight-tinting-protection-plano-tx',
  '/blog/ceramic-coating-frisco-tx',
  '/privacy-policy',
  // City landing pages
  '/locations/plano',
  '/locations/frisco',
  '/locations/richardson',
  '/locations/mesquite',
  '/locations/rowlett',
  '/locations/sachse',
  '/locations/wylie',
  '/locations/murphy',
  '/locations/allen',
  '/locations/mckinney',
  '/locations/carrollton',
  '/locations/addison',
  // Tesla model pages
  '/tesla/model-3',
  '/tesla/model-y',
  '/tesla/model-s',
  '/tesla/model-x',
  '/tesla/cybertruck',
  // Brand pages
  '/brands/llumar',
  '/brands/stek',
  '/brands/gtechniq',
  '/brands/exoshield',
  // Texas tint laws
  '/texas-window-tint-laws',
];

async function prerender() {
  // The client build produces dist/index.html with <!--app-head--> and <!--app-html-->
  // markers. We copy it to dist/index.template.html so subsequent prerender runs
  // always read the original (un-prerendered) template even after dist/index.html
  // has been overwritten by a previous prerender.
  const templatePath = path.join(clientDist, 'index.html');
  const backupPath = path.join(clientDist, 'index.template.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Client build not found. Run `npm run build:client` first.');
    process.exit(1);
  }

  // Use the backup if it exists (means we've run before); otherwise bootstrap it.
  let templateSource = templatePath;
  const rawHtml = fs.readFileSync(templatePath, 'utf-8');
  if (rawHtml.includes('<!--app-head-->')) {
    // Fresh client build — save a backup for future prerender runs.
    fs.copyFileSync(templatePath, backupPath);
  } else if (fs.existsSync(backupPath)) {
    // Template was already prerendered; read the original backup instead.
    templateSource = backupPath;
  } else {
    console.error('Template has no <!--app-head--> marker. Run `npm run build:client` first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templateSource, 'utf-8');

  // Extract the hashed CSS filename Vite injected so we can preload it early.
  // Vite places the <link rel="stylesheet"> near the end of <head>, but a
  // <link rel="preload" as="style"> at the very top of <head> tells the browser
  // to fetch the stylesheet immediately while still parsing the rest of the document.
  const cssMatch = template.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/);
  const cssPreloadTag = cssMatch
    ? `<link rel="preload" as="style" crossorigin href="${cssMatch[1]}">`
    : '';

  // Import the SSR bundle built by Vite
  const ssrEntry = path.join(serverDist, 'entry-server.js');
  if (!fs.existsSync(ssrEntry)) {
    console.error('SSR build not found. Run `npm run build:ssr` first.');
    process.exit(1);
  }
  const { render } = await import(ssrEntry);

  let succeeded = 0;
  let failed = 0;

  for (const route of ROUTES) {
    try {
      console.log(`  Rendering ${route} ...`);
      const { html, emotionStyles, helmet } = await render(route);

      // Collect per-route head tags from react-helmet-async
      // Filter out empty tags (e.g. <title data-rh="true"></title>)
      const helmetHead = [
        helmet?.title?.toString() ?? '',
        helmet?.priority?.toString() ?? '',
        helmet?.meta?.toString() ?? '',
        helmet?.link?.toString() ?? '',
        helmet?.script?.toString() ?? '',
        helmet?.noscript?.toString() ?? '',
        helmet?.style?.toString() ?? '',
      ]
        .filter(Boolean)
        .filter((tag) => !/<[a-z]+[^>]*><\/[a-z]+>/.test(tag) || tag.includes('content=') || tag.includes('href='))
        .join('\n    ');

      // Combine helmet tags + emotion critical CSS
      const injectedHead = `${helmetHead}\n    ${emotionStyles}`;

      // Inject CSS preload immediately after <head> so the browser starts
      // fetching the stylesheet before parsing the rest of the document.
      const pageHtml = template
        .replace('<head>', `<head>\n    ${cssPreloadTag}`)
        .replace('<!--app-head-->', injectedHead)
        .replace('<!--app-html-->', html);

      // Determine output path:  / → dist/index.html, /gallery → dist/gallery/index.html
      const outPath =
        route === '/'
          ? path.join(clientDist, 'index.html')
          : path.join(clientDist, route.slice(1), 'index.html');

      const outDir = path.dirname(outPath);
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

      fs.writeFileSync(outPath, pageHtml, 'utf-8');
      console.log(`    ✓ Saved ${path.relative(rootDir, outPath)}`);
      succeeded++;
    } catch (err) {
      console.error(`    ✗ Failed ${route}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nPrerendering complete: ${succeeded} succeeded, ${failed} failed.`);
  if (failed > 0) process.exitCode = 1;
}

prerender().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
