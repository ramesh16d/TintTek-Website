import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { normalizePrerenderPath } from "./utils/normalizePrerenderPath.js";

const rootElement = document.getElementById("root");
const canonicalLocation = normalizePrerenderPath(
  window.location,
  rootElement.dataset.prerenderedPath,
);
if (canonicalLocation) {
  // Render serves existing index.html files before redirect rules. Align the
  // browser route with their prerendered content before React hydrates it.
  window.history.replaceState(window.history.state, "", canonicalLocation);
}
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
