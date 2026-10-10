// src/components/VideoCTA.jsx
import React, { useRef, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
} from "@mui/material";
import { PlayArrow, Pause, VolumeUp, VolumeOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import QuoteForm from "./QuoteForm";

const videoContent = {
  "vehicle-window-tinting": {
    title: "ENHANCE YOUR VEHICLE WITH PROFESSIONAL WINDOW TINTING",
    description: `At Tint Tek Plus, we specialize in transforming your vehicle’s appearance and functionality with high-quality LLumar® window films. Whether you’re looking to improve privacy, reduce interior heat, block harmful UV rays, or simply enhance the look of your car, our professional vehicle window tinting services will provide the perfect solution. Our premium window films are designed for durability, offering both style and performance. They not only enhance the aesthetic of your car but also protect you and your passengers from glare, heat, and UV damage — keeping your interior cool and your vehicle looking sleek.`,
    video: "/videos/v-window-tint.mp4",
    formUrl:
      "https://app.tintwiz.com/web/cs/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t?service=vehicle",
  },
  "residential-window-tinting": {
    title: "Superior Protection for Texas Roads. Clarity. Durability. Safety.",
    description: `At Tint Tek Plus, we specialize in providing superior windshield protection services using ExoShield GT3, a cutting-edge film designed to offer exceptional durability, clarity, and protection against environmental hazards. Whether you're navigating through the bustling city or driving on Texas' rugged highways, ExoShield GT3 provides an invisible yet robust layer of defense for your windshield.`,
    video: "/videos/Windshield-Film.mov",
    formUrl:
      "https://app.tintwiz.com/web/cs/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t?service=residential",
  },
  "commercial-window-tinting": {
    title: "Transform Your Business with LLumar® Commercial Films",
    description: `The glass in your office, retail, or residential building should be an asset, not a source of discomfort or excessive cost. At Tint Tek Plus, we offer high-quality LLumar® window films, designed to solve a wide range of glass-related issues: high energy costs, tenant complaints, glare, fading furnishings, privacy concerns, security risks, and more. Whether you're improving an existing property or designing a new one, LLumar® provides the perfect solution to meet your needs.`,
    video: "/videos/commercial-video1.mov",
    formUrl:
      "https://app.tintwiz.com/web/ce/6h71onostv4h3om1krrjcvqrds187kpy",
  },
  "headlight-services": {
    title: "TRANSFORM YOUR VEHICLE WITH STEK DARKENED HEADLIGHT & TAILLIGHT PPF",
    description: `At Tint Tek Plus, we are committed to providing the highest level of protection for your vehicle, and that's why we offer Stek Paint Protection Film (PPF). This advanced, clear film acts as a shield for your car’s paint, protecting it from scratches, rock chips, road debris, and environmental contaminants. Stek PPF delivers an invisible, self-healing layer that keeps your car’s paint looking flawless, day after day.`,
    video: "/videos/headlight.mov",
    formUrl:
      "https://app.tintwiz.com/web/ce/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t",
  },
  "ceramic-coating": {
    title: "Unmatched Protection. Brilliant Shine. Lasting Durability.",
    description: `At Tint Tek Plus, we believe in offering the highest level of protection for your vehicle. That’s why we specialize in advanced ceramic and graphene coatings. These coatings create a durable, hydrophobic barrier that repels water, dirt, and contaminants while enhancing your car’s appearance with a glossy, showroom-like finish.`,
    video: "/videos/ceramic.mov",
    formUrl:
      "https://app.tintwiz.com/web/ce/ossbvx1pgf73ldzcej0iw4iryailzpad",
  },
  "windshield-protection-film": {
    title:
      "Drive Texas Roads with Confidence: Experience Superior Protection, Clarity, and Durability.",
    description: `At Tint Tek Plus, we specialize in providing superior windshield protection services using ExoShield GT3, a cutting-edge film designed to offer exceptional durability, clarity, and protection against environmental hazards. Whether you're navigating through the bustling city or driving on Texas' rugged highways, ExoShield GT3 provides an invisible yet robust layer of defense for your windshield.`,
    video: "/videos/Windshield-Film.mov",
    formUrl:
      "https://app.tintwiz.com/web/ce/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t",
  },
};

export default function VideoCTA() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { serviceId } = useParams();

  const content =
    videoContent[serviceId] || videoContent["residential-window-tinting"];

  // Safe default fallback form
  const defaultFormUrl =
    "https://app.tintwiz.com/web/cs/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t?service=default";
  const formUrl = useMemo(
    () => (content.formUrl ? content.formUrl : defaultFormUrl),
    [content.formUrl]
  );

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleToggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const fadeSlideVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <Box>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "stretch",
            maxWidth: "1500px",
            mx: "auto",
            px: { xs: 1, sm: 2, md: 2 },
            py: isMobile ? 0 : 4,
          }}
        >
          {/* Left: Video */}
          <Box
            sx={{
              width: isMobile ? "90%" : "25%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: "auto",
              p: 2,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: "20px",
                overflow: "hidden",
                background: "linear-gradient(145deg, #1b1b1b, #3a3a3a)",
                boxShadow: `
                  0 0 20px rgba(39,148,210,0.7),
                  0 0 40px rgba(39,148,210,0.5),
                  0 0 60px rgba(39,148,210,0.3),
                  0 10px 25px rgba(0,0,0,0.6),
                  inset 0 0 10px rgba(255,255,255,0.1)
                `,
              }}
            >
              <video
                ref={videoRef}
                src={content.video}
                muted={isMuted}
                playsInline
                controls={false}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                poster="/gallery/Tint Tek-107-2.webp"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Play/Pause */}
              <IconButton
                onClick={handleToggleVideo}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  backgroundColor: "#000",
                  color: "#2794d2",
                  "&:hover": { backgroundColor: "#2794d2", color: "#000" },
                }}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>

              {/* Mute/Unmute */}
              <IconButton
                onClick={handleToggleMute}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 64,
                  backgroundColor: "#000",
                  color: "#2794d2",
                  "&:hover": { backgroundColor: "#2794d2", color: "#000" },
                }}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
            </Box>
          </Box>

          {/* ✅ Mobile-only CTA directly below the video */}
          <Box
            sx={{
              display: { xs: "block", sm: "none" },
              width: "90%",
              mx: "auto",
              mt: 2,
              mb: 3,
            }}
          >
            <Button
              onClick={handleOpenModal}
              variant="contained"
              aria-label="Open quote form"
              sx={{
                backgroundColor: "#2794d2 !important",
                color: "#000",
                fontWeight: "bold",
                py: 1.2,
                borderRadius: "30px",
                textTransform: "uppercase",
                width: "100%",
              }}
            >
              Get a Free Quote
            </Button>
          </Box>

          {/* Right: Text + Desktop/Tablet CTA */}
          <Box
            sx={{
              width: isMobile ? "100%" : "75%",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              px: { xs: 1, sm: 2, md: 3 },
              py: isMobile ? 5 : 0,
            }}
          >
            <Typography
              variant={isMobile ? "h4" : "h2"}
              component={motion.h3}
              variants={fadeSlideVariant}
              sx={{
                fontWeight: "bold",
                letterSpacing: "1px",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              {content.title}
            </Typography>

            <Typography
              variant="body1"
              component={motion.p}
              variants={fadeSlideVariant}
              sx={{
                mt: 2,
                fontSize: isMobile ? "1rem" : "1.2rem",
                lineHeight: "1.6",
                opacity: 0.9,
              }}
            >
              {content.description}
            </Typography>

            {/* Desktop/Tablet CTA (hidden on mobile) */}
            <Button
              component={motion.button}
              aria-label="Open quote form"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                mt: 3,
                backgroundColor: "#2794d2 !important",
                color: "#000",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                borderRadius: "30px",
                textTransform: "uppercase",
                fontSize: "1.1rem",
              }}
              onClick={handleOpenModal}
            >
              Get a Free Quote
            </Button>

            {/* Modal with per-service form */}
            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="lg">
              <Box sx={{ position: "relative" }}>
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "#fff",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1,
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                  }}
                  aria-label="Close quote dialog"
                >
                  <CloseIcon />
                </IconButton>
                <QuoteForm
                  src={formUrl}
                  width="100%"
                  height="800px"
                  style={{ border: "none" }}
                  title="Fast Quote"
                  loading="lazy"
                />
              </Box>
            </Dialog>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
