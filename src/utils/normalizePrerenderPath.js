// Only normalize aliases of the document actually prerendered by our build.
// Do not turn unknown SPA fallback URLs into the homepage.
export function normalizePrerenderPath(location, prerenderedPath) {
  if (!prerenderedPath?.startsWith("/") || prerenderedPath.startsWith("//")) return null;
  const base = prerenderedPath === "/" ? "" : prerenderedPath.replace(/\/$/, "");
  const canonical = base || "/";
  if (location.pathname === canonical) return null;
  if (location.pathname !== `${base}/index.html` && location.pathname !== `${base}/`) return null;
  return canonical + location.search + location.hash;
}
