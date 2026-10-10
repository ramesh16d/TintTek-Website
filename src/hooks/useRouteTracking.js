import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, setLastPageVisited } from "../utils/analytics";
import { isThankYouPath } from "../data/quoteServices";

// Fires once on mount (the initial page load) and again on every subsequent
// route change. Because it's the single place page_view/PageView gets sent
// (initAnalytics disables both platforms' automatic pageview), there's no
// double-counting between hydration and navigation.
export default function useRouteTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    trackPageView(window.location.pathname + window.location.search);
    // Recorded so the lead-form iframe's redirect to /thank-you can still
    // attribute the submission to the page it came from — see
    // setLastPageVisited's doc comment in analytics.js. Skipped on
    // /thank-you routes: those routes are lazy-loaded, so this effect (in the
    // eagerly-loaded AppContent) fires before ThankYou's chunk even
    // downloads — writing here would clobber the referrer before ThankYou
    // gets a chance to read it back.
    if (!isThankYouPath(location.pathname)) {
      setLastPageVisited(location.pathname);
    }
  }, [location.pathname, location.search]);
}
