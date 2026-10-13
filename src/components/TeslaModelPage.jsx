import InViewMount from "./InViewMount";
// src/components/TeslaModelPage.jsx
import React, { lazy, Suspense } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  GlobalStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { FaCarSide, FaSun, FaShieldAlt } from "react-icons/fa";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import SEO from "./SEO";
import BusinessInfo from "./hero/BusinessInfo";
import TeslaCTA from "./TeslaCTA";
import FAQSection from "./FAQSection";
import { teslaModels } from "../data/teslaModelData";

const SubContact = lazy(() => import("./SubContact"));
const SubCTA = lazy(() => import("./SubCTA"));
const SubQuickLinks = lazy(() => import("./SubQuickLinks"));
const BlogCTA = lazy(() => import("./BlogCTA"));
const Footer = lazy(() => import("./key-components/Footer"));
const TeslaTintPackages = lazy(() => import("./TeslaTintPackages"));

const SITE = "https://tinttekplus.com";
const GRADIENT = `radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
  radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
  linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)`;



export default function TeslaModelPage() {
  const { model: modelSlug } = useParams();
  const model = teslaModels[modelSlug];

  if (!model) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: GRADIENT }}>
        <SEO title="Model Not Found | Tint Tek Plus" description="This Tesla model page does not exist." robots="noindex, nofollow" />
        <Typography sx={{ color: "#fff" }}>
          Model not found.{" "}
          <RouterLink to="/services/tesla-window-tinting" style={{ color: "#2794d2" }}>
            View Tesla Tinting
          </RouterLink>
        </Typography>
      </Box>
    );
  }

  const url = `${SITE}/tesla/${model.slug}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: model.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${model.displayName} Window Tinting in Dallas, TX`,
    description: model.metaDescription,
    url,
    areaServed: { "@type": "AdministrativeArea", name: "Dallas–Fort Worth, TX" },
    provider: {
      "@type": "LocalBusiness",
      name: "Tint Tek Plus",
      url: SITE,
      telephone: "+1-972-362-8468",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2518 West Kingsley Rd",
        addressLocality: "Garland",
        addressRegion: "TX",
        postalCode: "75040",
        addressCountry: "US",
      },
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tesla Window Tinting", item: `${SITE}/services/tesla-window-tinting` },
      { "@type": "ListItem", position: 3, name: model.displayName, item: url },
    ],
  };

  return (
    <>
      <SEO
        title={model.metaTitle}
        description={model.metaDescription}
        keywords={model.keywords}
        canonical={url}
        image="https://tinttekplus.com/tesla-tint-model/tesla-20.webp"
        type="website"
        jsonLd={[serviceSchema, breadcrumbSchema, faqSchema]}
      />

      <GlobalStyles
        styles={{
          ".TeslaModelRoot::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: GRADIENT,
          },
        }}
      />

      <Box className="TeslaModelRoot" sx={{ minHeight: "100vh", background: GRADIENT }}>
        {/* ── Hero (matches ServicesPage hero formatting) ── */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            pt: 10,
            minHeight: "clamp(280px, 40vh, 420px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: { xs: 1, sm: 2, md: 2 },
          }}
        >
          <BusinessInfo />
          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem", lg: "3.5rem" },
            }}
          >
            {model.h1}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              fontSize: { xs: "1rem", sm: "1rem", md: "1.3rem", lg: "1.5rem" },
              position: "relative",
              display: "inline-block",
              maxWidth: 700,
              mx: "auto",
              "&::after": {
                content: '""',
                display: "block",
                width: "80px",
                height: "5px",
                backgroundColor: "#2794d2",
                margin: "6px auto 0",
                borderRadius: "2px",
                boxShadow:
                  "0 0 8px rgba(39,148,210,0.7), 0 0 16px rgba(39,148,210,0.6)",
                mt: 4,
              },
            }}
          >
            {model.heroSubtitle}
          </Typography>

          {model.featured && model.featuredNote && (
            <Box
              sx={{
                display: "inline-block",
                px: 3,
                py: 1,
                borderRadius: "100px",
                background: "rgba(255,180,0,0.1)",
                border: "1px solid rgba(255,180,0,0.3)",
                mt: 4,
              }}
            >
              <Typography sx={{ color: "#ffd700", fontWeight: 700, fontSize: "0.85rem" }}>
                ★ {model.featuredNote}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Above-the-fold CTA — matches how ServicesPage follows its hero with TeslaCTA */}
        <TeslaCTA />

        {/* ── Intro ── */}
        <Container maxWidth="md" sx={{ pb: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4,
              p: { xs: 3, md: 5 },
            }}
          >
            <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: { xs: "1rem", md: "1.15rem" }, lineHeight: 1.8 }}>
              {model.intro}
            </Typography>
          </Box>
        </Container>

        {/* ── Glass Details ── */}
        <InViewMount>
          <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 10 } }}>
            <Typography
              component="h2"
              sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 2 }}
            >
              {model.displayName} Glass Configuration
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4, lineHeight: 1.6 }}>
              Understanding the {model.name}'s glass layout is essential to a proper tint installation.
            </Typography>
            <Grid container spacing={2}>
              {model.glassDetails.map((detail, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      p: 2.5,
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <CheckCircleIcon sx={{ color: "#2794d2", fontSize: "1rem", mt: 0.2, flexShrink: 0 }} />
                    <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.92rem", lineHeight: 1.5 }}>
                      {detail}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </InViewMount>

        {/* ── Film Recommendations ── */}
        <InViewMount>
          <Box sx={{ background: "rgba(255,255,255,0.02)", py: { xs: 8, md: 10 } }}>
            <Container maxWidth="lg">
              <Typography
                component="h2"
                sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 2 }}
              >
                Recommended Films for the {model.displayName}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 5, lineHeight: 1.6 }}>
                We tailor the film recommendation to your specific {model.name} configuration, usage patterns, and privacy preferences.
              </Typography>
              <TableContainer
                sx={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: "rgba(39,148,210,0.12)" }}>
                      {["Film", "VLT", "Heat Rejection", "Best For"].map((h) => (
                        <TableCell key={h} sx={{ color: "#2794d2", fontWeight: 700, borderColor: "rgba(255,255,255,0.08)", py: 2 }}>
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {model.filmRecommendations.map((film, i) => (
                      <TableRow key={i} sx={{ "&:hover": { background: "rgba(255,255,255,0.03)" } }}>
                        <TableCell sx={{ color: "#fff", fontWeight: 600, borderColor: "rgba(255,255,255,0.06)", py: 2 }}>
                          {film.name}
                        </TableCell>
                        <TableCell sx={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.06)", py: 2, fontSize: "0.9rem" }}>
                          {film.vlt}
                        </TableCell>
                        <TableCell sx={{ borderColor: "rgba(255,255,255,0.06)", py: 2 }}>
                          <Box
                            sx={{
                              display: "inline-block",
                              px: 2,
                              py: 0.5,
                              borderRadius: "100px",
                              background: "rgba(39,148,210,0.15)",
                              border: "1px solid rgba(39,148,210,0.3)",
                            }}
                          >
                            <Typography sx={{ color: "#2794d2", fontWeight: 700, fontSize: "0.82rem" }}>
                              {film.heatRejection}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.06)", py: 2, fontSize: "0.9rem" }}>
                          {film.highlight}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Box>
        </InViewMount>

        {/* ── Pricing ── */}
        {model.pricing && (
          <InViewMount>
            <Box
              id="pricing"
              sx={{
                py: { xs: 6, md: 12 },
                textAlign: "center",
                color: "#fff",
              }}
            >
              <Container maxWidth="lg">
                <Typography
                  component="h2"
                  sx={{ mb: 1, fontWeight: "bold", color: "#fff", fontSize: { xs: "1.8rem", md: "2.4rem" } }}
                >
                  {model.displayName} Window Tinting Pricing
                </Typography>
                <Typography
                  sx={{ color: "#ccc", mb: 5, fontWeight: "bold", fontSize: "0.95rem" }}
                >
                  **All Side Windows and Back Glass are Included in Standard Package**
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 3,
                    justifyContent: "center",
                  }}
                >
                  {[
                    {
                      tier: "CTX",
                      price: model.pricing.CTX,
                      features: [
                        "Mid-range ceramic tint",
                        "Superior heat rejection",
                        "99% UV ray protection",
                      ],
                    },
                    {
                      tier: "PINNACLE",
                      price: model.pricing.PINNACLE,
                      features: [
                        "Premium nano-ceramic tint",
                        "Best clarity & heat reduction",
                        "Advanced infrared blocking",
                      ],
                    },
                  ].map(({ tier, price, features }) => (
                    <Box
                      key={tier}
                      sx={{
                        flex: 1,
                        textAlign: "center",
                        p: 4,
                        border: "2px solid #444",
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.04)",
                        transition: "border-color 0.3s ease",
                        "&:hover": { borderColor: "#2794d2" },
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: "bold", color: "#2794d2", fontSize: "1.5rem", mb: 1 }}
                      >
                        {tier}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold", color: "#00FF99", fontSize: "2.2rem", mb: 2 }}
                      >
                        {price}
                      </Typography>
                      <Box>
                        {features.map((feature, i) => (
                          <Tooltip key={i} title="More info" arrow>
                            <Typography
                              variant="body2"
                              sx={{
                                mb: 1,
                                color: "#ccc",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                              }}
                            >
                              {i === 0 && <FaCarSide />}
                              {i === 1 && <FaSun />}
                              {i === 2 && <FaShieldAlt />}
                              {feature}
                            </Typography>
                          </Tooltip>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Container>
            </Box>
          </InViewMount>
        )}

        {/* ── Additional Packages ── */}
        <InViewMount>
          <Suspense fallback={null}>
            <TeslaTintPackages />
          </Suspense>
        </InViewMount>

        {/* ── SEO Body Content ── */}
        {model.bodyParagraphs && model.bodyParagraphs.length > 0 && (
          <InViewMount>
            <Box sx={{ width: "100%", py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
              <Box
                sx={{
                  maxWidth: "1100px",
                  mx: "auto",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 6, md: 8 },
                }}
              >
                <Box sx={{ flex: { md: "0 0 35%" }, position: "relative" }}>
                  <Box sx={{ position: "sticky", top: "140px" }}>
                    <Typography
                      component={motion.h3}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      sx={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: { xs: "2rem", md: "3rem" },
                        lineHeight: 1.2,
                        letterSpacing: "-0.5px",
                        mb: 2,
                      }}
                    >
                      About <br sx={{ display: { xs: "none", md: "block" } }} />
                      <Box component="span" sx={{ color: "#2794d2" }}>{model.displayName}</Box>
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", mb: 4 }}>
                      Everything you need to know about {model.name} window tinting before booking your appointment.
                    </Typography>
                    <Box
                      component={motion.div}
                      initial={{ width: 0 }}
                      whileInView={{ width: "80px" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      sx={{
                        height: "4px",
                        background: "linear-gradient(90deg, #2794d2, transparent)",
                        borderRadius: "2px",
                        mb: { xs: 4, md: 0 },
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  {model.bodyParagraphs.map((text, index) => {
                    const num = (index + 1).toString().padStart(2, "0");
                    return (
                      <Box
                        key={index}
                        component={motion.div}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
                        sx={{
                          position: "relative",
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          gap: { xs: 2, sm: 4 },
                          background: "rgba(255, 255, 255, 0.03)",
                          backdropFilter: "saturate(180%) blur(12px)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "20px",
                          p: { xs: 3, md: 4 },
                          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                          transition: "transform 0.3s ease, background 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(39, 148, 210, 0.3)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 900,
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                            lineHeight: { xs: 1, md: 0.8 },
                            color: "rgba(39, 148, 210, 0.25)",
                            fontFamily: "monospace",
                            flexShrink: 0,
                          }}
                        >
                          {num}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "rgba(255,255,255,0.85)",
                            fontSize: { xs: "1.05rem", md: "1.15rem" },
                            lineHeight: 1.7,
                            fontWeight: 300,
                          }}
                        >
                          {text}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </InViewMount>
        )}

        {/* ── Sensor note ── */}
        <InViewMount>
          <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                background: "rgba(39,148,210,0.06)",
                border: "1px solid rgba(39,148,210,0.25)",
                display: "flex",
                gap: 3,
                alignItems: "flex-start",
              }}
            >
              <Typography sx={{ fontSize: "2.5rem", flexShrink: 0 }}>⚡</Typography>
              <Box>
                <Typography sx={{ color: "#2794d2", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", mb: 1.5 }}>
                  {model.displayName} Sensor Compatibility — Guaranteed
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.7 }}>
                  {model.sensorNote}
                </Typography>
              </Box>
            </Box>
          </Container>
        </InViewMount>

        {/* ── FAQ (shared FAQSection component — matches ServicesPage FAQ formatting) ── */}
        <InViewMount>
          <FAQSection
            faqsOverride={model.faqs}
            titleOverride={`${model.displayName} Tinting — Frequently Asked Questions`}
          />
        </InViewMount>

        {/* ── Related Tesla Models ── */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", mb: 3, textAlign: "center" }}>
            Other Tesla Models We Service
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1.5 }}>
            {[
              { slug: "model-3", name: "Model 3" },
              { slug: "model-y", name: "Model Y" },
              { slug: "model-s", name: "Model S" },
              { slug: "model-x", name: "Model X" },
              { slug: "cybertruck", name: "Cybertruck" },
            ]
              .filter((m) => m.slug !== model.slug)
              .map((m) => (
                <Button
                  key={m.slug}
                  component={RouterLink}
                  to={`/tesla/${m.slug}`}
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.7)",
                    borderRadius: "100px",
                    px: 3,
                    py: 0.75,
                    fontSize: "0.85rem",
                    "&:hover": { borderColor: "#2794d2", color: "#2794d2" },
                  }}
                >
                  Tesla {m.name}
                </Button>
              ))}
          </Box>
        </Container>

        {/* Final CTA + footer stack — matches ServicesPage's BlogCTA → CallToAction → Contact → QuickLinks → Footer order */}
        <Suspense fallback={null}>
          <BlogCTA />
          <SubCTA />
          <Box><SubContact /></Box>
          <SubQuickLinks />
          <Footer />
        </Suspense>
      </Box>
    </>
  );
}
