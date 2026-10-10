import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, setLastPageVisited } from "../utils/analytics";
import { isThankYouPath } from "../data/quoteServices";

// Track once per navigation, including React StrictMode's repeated effects.
// GTM's published page-view settings must also be checked for duplicate tags.
export default function useRouteTracking() {
  const location = useLocation();
  const lastTracked = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const visit = `${location.key}:${location.pathname}${location.search}`;
    if (lastTracked.current === visit) return;
    lastTracked.current = visit;
    trackPageView(window.location.pathname + window.location.search);
    // Recorded so the lead-form iframe's redirect to /thank-you can still
    // attribute the submission to the page it came from — see
    // setLastPageVisited's doc comment in analytics.js. Skipped on
    // /thank-you and its children: those routes are lazy-loaded, so this effect (in the
    // eagerly-loaded AppContent) fires before ThankYou's chunk even
    // downloads — writing here would clobber the referrer before ThankYou
    // gets a chance to read it back.
    if (!isThankYouPath(location.pathname)) {
      setLastPageVisited(location.pathname);
    }
  }, [location.key, location.pathname, location.search]);
}
