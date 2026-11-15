import InViewMount from "./InViewMount";
// src/components/TeslaModelPage.jsx
import React, { lazy, Suspense } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  GlobalStyles,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import SEO from "./SEO";
import BusinessInfo from "./hero/BusinessInfo";
import TeslaCTA from "./TeslaCTA";
import CityFAQ from "./CityFAQ";
import { TeslaModelPricing } from "./Pricing";
import TeslaFilmLineup from "./TeslaFilmLineup";
import TeslaGlassZones from "./TeslaGlassZones";
import LinkGridPanel from "./LinkGridPanel";
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
        <SEO title="Model Not Found | Tint Tek Plus" description="This Tesla model page does not exist." robots="noindex, nofollow" canonical={false} />
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

  // Intro: split off the first sentence so it can be styled as a lead-in.
  const leadEnd = model.intro.search(/\.\s/);
  const introLead = leadEnd === -1 ? model.intro : model.intro.slice(0, leadEnd + 1);
  const introRest = leadEnd === -1 ? "" : model.intro.slice(leadEnd + 2).trim();
  const introImage = model.image || {
    src: "/tesla/Tint Tek-195.webp",
    alt: `Window tint installation on a Tesla at Tint Tek Plus in Garland, TX`,
  };

  return (
    <>
      <SEO
        title={model.metaTitle}
        description={model.metaDescription}
        keywords={model.keywords}
        canonical={url}
        // Share image = this page's own intro photo (encoded: some paths have spaces)
        image={encodeURI(`https://tinttekplus.com${introImage.src}`)}
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
            pt: { xs: 14, md: 18 },
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
        <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 8, md: 10 } }}>
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: "#2794d2",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                Why tint your {model.name}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", md: "2.4rem" },
                  lineHeight: 1.15,
                  mb: 3,
                }}
              >
                Built around the {model.name}&apos;s glass
              </Typography>
              {/* First sentence as a lead-in, the rest as body text */}
              <Box sx={{ borderLeft: "3px solid #2794d2", pl: { xs: 2, md: 3 } }}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    lineHeight: 1.55,
                    mb: introRest ? 2 : 0,
                  }}
                >
                  {introLead}
                </Typography>
                {introRest && (
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.72)",
                      fontSize: { xs: "1rem", md: "1.08rem" },
                      lineHeight: 1.8,
                    }}
                  >
                    {introRest}
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={introImage.src}
                alt={introImage.alt}
                width={790}
                height={527}
                loading="lazy"
                decoding="async"
                sx={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  aspectRatio: "3 / 2",
                  objectFit: "cover",
                  borderRadius: 4,
                  border: "1px solid rgba(39,148,210,0.3)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
                }}
              />
            </Grid>
          </Grid>
        </Container>

        {/* ── SEO Body Content ── */}
        {model.bodyParagraphs && model.bodyParagraphs.length > 0 && (
          <InViewMount>
            <Box
              component="section"
              sx={{ width: "100%", pt: { xs: 2, md: 4 }, pb: { xs: 8, md: 12 } }}
            >
              <Container maxWidth="lg">
                {/* Header row: title left, intro right */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "flex-end" },
                    justifyContent: "space-between",
                    gap: { xs: 2, md: 6 },
                    mb: { xs: 4, md: 5 },
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: { xs: "2rem", md: "2.6rem" },
                      lineHeight: 1.15,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    About{" "}
                    <Box component="span" sx={{ color: "#2794d2" }}>
                      {model.displayName}
                    </Box>
                  </Typography>
                  <Box sx={{ maxWidth: 420 }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.6 }}>
                      Everything you need to know about {model.name} window tinting before booking your
                      appointment.
                    </Typography>
                    <Box
                      sx={{
                        width: 80,
                        height: 4,
                        mt: 2,
                        background: "linear-gradient(90deg, #2794d2, transparent)",
                        borderRadius: "2px",
                      }}
                    />
                  </Box>
                </Box>

                {/* Cards: swipe row on phones, 2 columns on tablets, 3 on desktop */}
                <Box
                  sx={{
                    display: { xs: "flex", sm: "grid" },
                    gridTemplateColumns: { sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                    gap: { xs: 2, md: 3 },
                    overflowX: { xs: "auto", sm: "visible" },
                    scrollSnapType: { xs: "x mandatory", sm: "none" },
                    // Snap to the padded edge, not the container edge, so cards keep the page gutter
                    scrollPaddingInline: { xs: "16px", sm: 0 },
                    mx: { xs: -2, sm: 0 },
                    px: { xs: 2, sm: 0 },
                    pb: { xs: 1, sm: 0 },
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  {model.bodyParagraphs.map((text, index) => (
                    <Box
                      key={index}
                      component={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px 0px" }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.1 }}
                      sx={{
                        flex: { xs: "0 0 85%", sm: "initial" },
                        scrollSnapAlign: { xs: "start", sm: "none" },
                        position: "relative",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "20px",
                        p: { xs: 2.75, md: 3 },
                        transition: "border-color 0.3s ease, background 0.3s ease",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.05)",
                          borderColor: "rgba(39, 148, 210, 0.3)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: "1.4rem",
                          lineHeight: 1,
                          color: "rgba(39, 148, 210, 0.45)",
                          fontFamily: "monospace",
                          mb: 1.5,
                        }}
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.82)",
                          fontSize: { xs: "0.96rem", md: "0.98rem" },
                          lineHeight: 1.65,
                          fontWeight: 300,
                        }}
                      >
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Typography
                  sx={{
                    display: { xs: "block", sm: "none" },
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "0.8rem",
                    mt: 1.5,
                    textAlign: "center",
                  }}
                >
                  Swipe for more →
                </Typography>
              </Container>
            </Box>
          </InViewMount>
        )}

        {/* ── Glass Details ── */}
        <InViewMount>
          <TeslaGlassZones model={model} />
        </InViewMount>

        {/* ── Film Recommendations ── */}
        <InViewMount>
          <TeslaFilmLineup model={model} />
        </InViewMount>

        {/* ── Pricing (same component as the services pages) ── */}
        <InViewMount>
          <TeslaModelPricing model={model} />
        </InViewMount>

        {/* ── Additional Packages ── */}
        <InViewMount>
          <Suspense fallback={null}>
            <TeslaTintPackages />
          </Suspense>
        </InViewMount>

        {/* ── FAQ (same design as the city landing pages) ── */}
        <InViewMount>
          <Container maxWidth="lg">
            <CityFAQ
              faqs={model.faqs}
              eyebrow={`${model.displayName} FAQ`}
              title={
                <>
                  Questions from{" "}
                  <Box component="span" sx={{ color: "#4db8f0" }}>
                    {model.name}
                  </Box>{" "}
                  owners
                </>
              }
              description={`Straight answers about window tint for the ${model.displayName}.`}
              onQuoteClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </Container>
        </InViewMount>

        {/* ── Related Tesla Models ── */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <LinkGridPanel
            eyebrow="Other Tesla Models We Service"
            title="Every Tesla."
            highlight="The same expert install."
            headingId="other-tesla-models-heading"
            headingComponent="h2"
            navLabel="Other Tesla models we service"
            columns={{ xs: 2, md: 4 }}
            links={[
              { slug: "model-3", name: "Model 3" },
              { slug: "model-y", name: "Model Y" },
              { slug: "model-s", name: "Model S" },
              { slug: "model-x", name: "Model X" },
              { slug: "cybertruck", name: "Cybertruck" },
            ]
              .filter((m) => m.slug !== model.slug)
              .map((m) => ({
                name: m.name,
                to: `/tesla/${m.slug}`,
                title: `Tesla ${m.name} window tinting — Tint Tek Plus`,
                ariaLabel: `Tesla ${m.name} window tinting`,
              }))}
          />
        </Container>

        {/* Final CTA + footer stack — matches ServicesPage's BlogCTA → CallToAction → Contact → QuickLinks → Footer order */}
        <Suspense fallback={null}>
          <BlogCTA />
          <SubCTA transparent />
          <Box><SubContact /></Box>
          <SubQuickLinks />
          <Footer />
        </Suspense>
      </Box>
    </>
  );
}
