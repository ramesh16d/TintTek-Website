import test from 'node:test';
import assert from 'node:assert/strict';
import { getQuoteFormUrl, getThankYouPath, getThankYouService, isThankYouPath } from '../src/data/quoteServices.js';

test('paint correction is never attributed to PPF', () => {
  assert.equal(getThankYouPath('vehicle-paint-protection'), '/thank-you/ppf');
  assert.equal(getThankYouPath('vehicle-paint-correction'), '/thank-you/paint-correction');
  assert.equal(getThankYouService('/thank-you/ppf/').eventService, 'ppf');
  assert.equal(getThankYouService('/thank-you/paint-correction').eventService, 'paint_correction');
});

test('unknown destination slugs are not treated as a service confirmation', () => {
  for (const path of ['/thank-you/unknown', '/thank-you/ppf/other', '/thank-you/toString']) {
    assert.equal(getThankYouService(path), undefined);
  }
});

test('all thank-you paths preserve the previously visited service page', () => {
  for (const path of ['/thank-you', '/thank-you/', '/thank-you/vehicletint', '/thank-you/ppf/']) {
    assert.equal(isThankYouPath(path), true);
  }
  assert.equal(isThankYouPath('/services/vehicle-window-tinting'), false);
  assert.equal(isThankYouPath('/thank-you-other'), false);
});

test('one configured form replaces different popup and contact fallbacks', () => {
  const environment = { VITE_TINTWIZ_PPF_FORM_URL: 'https://app.tintwiz.com/web/ce/ppf-test' };
  for (const fallback of ['https://app.tintwiz.com/web/ce/popup', 'https://app.tintwiz.com/web/ce/contact']) {
    assert.equal(getQuoteFormUrl('vehicle-paint-protection', fallback, environment), environment.VITE_TINTWIZ_PPF_FORM_URL);
  }
  assert.equal(getQuoteFormUrl('ceramic-coating', 'existing-ceramic', environment), 'existing-ceramic');
  assert.equal(getQuoteFormUrl('commercial-window-tinting', 'existing-commercial', environment), 'existing-commercial');
});

test('missing configuration preserves existing forms; invalid destinations fail explicitly', () => {
  assert.equal(getQuoteFormUrl('tesla-window-tinting', 'existing'), 'existing');
  for (const url of ['http://app.tintwiz.com/test', 'https://example.com/form', 'javascript:alert(1)']) {
    assert.throws(() => getQuoteFormUrl('tesla-window-tinting', 'existing', { VITE_TINTWIZ_TESLA_TINT_FORM_URL: url }));
  }
});
