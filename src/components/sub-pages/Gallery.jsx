// src/components/sub-pages/Gallery.jsx
// Performance notes:
// - Grid uses 480px thumbnails (public/gallery/thumbs) via srcset; the full
//   photo is only fetched for high-DPR screens and the lightbox.
// - Every <img> has intrinsic width/height (no layout shift); first row loads
//   eagerly, the rest lazily.
// - No JS media queries (responsive via CSS → no post-hydration re-render),
//   no framer-motion or react-swipeable on this page (CSS hover, tiny touch
//   handler instead).
// - Hero text no longer fades in from opacity 0, so the heading paints
//   immediately (better LCP). Page heading is now the page's <h1>.
// - Lightbox prefetches the neighbouring photos so next/prev is instant.
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  Dialog,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import SEO from "../SEO";

import Footer from "../key-components/Footer";
import Contact from "../SubContact";
import CallToAction from "../SubCTA";
import QuickLinks from "../SubQuickLinks";

// ---- SITE SETTINGS ----
const SITE = "https://tinttekplus.com";

const images = [
  "/gallery/gallery1-output.webp",
  "/gallery/gallery3-output.webp",
  "/gallery/gallery4-output.webp",
  "/gallery/gallery5-output.webp",
  "/gallery/gallery6-output.webp",
  "/gallery/gallery7-output.webp",
  "/gallery/gallery8-output.webp",
  "/gallery/gallery9-output.webp",
  "/gallery/gallery10-output.webp",
  "/gallery/Tint Tek-2.webp",
  "/gallery/Tint Tek-4.webp",
  "/gallery/Tint Tek-6.webp",
  "/gallery/Tint Tek-25.webp",
  "/gallery/Tint Tek-28.webp",
  "/gallery/Tint Tek-32.webp",
  "/gallery/Tint Tek-33.webp",
  "/gallery/Tint Tek-37.webp",
  "/gallery/Tint Tek-42.webp",
  "/gallery/Tint Tek-46.webp",
  "/gallery/Tint Tek-63.webp",
  "/gallery/Tint Tek-64.webp",
  "/gallery/Tint Tek-69.webp",
  "/gallery/Tint Tek-72.webp",
  "/gallery/Tint Tek-80.webp",
  "/gallery/Tint Tek-82.webp",
  "/gallery/Tint Tek-85.webp",
  "/gallery/Tint Tek-87.webp",
  "/gallery/Tint Tek-92.webp",
  "/gallery/Tint Tek-97.webp",
  "/gallery/Tint Tek-99.webp",
  "/gallery/Tint Tek-102.webp",
  "/gallery/Tint Tek-103.webp",
  "/gallery/Tint Tek-104.webp",
];

// Descriptive alt text per photo (image search + accessibility); also used
// as the ImageObject caption in the CollectionPage JSON-LD.
const ALT = {
  "/gallery/gallery1-output.webp": "Technician heat-shrinking window tint film on a car's rear glass",
  "/gallery/gallery3-output.webp": "Technician cutting window tint film on the glass cutting wall",
  "/gallery/gallery4-output.webp": "Technician shaping a large sheet of window film on the cutting wall",
  "/gallery/gallery5-output.webp": "Technician squeegeeing window tint onto a car door window",
  "/gallery/gallery6-output.webp": "Black Mercedes-Benz S-Class inside the Tint Tek Plus shop",
  "/gallery/gallery7-output.webp": "Technician laying out a sheet of film on the cutting wall",
  "/gallery/gallery8-output.webp": "Technician installing paint protection film on a dark car",
  "/gallery/gallery9-output.webp": "Paint protection film being installed on the hood of a dark car",
  "/gallery/gallery10-output.webp": "Technicians tinting the windows of a black Tesla",
  "/gallery/Tint Tek-2.webp": "Technician cutting paint protection film on the glass cutting wall",
  "/gallery/Tint Tek-4.webp": "LLumar window tinting banner inside the Tint Tek Plus shop",
  "/gallery/Tint Tek-6.webp": "Window tint film being heat-formed to a car's side window",
  "/gallery/Tint Tek-25.webp": "Technician applying paint protection film to a black SUV hood",
  "/gallery/Tint Tek-28.webp": "Technician wrapping the edge of paint protection film on a black SUV",
  "/gallery/Tint Tek-32.webp": "Technician stretching paint protection film across a black car's hood",
  "/gallery/Tint Tek-33.webp": "Tint Tek Plus window tint and paint protection shop exterior in Garland, TX",
  "/gallery/Tint Tek-37.webp": "Tint Tek Plus storefront with a black Jeep in the service bay",
  "/gallery/Tint Tek-42.webp": "Black Jeep Grand Cherokee with tinted windows inside the shop",
  "/gallery/Tint Tek-46.webp": "Black Jeep Grand Cherokee parked outside Tint Tek Plus",
  "/gallery/Tint Tek-63.webp": "Technician prepping window tint on a pickup truck door",
  "/gallery/Tint Tek-64.webp": "Technician tinting the windows of a silver pickup truck",
  "/gallery/Tint Tek-69.webp": "Technician cutting window tint for a truck door on the cutting wall",
  "/gallery/Tint Tek-72.webp": "Silver pickup truck with freshly tinted windows",
  "/gallery/Tint Tek-80.webp": "Black Mercedes-Benz G-Class with tinted windows inside the shop",
  "/gallery/Tint Tek-82.webp": "Side profile of a black Mercedes-Benz G-Class after window tinting",
  "/gallery/Tint Tek-85.webp": "Black Mercedes-Benz G-Class parked outside Tint Tek Plus",
  "/gallery/Tint Tek-87.webp": "Black lifted pickup truck with tinted windows in the shop",
  "/gallery/Tint Tek-92.webp": "Black lifted pickup truck parked outside Tint Tek Plus",
  "/gallery/Tint Tek-97.webp": "Silver sedan with newly tinted side windows",
  "/gallery/Tint Tek-99.webp": "Gray Honda Civic inside the shop after window tinting",
  "/gallery/Tint Tek-102.webp": "Rear side windows of a silver sedan after window tinting",
  "/gallery/Tint Tek-103.webp": "Silver Hyundai Sonata inside the shop after window tinting",
  "/gallery/Tint Tek-104.webp": "Technician finishing window tint on a silver sedan's door glass",
};
const altOf = (src, i) => ALT[src] || `Tint Tek Plus project ${i + 1}`;

// Source sizes: the "-output" exports are 1200×801, the "Tint Tek-" ones 812×540
const sizeOf = (src) => (src.includes("-output") ? { w: 1200, h: 801 } : { w: 812, h: 540 });
const thumbOf = (src) => src.replace("/gallery/", "/gallery/thumbs/");
const enc = (src) => encodeURI(src);

const BG = `
  radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
  radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
  linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)
`;

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchX = useRef(null);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleNext = useCallback(
    () => setCurrentImageIndex((i) => (i + 1) % images.length),
    []
  );
  const handlePrev = useCallback(
    () => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length),
    []
  );

  // Keyboard nav inside dialog (Escape is handled by the Dialog itself)
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleNext, handlePrev]);

  // Prefetch the neighbouring full-size photos so next/prev feels instant
  useEffect(() => {
    if (!open) return;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = images[(currentImageIndex + d + images.length) % images.length];
    });
  }, [open, currentImageIndex]);

  // Minimal swipe handling (replaces react-swipeable)
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) handleNext();
    else handlePrev();
  };

  // -------- Helmet (SEO) --------
  const { title, description, canonical, ldJson } = useMemo(() => {
    const url = `${SITE}/gallery`;
    const metaTitle =
      "Gallery | Window Tint, PPF & Detailing Work | Tint Tek Plus";
    const metaDesc =
      "Browse our photo gallery of window tint, paint protection film (PPF), ceramic coating, and detailing projects completed by Tint Tek Plus in Dallas–Fort Worth.";
    // encodeURI: most file names contain spaces, which are invalid in URLs
    const imageObjs = images.map((src, i) => {
      const abs = encodeURI(`${SITE}${src.startsWith("/") ? src : `/${src}`}`);
      return {
        "@type": "ImageObject",
        contentUrl: abs,
        url: abs,
        name: altOf(src, i),
        caption: altOf(src, i),
        creditText: "Tint Tek Plus",
        creator: { "@type": "Organization", name: "Tint Tek Plus" },
        copyrightNotice: "Tint Tek Plus",
      };
    });
    const ld = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      url,
      name: "Tint Tek Plus Gallery",
      description: metaDesc,
      hasPart: imageObjs,
      isPartOf: { "@type": "WebSite", name: "Tint Tek Plus", url: SITE },
    };
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Gallery", item: url },
      ],
    };
    return {
      title: metaTitle,
      description: metaDesc,
      canonical: url,
      ldJson: [ld, breadcrumb],
    };
  }, []);

  const current = images[currentImageIndex];
  const currentSize = sizeOf(current);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: BG,
        color: "#FFFFFF",
      }}
    >
      {/* HEAD */}
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        jsonLd={ldJson}
        image={encodeURI(`${SITE}/gallery/Tint Tek-85.webp`)}
        type="website"
      />

      {/* Hero */}
      <Box
        component="header"
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "50vh", md: "60vh" },
          overflow: "hidden",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", md: "70%" },
              // Slide only — text is visible from the first paint (no opacity 0)
              "@keyframes slideUp": {
                "0%": { transform: "translateY(20px)" },
                "100%": { transform: "translateY(0)" },
              },
              animation: "slideUp .8s ease-out",
              "@media (prefers-reduced-motion: reduce)": { animation: "none" },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#2794d2",
                fontWeight: 600,
                letterSpacing: 2,
                mb: 1,
                display: "block",
              }}
            >
              TINT TEK + PROJECTS
            </Typography>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                color: "#fff",
                mb: 2,
                fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3.5rem" },
                lineHeight: 1.1,
              }}
            >
              Our Gallery
            </Typography>
            <Box
              sx={{
                mt: 5,
                width: 120,
                height: 5,
                borderRadius: 999,
                background:
                  "linear-gradient(90deg, #1e90ff 0%, #2794d2 50%, #1e90ff 100%)",
                boxShadow: "0 0 16px rgba(39,148,210,0.35)",
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Gallery Grid */}
      <Box
        component="main"
        sx={{
          flex: "1",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: 2,
          mt: "20px",
          pb: 10,
        }}
      >
        <Box
          component="ul"
          aria-label="Tint Tek Plus project photos"
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {images.map((image, index) => {
            const { w, h } = sizeOf(image);
            return (
              <Box component="li" key={image}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => handleImageClick(index)}
                  aria-label={`Open project photo ${index + 1} of ${images.length}`}
                  sx={{
                    display: "block",
                    width: "100%",
                    p: 0,
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "4px",
                    overflow: "hidden",
                    cursor: "pointer",
                    bgcolor: "rgba(20, 20, 30, 0.5)",
                    boxShadow: 3,
                    "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 2 },
                    "@media (hover: hover)": {
                      "&:hover img": { transform: "scale(1.03)", opacity: 0.9 },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={enc(thumbOf(image))}
                    // 480px thumb for normal screens; full photo only when the
                    // tile is rendered on a high-DPR screen
                    srcSet={`${enc(thumbOf(image))} 480w, ${enc(image)} ${w}w`}
                    sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(50vw - 24px), 384px"
                    alt={altOf(image, index)}
                    width={w}
                    height={h}
                    loading={index < 3 ? "eager" : "lazy"}
                    // lowercase: React 18 drops the camelCase prop, so it never reached the HTML
                    fetchpriority={index < 3 ? "high" : "auto"}
                    decoding="async"
                    sx={{
                      display: "block",
                      width: "100%",
                      height: 250,
                      objectFit: "cover",
                      borderRadius: "5px",
                      transition: "transform 0.25s ease, opacity 0.25s ease",
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* CTA to Instagram */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Box
            component="a"
            href="https://www.instagram.com/tinttekplus"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: 3,
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#2794d2",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "40px",
              textTransform: "uppercase",
              textDecoration: "none",
              fontSize: "1.1rem",
              px: 4,
              py: 1.5,
              transition: "transform .25s cubic-bezier(.34,1.56,.64,1)",
              "&:hover": { transform: "scale(1.05)" },
              "&:focus-visible": { outline: "2px solid #fff", outlineOffset: 3 },
            }}
          >
            See More on Instagram
          </Box>
        </Box>
      </Box>

      <CallToAction />

      {/* Contact Section */}
      <Box sx={{ width: "100%", color: "#000" }}>
        <Contact />
      </Box>

      <QuickLinks />
      <Footer />

      {/* Lightbox / Image Modal — full screen below 900px via CSS */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        aria-label="Project photo viewer"
        PaperProps={{
          sx: {
            backgroundColor: "black",
            m: { xs: 0, md: 4 },
            width: { xs: "100%", md: "calc(100% - 64px)" },
            maxWidth: { xs: "100%", md: 1200 },
            height: { xs: "100%", md: "auto" },
            maxHeight: { xs: "100%", md: "calc(100% - 64px)" },
            borderRadius: { xs: 0, md: 1 },
          },
        }}
      >
        <Box
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          sx={{
            position: "relative",
            p: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: { xs: "100vh", md: 600 },
          }}
        >
          <Box
            component="img"
            key={current}
            src={enc(current)}
            alt={`${altOf(current, currentImageIndex)} (${currentImageIndex + 1} of ${images.length})`}
            width={currentSize.w}
            height={currentSize.h}
            decoding="async"
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: { xs: "100vh", md: "calc(100vh - 120px)" },
              objectFit: "contain",
              display: "block",
              margin: 0,
            }}
          />

          {/* Left Arrow */}
          <IconButton
            onClick={handlePrev}
            aria-label="Previous image"
            sx={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              zIndex: 1,
              bgcolor: "rgba(255,255,255,0.15)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          >
            <ChevronLeft sx={{ color: "white", fontSize: 44 }} />
          </IconButton>

          {/* Right Arrow */}
          <IconButton
            onClick={handleNext}
            aria-label="Next image"
            sx={{
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
              zIndex: 1,
              bgcolor: "rgba(255,255,255,0.15)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          >
            <ChevronRight sx={{ color: "white", fontSize: 44 }} />
          </IconButton>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Gallery;
