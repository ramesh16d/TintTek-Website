import { startTransition, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const normalize = (pathname) => pathname.replace(/\/+$/, "") || "/";

/** Keep prerendered children mounted throughout hydration. On a client-side
 * navigation to another route, retain the original IntersectionObserver gate.
 * The static build stamps the root with its route; this value never changes.
 */
export default function InViewMount({ children, rootMargin = "400px" }) {
  const { pathname } = useLocation();
  const ref = useRef(null);
  const [ready, setReady] = useState(() => {
    if (typeof document === "undefined") return true;
    const prerenderedPath = document.getElementById("root")?.dataset.prerenderedPath;
    return !!prerenderedPath && normalize(prerenderedPath) === normalize(pathname);
  });

  useEffect(() => {
    if (ready) return;
    const reveal = () => startTransition(() => setReady(true));
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        reveal();
        observer.disconnect();
      }
    }, { rootMargin });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ready, rootMargin]);

  return <div ref={ref}>{ready ? children : null}</div>;
}

InViewMount.propTypes = {
  children: PropTypes.node,
  rootMargin: PropTypes.string,
};
