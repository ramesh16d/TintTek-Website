// src/components/sections/VideoCTA.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import ScrollToTop from "../ScrollToTop";

/* ---------- Styles ---------- */

const SectionWrap = styled(Box)(({ theme }) => ({
  color: "#fff",
  position: "relative",
}));

const Panel = styled(Box)(() => ({
  borderRadius: 24,
  background:
    "radial-gradient(1200px 500px at -10% -40%, rgba(39,148,210,0.08) 0%, transparent 60%), #0f0f0f",
  border: "1px solid rgba(39,148,210,0.18)",
  overflow: "hidden",
}));

/* ----- Left (Video Frame) ----- */
const VideoFrame = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow:
    "0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)",
  background:
    "radial-gradient(1200px 500px at -10% -40%, rgba(39,148,210,0.10) 0%, transparent 60%), #0a0a0a",
}));

const EdgeStroke = styled("div")(() => ({
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
  borderRadius: 20,
  padding: 1,
  background:
    "linear-gradient(135deg, rgba(39,148,210,0.45), rgba(255,255,255,0.06))",
  WebkitMask:
    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
}));

const BottomGradient = styled("div")(() => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: "26%",
  background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.0))",
  pointerEvents: "none",
  zIndex: 1,
}));

const BGVideo = styled("video")(() => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
}));

const FloatingControls = styled(Box)(() => ({
  position: "absolute",
  left: "50%",
  bottom: 18,
  transform: "translateX(-50%) translateY(6px)",
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "8px 14px",
  borderRadius: 999,
  backgroundColor: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.25)",
  backdropFilter: "blur(6px)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
  opacity: 0,
  transition: "opacity .25s ease, transform .25s ease",
  ".video-hover:hover &, .video-hover:focus-within &": {
    opacity: 1,
    transform: "translateX(-50%) translateY(0)",
  },
}));

const ControlButton = styled(IconButton)(() => ({
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.25)",
  backgroundColor: "rgba(255,255,255,0.08)",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.18)" },
}));

/* ----- Right (Text) ----- */
const Overline = styled(Typography)(() => ({
  color: "#2794d2",
  fontSize: "0.9rem",
  fontWeight: 800,
  letterSpacing: "0.12em",
}));

const GradientTitle = styled(Typography)(() => ({
  background: "linear-gradient(135deg, #ffffff 0%, #2794d2 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}));

/* === CTA buttons — match VideoCTA2 mobile styling === */
const CTAButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ variant, theme }) => {
  const isOutline = variant === "outline";
  const isLarge = variant === "large";
  return {
    fontWeight: 800,
    padding: isLarge ? "16px 30px" : "12px 28px",
    borderRadius: 999,
    fontSize: isLarge ? "1.05rem" : "1rem",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    position: "relative",
    overflow: "hidden",
    transition:
      "transform .35s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow .35s",
    boxShadow: isOutline ? "none" : "0 10px 34px rgba(39,148,210,0.35)",
    background: isOutline
      ? "transparent"
      : "linear-gradient(135deg, #2794d2 0%, #4db8f0 100%)",
    border: isOutline ? "2px solid #2794d2" : "none",
    color: isOutline ? "#2794d2" : "#fff",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: isOutline
        ? "0 16px 34px rgba(39,148,210,0.25)"
        : "0 16px 44px rgba(39,148,210,0.45)",
      background: isOutline
        ? "linear-gradient(135deg, #2794d2 0%, #4db8f0 100%)"
        : "linear-gradient(135deg, #4db8f0 0%, #2794d2 100%)",
      color: "#fff",
    },

    /* ---- Mobile polish to match VideoCTA2 ---- */
    [theme.breakpoints.down("md")]: {
      width: "100%",
      minHeight: 50,
      borderRadius: 16,
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: 0,
      padding: "14px 16px",
      fontSize: "0.98rem",
      justifyContent: "center",
      gap: 8,
      // Primary: softer gradient + subtle inner lift
      ...(isOutline
        ? {
            background: "rgba(15, 17, 22, 0.45)",
            backdropFilter: "blur(8px)",
            border: "1.5px solid rgba(113, 191, 242, 0.7)",
            color: "#e9f7ff",
            boxShadow: "0 8px 18px rgba(12, 18, 24, .5)",
            "&:hover": { background: "rgba(26, 32, 41, 0.55)" },
          }
        : {
            background:
              "linear-gradient(180deg, rgba(77,184,240,0.95), rgba(39,148,210,0.95))",
            boxShadow:
              "0 10px 24px rgba(39,148,210,.35), 0 1px 0 rgba(255,255,255,0.06) inset",
          }),
      "& .MuiButton-startIcon": { marginRight: 6, marginLeft: -2 },
      "&:active": { transform: "translateY(0)" },
    },
  };
});

/* ----- Feature list ----- */
const FeatureList = styled("ul")(() => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gap: 12,
}));

const FeatureItem = styled(motion.li)(() => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
}));

const CheckBadge = styled(Box)(() => ({
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

const FeatureTitle = styled(Typography)(() => ({
  fontWeight: 800,
  lineHeight: 1.2,
  color: "#ffffff",
}));

const FeatureBody = styled(Typography)(() => ({
  color: "rgba(255,255,255,0.80)",
  lineHeight: 1.6,
  marginTop: 2,
}));

const handleScrollTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

/* ---------- Custom Hook for Video Autoplay on Scroll ---------- */
const useVideoAutoplay = (videoRef, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const { threshold = 0.5, rootMargin = "0px", playOnce = false } = options;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, rootMargin }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isIntersecting) return;
    if (playOnce && hasPlayed) return;

    const attemptPlay = async () => {
      try {
        video.muted = true;
        await video.play();
        setHasPlayed(true);
      } catch (e) {
        // retry shortly
        setTimeout(attemptPlay, 100);
      }
    };
    const t = setTimeout(attemptPlay, 50);
    return () => clearTimeout(t);
  }, [isIntersecting, hasPlayed, playOnce]);

  return { isIntersecting, hasPlayed };
};

/* ---------- Component ---------- */
export default function VideoCTA({
  videoSrc = "/videos/tesla-video.mov",
  heading = "See the Difference in Minutes",
  subheading = "Premium Ceramic Tint • Faster, Cooler, Protected",
  bullets = [
    "Stay Cooler Instantly – Blocks up to 89%+ of heat so you drive in comfort, not sweat.",
    "Protect What Matters Most – 99% UV rejection shields your skin, family, and interior from damage.",
    "Built to Last – Premium Llumar ceramic films, tested and proven by 3rd-party labs.",
    "Lifetime Peace of Mind – Warranty-backed protection against bubbling, fading, or peeling.",
  ],
  primary = { label: "Get Free Quote", href: "/quote" },
  secondary = { label: "View Gallery", href: "/gallery" },
  autoplayOptions = { threshold: 0.3, playOnce: false },
}) {
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("md"));

  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const { isIntersecting } = useVideoAutoplay(videoRef, autoplayOptions);

  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isVideoReady) return;
    try {
      video.muted = true;
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [isVideoReady]);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted && video.paused) play();
  }, [play]);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsPortrait(video.videoHeight > video.videoWidth);
    setIsVideoReady(true);
  }, []);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleEnded = useCallback(() => setIsPlaying(false), []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [handlePlay, handlePause, handleEnded, handleLoadedMetadata]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden && isPlaying) pause();
      else if (!document.hidden && isIntersecting && !isPlaying) play();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [isPlaying, isIntersecting, play, pause]);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay: i * 0.06 },
    }),
  };

  const normalize = (b) => {
    if (typeof b === "object" && b?.title) return b;
    if (typeof b === "string") {
      const parts =
        b.split(" – ").length > 1
          ? b.split(" – ")
          : b.split(" — ").length > 1
          ? b.split(" — ")
          : b.split(" - ");
      if (parts.length > 1)
        return { title: parts[0].trim(), body: parts.slice(1).join(" - ").trim() };
      return { title: b.trim() };
    }
    return { title: String(b) };
  };
  const items = bullets.map(normalize);

  return (
    <SectionWrap ref={sectionRef} sx={{ py: { xs: 6, md: 12 } }}>
      <Panel sx={{ p: { xs: 2.5, md: 4 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          {/* Left: Video */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <VideoFrame
                className="video-hover"
                sx={{
                  aspectRatio: isPortrait ? "9 / 16" : "16 / 9",
                  maxHeight: { xs: "75vh", md: "78vh" },
                  width: isPortrait ? { xs: "86%", md: "72%" } : "100%",
                  mx: "auto",
                }}
              >
                <EdgeStroke />
                <BottomGradient />
                <BGVideo
                  ref={videoRef}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  style={{
                    objectFit: isPortrait ? "contain" : "cover",
                    backgroundColor: "#000",
                  }}
                >
                  <source src={videoSrc} type="video/mp4" />
                  <source src={videoSrc.replace(".mp4", ".webm")} type="video/webm" />
                  Your browser does not support the video tag.
                </BGVideo>

                <FloatingControls>
                  <Tooltip title={isPlaying ? "Pause" : "Play"}>
                    <ControlButton onClick={togglePlay}>
                      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </ControlButton>
                  </Tooltip>
                  <Tooltip title={isMuted ? "Unmute" : "Mute"}>
                    <ControlButton onClick={toggleMute}>
                      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </ControlButton>
                  </Tooltip>
                </FloatingControls>
              </VideoFrame>
            </motion.div>
          </Grid>

          {/* Right: Copy + CTAs */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Box sx={{ maxWidth: 640, ml: { md: 1 } }}>
                <Overline sx={{ mb: 1.5 }}>PREMIUM WINDOW TINTING</Overline>

                <GradientTitle
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2rem", md: "2.75rem" },
                    lineHeight: 1.12,
                    mb: 1,
                  }}
                >
                  {heading}
                </GradientTitle>

                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255,255,255,0.82)",
                    fontWeight: 500,
                    mb: 3,
                  }}
                >
                  {subheading}
                </Typography>

                {/* Features */}
                <FeatureList aria-label="Key benefits" style={{ marginBottom: 16 }}>
                  {items.map((it, i) => (
                    <FeatureItem
                      key={i}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <CheckBadge aria-hidden="true">
                        <TaskAltRoundedIcon sx={{ fontSize: 18, color: "#e9f7ff" }} />
                      </CheckBadge>
                      <Box>
                        <FeatureTitle variant="subtitle1">{it.title}</FeatureTitle>
                        {it.body && <FeatureBody variant="body2">{it.body}</FeatureBody>}
                      </Box>
                    </FeatureItem>
                  ))}
                </FeatureList>

                {/* CTAs */}
                {isNarrow ? (
                  // Mobile — stacked like VideoCTA2 (tight spacing)
                  <Box
                    sx={{
                      mt: 2.5,
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: "1fr",
                      px: 0.5,
                    }}
                  >
                    {primary?.label && (
                      <CTAButton
                        variant="large"
                        component="a"
                        href={primary.href || "#"}
                        onClick={handleScrollTop}
                        aria-label={primary.label}
                      >
                        {primary.label}
                      </CTAButton>
                    )}
                    {secondary?.label && (
                      <CTAButton
                        variant="outline"
                        component="a"
                        href={secondary.href || "#"}
                        aria-label={secondary.label}
                      >
                        {secondary.label}
                      </CTAButton>
                    )}
                  </Box>
                ) : (
                  // Desktop — keep your original horizontal layout
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                    {primary?.label && (
                      <CTAButton variant="large" component="a" onClick={handleScrollTop}>
                        {primary.label}
                      </CTAButton>
                    )}
                    {secondary?.label && (
                      <CTAButton variant="outline" component="a" href={secondary.href || "#"}>
                        {secondary.label}
                      </CTAButton>
                    )}
                  </Box>
                )}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Panel>
    </SectionWrap>
  );
}
