import assert from 'node:assert/strict';
import { normalizePrerenderPath } from '../src/utils/normalizePrerenderPath.js';

const normalize = (url, route) => normalizePrerenderPath(new URL(url, 'https://tinttekplus.com'), route);
assert.equal(normalize('/index.html?utm_source=google#services', '/'), '/?utm_source=google#services');
assert.equal(normalize('/services/vehicle-window-tinting/index.html?x=1#pricing', '/services/vehicle-window-tinting'), '/services/vehicle-window-tinting?x=1#pricing');
assert.equal(normalize('/locations/plano/', '/locations/plano'), '/locations/plano');
assert.equal(normalize('/locations/plano', '/locations/plano'), null);
assert.equal(normalize('/', '/'), null);
assert.equal(normalize('/missing/index.html', '/'), null);
assert.equal(normalize('/services/missing/', '/services/vehicle-window-tinting'), null);
assert.equal(normalize('/thank-you', '/'), null);
assert.equal(normalize('/index.html', undefined), null);
assert.equal(normalize('/index.html', '//other.example'), null);
console.log('URL normalization: 10 cases passed');
