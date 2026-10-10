// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Box, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import "./App.css";

// Eagerly loaded — needed on every page before any route resolves
import Topbar from "./components/key-components/Topbar";
import ScrollToTop from "./components/ScrollToTop";
import SEO from "./components/SEO";
import useRouteTracking from "./hooks/useRouteTracking";
import { initAnalytics, trackEvent } from "./utils/analytics";
import { quoteServices } from "./data/quoteServices";

// Hero must be eager: it is the LCP element on the home page and hydrates first
import Hero from "./components/hero/Hero";

// ServicesPage is eagerly imported so its chunk is bundled into the main entry
// and is available before hydration — prevents a Suspense flash that causes
// Googlebot to screenshot an empty page (only the Topbar visible).
import ServicesPage from "./components/ServicesPage";

// Services is above-fold on the home page — eager import prevents a Suspense
// suspension during hydration that would flash the white body background.
import Services from "./components/landing/Services";

// Route-level components — each lands in its own chunk
const Testimonials = lazy(() => import("./components/landing/Testimonials"));
const Vision = lazy(() => import("./components/landing/Vision"));
const Footer = lazy(() => import("./components/key-components/Footer"));
const WhyChooseUs = lazy(() => import("./components/landing/WhyChooseUs"));
const Gallery = lazy(() => import("./components/sub-pages/Gallery"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const NotFound = lazy(() => import("./components/NotFound"));
const Blog = lazy(() => import("./components/Blog"));
const BlogDetail = lazy(() => import("./components/BlogDetail"));
const FAQ = lazy(() => import("./components/sub-pages/FAQ"));
const CommercialSimulator = lazy(() => import("./components/simulators/CommercialSimulator"));
const ResidentialSimulator = lazy(() => import("./components/simulators/ResidentialSimulator"));
const TeslaTintingPage = lazy(() => import("./components/simulators/TeslaSimulatorPage"));
const VehicleTintingPage = lazy(() => import("./components/simulators/VehicleSimulatorPage"));
const PPFpage = lazy(() => import("./components/simulators/PPFpage"));
const FullPageChatbot = lazy(() => import("./components/FullPageChatbot"));
const Mockup = lazy(() => import("./components/landing-pages/Mockup"));
const VideoCTA2 = lazy(() => import("./components/landing-pages/VideoCTA2"));
const SubCTA = lazy(() => import("./components/SubCTA"));
const SubContact = lazy(() => import("./components/SubContact"));
const SubQuickLinks = lazy(() => import("./components/SubQuickLinks"));
const CityPage = lazy(() => import("./components/CityPage"));
const TeslaModelPage = lazy(() => import("./components/TeslaModelPage"));
const BrandPage = lazy(() => import("./components/BrandPage"));
const TintLaws = lazy(() => import("./components/TintLaws"));
const ThankYou = lazy(() => import("./components/ThankYou"));

// Interaction-gated — only downloaded when the user triggers them
const Chatbot = lazy(() => import("./ChatBot"));
const ChatbotPopup = lazy(() => import("./components/ChatbotPopup"));

// Defers mounting children until they scroll near the viewport.
// SSR: starts ready so crawlers see content; client: waits for IntersectionObserver.
function InViewMount({ children, rootMargin = "200px" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(typeof window === "undefined");
  useEffect(() => {
    if (ready) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setReady(true); io.disconnect(); }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, ready]);
  return <div ref={ref} suppressHydrationWarning>{ready ? children : null}</div>;
}

// ---- Theme ----
export const theme = createTheme({
  palette: {
    primary: { main: "#2794d2" },
  },
});

export function AppContent() {
  const location = useLocation();
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const isHomePage = location.pathname === "/";
  const isChatPage = location.pathname === "/chat";

  // Boots GA4 + Meta Pixel once on the client; no-ops during SSR.
  useEffect(() => {
    initAnalytics();
  }, []);

  // Sends a page_view/PageView on every route change, including the first.
  useRouteTracking();

  // Delay chatbot teaser past the TBT-critical window (first ~4s of interaction)
  useEffect(() => {
    let popupTimer;
    if (isHomePage) {
      popupTimer = setTimeout(() => setShowPopup(true), 6000);
    }
    return () => clearTimeout(popupTimer);
  }, [isHomePage]);

  const handleOpenChatbot = (source = "floating_button") => {
    setShowPopup(false);
    setChatbotOpen(true);
    trackEvent("chatbot_open", "Chatbot", source);
  };
  const handleCloseChatbot = () => setChatbotOpen(false);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <>
      <Topbar handleOpenChatbot={() => handleOpenChatbot("topbar")} />

      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SEO
                  title="Window Tinting Garland & Dallas, TX | Tint Tek Plus"
                  description="Searching for window tinting Garland? Tint Tek Plus is the top-rated tint shop for auto, Tesla, home, and commercial window tinting in Garland and Dallas, TX. Experience premium ceramic tint, heat rejection, and UV protection."
                  canonical="https://tinttekplus.com/"
                  image="https://tinttekplus.com/v-window-tint/vehicle-window-tint.webp"
                  type="website"
                  jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: "Tint Tek Plus – Window Tinting Garland & Dallas, TX",
                    url: "https://tinttekplus.com/",
                    description: "Top-rated window tinting for auto, Tesla, home, and commercial in Garland and Dallas, TX.",
                    breadcrumb: {
                      "@type": "BreadcrumbList",
                      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://tinttekplus.com/" }],
                    },
                  }}
                />
                {/* Hero is eagerly imported — renders without waiting for any chunk */}
                <Hero />
                <Box
                  sx={{
                    background: `
        linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 14%, rgba(0,0,0,0.0) 46%),
        radial-gradient(circle at top left, rgba(39,148,210,0.1), transparent 88%),
        radial-gradient(circle at bottom right, rgba(77,184,240,0.12), transparent 90%),
        linear-gradient(180deg, #000 0%, #0f0f0f 100%)
      `,
                  }}
                >
                  {/* Services is eagerly imported — no Suspense needed, no hydration flash */}
                  <Services />
                  {/* Near-fold: own Suspense so WhyChooseUs hydrates independently */}
                  <Suspense fallback={null}>
                    <WhyChooseUs />
                  </Suspense>
                  {/* Below-fold: deferred until scrolled near + own Suspense.
                      rootMargin="800px" pre-loads content 800px before the
                      user reaches it, preventing scroll from sticking at
                      WhyChooseUs while IntersectionObserver catches up. */}
                  <InViewMount rootMargin="800px">
                    <Suspense fallback={null}>
                      <Testimonials />
                      <VideoCTA2 />
                    </Suspense>
                  </InViewMount>
                  <InViewMount rootMargin="800px">
                    <Suspense fallback={null}>
                      <Vision />
                      <SubCTA />
                      <SubContact />
                      <SubQuickLinks />
                      <Footer />
                    </Suspense>
                  </InViewMount>
                </Box>
              </>
            }
          />

          {/* Service detail pages */}
          <Route path="/services/:serviceId" element={<ServicesPage />} />

          {/* Blog list + detail */}
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Other pages */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/support" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/chat" element={<FullPageChatbot />} />
          <Route path="/mockup" element={<Mockup />} />

          {/* Simulators */}
          <Route
            path="/simulators/commercial-window-tinting"
            element={<CommercialSimulator />}
          />
          <Route
            path="/simulators/residential-window-tinting"
            element={<ResidentialSimulator />}
          />
          <Route
            path="/simulators/tesla-window-tinting"
            element={<TeslaTintingPage />}
          />
          <Route
            path="/simulators/vehicle-window-tinting"
            element={<VehicleTintingPage />}
          />
          <Route
            path="/simulators/vehicle-paint-protection"
            element={<PPFpage />}
          />

          {/* City landing pages */}
          <Route path="/locations/:city" element={<CityPage />} />

          {/* Tesla model-specific pages */}
          <Route path="/tesla/:model" element={<TeslaModelPage />} />

          {/* Brand pages */}
          <Route path="/brands/:brand" element={<BrandPage />} />

          {/* Texas Tint Laws */}
          <Route path="/texas-window-tint-laws" element={<TintLaws />} />

          {/* Lead form thank-you page */}
          <Route path="/thank-you" element={<ThankYou />} />
          {quoteServices.map(({ slug }) => (
            <Route key={slug} path={`/thank-you/${slug}`} element={<ThankYou />} />
          ))}

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Chatbot drawer */}
      <Suspense fallback={null}>
        <Chatbot open={chatbotOpen} onClose={handleCloseChatbot} />
      </Suspense>

      {/* Floating chat button (not on /chat) */}
      {!chatbotOpen && !isChatPage && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: (t) => t.zIndex.modal + 5,
          }}
        >
          <IconButton
            onClick={() => handleOpenChatbot("floating_button")}
            sx={{
              backgroundColor: "#2794d2",
              color: "white",
              "&:hover": { backgroundColor: "#1976c9" },
              width: 50,
              height: 50,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <ChatIcon />
          </IconButton>
        </Box>
      )}

      {/* Homepage chatbot teaser */}
      {showPopup && isHomePage && !chatbotOpen && (
        <Suspense fallback={null}>
          <ChatbotPopup
            onClose={handleClosePopup}
            onOpenChatbot={() => handleOpenChatbot("popup_teaser")}
          />
        </Suspense>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* For custom domain, import.meta.env.BASE_URL will be '/' */}
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
