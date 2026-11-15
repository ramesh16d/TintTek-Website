// src/components/LinkGridPanel.jsx
// Apple-inspired link panel: system type, quiet greys, hairline dividers, one
// accent blue. Used for "Areas We Serve" (SubQuickLinks) and "Other Tesla
// Models We Service" (TeslaModelPage). Links are plain <a href> inside a <nav>
// so crawlers can follow them without JavaScript.
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const APPLE_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';
const APPLE_BLUE = "#2997ff";
const APPLE_TEXT = "#f5f5f7";
const APPLE_GREY = "#86868b";
const HIGHLIGHT_BLUE = "#4db8f0"; // site-wide highlight (CityFAQ, landing headings)
const HAIRLINE = "rgba(255,255,255,0.08)";

/**
 * @param {string}   eyebrow        small grey label above the heading
 * @param {string}   title          white part of the heading
 * @param {string}   highlight      blue part of the heading
 * @param {string}   headingId      id for aria-labelledby
 * @param {string}   headingComponent  "h2" | "h3" — pick by page outline
 * @param {string}   navLabel       aria-label for the <nav>
 * @param {Array}    links          [{ name, to, title?, ariaLabel? }]
 * @param {object}   columns        responsive column counts, e.g. { xs: 2, md: 6 }
 * @param {object}   sx             extra styles for the outer panel
 */
export default function LinkGridPanel({
  eyebrow,
  title,
  highlight,
  headingId,
  headingComponent = "h3",
  navLabel,
  links = [],
  columns = { xs: 2, sm: 3, md: 6 },
  sx,
}) {
  const gridTemplateColumns = Object.fromEntries(
    Object.entries(columns).map(([bp, n]) => [bp, `repeat(${n}, 1fr)`])
  );

  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      sx={{
        px: { xs: 2.5, md: 5 },
        pt: { xs: 3.5, md: 5 },
        pb: { xs: 1.5, md: 2.5 },
        borderRadius: { xs: "20px", md: "28px" },
        // Matches the quick-links column cards
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: `1px solid ${HAIRLINE}`,
        fontFamily: APPLE_FONT,
        WebkitFontSmoothing: "antialiased",
        ...sx,
      }}
    >
      {/* Header */}
      <Box sx={{ maxWidth: 620, mb: { xs: 2.5, md: 3.5 } }}>
        {eyebrow && (
          <Typography
            sx={{
              fontFamily: APPLE_FONT,
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: APPLE_GREY,
              mb: 0.75,
            }}
          >
            {eyebrow}
          </Typography>
        )}
        <Typography
          id={headingId}
          component={headingComponent}
          sx={{
            fontFamily: APPLE_FONT,
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 600,
            letterSpacing: "-0.015em",
            lineHeight: 1.125,
            color: APPLE_TEXT,
          }}
        >
          {title}
          {highlight && (
            <>
              {" "}
              <Box component="span" sx={{ color: HIGHLIGHT_BLUE }}>
                {highlight}
              </Box>
            </>
          )}
        </Typography>
      </Box>

      {/* Link grid */}
      <Box component="nav" aria-label={navLabel}>
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
            display: "grid",
            gridTemplateColumns,
            columnGap: { xs: 2.5, md: 3 },
          }}
        >
          {links.map((link) => (
            <Box
              component="li"
              key={link.to}
              sx={{ borderTop: `1px solid ${HAIRLINE}` }}
            >
              <Box
                component={RouterLink}
                to={link.to}
                title={link.title}
                aria-label={link.ariaLabel}
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 0.5,
                  py: { xs: 1.5, md: 1.75 },
                  fontFamily: APPLE_FONT,
                  fontSize: { xs: "0.9375rem", md: "1.0625rem" },
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: APPLE_TEXT,
                  textDecoration: "none",
                  transition: "color 240ms cubic-bezier(0.25,0.1,0.25,1)",
                  "& .chevron": {
                    color: APPLE_BLUE,
                    opacity: 0,
                    transform: "translateX(-4px)",
                    transition:
                      "opacity 240ms cubic-bezier(0.25,0.1,0.25,1), transform 240ms cubic-bezier(0.25,0.1,0.25,1)",
                  },
                  "&:hover": {
                    color: APPLE_BLUE,
                    "& .chevron": { opacity: 1, transform: "translateX(0)" },
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${APPLE_BLUE}`,
                    outlineOffset: 2,
                    borderRadius: "6px",
                  },
                }}
              >
                {link.name}
                <Box component="span" className="chevron" aria-hidden="true">
                  ›
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
