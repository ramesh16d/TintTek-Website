// src/components/CitySEOContent.jsx
// City-specific SEO copy rendered directly under the hero on /locations/:city.
// Deliberately NOT wrapped in scroll-triggered animation so the full text is
// visible in the prerendered HTML that crawlers read.
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const ACCENT = "#2794d2";
const ACCENT_LIGHT = "#4db8f0";

const linkSx = {
  color: ACCENT_LIGHT,
  fontWeight: 600,
  textDecoration: "underline",
  textDecorationColor: "rgba(77,184,240,0.4)",
  textUnderlineOffset: "3px",
  "&:hover": { color: "#fff", textDecorationColor: "#fff" },
};

// Turns "text [anchor](/path) more text" into text + <RouterLink> nodes.
function renderWithLinks(text) {
  const parts = [];
  const re = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  let last = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <Box component={RouterLink} key={match.index} to={match[2]} sx={linkSx}>
        {match[1]}
      </Box>
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// Also used by brand pages: pass highlightsTitle instead of a city.
export default function CitySEOContent({ city, content, highlightsTitle }) {
  if (!content) return null;

  return (
    <Box
      component="section"
      aria-labelledby="city-seo-heading"
      sx={{ py: { xs: 4, md: 8 } }}
    >
      <Grid container spacing={{ xs: 4, md: 8 }}>
        {/* Long-form copy */}
        <Grid item xs={12} md={7}>
          <Typography
            variant="overline"
            sx={{
              color: ACCENT,
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              display: "block",
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            {content.eyebrow.toUpperCase()}
          </Typography>

          <Typography
            id="city-seo-heading"
            component="h2"
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              lineHeight: 1.15,
              mb: 3,
            }}
          >
            {content.heading}
          </Typography>

          {content.paragraphs.map((p, i) => (
            <Typography
              key={i}
              component="p"
              sx={{
                color: "rgba(255,255,255,0.80)",
                fontSize: { xs: "1rem", md: "1.075rem" },
                lineHeight: 1.8,
                mb: 2.5,
              }}
            >
              {renderWithLinks(p)}
            </Typography>
          ))}
        </Grid>

        {/* Service highlights */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: "grid", gap: 2.5 }}>
            <Typography
              component="h3"
              sx={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem" }}
            >
              {highlightsTitle || `Popular services in ${city.name}`}
            </Typography>

            {content.highlights.map((h) => (
              <Box
                key={h.title}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 3,
                  border: "1px solid rgba(77,184,240,0.25)",
                  background:
                    "linear-gradient(135deg, rgba(39,148,210,0.10), rgba(255,255,255,0.02))",
                }}
              >
                <Typography
                  component="h4"
                  sx={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem", mb: 0.75 }}
                >
                  {h.title}
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.65, mb: 1.5 }}
                >
                  {h.body}
                </Typography>
                <Box
                  component={RouterLink}
                  to={h.to}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: ACCENT_LIGHT,
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {h.linkLabel}
                  <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} aria-hidden="true" />
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
