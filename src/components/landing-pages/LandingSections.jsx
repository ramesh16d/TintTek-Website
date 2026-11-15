// src/components/landing-pages/LandingSections.jsx
// Shared sections for the city (/locations/:city) and brand (/brands/:brand)
// landing pages: the 4-column benefits row and the blue "Professional
// Installation" block. Markup is identical to what CityPage rendered inline.
import { Box, Typography, Button, Grid, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

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

const CTAButton = styled(Button)(({ variant }) => ({
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

const FALLBACK_IMG =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTExMTExIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkltYWdlPC90ZXh0Pgo8L3N2Zz4=";

/** 4-column benefits row with icon, title and body per item. */
export function BenefitsSection({ eyebrow, title, subtitle, items, onQuoteClick }) {
  return (
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
            {eyebrow}
          </Typography>

          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.2rem", md: "3rem" },
              mb: 2,
              textTransform: "uppercase",
              letterSpacing: { xs: 0, md: "0.02em" },
            }}
          >
            {title}
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
            {subtitle}
          </Typography>
        </Box>

        {/* 4 Columns */}
        <Grid container spacing={0}>
          {items.map((item, idx) => (
            <Grid
              item
              xs={12}
              md={3}
              key={idx}
              sx={{
                px: { xs: 2, md: 4 },
                py: { xs: 5, md: 7 },
                textAlign: { xs: "left", md: "left" },
                position: "relative",
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
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2.5 }}>
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
                    sx={{ color: "rgba(255,255,255,0.80)", lineHeight: 1.7 }}
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
            onClick={onQuoteClick}
          >
            Get a Free Quote
          </CTAButton>
        </Box>
      </motion.div>
    </Box>
  );
}

/** Blue "Professional Installation" block: copy + check bullets + photo. */
export function InstallationCTA({
  eyebrow,
  title,
  intro,
  bullets,
  image,
  imageAlt,
  onQuoteClick,
}) {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box sx={{ py: { xs: 4, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Box
          sx={{
            background: "#1ea9ff",
            borderRadius: { xs: 3, md: 6 },
            p: { xs: 2.5, md: 6 },
            boxShadow: {
              xs: "0 14px 36px rgba(0,0,0,0.28)",
              md: "0 30px 80px rgba(0,0,0,0.35)",
            },
          }}
        >
          <Grid container spacing={{ xs: 2.5, md: 6 }} alignItems="center">
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
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: { xs: "16 / 10", sm: "16 / 9" },
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={imageAlt}
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
                      e.currentTarget.src = FALLBACK_IMG;
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
                  fontSize: { xs: "0.7rem", md: "0.8rem" },
                }}
              >
                {eyebrow}
              </Typography>

              <Typography
                component="h2"
                sx={{
                  color: "#fff",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  fontSize: {
                    xs: "clamp(1.5rem, 4vw, 2.25rem)",
                    md: "3rem",
                  },
                  mb: { xs: 2, md: 3 },
                  lineHeight: { xs: 1.15, md: 1.1 },
                }}
              >
                {title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.95)",
                  lineHeight: { xs: 1.7, md: 1.8 },
                  fontWeight: 400,
                  mb: { xs: 2.25, md: 3 },
                  maxWidth: { xs: "100%", sm: 680, md: 900 },
                  fontSize: { xs: "1rem", md: "1.125rem" },
                }}
              >
                {intro}
              </Typography>

              {/* Bullets */}
              <FeatureList
                aria-label="Professional installation benefits"
                style={{ gap: 8 }}
              >
                {bullets.map((f, i) => (
                  <FeatureItem
                    key={f.title}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <CheckBadge>
                      <TaskAltRoundedIcon sx={{ fontSize: 16, color: "#e9f7ff" }} />
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
                onClick={onQuoteClick}
              >
                Get Free Quote
              </Button>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Box>
  );
}
