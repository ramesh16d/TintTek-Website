// src/components/CityFAQ.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

const ACCENT = "#2794d2";
const ACCENT_LIGHT = "#4db8f0";

// Landing-page FAQ (city and Tesla model pages). Answers stay mounted when
// collapsed so the text is in the prerendered HTML; FAQPage JSON-LD is emitted
// by the page via <SEO jsonLd>. eyebrow/title/description default to city copy.
export default function CityFAQ({
  cityName,
  faqs = [],
  onQuoteClick,
  eyebrow = `${cityName} FAQ`,
  title,
  description = `Straight answers about tint, PPF, and ceramic coating for ${cityName} vehicles.`,
  htmlAnswers = false,
}) {
  const [expanded, setExpanded] = useState(0);

  if (faqs.length === 0) return null;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 12 } }} aria-labelledby="city-faq-heading">
      <Grid container spacing={{ xs: 4, md: 8 }}>
        {/* Left: intro + CTA */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: { md: "sticky" }, top: { md: 120 } }}>
            <Typography
              variant="overline"
              sx={{
                color: ACCENT,
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                display: "block",
                mb: 2,
              }}
            >
              {eyebrow.toUpperCase()}
            </Typography>

            <Typography
              id="city-faq-heading"
              component="h2"
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.8rem" },
                lineHeight: 1.1,
                mb: 2.5,
              }}
            >
              {title || (
                <>
                  Questions from{" "}
                  <Box component="span" sx={{ color: ACCENT_LIGHT }}>
                    {cityName}
                  </Box>{" "}
                  drivers
                </>
              )}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.72)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.7,
                mb: 4,
                maxWidth: 440,
              }}
            >
              {description}{" "}
              {"Don't see your question? Give us a call — we're happy to help."}
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Button
                onClick={onQuoteClick}
                sx={{
                  px: 3.5,
                  py: 1.25,
                  borderRadius: 999,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1rem",
                  color: "#fff",
                  background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${ACCENT_LIGHT} 0%, ${ACCENT} 100%)`,
                  },
                }}
              >
                Get a Free Quote
              </Button>
              <Button
                component="a"
                href="tel:+19723628468"
                startIcon={<PhoneRoundedIcon />}
                sx={{
                  px: 3,
                  py: 1.25,
                  borderRadius: 999,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1rem",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  "&:hover": {
                    borderColor: ACCENT,
                    backgroundColor: "rgba(39,148,210,0.08)",
                  },
                }}
              >
                (972) 362-8468
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Right: questions */}
        <Grid item xs={12} md={7}>
          <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            {faqs.map((faq, i) => {
              const isOpen = expanded === i;
              return (
                <Accordion
                  key={faq.question}
                  expanded={isOpen}
                  onChange={() => setExpanded(isOpen ? false : i)}
                  disableGutters
                  // MUI wraps the summary in an <h3> by default; the question is already an h3
                  slots={{ heading: "div" }}
                  elevation={0}
                  square
                  sx={{
                    background: "transparent",
                    color: "#fff",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    "&::before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: `1px solid ${isOpen ? ACCENT : "rgba(255,255,255,0.25)"}`,
                          background: isOpen ? "rgba(39,148,210,0.15)" : "transparent",
                          transition: "border-color .25s, background .25s",
                        }}
                      >
                        <AddRoundedIcon sx={{ color: isOpen ? ACCENT_LIGHT : "#fff" }} />
                      </Box>
                    }
                    sx={{
                      px: 0,
                      py: { xs: 1.5, md: 2 },
                      "& .MuiAccordionSummary-content": { my: 0, gap: { xs: 2, md: 3 }, alignItems: "baseline" },
                      "& .MuiAccordionSummary-expandIconWrapper": { ml: 2, transition: "transform .25s" },
                      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": { transform: "rotate(45deg)" },
                      "&:hover .faq-q": { color: ACCENT_LIGHT },
                    }}
                  >
                    <Typography
                      sx={{
                        color: isOpen ? ACCENT_LIGHT : "rgba(255,255,255,0.4)",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        fontVariantNumeric: "tabular-nums",
                        minWidth: 24,
                        transition: "color .25s",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </Typography>
                    <Typography
                      component="h3"
                      className="faq-q"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.05rem", md: "1.25rem" },
                        lineHeight: 1.35,
                        transition: "color .2s",
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ px: 0, pt: 0, pb: 3, pl: { xs: 5, md: 6 }, pr: { md: 7 } }}>
                    {htmlAnswers ? (
                      // Trusted, hard-coded answers that contain lists/bold (services pages)
                      <Typography
                        component="div"
                        sx={{
                          color: "rgba(255,255,255,0.78)",
                          fontSize: { xs: "0.98rem", md: "1.05rem" },
                          lineHeight: 1.75,
                          "& ul": { pl: 2.5, my: 1.5 },
                          "& li": { mb: 1 },
                          "& strong": { color: "#fff", fontWeight: 700 },
                        }}
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    ) : (
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.78)",
                          fontSize: { xs: "0.98rem", md: "1.05rem" },
                          lineHeight: 1.75,
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
