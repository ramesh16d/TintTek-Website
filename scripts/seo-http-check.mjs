import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = process.env.SEO_BASE_URL || 'https://tinttekplus.com';
const fixtures = JSON.parse(await fs.readFile(path.join(root, 'scripts/seo-fixtures.json'), 'utf8'));
const source = await fs.readFile(path.join(root, 'scripts/prerender-ssr.js'), 'utf8');
const generated = [...source.split('const ROUTES = [')[1].split('];')[0].matchAll(/'([^']+)'/g)].map(m => m[1]);
const routes = process.env.SEO_ROUTES?.split(',') || [...new Set([...generated, ...fixtures.map(f => f.path)])];
const rows = [];
for (const route of routes) {
  const variants = route === '/' ? ['/'] : [route, route + '/', route + '/index.html'];
  for (const variant of variants) {
    try {
      const url = new URL(variant, base);
      const head = await fetch(url, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(20000) });
      const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
      const html = await response.text();
      const row = {
        route, variant, head: head.status, status: response.status,
        location: response.headers.get('location'), etag: response.headers.get('etag'),
        cache: response.headers.get('cf-cache-status'), cacheControl: response.headers.get('cache-control'),
        xRobots: response.headers.get('x-robots-tag'),
        sha256: createHash('sha256').update(html).digest('hex'),
        title: html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1],
        canonical: html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1],
        robots: html.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/)?.[1],
        h1: [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map(m => m[1].replace(/<[^>]*>/g, '')),
      };
      if (generated.includes(route)) row.pass = row.status === 200 && row.head === 200 && row.canonical?.replace(/\/$/, '') === ('https://tinttekplus.com' + route).replace(/\/$/, '') && !/noindex/.test(row.robots || '');
      else if (route.includes('nonexistent')) row.pass = row.status === 404;
      rows.push(row);
    } catch (error) { rows.push({ route, variant, error: error.message, pass: false }); }
  }
}
const output = path.resolve(root, process.env.SEO_OUTPUT || 'seo-results.local');
await fs.mkdir(output, { recursive: true });
await fs.writeFile(path.join(output, 'http.json'), JSON.stringify({ base, checkedAt: new Date().toISOString(), rows }, null, 2));
console.log(JSON.stringify({ requests: rows.length * 2, variants: rows.length, failed: rows.filter(r => r.pass === false).map(r => ({ path: r.variant, status: r.status, canonical: r.canonical, error: r.error })) }, null, 2));
if (rows.some(row => row.pass === false)) process.exitCode = 1;
