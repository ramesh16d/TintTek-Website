// src/components/ImageCarousel.jsx
// Apple-style gallery: contained to the page width, large rounded photo cards
// in a native scroll-snap track (swipe / trackpad / arrows), with pill
// pagination and round arrow controls underneath. No carousel library.
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Container, IconButton } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const callToActionData = {
  "vehicle-window-tinting": {
    images: [
      "/v-window-tint/Tint Tek-63.webp",
    ],
  },
  "tesla-window-tinting": {
    images: [
      "/tesla/Tint Tek-165.webp",
      "/tesla/Tint Tek-166.webp",
      "/tesla/Tint Tek-170.webp",
      "/tesla/Tint Tek-181.webp",
      "/tesla/Tint Tek-190.webp",
      "/tesla/Tint Tek-195.webp",
      "/tesla/tesla test.webp",
    ],
  },
  "residential-window-tinting": {
    images: [
      "/residential/residential2.webp",
      "/residential/residential3.webp",
      "/residential/residential4.webp",
      "/residential/residential5.webp",
    ],
  },
  "commercial-window-tinting": {
    images: [
      "/commercial/Tint Tek-116.webp",
      "/commercial/Tint Tek-121.webp",
      "/commercial/Tint Tek-125.webp",
      "/commercial/Tint Tek-128.webp",
      "/commercial/Tint Tek-138.webp",
      "/commercial/Tint Tek-139.webp",
      "/commercial/Tint Tek-146.webp",
      "/commercial/Tint Tek-152.webp",
    ],
  },
  "vehicle-paint-correction": { images: [] },
  "vehicle-paint-protection": { images: [] },
  "headlight-services": { images: [] },
  "windshield-protection-film": { images: [] },
};

// Descriptive alt text per page (was "Slide 1", "Slide 2", ...)
const altPrefix = {
  "vehicle-window-tinting": "Vehicle window tint installed by Tint Tek Plus in Garland, TX",
  "tesla-window-tinting": "Tesla window tint installed by Tint Tek Plus in Garland, TX",
  "residential-window-tinting": "Residential window film installed by Tint Tek Plus in Dallas–Fort Worth",
  "commercial-window-tinting": "Commercial window film installed by Tint Tek Plus in Dallas–Fort Worth",
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const ArrowButton = ({ label, disabled, onClick, children }) => (
  <IconButton
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    sx={{
      width: 44,
      height: 44,
      color: "rgba(255,255,255,0.88)",
      backgroundColor: "rgba(255,255,255,0.12)",
      backdropFilter: "saturate(180%) blur(20px)",
      WebkitBackdropFilter: "saturate(180%) blur(20px)",
      transition: "background-color .2s ease, opacity .2s ease",
      "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
      "&.Mui-disabled": { color: "rgba(255,255,255,0.88)", opacity: 0.32 },
      "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 2 },
    }}
  >
    {children}
  </IconButton>
);

ArrowButton.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const ImageCarousel = () => {
  const { serviceId } = useParams();
  const key = callToActionData[serviceId] ? serviceId : "commercial-window-tinting";
  const { images } = callToActionData[key];
  const alt = altPrefix[key] || "Window film installed by Tint Tek Plus";

  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Track which card is closest to the start edge, and whether we can scroll
  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children);
    const left = track.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    cards.forEach((card, i) => {
      const d = Math.abs(card.offsetLeft - track.offsetLeft - left);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(left <= 4);
    setAtEnd(left >= max - 4);
    // When scrolled to the end, the last card is "active" even if it isn't at the start edge
    setActive(left >= max - 4 ? cards.length - 1 : nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  const goTo = (index) => {
    const track = trackRef.current;
    const card = track?.children[index];
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  if (!images.length) return null;

  return (
    <Box
      component="section"
      aria-roledescription="carousel"
      aria-label="Installation photo gallery"
      sx={{ py: { xs: 6, md: 10 } }}
    >
      <Container maxWidth="lg">
        {/* Track */}
        <Box
          ref={trackRef}
          sx={{
            display: "flex",
            gap: { xs: 1.5, md: 2.5 },
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            overscrollBehaviorX: "contain",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            // Let the first/last card line up with the page gutter
            mx: { xs: -2, sm: 0 },
            px: { xs: 2, sm: 0 },
            scrollPaddingInline: { xs: "16px", sm: 0 },
          }}
        >
          {images.map((src, index) => (
            <Box
              key={src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
              sx={{
                // Phones: one card + a peek of the next. Desktop: ~3 cards + a peek.
                flex: {
                  xs: "0 0 82%",
                  sm: "0 0 calc((100% - 20px) / 2.15)",
                  md: "0 0 calc((100% - 40px) / 3.2)",
                },
                scrollSnapAlign: "start",
                borderRadius: { xs: "22px", md: "28px" },
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.04)",
                aspectRatio: "3 / 4",
              }}
            >
              <Box
                component="img"
                src={src}
                alt={`${alt} — photo ${index + 1}`}
                width={392}
                height={588}
                loading="lazy"
                decoding="async"
                draggable={false}
                sx={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform .6s cubic-bezier(.25,.1,.25,1)",
                  "@media (hover: hover)": {
                    "&:hover": { transform: "scale(1.03)" },
                  },
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Controls: pill pagination centered, arrows on the right */}
        {images.length > 1 && (
          <Box
            sx={{
              mt: { xs: 3, md: 4 },
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "space-between" },
              gap: 2,
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" }, width: 100 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                height: 44,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.12)",
                backdropFilter: "saturate(180%) blur(20px)",
                WebkitBackdropFilter: "saturate(180%) blur(20px)",
              }}
            >
              {images.map((src, i) => (
                <Box
                  key={src}
                  component="button"
                  type="button"
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => goTo(i)}
                  sx={{
                    p: 0,
                    border: 0,
                    cursor: "pointer",
                    height: 8,
                    width: i === active ? 28 : 8,
                    borderRadius: 999,
                    backgroundColor:
                      i === active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.38)",
                    transition: "width .35s cubic-bezier(.25,.1,.25,1), background-color .35s ease",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.7)" },
                    "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 3 },
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1.5, width: 100, justifyContent: "flex-end" }}>
              <ArrowButton label="Previous photo" disabled={atStart} onClick={() => goTo(Math.max(active - 1, 0))}>
                <ChevronLeftRoundedIcon />
              </ArrowButton>
              <ArrowButton
                label="Next photo"
                disabled={atEnd}
                onClick={() => goTo(Math.min(active + 1, images.length - 1))}
              >
                <ChevronRightRoundedIcon />
              </ArrowButton>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ImageCarousel;
