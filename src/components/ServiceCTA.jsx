// src/components/ServiceCTA.jsx
// Apple-style call-to-action that follows the hero on every /services/* page
// (and the Tesla model pages). Replaces the old TeslaCTA / VideoCTA / ImageCTA
// layouts, which are now thin wrappers around this.
//
// - Landscape video: large full-width film, text centered underneath.
// - Portrait video: film beside the text on desktop, stacked on phones.
// - No video: centered text panel.
// Videos are web-encoded H.264 MP4s (public/videos/web) with their own poster
// frames, preload nothing, and autoplay muted only while on screen (never with
// reduced motion or Data Saver, and never after the viewer pauses).
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Container, Typography } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import QuoteDialog from "./QuoteDialog";

const EASE = "cubic-bezier(.25,.1,.25,1)";
const DEFAULT_FORM_URL =
  "https://app.tintwiz.com/web/cs/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t?service=default";

const web = (name) => ({ video: `/videos/web/${name}.mp4`, poster: `/videos/web/${name}-poster.webp` });

/* ------------------------------- Content ------------------------------- */
// Copy carried over unchanged from TeslaCTA / VideoCTA / ImageCTA. Titles that
// were stored in ALL CAPS are written in title case: the old design forced
// every title to uppercase with CSS, so the words on the page are the same.
const ctaContent = {
  "tesla-window-tinting": {
    title: "Unlock Your Tesla's Full Potential with Expert Window Tinting",
    paragraphs: [
      "Imagine driving your Tesla with enhanced privacy, a cooler interior, and a sleek, customized look—all while protecting your vehicle from harmful UV rays. At Tint Tek Plus, we specialize in premium LLumar® window films tailored specifically for Tesla models. Our expert installation ensures your vehicle not only looks great but also offers superior comfort and protection.",
      "Reduce heat, minimize glare, and preserve your interior—all while enhancing your Tesla’s style and performance.",
    ],
    ...web("tesla"),
    orientation: "landscape",
    hasAudio: false, // source has no audio track
    formUrl: "https://app.tintwiz.com/web/ce/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t",
  },
  "vehicle-window-tinting": {
    title: "Enhance Your Vehicle with Professional Window Tinting",
    paragraphs: [
      "At Tint Tek Plus, we specialize in transforming your vehicle’s appearance and functionality with high-quality LLumar® window films. Whether you’re looking to improve privacy, reduce interior heat, block harmful UV rays, or simply enhance the look of your car, our professional vehicle window tinting services will provide the perfect solution. Our premium window films are designed for durability, offering both style and performance. They not only enhance the aesthetic of your car but also protect you and your passengers from glare, heat, and UV damage — keeping your interior cool and your vehicle looking sleek.",
    ],
    ...web("vehicle-window-tint"),
    orientation: "landscape",
    formUrl: "https://app.tintwiz.com/web/ce/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t",
  },
  "vehicle-paint-protection": {
    title: "Ultimate Protection. Unmatched Clarity. Long-Lasting Results.",
    paragraphs: [
      "At Tint Tek Plus, we are committed to providing the highest level of protection for your vehicle, and that's why we offer Stek Paint Protection Film (PPF). This advanced, clear film acts as a shield for your car’s paint, protecting it from scratches, rock chips, road debris, and environmental contaminants. Stek PPF delivers an invisible, self-healing layer that keeps your car’s paint looking flawless, day after day.",
    ],
    ...web("ppf"),
    orientation: "landscape",
    formUrl: "https://app.tintwiz.com/web/ce/ossbvx1pgf73ldzcej0iw4iryailzpad",
  },
  "residential-window-tinting": {
    title: "Transform Your Home with Tint Tek Plus and LLumar® Window Film",
    paragraphs: [
      "If you're feeling uncomfortable or dissatisfied with your home, start with your windows. Tint Tek Plus offers smart residential window film solutions using LLumar American Made products to address what may be bothering you—whether it’s the hot spots in a room, high cooling costs, or even the afternoon glare on your TV. Our team has over 10+ years of experience and provides a variety of window films that are quickly and professionally installed, delivering lasting lifestyle benefits without breaking the bank.",
    ],
    ...web("residential"),
    orientation: "landscape",
    formUrl: "https://app.tintwiz.com/web/ce/gmyg7anofdflxmvnvuxyxhkll2itww5i",
  },
  "commercial-window-tinting": {
    title: "Transform Your Business with LLumar® Commercial Films",
    paragraphs: [
      "The glass in your office, retail, or residential building should be an asset, not a source of discomfort or excessive cost. At Tint Tek Plus, we offer high-quality LLumar® window films, designed to solve a wide range of glass-related issues: high energy costs, tenant complaints, glare, fading furnishings, privacy concerns, security risks, and more. Whether you're improving an existing property or designing a new one, LLumar® provides the perfect solution to meet your needs.",
    ],
    ...web("commercial"),
    orientation: "portrait",
    formUrl: "https://app.tintwiz.com/web/ce/6h71onostv4h3om1krrjcvqrds187kpy",
  },
  "headlight-services": {
    title: "Transform Your Vehicle with STEK Darkened Headlight & Taillight PPF",
    paragraphs: [
      "At Tint Tek Plus, we are committed to providing the highest level of protection for your vehicle, and that's why we offer Stek Paint Protection Film (PPF). This advanced, clear film acts as a shield for your car’s paint, protecting it from scratches, rock chips, road debris, and environmental contaminants. Stek PPF delivers an invisible, self-healing layer that keeps your car’s paint looking flawless, day after day.",
    ],
    ...web("headlight"),
    orientation: "portrait",
    formUrl: "https://app.tintwiz.com/web/ce/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t",
  },
  "ceramic-coating": {
    title: "Unmatched Protection. Brilliant Shine. Lasting Durability.",
    paragraphs: [
      "At Tint Tek Plus, we believe in offering the highest level of protection for your vehicle. That’s why we specialize in advanced ceramic and graphene coatings. These coatings create a durable, hydrophobic barrier that repels water, dirt, and contaminants while enhancing your car’s appearance with a glossy, showroom-like finish.",
    ],
    ...web("ceramic"),
    orientation: "portrait",
    formUrl: "https://app.tintwiz.com/web/ce/ossbvx1pgf73ldzcej0iw4iryailzpad",
  },
  "windshield-protection-film": {
    title:
      "Drive Texas Roads with Confidence: Experience Superior Protection, Clarity, and Durability.",
    paragraphs: [
      "At Tint Tek Plus, we specialize in providing superior windshield protection services using ExoShield GT3, a cutting-edge film designed to offer exceptional durability, clarity, and protection against environmental hazards. Whether you're navigating through the bustling city or driving on Texas' rugged highways, ExoShield GT3 provides an invisible yet robust layer of defense for your windshield.",
    ],
    ...web("windshield"),
    orientation: "portrait",
    formUrl: "https://app.tintwiz.com/web/ce/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t",
  },
  "vehicle-paint-correction": {
    title: "Restore Your Vehicle's Shine with Professional Paint Correction",
    paragraphs: [
      "At Tint Tek Plus, we specialize in restoring and enhancing your vehicle's paint, bringing back its original shine and clarity. Whether you're dealing with swirl marks, scratches, oxidation, or just want to boost the appearance of your car, our professional paint correction services will restore your vehicle's exterior to a showroom-quality finish..",
      "Our commercial films are smart, sleek, and built to last. Perfect for offices, retail spaces, and buildings looking to improve energy efficiency.",
    ],
    formUrl: "https://app.tintwiz.com/web/ce/ossbvx1pgf73ldzcej0iw4iryailzpad",
  },
};

/* ------------------------------- Pieces -------------------------------- */
const roundBtnSx = {
  width: 44,
  height: 44,
  p: 0,
  border: 0,
  borderRadius: "50%",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  color: "#fff",
  backgroundColor: "rgba(30,30,32,0.55)",
  backdropFilter: "saturate(180%) blur(20px)",
  WebkitBackdropFilter: "saturate(180%) blur(20px)",
  transition: `background-color .25s ${EASE}`,
  "&:hover": { backgroundColor: "rgba(60,60,64,0.7)" },
  "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 2 },
  "& svg": { fontSize: 24 },
};

const canAutoplay = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.connection?.saveData) return false;
  return true;
};

function Film({ src, poster, label, portrait, hasAudio = true }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const userPaused = useRef(false);

  // Play while on screen, pause when scrolled away (Apple product-page style)
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined" || !canAutoplay()) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: { xs: "24px", md: "32px" },
        overflow: "hidden",
        backgroundColor: "#111",
        aspectRatio: portrait ? { xs: "4 / 5", md: "9 / 16" } : "16 / 9",
        maxHeight: portrait ? { md: 680 } : "none",
        mx: "auto",
      }}
    >
      <Box
        component="video"
        ref={ref}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <Box sx={{ position: "absolute", left: { xs: 14, md: 20 }, bottom: { xs: 14, md: 20 }, display: "flex", gap: 1 }}>
        <Box component="button" type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"} sx={roundBtnSx}>
          {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
        </Box>
        {hasAudio && (
          <Box component="button" type="button" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"} sx={roundBtnSx}>
            {muted ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
          </Box>
        )}
      </Box>
    </Box>
  );
}

Film.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  label: PropTypes.string.isRequired,
  portrait: PropTypes.bool,
  hasAudio: PropTypes.bool,
};

function CopyBlock({ content, align, onQuote }) {
  return (
    <Box sx={{ textAlign: align, maxWidth: align === "center" ? 820 : 560, mx: align === "center" ? "auto" : 0 }}>
      <Typography
        component="h2"
        sx={{
          color: "#f5f5f7",
          fontWeight: 700,
          fontSize: { xs: "2rem", sm: "2.6rem", md: align === "center" ? "3.2rem" : "2.8rem" },
          lineHeight: 1.08,
          letterSpacing: "-0.025em",
          textWrap: "balance",
          mb: { xs: 2, md: 2.5 },
        }}
      >
        {content.title}
      </Typography>
      {content.paragraphs.map((p) => (
        <Typography
          key={p.slice(0, 40)}
          sx={{
            color: "rgba(245,245,247,0.62)",
            fontSize: { xs: "1.02rem", md: "1.15rem" },
            lineHeight: 1.6,
            mb: 1.5,
          }}
        >
          {p}
        </Typography>
      ))}
      <Box
        component="button"
        type="button"
        onClick={onQuote}
        aria-haspopup="dialog"
        sx={{
          mt: { xs: 2, md: 2.5 },
          border: 0,
          cursor: "pointer",
          px: 3.5,
          py: 1.5,
          borderRadius: 999,
          fontFamily: "inherit",
          fontSize: "1.05rem",
          fontWeight: 500,
          color: "#fff",
          backgroundColor: "#2794d2",
          transition: `background-color .25s ${EASE}`,
          "&:hover": { backgroundColor: "#1f86c1" },
          "&:focus-visible": { outline: "2px solid #fff", outlineOffset: 3 },
        }}
      >
        Get a Free Quote
      </Box>
    </Box>
  );
}

CopyBlock.propTypes = {
  content: PropTypes.shape({ title: PropTypes.string, paragraphs: PropTypes.arrayOf(PropTypes.string) }).isRequired,
  align: PropTypes.oneOf(["left", "center"]).isRequired,
  onQuote: PropTypes.func.isRequired,
};

/* ------------------------------ Component ------------------------------ */
export default function ServiceCTA({ serviceId, fallback = "tesla-window-tinting" }) {
  const content = ctaContent[serviceId] || ctaContent[fallback];
  const [open, setOpen] = useState(false);
  const openQuote = () => setOpen(true);
  const formUrl = content.formUrl || DEFAULT_FORM_URL;
  const label = `${content.title} — video`;

  let body;
  if (!content.video) {
    // No video: centered text panel
    body = (
      <Box
        sx={{
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 9 },
          borderRadius: { xs: "24px", md: "32px" },
          background: "radial-gradient(120% 140% at 50% 0%, rgba(39,148,210,0.2) 0%, rgba(255,255,255,0.045) 60%)",
        }}
      >
        <CopyBlock content={content} align="center" onQuote={openQuote} />
      </Box>
    );
  } else if (content.orientation === "portrait") {
    body = (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 5fr) minmax(0, 7fr)" },
          alignItems: "center",
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box sx={{ maxWidth: { xs: 520, md: 400 }, width: "100%", mx: "auto" }}>
          <Film src={content.video} poster={content.poster} label={label} hasAudio={content.hasAudio} portrait />
        </Box>
        <CopyBlock content={content} align="left" onQuote={openQuote} />
      </Box>
    );
  } else {
    body = (
      <>
        <Film src={content.video} poster={content.poster} label={label} hasAudio={content.hasAudio} />
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <CopyBlock content={content} align="center" onQuote={openQuote} />
        </Box>
      </>
    );
  }

  return (
    <Box component="section" aria-label={content.title} sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">{body}</Container>
      <QuoteDialog open={open} onClose={() => setOpen(false)} formUrl={formUrl} title={`${content.title} – Quote Form`} />
    </Box>
  );
}

ServiceCTA.propTypes = {
  serviceId: PropTypes.string,
  fallback: PropTypes.string,
};
