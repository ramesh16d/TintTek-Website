import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollTo) {
      // The target may live in a below-fold InViewMount that only mounts once
      // scrolled near, so retry for a few seconds, jumping toward the bottom of
      // the page to trigger it. scroll-margin-top handles the fixed topbar offset.
      let tries = 0;
      const timer = setInterval(() => {
        const el = document.getElementById(state.scrollTo);
        if (el) {
          clearInterval(timer);
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (++tries > 25) {
          clearInterval(timer);
        } else {
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
        }
      }, 150);
      return () => clearInterval(timer);
    }

    window.scrollTo(0, 0);
  }, [pathname, state]);

  return null;
};

export default ScrollToTop;
