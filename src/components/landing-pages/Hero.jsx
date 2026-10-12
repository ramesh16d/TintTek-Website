// src/components/landing-pages/Hero.jsx
import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import PhoneIcon from "@mui/icons-material/Phone";

/** Assets (public folder paths start with /) */
import llumarBadge from "/llumar-tested.webp";
/** If these PNGs live in /public/landing-page/... keep the leading slash.
    If they live in src/assets/..., import with a relative path instead. */
import heatIconUrl from "/landing-page/icon1.webp";
import uvIconUrl from "/landing-page/icon3.webp";
import warrantyIconUrl from "/landing-page/icon2.webp";

/* ---------- Local styles (scoped to Hero) ---------- */
const FeatureList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gap: 10,
});

const FeatureItem = styled(motion.li)({
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
});

const CheckBadge = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: 999,
  background:
    "linear-gradient(135deg, rgba(39,148,210,0.25), rgba(77,184,240,0.25))",
  border: "1px solid rgba(77,184,240,0.35)",
  boxShadow:
    "0 6px 18px rgba(39,148,210,.32), inset 0 0 0 1px rgba(255,255,255,0.06)",
  flexShrink: 0,
});

const FeatureTitle = styled(Typography)({
  fontWeight: 800,
  lineHeight: 1.2,
  color: "#ffffff",
});

const FeatureBody = styled(Typography)({
  color: "rgba(255,255,255,0.80)",
  lineHeight: 1.6,
  marginTop: 2,
});

const Stat = styled(motion.div)(({ theme }) => ({
  background: "transparent",
  border: "none",
  padding: theme.spacing(1.5),
  textAlign: "center",
  position: "relative",
}));

const StatIcon = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: 12,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StatValue = styled(Typography)(({ theme }) => ({
  position: "relative",
  fontWeight: 900,
  lineHeight: 1,
  fontSize: "clamp(1.6rem, 2.2vw, 2rem)",
  color: "#eaf6ff",
  WebkitTextStroke: "0.5px rgba(255,255,255,0.15)",
  textShadow: `
    0 0 10px rgba(77,184,240,.60),
    0 0 24px rgba(39,148,210,.45),
    0 0 48px rgba(39,148,210,.30)
  `,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "-28% -34%",
    background:
      "radial-gradient(60% 60% at 50% 50%, rgba(77,184,240,.35) 0%, rgba(39,148,210,.18) 35%, rgba(39,148,210,0) 70%)",
    filter: "blur(18px)",
    zIndex: -1,
    pointerEvents: "none",
  },
}));

const StatLabel = styled(Typography)({
  marginTop: 6,
  color: "rgba(255,255,255,0.78)",
  fontSize: "0.9rem",
});

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
    background:
      "linear-gradient(135deg, rgba(39, 148, 210, 0.1) 0%, transparent 50%)",
    borderRadius: "20px",
    zIndex: -1,
  },
}));

const StyledFrame = styled("iframe")(({ theme }) => ({
  width: "100%",
  height: 440,
  border: "1px solid rgba(39, 148, 210, 0.2)",
  borderRadius: "18px",
  boxShadow: "0 18px 56px rgba(0,0,0,0.5)",
  background: "transparent",
  outline: "none",
  overflow: "auto",
  loading: "lazy",
  [theme.breakpoints.up("md")]: { height: 600 },
}));

/* ---- CTA Button (desktop unchanged, mobile matches LocalVideoCTA) ---- */
const CTAButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ variant, theme }) => ({
  fontWeight: 700,
  padding: "10px 26px",
  borderRadius: "40px",
  fontSize: "0.95rem",
  textTransform: "none",
  position: "relative",
  overflow: "hidden",
  transition:
    "transform .28s cubic-bezier(.175,.885,.32,1.275), box-shadow .28s",
  boxShadow:
    variant === "outline" ? "none" : "0 10px 26px rgba(39,148,210,.35)",
  background:
    variant === "outline"
      ? "transparent"
      : "linear-gradient(135deg, #2794d2 0%, #4db8f0 100%)",
  border: variant === "outline" ? "2px solid #2794d2" : "none",
  color: variant === "outline" ? "#2794d2" : "#fff",
  "&:hover": {
    transform: "translateY(-2px)",
    background:
      variant === "outline"
        ? "linear-gradient(135deg, rgba(39,148,210,.2), rgba(77,184,240,.2))"
        : "linear-gradient(135deg, #4db8f0 0%, #2794d2 100%)",
    boxShadow:
      variant === "outline"
        ? "0 16px 34px rgba(39,148,210,.25)"
        : "0 16px 34px rgba(39,148,210,.45)",
    color: "#fff",
  },
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
    ...(variant !== "outline" && {
      background:
        "linear-gradient(180deg, rgba(77,184,240,0.95), rgba(39,148,210,0.95))",
      boxShadow:
        "0 10px 24px rgba(39,148,210,.35), 0 1px 0 rgba(255,255,255,0.06) inset",
    }),
    ...(variant === "outline" && {
      background: "rgba(15, 17, 22, 0.45)",
      backdropFilter: "blur(8px)",
      border: "1.5px solid rgba(113, 191, 242, 0.7)",
      color: "#e9f7ff",
      boxShadow: "0 8px 18px rgba(12, 18, 24, .5)",
      "&:hover": { background: "rgba(26, 32, 41, 0.55)" },
    }),
    "& .MuiButton-startIcon": { marginRight: 6, marginLeft: -2 },
    "&:active": { transform: "translateY(0)" },
  },
}));

/* ---------- Animations ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  },
};

/* ---------- Component ---------- */
export default function Hero({
  iframeSrc = "https://app.tintwiz.com/web/ce/mm78aa3rvkulrmu65oesvsa63ywubpq3",
  cityName,
  whyUsItems = [
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
  ],
}) {
  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    const yOffset = -100;
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
      <Box
        sx={{
          py: { xs: 10, md: 12 },
          mb: { xs: -10 },
          maxHeight: { md: "100vh" },
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* Iframe FIRST on mobile, SECOND on desktop */}
            <Grid item xs={12} lg={6} order={{ xs: 1, lg: 2 }}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.35 }}
              >
                <ImageContainer>
                  <StyledFrame
                    src={iframeSrc}
                    title="Get Your Free Quote"
                    loading="lazy"
                    allow="encrypted-media; clipboard-read; clipboard-write; fullscreen; geolocation"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </ImageContainer>
              </motion.div>
            </Grid>

            {/* Text SECOND on mobile, FIRST on desktop */}
            <Grid item xs={12} lg={6} order={{ xs: 2, lg: 1 }}>
              <motion.div variants={itemVariants}>
                <Box sx={{ mb: { xs: 2, md: 3 } }}>
                  {/* Location pill (city pages only) */}
                  {cityName && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 0.65,
                        borderRadius: "100px",
                        border: "1px solid rgba(39,148,210,0.4)",
                        background: "rgba(39,148,210,0.08)",
                        backdropFilter: "blur(10px)",
                        mb: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#2794d2",
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#2794d2",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Serving {cityName}, TX
                      </Typography>
                    </Box>
                  )}

                  {/* Stars + review count */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{ color: "#FFD700", fontSize: 22 }}
                      />
                    ))}
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#2794d2",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        ml: 1,
                      }}
                    >
                      250+ 5 STAR REVIEWS
                    </Typography>
                  </Box>

                  {/* Headline + Badge */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: { xs: 2.5, md: 3 },
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      variant="h2"
                      component="h1"
                      sx={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: { xs: "1.8rem", md: "2.6rem", lg: "2.6rem" },
                        lineHeight: 1.12,
                      }}
                    >
                      Block 89% Of Heat.
                      <br />
                      <Box component="span" sx={{ color: "#fff" }}>
                        Drive Cooler In
                      </Box>
                      <br />
                      <Box component="span" sx={{ color: "#fff" }}>
                        3 Hours!
                      </Box>
                    </Typography>

                    {/* LLumar badge to the right */}
                    <Box
                      component="img"
                      src={llumarBadge}
                      alt="LLumar Certified – 3rd Party Tested"
                      sx={{
                        height: 145,
                        width: "auto",
                        flexShrink: 0,
                        filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.35))",
                      }}
                    />
                  </Box>

                  {/* Feature list */}
                  <FeatureList
                    aria-label="Key benefits"
                    sx={{ mb: { xs: 2.5, md: 3 } }}
                  >
                    {whyUsItems.map((f, i) => (
                      <FeatureItem
                        key={f.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        viewport={{ once: true }}
                      >
                        <CheckBadge>
                          <TaskAltRoundedIcon
                            sx={{ fontSize: 16, color: "#e9f7ff" }}
                          />
                        </CheckBadge>
                        <Box>
                          <FeatureTitle variant="subtitle1">
                            {f.title}
                          </FeatureTitle>
                          <FeatureBody variant="body2">{f.body}</FeatureBody>
                        </Box>
                      </FeatureItem>
                    ))}
                  </FeatureList>

                  {/* Desktop CTAs */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      gap: 1.5,
                      flexWrap: "wrap",
                      mb: { xs: 2.5, md: 3 },
                    }}
                  >
                    <CTAButton
                      variant="large"
                      component="a"
                      href="tel:+19723628468"
                      startIcon={<PhoneIcon />}
                    >
                      Call Now
                    </CTAButton>

                    <CTAButton
                      variant="outline"
                      onClick={() => handleScrollTo("testimonials")}
                    >
                      Learn More
                    </CTAButton>
                  </Box>

                  {/* Mobile CTAs */}
                  <Box
                    sx={{
                      display: { xs: "grid", md: "none" },
                      mt: 2.5,
                      gap: 2,
                      gridTemplateColumns: "1fr",
                      px: 0.5,
                      mb: { xs: 2.5, md: 0 },
                    }}
                  >
                    <CTAButton
                      variant="large"
                      component="a"
                      href="tel:+19723628468"
                      startIcon={<PhoneIcon />}
                    >
                      Call Now
                    </CTAButton>

                    <CTAButton
                      variant="outline"
                      onClick={() => handleScrollTo("testimonials")}
                      aria-label="Learn More"
                    >
                      Learn More
                    </CTAButton>
                  </Box>

                  {/* Stats / Metrics */}
                  {/* Stats / Metrics (icons only now) */}
                  <Grid
                    container
                    spacing={{ xs: 0, sm: 2.25 }}
                    justifyContent={{ xs: "center", sm: "space-between" }}
                  >
                    {[heatIconUrl, uvIconUrl, warrantyIconUrl].map(
                      (iconUrl, i) => (
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          key={i}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            px: { xs: 2, sm: 0 },
                            py: { xs: 1.25, sm: 0 },
                          }}
                        >
                          <Box
                            component="img"
                            src={iconUrl}
                            alt={`Stat Icon ${i + 1}`}
                            sx={{
                              width: 100,
                              height: 100,
                              display: "block",
                              filter:
                                "drop-shadow(0 0 14px rgba(77,184,240,0.55))",
                            }}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
}
