import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFile(path.join(root, file), 'utf8');
const prerender = await read('scripts/prerender-ssr.js');
const routes = [...prerender.split('const ROUTES = [')[1].split('];')[0].matchAll(/'([^']+)'/g)].map(match => match[1]);
const sitemap = await read('dist/sitemap.xml');
const sitemapPaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const failures = [], warnings = [], results = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
check(new Set(routes).size === routes.length, 'Duplicate prerender routes');
check(JSON.stringify([...routes].sort()) === JSON.stringify([...sitemapPaths].sort()), 'Sitemap and prerender route inventories differ');
const hashes = new Map();
for (const route of routes) {
  try {
    const html = await read(path.join('dist', route, 'index.html'));
    const title = html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
    const robots = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/)?.[1];
    const h1 = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map(match => match[1].replace(/<[^>]*>/g, ''));
    const text = (html.split(/<body[^>]*>/)[1] || '').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const hash = createHash('sha256').update(text).digest('hex');
    check(!!title, `${route}: missing title`);
    check(canonical?.replace(/\/$/, '') === ('https://tinttekplus.com' + route).replace(/\/$/, ''), `${route}: incorrect canonical ${canonical}`);
    check(!/noindex/.test(robots || ''), `${route}: unexpectedly noindexed`);
    check(text.length > 500, `${route}: missing meaningful initial body`);
    check(html.includes(`data-prerendered-path="${route}"`), `${route}: missing hydration route marker`);
    check(!hashes.has(hash), `${route}: duplicates ${hashes.get(hash)}`);
    hashes.set(hash, route);
    if (h1.length !== 1) warnings.push(`${route}: ${h1.length} H1 elements`);
    for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^" ]+\.(?:js|css))"/g)) {
      try { await fs.access(path.join(root, 'dist', match[1])); } catch { failures.push(`${route}: missing ${match[1]}`); }
    }
    for (const match of html.matchAll(/srcSet="([^"]+)"/gi)) {
      for (const candidate of match[1].split(',')) check(/^\S+\s+\d+(?:\.\d+)?[wx]$/.test(candidate.trim()), `${route}: malformed srcset ${candidate}`);
    }
    results.push({ route, title, canonical, robots, h1, bodyChars: text.length, sha256: hash });
  } catch (error) { failures.push(`${route}: ${error.message}`); }
}
const output = path.resolve(root, process.env.SEO_OUTPUT || 'seo-results.local');
await fs.mkdir(output, { recursive: true });
await fs.writeFile(path.join(output, 'static.json'), JSON.stringify({ results, failures, warnings }, null, 2));
console.log(JSON.stringify({ routes: results.length, failures, warnings }, null, 2));
assert.equal(failures.length, 0, 'Static SEO checks failed (see static.json)');
