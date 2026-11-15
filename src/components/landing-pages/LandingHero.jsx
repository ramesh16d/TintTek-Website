// src/components/landing-pages/LandingHero.jsx
// Apple-style hero shared by the brand (/brands/:brand), city
// (/locations/:city) and /mockup landing pages. Two columns on desktop — copy left, quote
// form right, stretched to the same height — stacked copy-first on phones.
// Pages pass their own data; nothing here is brand- or city-specific.
// Also used on the /mockup ad landing page.
//
// SSR/hydration: no JS media queries and no opacity-0 entrance animations, so
// the prerendered HTML is what users and crawlers see from the first paint.
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import llumarBadge from "/llumar-tested.webp";

const ACCENT = "#4db8f0";
const EASE = "cubic-bezier(.25,.1,.25,1)";
const QUOTE_URL = "https://app.tintwiz.com/web/ce/mm78aa3rvkulrmu65oesvsa63ywubpq3";

const scrollToTestimonials = (e) => {
  const el = document.getElementById("testimonials");
  if (!el) return;
  e.preventDefault();
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
};

export default function LandingHero({ eyebrow, headline, subtitle, points, pointsLabel, trust }) {
  return (
    // No inner Container: BrandPage already wraps the page in one, so the hero
    // lines up with the sections below it.
    <Box component="header" sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 6, md: 10 } }}>
      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.05fr) minmax(0, 1fr)" },
            gap: { xs: 6, lg: 8 },
            // Desktop: both columns stretch to the taller one, so the form
            // panel is exactly as tall as the copy column
            alignItems: { xs: "start", lg: "stretch" },
          }}
        >
          {/* ---------------- Copy ---------------- */}
          <Box>
            {/* Rating pill */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.75,
                py: 0.75,
                mb: { xs: 2.5, md: 3, lg: 2 },
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            >
              <Box aria-hidden="true" sx={{ display: "flex", color: "#FFC83D" }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarRoundedIcon key={i} sx={{ fontSize: 18 }} />
                ))}
              </Box>
              <Typography component="span" sx={{ color: "rgba(245,245,247,0.86)", fontSize: "0.9rem", fontWeight: 500 }}>
                250+ 5-star reviews
              </Typography>
            </Box>

            {/* Eyebrow (brand certification / city focus) */}
            {eyebrow && (
            <Typography
              sx={{
                color: ACCENT,
                fontWeight: 600,
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                letterSpacing: "0.02em",
                mb: 1.5,
              }}
            >
              {eyebrow}
            </Typography>
            )}

            <Typography
              component="h1"
              sx={{
                color: "#f5f5f7",
                fontWeight: 700,
                fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.75rem", lg: "3.25rem" },
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                textWrap: "balance",
                mb: { xs: 2, md: 2.5, lg: 1.75 },
              }}
            >
              {headline}
            </Typography>

            {subtitle ? (
              <Typography
                sx={{
                  color: "rgba(245,245,247,0.62)",
                  fontWeight: 500,
                  fontSize: { xs: "1.1rem", md: "1.3rem", lg: "1.2rem" },
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                  maxWidth: 600,
                  mb: { xs: 3.5, md: 4, lg: 3 },
                }}
              >
                {subtitle}
              </Typography>
            ) : (
              // No subtitle (e.g. /mockup): keep the gap before the CTAs
              <Box sx={{ mb: { xs: 1, md: 1.5 } }} />
            )}

            {/* CTAs */}
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: { xs: 2, sm: 3 }, mb: { xs: 5, md: 6, lg: 4 } }}>
              <Box
                component="a"
                href="tel:+19723628468"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 3.25,
                  py: 1.5,
                  borderRadius: 999,
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  color: "#fff",
                  backgroundColor: "#2794d2",
                  transition: `background-color .25s ${EASE}`,
                  "&:hover": { backgroundColor: "#1f86c1" },
                  "&:focus-visible": { outline: "2px solid #fff", outlineOffset: 3 },
                }}
              >
                <PhoneRoundedIcon sx={{ fontSize: 20 }} aria-hidden="true" />
                Call Now
              </Box>
              <Box
                component="a"
                href="#testimonials"
                onClick={scrollToTestimonials}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: ACCENT,
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                  "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 3, borderRadius: 1 },
                }}
              >
                Learn More
                <ChevronRightRoundedIcon sx={{ fontSize: 22 }} aria-hidden="true" />
              </Box>
            </Box>

            {/* Hero points (brand-specific) */}
            <Box component="ul" aria-label={pointsLabel} sx={{ listStyle: "none", p: 0, m: 0, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              {points.map((point) => (
                <Box
                  component="li"
                  key={point.title}
                  sx={{
                    display: "flex",
                    gap: 1.75,
                    py: { xs: 2, md: 2.25, lg: 1.5 },
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <CheckRoundedIcon aria-hidden="true" sx={{ color: ACCENT, fontSize: 22, mt: "2px", flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ color: "#f5f5f7", fontWeight: 600, fontSize: { xs: "1.02rem", md: "1.08rem" }, lineHeight: 1.3 }}>
                      {point.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(245,245,247,0.62)",
                        fontSize: { xs: "0.97rem", lg: "0.95rem" },
                        lineHeight: 1.55,
                        mt: 0.5,
                        // Desktop (side-by-side with the form): cap each point at 2 lines so
                        // the copy column isn't taller than the form. The full text stays in
                        // the HTML for crawlers, and phones show it in full.
                        display: { lg: "-webkit-box" },
                        WebkitLineClamp: { lg: 2 },
                        WebkitBoxOrient: { lg: "vertical" },
                        overflow: { lg: "hidden" },
                      }}
                    >
                      {point.body}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Trust row: brand warranty (+ LLumar certification badge where applicable) */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: { xs: 3, md: 3.5, lg: 2.5 } }}>
              {trust.showBadge ? (
                <Box
                  component="img"
                  src={llumarBadge}
                  alt="LLumar Certified – 3rd Party Tested"
                  width={500}
                  height={500}
                  sx={{ width: { xs: 64, lg: 52 }, height: { xs: 64, lg: 52 }, flexShrink: 0 }}
                />
              ) : (
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "rgba(77,184,240,0.12)",
                  }}
                >
                  <VerifiedOutlinedIcon sx={{ color: ACCENT, fontSize: 26 }} />
                </Box>
              )}
              <Box>
                <Typography sx={{ color: "#f5f5f7", fontWeight: 600, fontSize: "1rem" }}>{trust.title}</Typography>
                <Typography sx={{ color: "rgba(245,245,247,0.55)", fontSize: "0.9rem", lineHeight: 1.45 }}>
                  {trust.body}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ---------------- Quote form ----------------
              The Tint Wiz form brings its own heading and near-black background
              (cross-origin, can't be styled), so the panel matches it rather
              than framing it in a lighter tile. */}
          <Box
            sx={{
              borderRadius: { xs: "24px", md: "28px" },
              overflow: "hidden",
              backgroundColor: "#121212",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 30px 60px rgba(0,0,0,0.35)",
              // Desktop: fill the stretched grid cell (same height as the copy),
              // but never shorter than the form itself (~780px) so it isn't cut off
              display: { lg: "flex" },
              flexDirection: { lg: "column" },
              minHeight: { lg: 780 },
            }}
          >
            <Box
              component="iframe"
              src={QUOTE_URL}
              title="Get Your Free Quote"
              loading="lazy"
              allow="encrypted-media; clipboard-read; clipboard-write; fullscreen; geolocation"
              referrerPolicy="strict-origin-when-cross-origin"
              sx={{
                display: "block",
                width: "100%",
                // Phones/tablets (stacked): fixed height. Desktop: grow to fill the panel.
                height: { xs: 640, md: 780, lg: "auto" },
                flex: { lg: "1 1 auto" },
                border: 0,
                background: "transparent",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

LandingHero.propTypes = {
  eyebrow: PropTypes.string,
  headline: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  points: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, body: PropTypes.string })).isRequired,
  pointsLabel: PropTypes.string,
  trust: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    showBadge: PropTypes.bool,
  }).isRequired,
};
