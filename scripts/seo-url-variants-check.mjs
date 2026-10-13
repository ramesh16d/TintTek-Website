import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const source = await fs.readFile(path.join(root, 'scripts/prerender-ssr.js'), 'utf8');
const routes = [...source.split('const ROUTES = [')[1].split('];')[0].matchAll(/'([^']+)'/g)].map(m => m[1]);
const output = path.resolve(root, process.env.SEO_OUTPUT || 'seo-url-variants.local');
await fs.mkdir(output, { recursive: true });
const types = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.mp4':'video/mp4'};
let server;
let base = process.env.SEO_BASE_URL;
if (!base) {
  server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let file = path.resolve(dist, '.' + pathname);
      if (!file.startsWith(dist + path.sep) && file !== dist) throw new Error('Invalid path');
      if (!path.extname(file)) file = path.join(file, 'index.html');
      // Match the existing SPA fallback for unknown routes to test that these
      // are NOT normalized to the prerendered homepage.
      let body;
      try { body = await fs.readFile(file); }
      catch { if (path.extname(file) !== '.html') throw new Error('Missing asset'); file = path.join(dist, 'index.html'); body = await fs.readFile(file); }
      res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'});
      res.end(body);
    } catch { res.writeHead(404); res.end('Not found'); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
}
const jobs = routes.flatMap(route => {
  const stem = route === '/' ? '' : route;
  return [...new Set([route, stem + '/', stem + '/index.html'])].map(variant => ({route, variant}));
});
jobs.push({route:null,variant:'/seo-nonexistent-variant-check/index.html'});
const rows = [];
let browser;
try {
  browser = await puppeteer.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
  let cursor = 0;
  await Promise.all(Array.from({length:4}, async () => {
    while (cursor < jobs.length) {
      const job = jobs[cursor++];
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewport({width:412,height:732});
      await page.setRequestInterception(true);
      page.on('request', request => {
        const url = new URL(request.url());
        if (url.origin !== new URL(base).origin || request.method() !== 'GET') request.abort();
        else request.continue();
      });
      const row = {...job};
      try {
        const response = await page.goto(base + job.variant + '?seo_variant_check=1#seo-check', {waitUntil:'networkidle2',timeout:45000});
        const initial = await response.text();
        // Ensure assertions cover the hydrated app, not just the first HTML paint.
        await new Promise(resolve => setTimeout(resolve, 1000));
        const dom = await page.evaluate(() => ({
          pathname:location.pathname, search:location.search, hash:location.hash,
          title:document.title, canonical:document.querySelector('link[rel="canonical"]')?.href,
          headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(e=>e.textContent),
          text:document.body.innerText,
        }));
        row.status=response.status();
        row.initialCanonical=initial.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
        row.initialMarker=initial.match(/data-prerendered-path="([^"]+)"/)?.[1];
        row.pathname=dom.pathname; row.title=dom.title; row.canonical=dom.canonical;
        row.notFound=dom.headings.includes('404'); row.errors=errors;
        row.queryAndHashPreserved=dom.search==='?seo_variant_check=1' && dom.hash==='#seo-check';
        row.pass=job.route ? row.status===200 && row.initialMarker===job.route && row.initialCanonical==='https://tinttekplus.com'+job.route && dom.canonical===row.initialCanonical && dom.pathname===job.route && !row.notFound && dom.text.length>500 && !errors.length && row.queryAndHashPreserved : dom.pathname===job.variant && row.notFound;
        if (job.variant==='/index.html' || job.variant==='/services/vehicle-window-tinting/index.html') await page.screenshot({path:path.join(output,job.route==='/'?'homepage.png':'vehicle-tint.png')});
      } catch(error) {row.pass=false;row.error=error.message;}
      finally {await page.close();}
      rows.push(row);
      if (rows.length % 25 === 0) console.log(`Checked ${rows.length}/${jobs.length} URL variants`);
    }
  }));
} finally {
  if(browser) await browser.close();
  if(server) await new Promise(resolve=>server.close(resolve));
}
rows.sort((a,b)=>a.variant.localeCompare(b.variant));
await fs.writeFile(path.join(output,'variants.json'),JSON.stringify({base,checkedAt:new Date().toISOString(),rows},null,2));
console.log(JSON.stringify({checked:rows.length,passed:rows.filter(r=>r.pass).length,failed:rows.filter(r=>!r.pass)},null,2));
if(rows.some(r=>!r.pass)) process.exitCode=1;
