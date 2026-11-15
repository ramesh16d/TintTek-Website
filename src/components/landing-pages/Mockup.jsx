import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import QuickLinks from "../SubQuickLinks";
import Footer from "../key-components/Footer";
import CallToAction from "../SubCTA";
import Testimonials from "../landing-pages/Testimonials";
import FAQ from "../landing-pages/FAQ";
import Contact from "../SubContact";
import SEO from "../SEO";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VideoCTA from "./VideoCTA";
import VideoCTA2 from "./VideoCTA2";
import LandingHero from "./LandingHero";
import { brandSeoContent } from "../../data/brandSeoContent";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

// Hero benefit points (previously the old Hero's built-in defaults)
const MOCKUP_HERO_POINTS = [
  {
    title: "Superior Heat Rejection",
    body: "Advanced nano-ceramic tech blocks up to 89% of heat so you stay cool and save your A/C.",
  },
  {
    title: "Reduce Glare • Boost Safety",
    body: "Cut harsh glare for clearer vision and safer driving—day or night.",
  },
  {
    title: "Privacy + Style Upgrade",
    body: "A sleek, modern look that keeps prying eyes out without sacrificing clarity.",
  },
];

/** —— SITE / ROUTE SETTINGS —— */
const SITE = "https://tinttekplus.com";
const PATH = "/mockup"; // ← set to the route where this page is served

// ——— Hero checkmark styles ———
const FeatureList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gap: 12,
}));

const FeatureItem = styled(motion.li)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
}));

const CheckBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  borderRadius: 999,
  background:
    "linear-gradient(135deg, rgba(39,148,210,0.25), rgba(77,184,240,0.25))",
  border: "1px solid rgba(77,184,240,0.35)",
  boxShadow:
    "0 8px 24px rgba(39,148,210,.35), inset 0 0 0 1px rgba(255,255,255,0.06)",
  flexShrink: 0,
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  lineHeight: 1.2,
  color: "#ffffff",
}));

const FeatureBody = styled(Typography)(({ theme }) => ({
  color: "rgba(255,255,255,0.80)",
  lineHeight: 1.6,
  marginTop: 2,
}));

const VideoSection = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  backgroundColor: "#000",
}));

const BackgroundVideo = styled("video")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: 0,
}));

const VideoOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  pointerEvents: "none",
}));

const SwipeIndicator = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(16),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  color: "#fff",
  textAlign: "center",
  userSelect: "none",
  pointerEvents: "auto",
}));

// Custom control bar (glassmorphism)
const ControlBar = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(3),
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 1.5),
  borderRadius: 999,
  backgroundColor: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.25)",
  backdropFilter: "blur(6px)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
  pointerEvents: "auto",
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.25)",
  backgroundColor: "rgba(255,255,255,0.08)",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.18)" },
}));

// ===== Existing styles =====
const CTAButton = styled(Button)(({ theme, variant }) => ({
  fontWeight: 700,
  padding: variant === "large" ? "16px 40px" : "12px 32px",
  borderRadius: "50px",
  fontSize: variant === "large" ? "1.1rem" : "1rem",
  textTransform: "none",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  boxShadow: "0 8px 32px rgba(39, 148, 210, 0.3)",
  background:
    variant === "outline"
      ? "transparent"
      : "linear-gradient(135deg, #2794d2 0%, #4db8f0 100%)",
  border: variant === "outline" ? "2px solid #2794d2" : "none",
  color: variant === "outline" ? "#2794d2" : "#fff",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 12px 40px rgba(39, 148, 210, 0.4)",
    background:
      variant === "outline"
        ? "linear-gradient(135deg, #2794d2 0%, #4db8f0 100%)"
        : "linear-gradient(135deg, #4db8f0 0%, #2794d2 100%)",
    color: "#fff",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    transition: "left 0.6s",
  },
  "&:hover::before": { left: "100%" },
}));

const Metric = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px) saturate(140%)",
  WebkitBackdropFilter: "blur(12px) saturate(140%)",
  borderRadius: 20,
  padding: theme.spacing(3),
  height: "100%",
  textAlign: "center",
  boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(39,148,210,0.15), rgba(77,184,240,0.05))",
    pointerEvents: "none",
    zIndex: 0,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: "2px",
    borderRadius: "inherit",
    background: "rgba(255,255,255,0.02)",
    boxShadow: "inset 0 0 40px rgba(255,255,255,0.05)",
    pointerEvents: "none",
    zIndex: 0,
  },
  "& > *": { position: "relative", zIndex: 1 },
}));

const BenefitCard = styled(motion.div)(({ theme }) => ({
  backgroundColor: "#111111",
  padding: "32px 24px",
  borderRadius: "20px",
  textAlign: "center",
  border: "1px solid rgba(39, 148, 210, 0.1)",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s ease",
  "&:hover": {
    backgroundColor: "#1a1a1a",
    border: "1px solid rgba(39, 148, 210, 0.3)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #2794d2, #4db8f0)",
    transform: "scaleX(0)",
    transition: "transform 0.4s ease",
  },
  "&:hover::before": { transform: "scaleX(1)" },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(135deg, #ffffff 0%, #2794d2 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  "@supports not (background-clip: text)": { color: "#2794d2" },
}));

const FloatingElement = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(39, 148, 210, 0.1) 0%, transparent 70%)",
  filter: "blur(1px)",
  pointerEvents: "none",
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    background:
      "linear-gradient(135deg, rgba(39, 148, 210, 0.1) 0%, transparent 50%)",
    borderRadius: "24px",
    zIndex: -1,
  },
}));

const StyledImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderRadius: "20px",
  boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
  border: "1px solid rgba(39, 148, 210, 0.2)",
  [theme.breakpoints.up("md")]: { height: "450px" },
  loading: "lazy",
}));

const StyledFrame = styled("iframe")(({ theme }) => ({
  width: "100%",
  height: "800px",
  border: "1px solid rgba(39, 148, 210, 0.2)",
  borderRadius: "20px",
  boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
  background: "transparent",
  outline: "none",
  overflow: "auto",
  [theme.breakpoints.up("md")]: { height: "650px" },
  loading: "lazy",
}));

const handleScrollTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const Mockup = () => {
  // --- Animation variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] },
    },
  };
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };
  const cardHoverVariants = {
    hover: { y: -8, transition: { duration: 0.3, ease: "easeOut" } },
  };

  // --- Video + audio handling ---
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const play = async () => {
    try {
      await videoRef.current?.play();
      setIsPlaying(true);
    } catch { }
  };
  const pause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };
  const togglePlay = () => (isPlaying ? pause() : play());
  const toggleMute = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted && v.paused) await play();
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolume = () => setIsMuted(v.muted);

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVolume);

    v.muted = true;
    v.loop = true;
    play();

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVolume);
    };
  }, []);

  // --- Scroll + swipe handling ---
  const contentRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [touchStart, setTouchStart] = useState({ y: 0, x: 0 });

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const onTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    setTouchStart({ y: t.clientY, x: t.clientX });
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dy = touchStart.y - t.clientY;
    const dx = Math.abs(touchStart.x - t.clientX);
    if (dy > 70 && dx < 60) scrollToContent();
  };

  // —— SEO: Helmet + JSON-LD —— //
  const pageTitle =
    "Premium Window Tinting in Dallas | Heat & UV Protection | Tint Tek Plus";
  const pageDesc =
    "Professional ceramic window tinting in Dallas–Fort Worth. Up to 60% heat rejection, 99% UV protection, lifetime warranty. Get a free quote today.";
  const canonical = `${SITE}${PATH}`;
  const videoUrl = `${SITE}/videos/v-window-tint2.mp4`;
  const videoThumb = `${SITE}/background.webp`; // swap to a real poster image if you have one

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Premium Window Tinting",
    url: canonical,
    description: pageDesc,
    inLanguage: "en-US",
  };

  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Window Tinting Highlights",
    description:
      "See premium ceramic window tinting results from Tint Tek Plus in Dallas.",
    thumbnailUrl: [videoThumb],
    contentUrl: videoUrl,
    embedUrl: videoUrl,
    uploadDate: "2025-01-01", // optional; set real ISO date if known
    publisher: {
      "@type": "Organization",
      name: "Tint Tek Plus",
      logo: { "@type": "ImageObject", url: `${SITE}/logo.webp` },
    },
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Window Tinting",
        item: canonical,
      },
    ],
  };

  return (
    <>
      {/* HEAD */}
      <SEO
        title={pageTitle}
        description={pageDesc}
        canonical={canonical}
        // Landing-page mockup: keep it out of search results and sitelinks
        robots="noindex, follow"
        jsonLd={[webPageLd, videoLd, breadcrumbsLd]}
        type="website"
      >
        <link rel="preload" as="video" href="/videos/v-window-tint2.mp4" />
      </SEO>

      {/* ===== Landing content ===== */}
      <Box
        ref={contentRef}
        sx={{
          background: `
      radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
      radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
      linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)
    `,
          color: "#fff",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating Background Elements */}
        <FloatingElement
          variants={floatVariants}
          animate="animate"
          sx={{ top: "10%", right: "10%", width: "200px", height: "200px" }}
        />
        <FloatingElement
          variants={floatVariants}
          animate="animate"
          sx={{ bottom: "20%", left: "5%", width: "150px", height: "150px" }}
          transition={{ delay: 2 }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          {/* Same hero as the brand and city pages, with the copy the old Hero
              used by default on this page (headline + the three tint benefits) */}
          <LandingHero
            headline="Block 89% Of Heat. Drive Cooler In 3 Hours!"
            points={MOCKUP_HERO_POINTS}
            pointsLabel="Key benefits"
            trust={{ ...brandSeoContent.llumar.warranty, showBadge: true }}
          />

          <Testimonials />
          <VideoCTA />
          <VideoCTA2 />

          {/* Benefits Section (Why Choose Us) */}
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#2794d2",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    mb: 2,
                    display: "block",
                  }}
                >
                  WHY CHOOSE US?
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.2rem", md: "3rem" },
                    mb: 2,
                    textTransform: "uppercase",
                    letterSpacing: { xs: 0, md: "0.02em" },
                  }}
                >
                  Premium Quality, Guaranteed Results
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255,255,255,0.72)",
                    maxWidth: "980px",
                    mx: "auto",
                    fontWeight: 400,
                  }}
                >
                  Our expert team delivers exceptional results with
                  industry-leading materials and techniques
                </Typography>
              </Box>

              {/* 4 Columns */}
              <Grid container spacing={0}>
                {[
                  {
                    icon: <WbSunnyOutlinedIcon sx={{ fontSize: 44 }} />,
                    title: "Heat & UV Rejection",
                    body: "Advanced ceramic technology blocks up to 99% of harmful UV rays and reduces interior heat by 60%.",
                  },
                  {
                    icon: <LockOutlinedIcon sx={{ fontSize: 44 }} />,
                    title: "Enhanced Privacy & Security",
                    body: "Premium tinting provides discretion and protection while maintaining optimal visibility.",
                  },
                  {
                    icon: <GradeOutlinedIcon sx={{ fontSize: 44 }} />,
                    title: "Improved Aesthetic Appeal",
                    body: "Transform your vehicle with a sleek, sophisticated look that turns heads everywhere.",
                  },
                  {
                    icon: <ShieldOutlinedIcon sx={{ fontSize: 44 }} />,
                    title: "Lifetime Warranty",
                    body: "Comprehensive lifetime warranty on all installations with professional service guarantee.",
                  },
                ].map((item, idx) => (
                  <Grid
                    item
                    xs={12}
                    md={3}
                    key={idx}
                    sx={{
                      // layout + padding
                      px: { xs: 2, md: 4 },
                      py: { xs: 5, md: 7 },
                      textAlign: { xs: "left", md: "left" },
                      position: "relative",
                      // blue vertical split line between items (md+ only)
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 24,
                        bottom: 24,
                        left: 0,
                        width: "2px",
                        background:
                          "linear-gradient(180deg, rgba(77,184,240,0.0), rgba(77,184,240,0.9), rgba(77,184,240,0.0))",
                        display: {
                          xs: "none",
                          md: idx === 0 ? "none" : "block",
                        },
                        borderRadius: "2px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2.5,
                      }}
                    >
                      <Box
                        sx={{
                          color: "#2794d2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 52,
                          height: 52,
                          borderRadius: "14px",
                          boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </Box>

                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, mb: 1, color: "#ffffff" }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255,255,255,0.80)",
                            lineHeight: 1.7,
                          }}
                        >
                          {item.body}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Centered CTA */}
              <Box sx={{ textAlign: "center", mt: { xs: 6, md: 8 } }}>
                <CTAButton
                  variant="large"
                  aria-label="Get a free quote"
                  sx={{ px: 5 }}
                  onClick={handleScrollTop}
                >
                  Get a Free Quote
                </CTAButton>
              </Box>
            </motion.div>
          </Box>

          {/* CTA Section */}
          <Box
            sx={{
              // Center nicely while keeping some room at the top/bottom on mobile
              py: { xs: 4, md: 10 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }} // trigger a bit later on mobile for smoother entry
            >
              <Box
                sx={{
                  background: "#1ea9ff",
                  borderRadius: { xs: 3, md: 6 },
                  p: { xs: 2.5, md: 6 }, // tighter padding on phones
                  boxShadow: {
                    xs: "0 14px 36px rgba(0,0,0,0.28)", // lighter shadow on phones for performance
                    md: "0 30px 80px rgba(0,0,0,0.35)",
                  },
                }}
              >
                <Grid
                  container
                  spacing={{ xs: 2.5, md: 6 }}
                  alignItems="center"
                >
                  {/* Image FIRST on mobile for faster visual context */}
                  <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
                    <Box
                      sx={{
                        borderRadius: { xs: 2.5, md: 4 },
                        border: {
                          xs: "4px solid rgba(255,255,255,0.9)",
                          md: "8px solid rgba(255,255,255,0.9)",
                        },
                        outline: {
                          xs: "6px solid #12a8ff",
                          md: "10px solid #12a8ff",
                        },
                        overflow: "hidden",
                        boxShadow: {
                          xs: "0 16px 48px rgba(0,0,0,0.35)",
                          md: "0 25px 80px rgba(0,0,0,0.45)",
                        },
                      }}
                    >
                      {/* Keep layout stable with a fixed aspect ratio on mobile */}
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: { xs: "16 / 10", sm: "16 / 9" }, // prevents CLS
                        }}
                      >
                        <Box
                          component="img"
                          src="/gallery/Tint Tek-85.webp"
                          alt="Technician performing professional window tint installation"
                          loading="lazy"
                          decoding="async"
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTExMTExIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkltYWdlPC90ZXh0Pgo8L3N2Zz4=";
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>

                  {/* Text SECOND on mobile, FIRST on desktop */}
                  <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#e9f7ff",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        mb: { xs: 1, md: 1.5 },
                        display: "block",
                        fontSize: { xs: "0.7rem", md: "0.8rem" }, // scale down on phones
                      }}
                    >
                      EXPERT CRAFTSMANSHIP
                    </Typography>

                    <Typography
                      component="h2"
                      sx={{
                        color: "#fff",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        // fluid size: readable on phones, bold on desktop
                        fontSize: {
                          xs: "clamp(1.5rem, 4vw, 2.25rem)",
                          md: "3rem",
                        },
                        mb: { xs: 2, md: 3 },
                        lineHeight: { xs: 1.15, md: 1.1 },
                      }}
                    >
                      Professional Installation
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color: "rgba(255,255,255,0.95)",
                        lineHeight: { xs: 1.7, md: 1.8 },
                        fontWeight: 400,
                        mb: { xs: 2.25, md: 3 },
                        // Don’t let text span too wide; improve readability
                        maxWidth: { xs: "100%", sm: 680, md: 900 },
                        fontSize: { xs: "1rem", md: "1.125rem" },
                      }}
                    >
                      Our certified technicians bring years of expertise and
                      precision to every installation. Using specialized tools
                      and techniques, we ensure perfect application with no
                      bubbles, wrinkles, or imperfections. Each project is
                      backed by our comprehensive lifetime warranty for complete
                      peace of mind.
                    </Typography>

                    {/* Bullets */}
                    <FeatureList
                      aria-label="Professional installation benefits"
                      style={{ gap: 8 }}
                    >
                      {[
                        {
                          title: "Certified & experienced technicians",
                          body: "Trained for precision installs using pro-grade tools and methods.",
                        },
                        {
                          title: "Dust-free, climate-controlled environment",
                          body: "Clean room prep reduces contamination for a flawless finish.",
                        },
                        {
                          title: "Lifetime warranty on all services",
                          body: "Backed by clear, written coverage for long-term peace of mind.",
                        },
                      ].map((f, i) => (
                        <FeatureItem
                          key={f.title}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <CheckBadge>
                            <TaskAltRoundedIcon
                              sx={{ fontSize: 16, color: "#e9f7ff" }}
                            />
                          </CheckBadge>
                          <Box>
                            <FeatureTitle
                              variant="subtitle1"
                              sx={{ fontSize: { xs: "0.975rem", md: "1rem" } }}
                            >
                              {f.title}
                            </FeatureTitle>
                            <FeatureBody
                              variant="body2"
                              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
                            >
                              {f.body}
                            </FeatureBody>
                          </Box>
                        </FeatureItem>
                      ))}
                    </FeatureList>

                    {/* CTA */}
                    <Button
                      variant="outlined"
                      fullWidth={isMobile}
                      sx={{
                        mt: { xs: 3, md: 4 },
                        px: { xs: 2.5, md: 4 },
                        py: { xs: 1.1, md: 1.25 },
                        borderRadius: 999,
                        borderWidth: 2,
                        color: "#fff",
                        borderColor: "#fff",
                        textTransform: "uppercase",
                        fontWeight: 800,
                        fontSize: { xs: "0.95rem", md: "1rem" },
                        "&:hover": {
                          borderColor: "#fff",
                          backgroundColor: "rgba(255,255,255,0.12)",
                        },
                      }}
                      onClick={handleScrollTop}
                    >
                      Get Free Quote
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Box>


          <Contact />


        </Container>
        <CallToAction />
        <QuickLinks />
        <Footer />
      </Box>
    </>
  );
};

export default Mockup;
