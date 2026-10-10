import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  getQuoteService,
  getThankYouService,
  isThankYouPath,
  quoteServices,
} from "../src/data/quoteServices.js";

test("the requested service pages map to their dedicated thank-you routes", () => {
  assert.deepEqual(
    quoteServices.map(({ sourcePath, slug }) => [sourcePath, `/thank-you/${slug}`]),
    [
      ["/services/vehicle-window-tinting", "/thank-you/vehicletint"],
      ["/services/tesla-window-tinting", "/thank-you/teslatint"],
      ["/services/vehicle-paint-correction", "/thank-you/ppf"],
      ["/services/ceramic-coating", "/thank-you/ceramic"],
    ],
  );
});

test("thank-you routes resolve only known service slugs", () => {
  for (const { slug, service } of quoteServices) {
    assert.equal(getThankYouService(`/thank-you/${slug}`).service, service);
    assert.equal(getThankYouService(`/thank-you/${slug}/`).service, service);
  }
  assert.equal(getThankYouService("/thank-you/unknown"), undefined);
  assert.equal(getThankYouService("/thank-you/ppf/extra"), undefined);
});

test("unrelated quote source pages do not inherit a service conversion", () => {
  assert.equal(getQuoteService("/services/commercial-window-tinting"), undefined);
});

test("isThankYouPath matches thank-you routes only", () => {
  for (const path of ["/thank-you", "/thank-you/", "/thank-you/ppf"]) {
    assert.equal(isThankYouPath(path), true);
  }
  assert.equal(isThankYouPath("/thank-you-other"), false);
});

test("static-host rewrites include every service thank-you route", () => {
  const redirectsPath = fileURLToPath(new URL("../public/_redirects", import.meta.url));
  const redirects = readFileSync(redirectsPath, "utf8");
  for (const { slug } of quoteServices) {
    assert.ok(
      new RegExp(`^/thank-you/${slug}\\s+/thank-you/${slug}/index\\.html\\s+200$`, "m").test(redirects),
      `Missing static-host rewrite for ${slug}`,
    );
  }
});
