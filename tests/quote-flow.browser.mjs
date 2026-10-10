// Run against `npm run dev:quotes`. Existing Puppeteer dependency is used.
import assert from 'node:assert/strict';
import { existsSync, mkdirSync } from 'node:fs';
import puppeteer from 'puppeteer';
import { quoteServices, getThankYouPath } from '../src/data/quoteServices.js';

const origin = process.env.QUOTE_TEST_ORIGIN || 'http://127.0.0.1:5173';
assert(['127.0.0.1', 'localhost'].includes(new URL(origin).hostname), 'Only a local test server is allowed');
const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || [
  puppeteer.executablePath(),
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(path => existsSync(path));
console.log(`Starting local browser checks against ${origin}`);
const browser = await puppeteer.launch({ headless: true, executablePath, timeout: 90000 });
let page;
const pageErrors = [];
const failedLocalRequests = [];
try {
  page = await browser.newPage();
  page.setDefaultTimeout(60000);
  page.setDefaultNavigationTimeout(90000);
  const mobile = process.env.QUOTE_TEST_MOBILE === 'true';
  await page.setViewport(mobile
    ? { width: 390, height: 844, isMobile: true, hasTouch: true }
    : { width: 1360, height: 950 });
  const activate = async locator => {
    if (!mobile) return locator.click();
    const element = await locator.waitHandle();
    await element.scrollIntoView();
    await page.waitForFunction(target => {
      const rect = target.getBoundingClientRect();
      const box = [rect.x, rect.y, rect.width, rect.height].join(',');
      const top = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
      const state = window.__quoteTouchTarget || {};
      const count = state.target === target && state.box === box ? state.count + 1 : 0;
      window.__quoteTouchTarget = { target, box, count };
      return count >= 6 && rect.width > 0 && rect.height > 0 && target.contains(top);
    }, { polling: 'raf' }, element);
    await element.tap();
    await element.dispose();
  };
  const forbiddenRequests = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('requestfailed', request => {
    if (request.url().startsWith(origin)) failedLocalRequests.push({ url: request.url(), error: request.failure()?.errorText });
  });
  await page.setRequestInterception(true);
  page.on('request', request => {
    const url = new URL(request.url());
    if (/tintwiz\.com|googletagmanager\.com|google-analytics\.com|connect\.facebook\.net/.test(url.hostname)) {
      forbiddenRequests.push(request.url());
    }
    // Keep the regression test entirely local, including maps and reviews.
    if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol)) request.continue();
    else request.abort();
  });

  const services = process.env.QUOTE_TEST_SERVICES
    ? quoteServices.filter(service => process.env.QUOTE_TEST_SERVICES.split(',').includes(service.slug))
    : quoteServices;
  assert(services.length > 0, 'No matching service to test');
  for (const service of services) {
    const entries = process.env.QUOTE_TEST_ENTRIES?.split(',') || ['popup', 'bottom', 'footer',
      ...(['vehicletint', 'teslatint'].includes(service.slug) ? ['package'] : []),
      ...(mobile ? ['menu'] : [])];
    for (const entry of entries) {
      const source = `/services/${service.serviceId}`;
      console.log(`Checking ${service.slug}: ${entry}`);
      await page.goto(origin + source, { waitUntil: 'domcontentloaded' });
      let selector;
      if (entry === 'popup') {
        // Some CTAs have separate hidden mobile and visible desktop buttons.
        await activate(page.locator(() => Array.from(document.querySelectorAll('button')).find(button =>
          button.getAttribute('aria-label') === 'Open quote form' && button.getClientRects().length > 0)));
        selector = '[role="dialog"] [data-testid="quote-test-form"]';
      } else if (entry === 'footer') {
        await activate(page.locator('button[aria-label="Open footer quote form"]'));
        selector = '[role="dialog"] [data-testid="quote-test-form"]';
      } else if (entry === 'package') {
        await activate(page.locator(() => Array.from(document.querySelectorAll('button, a')).find(button =>
          button.textContent.trim() === 'Get an Estimate' && button.getClientRects().length > 0)));
        selector = '[role="dialog"] [data-testid="quote-test-form"]';
      } else if (entry === 'menu') {
        await activate(page.locator('button[aria-label="menu"]'));
        await activate(page.locator(() => Array.from(document.querySelectorAll('button')).find(button =>
          button.textContent.trim() === 'GET A QUOTE' && button.getClientRects().length > 0)));
        selector = '[role="dialog"] [data-testid="quote-test-form"]';
      } else {
        // Reach any deferred contact section without guessing a fixed delay.
        await page.waitForSelector('button[aria-label="Open quote form"]');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        selector = '[data-testid="quote-test-form"]';
      }
      await page.waitForSelector(selector, { visible: true });
      await page.locator(`${selector} button[type="submit"]`).click();
      assert.equal(new URL(page.url()).pathname, source, 'Empty form must not navigate');
      assert.equal(await page.$eval(selector, form => form.checkValidity()), false);
      assert.equal(await page.evaluate(() => (window.dataLayer || []).filter(e => e.event === 'quote_test_submit').length), 0);

      await page.locator(`${selector} input[name="testName"]`).fill('Local Test');
      await page.locator(`${selector} input[name="testEmail"]`).fill('invalid-email');
      await page.locator(`${selector} button[type="submit"]`).click();
      assert.equal(new URL(page.url()).pathname, source, 'Invalid email must not navigate');
      assert.equal(await page.$eval(selector, form => form.checkValidity()), false);
      await page.locator(`${selector} input[name="testEmail"]`).fill('test@example.com');
      assert.equal(await page.$eval(selector, form => form.checkValidity()), true);
      if (mobile) {
        // A touch does not trigger the contact card's desktop hover transform.
        await activate(page.locator(`${selector} button[type="submit"]`));
      } else {
        await page.locator(`${selector} button[type="submit"]`).click();
      }
      const destination = getThankYouPath(service.serviceId);
      await page.waitForFunction(path => window.location.pathname === path, {}, destination);
      await page.waitForFunction(() => (window.dataLayer || []).some(e => e.event === 'thank_you_page_view'));
      const events = await page.evaluate(() => window.dataLayer);
      const views = events.filter(e => e.event === 'thank_you_page_view');
      assert.equal(views.length, 1, 'StrictMode must not duplicate the destination event');
      assert.equal(views[0].service, service.eventService);
      assert.equal(views[0].source_page, source);
      assert.equal(views[0].test_mode, true);
      assert.equal(events.filter(e => e.event === 'page_view' && e.page_path === destination).length, 1);
      assert.match(await page.$eval('h1', h => h.textContent), new RegExp(service.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      assert.equal(await page.evaluate(() => sessionStorage.getItem('ttp_last_page')), source);

      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => (window.dataLayer || []).some(e => e.event === 'thank_you_page_view'));
      assert.equal(await page.evaluate(() => (window.dataLayer || []).filter(e => e.event === 'quote_test_submit').length), 0, 'Reload is not a new simulated submission');
      assert.equal(await page.evaluate(() => sessionStorage.getItem('ttp_last_page')), source);
      console.log(`PASS ${service.slug}: ${entry}, validation, destination, events, refresh`);
    }
  }
  await page.goto(origin + '/thank-you/not-a-service', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.body.innerText.includes('404'));
  assert.equal(await page.evaluate(() => (window.dataLayer || []).filter(e => e.event === 'thank_you_page_view').length), 0);
  assert.deepEqual(forbiddenRequests, [], 'Test mode must not request TintWiz or Google/Meta tags');
  assert.deepEqual(pageErrors, [], 'No uncaught page errors');
  console.log('PASS unknown destination and external tracking isolation');
  await page.goto(origin + '/thank-you/vehicletint', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => {
    const heading = document.querySelector('h1');
    return heading && getComputedStyle(heading.parentElement).opacity === '1';
  });
  mkdirSync('quote-test-results.local', { recursive: true });
  await page.screenshot({ path: `quote-test-results.local/thank-you-${mobile ? 'mobile' : 'desktop'}.png`, fullPage: false });
} catch (error) {
  console.error('Browser diagnostics:', JSON.stringify({ pageErrors, failedLocalRequests, url: page?.url() }));
  if (page) {
    console.error('Visible page:', (await page.evaluate(() => document.body.innerText)).slice(0, 2000));
    mkdirSync('quote-test-results.local', { recursive: true });
    await page.screenshot({ path: 'quote-test-results.local/failure.png', fullPage: false });
  }
  throw error;
} finally {
  await browser.close();
}
