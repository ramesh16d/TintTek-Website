// Shared by the router, quote embeds, prerendering, and local tests.
// Paint correction remains separate from PPF until Cory confirms campaign scope.
export const quoteServices = [
  { serviceId: "vehicle-window-tinting", slug: "vehicletint", label: "Vehicle Window Tinting", eventService: "vehicle_tint", formEnv: "VITE_TINTWIZ_VEHICLE_TINT_FORM_URL" },
  { serviceId: "tesla-window-tinting", slug: "teslatint", label: "Tesla Window Tinting", eventService: "tesla_tint", formEnv: "VITE_TINTWIZ_TESLA_TINT_FORM_URL" },
  { serviceId: "vehicle-paint-protection", slug: "ppf", label: "Paint Protection Film (PPF)", eventService: "ppf", formEnv: "VITE_TINTWIZ_PPF_FORM_URL" },
  { serviceId: "ceramic-coating", slug: "ceramic", label: "Ceramic Coating", eventService: "ceramic", formEnv: "VITE_TINTWIZ_CERAMIC_FORM_URL" },
  { serviceId: "vehicle-paint-correction", slug: "paint-correction", label: "Paint Correction", eventService: "paint_correction", formEnv: "VITE_TINTWIZ_PAINT_CORRECTION_FORM_URL" },
];

export function getQuoteService(serviceId) {
  return quoteServices.find((service) => service.serviceId === serviceId);
}

export function getThankYouPath(serviceId) {
  const service = getQuoteService(serviceId);
  return service ? `/thank-you/${service.slug}` : "/thank-you";
}

export function isThankYouPath(pathname) {
  return pathname === "/thank-you" || pathname.startsWith("/thank-you/");
}

export function getThankYouService(pathname) {
  const path = pathname.replace(/\/+$/, "");
  return quoteServices.find((service) => path === `/thank-you/${service.slug}`);
}

export function getQuoteFormUrl(serviceId, fallback, environment = {}) {
  const service = getQuoteService(serviceId);
  const configured = service && environment[service.formEnv]?.trim();
  if (!configured) return fallback;
  // Configuration supplies embeds only, never guessed redirect parameters.
  const url = new URL(configured);
  if (url.protocol !== "https:" || url.hostname !== "app.tintwiz.com") {
    throw new Error(`Invalid TintWiz embed URL for ${service.serviceId}`);
  }
  return url.href;
}
