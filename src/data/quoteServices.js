export const quoteServices = [
  {
    sourcePath: "/services/vehicle-window-tinting",
    slug: "vehicletint",
    service: "vehicle_tint",
    label: "Vehicle Window Tinting",
  },
  {
    sourcePath: "/services/tesla-window-tinting",
    slug: "teslatint",
    service: "tesla_tint",
    label: "Tesla Window Tinting",
  },
  {
    sourcePath: "/services/vehicle-paint-correction",
    slug: "ppf",
    service: "ppf",
    label: "Paint Correction",
  },
  {
    sourcePath: "/services/ceramic-coating",
    slug: "ceramic",
    service: "ceramic",
    label: "Ceramic Coating",
  },
];

export function getQuoteService(sourcePath) {
  return quoteServices.find((item) => item.sourcePath === sourcePath);
}

export function getThankYouService(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, "");
  return quoteServices.find((item) => `/thank-you/${item.slug}` === normalizedPath);
}

export function isThankYouPath(pathname) {
  return pathname === "/thank-you" || pathname.startsWith("/thank-you/");
}
