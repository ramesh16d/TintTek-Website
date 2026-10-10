const fs = require('fs');
const path = require('path');

/**
 * Static Sitemap Generator
 * Generates sitemap.xml based on the same routes used for pre-rendering.
 * This avoids the need for crawling and ensures the sitemap is always up to date.
 */

const BASE_URL = 'https://tinttekplus.com';

const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/services/vehicle-window-tinting', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/tesla-window-tinting', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/commercial-window-tinting', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/residential-window-tinting', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/vehicle-paint-correction', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/vehicle-paint-protection', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/headlight-services', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/ceramic-coating', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/windshield-protection-film', priority: '0.8', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.8', changefreq: 'monthly' },
  { path: '/support', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/llumar-vs-xpel-window-tint-dallas', priority: '0.7', changefreq: 'yearly', lastmod: '2025-05-02' },
  { path: '/blog/5-reasons-tint-car-windows-dallas-tx', priority: '0.7', changefreq: 'yearly', lastmod: '2025-06-22' },
  { path: '/blog/residential-window-tinting-benefits-dfw', priority: '0.7', changefreq: 'yearly', lastmod: '2025-08-24' },
  { path: '/blog/paint-protection-film-dallas-texas', priority: '0.7', changefreq: 'yearly', lastmod: '2025-08-30' },
  { path: '/blog/headlight-restoration-protection-film-garland-tx', priority: '0.7', changefreq: 'yearly', lastmod: '2026-06-28' },
  { path: '/blog/headlight-tinting-protection-plano-tx', priority: '0.7', changefreq: 'yearly', lastmod: '2026-06-29' },
  { path: '/blog/ceramic-coating-frisco-tx', priority: '0.7', changefreq: 'yearly', lastmod: '2026-09-28' },
  { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
  // City landing pages
  { path: '/locations/plano', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/frisco', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/richardson', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/mesquite', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/rowlett', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/sachse', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/wylie', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/murphy', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/allen', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/mckinney', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/carrollton', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/addison', priority: '0.9', changefreq: 'monthly' },
  // Tesla model pages
  { path: '/tesla/model-3', priority: '0.8', changefreq: 'monthly' },
  { path: '/tesla/model-y', priority: '0.8', changefreq: 'monthly' },
  { path: '/tesla/model-s', priority: '0.8', changefreq: 'monthly' },
  { path: '/tesla/model-x', priority: '0.8', changefreq: 'monthly' },
  { path: '/tesla/cybertruck', priority: '0.8', changefreq: 'monthly' },
  // Brand pages
  { path: '/brands/llumar', priority: '0.8', changefreq: 'monthly' },
  { path: '/brands/stek', priority: '0.8', changefreq: 'monthly' },
  { path: '/brands/pureppf', priority: '0.8', changefreq: 'monthly' },
  { path: '/brands/exoshield', priority: '0.8', changefreq: 'monthly' },
  // Texas tint laws
  { path: '/texas-window-tint-laws', priority: '0.9', changefreq: 'yearly' },
];

const TODAY = new Date().toISOString().split('T')[0];

function generateSitemap() {
  console.log('🚀 Generating sitemap.xml...');

  const sitemapEntries = ROUTES.map(({ path, priority, changefreq, lastmod }) => {
    const url = `${BASE_URL}${path === '/' ? '' : path}`;
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod || TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;

  const publicPath = path.join(__dirname, 'public', 'sitemap.xml');
  const distPath = path.join(__dirname, 'dist', 'sitemap.xml');

  // Save to public folder (for future builds)
  fs.writeFileSync(publicPath, sitemapXml, 'utf-8');
  console.log(`✅ Saved to ${publicPath}`);

  // Also save to dist folder (if it exists) so it's included in the current deployment
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.writeFileSync(distPath, sitemapXml, 'utf-8');
    console.log(`✅ Saved to ${distPath}`);
  }
}

try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
