import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const output = path.resolve(root, process.env.SEO_OUTPUT || 'seo-results.local');
await fs.mkdir(output, { recursive: true });
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.woff2': 'font/woff2' };
// Local directory-index server: this models the proposed routing, NOT Render's
// current catch-all. Never submit a form or contact production from these tests.
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(dist, '.' + pathname);
    if (!file.startsWith(dist + path.sep) && file !== dist) throw new Error('Invalid path');
    if (!path.extname(file)) file = path.join(file, 'index.html');
    let body = await fs.readFile(file);
    if (file.endsWith('.html')) {
      // Capture actual server nodes before the deferred module starts hydration.
      body = Buffer.from(body.toString().replace('</body>', `<script>
        window.__seoInitial={h1:document.querySelector('h1'),text:document.getElementById('root').textContent};
        window.__seoSamples={total:0,hidden:0,removed:0};
        window.__seoTimer=setInterval(()=>{const h=window.__seoInitial.h1;if(!h)return;window.__seoSamples.total++;if(!h.isConnected)window.__seoSamples.removed++;if(!h.getBoundingClientRect().height)window.__seoSamples.hidden++;},25);
      </script></body>`));
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await puppeteer.launch({ headless: process.env.SEO_HEADFUL !== '1', ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
} catch (error) {
  await new Promise(resolve => server.close(resolve));
  throw error;
}
const routes = (process.env.SEO_ROUTES || '/,/services/vehicle-window-tinting,/services/tesla-window-tinting,/services/ceramic-coating,/services/vehicle-paint-protection,/services/windshield-protection-film,/tesla/model-y,/tesla/cybertruck,/locations/plano,/brands/llumar,/texas-window-tint-laws,/blog/llumar-vs-xpel-window-tint-dallas').split(',');
const results = [];
try {
  for (const route of routes) {
    const page = await browser.newPage();
    const desktop = process.env.SEO_DESKTOP === '1';
    const noJS = process.env.SEO_NO_JS === '1';
    if (noJS) await page.setJavaScriptEnabled(false);
    await page.setViewport(desktop ? { width: 1440, height: 1000 } : { width: 412, height: 732, isMobile: true, hasTouch: true });
    if (process.env.SEO_CPU) {
      const session = await page.createCDPSession();
      await session.send('Emulation.setCPUThrottlingRate', { rate: Number(process.env.SEO_CPU) });
    }
    const errors = [], warnings = [], resources = [];
    await page.setRequestInterception(true);
    page.on('request', request => {
      const url = new URL(request.url());
      if (url.origin !== origin || request.method() !== 'GET') return void request.abort();
      if (process.env.SEO_DELAY && request.resourceType() === 'script' && !/\/(index-|vendor-)/.test(url.pathname)) {
        setTimeout(() => request.continue().catch(() => {}), Number(process.env.SEO_DELAY));
      } else request.continue();
    });
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (/hydration|React error|srcset|descriptor/i.test(message.text())) warnings.push(message.text()); });
    page.on('response', response => { if (response.url().startsWith(origin) && response.status() >= 400) resources.push({ url: response.url().replace(origin, ''), status: response.status() }); });
    page.on('requestfailed', request => { if (request.url().startsWith(origin) && ['script', 'stylesheet'].includes(request.resourceType())) resources.push({ url: request.url().replace(origin, ''), error: request.failure()?.errorText }); });
    let result = { route, mode: { desktop, noJS, delayMs: Number(process.env.SEO_DELAY || 0), cpu: Number(process.env.SEO_CPU || 1) } };
    try {
      const response = await page.goto(origin + route, { waitUntil: 'networkidle2', timeout: 45000 });
      result.status = response.status();
      // networkidle2 may occur while deliberately delayed scripts are outstanding.
      await page.waitForNetworkIdle({ idleTime: 750, timeout: 30000 });
      result.dom = await page.evaluate(() => {
        clearInterval(window.__seoTimer);
        const h1 = document.querySelector('h1');
        return {
          title: document.title, canonical: document.querySelector('link[rel=canonical]')?.href,
          h1: h1?.textContent, retainedH1: !!h1 && window.__seoInitial?.h1 === h1,
          bodyChars: document.body.innerText.length,
          h1Visible: !!h1 && h1.getBoundingClientRect().height > 0 && getComputedStyle(h1).visibility !== 'hidden',
          overflow: document.documentElement.scrollWidth > innerWidth + 2,
          hydrationSamples: window.__seoSamples,
        };
      });
      await page.screenshot({ path: path.join(output, route.replace(/\W+/g, '_') + '.png') });
      // Exercise a quote dialog without loading third-party frames or submitting.
      const candidates = noJS ? [] : await page.$$('button');
      let quote;
      for (const candidate of candidates) {
        if (await candidate.evaluate(el => /get a free quote/i.test(el.textContent) && el.getBoundingClientRect().height > 0 && el.getBoundingClientRect().width > 0)) {
          quote = candidate;
          break;
        }
      }
      if (quote) {
        await quote.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
        // Let viewport-triggered CTA animations settle before a pointer click.
        await new Promise(resolve => setTimeout(resolve, 800));
        result.quoteTarget = await quote.evaluate(el => {
          const r = el.getBoundingClientRect();
          const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
          return { x: r.x, y: r.y, width: r.width, height: r.height, hit: hit?.outerHTML.slice(0, 250), innerWidth };
        });
        const { x, y, width, height } = result.quoteTarget;
        if (desktop) await page.mouse.click(x + width / 2, y + height / 2);
        else await page.touchscreen.tap(x + width / 2, y + height / 2);
        if (route.startsWith('/locations/')) {
          // City CTA intentionally scrolls to its embedded form, not a modal.
          await page.waitForFunction(() => scrollY < 5, { timeout: 5000 });
          result.quoteEmbedded = await page.$eval('iframe[title="Get Your Free Quote"]', el => ({ tintwiz: el.src.startsWith('https://app.tintwiz.com/'), hasLayout: el.getBoundingClientRect().height > 0 }));
          if (!result.quoteEmbedded.tintwiz || !result.quoteEmbedded.hasLayout) throw new Error('Embedded quote form missing');
        } else {
          await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
          result.quoteDialog = await page.$eval('[role="dialog"]', el => ({ visible: el.getBoundingClientRect().height > 0, tintwiz: !!el.querySelector('iframe[src*="tintwiz.com"]') }));
          await page.keyboard.press('Escape');
          await page.waitForSelector('[role="dialog"]', { hidden: true, timeout: 5000 });
        }
      }
      if (!noJS && process.env.SEO_NAVIGATION === '1') {
        const chat = await page.$('button:has(svg[data-testid="ChatIcon"])');
        if (!chat) throw new Error('Chat launcher missing');
        await chat.click();
        await page.waitForSelector('input[placeholder="Type a message…"]', { visible: true, timeout: 10000 });
        result.chatOpened = true;
        const close = await page.$('button:has(svg[data-testid="CloseIcon"])');
        if (close) await close.click();
        // Exercise BrowserRouter's history-navigation path without a document
        // reload, then verify offscreen sections appear through real scrolling.
        await page.evaluate(() => {
          window.__seoGateObservations = [];
          const NativeObserver = window.IntersectionObserver;
          window.IntersectionObserver = class extends NativeObserver {
            constructor(callback, options) {
              super(callback, options);
              this.isGate = options?.rootMargin === '400px';
            }
            observe(element) {
              if (this.isGate) window.__seoGateObservations.push({ initialChildren: element.childElementCount });
              return super.observe(element);
            }
          };
          window.scrollTo({ top: 0, behavior: 'instant' });
          history.pushState({}, '', '/brands/llumar');
          window.dispatchEvent(new PopStateEvent('popstate'));
        });
        await page.waitForFunction(() => document.querySelector('h1')?.textContent.includes('LLumar Window Film'));
        await page.waitForNetworkIdle({ idleTime: 500 });
        result.navigation = await page.evaluate(() => ({
          title: document.title,
          originalDocument: document.getElementById('root').dataset.prerenderedPath,
          productsInitiallyPresent: [...document.querySelectorAll('h2')].some(el => el.textContent.includes('Products We Install')),
          gateObservations: window.__seoGateObservations,
        }));
        if (!result.navigation.gateObservations.some(x => x.initialChildren === 0)) throw new Error('Client navigation did not defer any sections');
        for (let i = 0; i < 16; i++) {
          await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'instant' }));
          await new Promise(resolve => setTimeout(resolve, 150));
        }
        await page.waitForFunction(() => [...document.querySelectorAll('h2')].some(el => el.textContent.includes('Products We Install')));
        result.navigation.productsAfterScroll = true;
      }
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) { result.testError = error.message; }
    result.errors = [...new Set(errors)];
    result.warnings = [...new Set(warnings)];
    result.resources = resources;
    result.pass = result.status === 200 && (noJS || result.dom?.retainedH1) && result.dom?.h1Visible && !result.dom?.hydrationSamples?.hidden && !result.dom?.hydrationSamples?.removed && !result.errors.length && !result.warnings.length && !resources.length && !result.testError && (!result.quoteDialog || (result.quoteDialog.visible && result.quoteDialog.tintwiz));
    results.push(result);
    console.log(JSON.stringify(result));
    await page.close();
  }
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
await fs.writeFile(path.join(output, 'browser.json'), JSON.stringify(results, null, 2));
if (results.some(result => !result.pass)) process.exitCode = 1;
