import InViewMount from "./InViewMount";
// src/components/BrandPage.jsx
import React, { lazy, Suspense } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  GlobalStyles,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import SEO from "./SEO";
import BusinessInfo from "./hero/BusinessInfo";
import { brands } from "../data/brandData";

const SubContact = lazy(() => import("./SubContact"));
const SubCTA = lazy(() => import("./SubCTA"));
const SubQuickLinks = lazy(() => import("./SubQuickLinks"));
const BlogCTA = lazy(() => import("./BlogCTA"));
const Footer = lazy(() => import("./key-components/Footer"));

const SITE = "https://tinttekplus.com";
const GRADIENT = `radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
  radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
  linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)`;

const TYPE_LABELS = {
  "Window Film": { emoji: "🪟", color: "#2794d2" },
  "Paint Protection Film": { emoji: "🛡️", color: "#22c55e" },
  "Ceramic Coating": { emoji: "✨", color: "#a855f7" },
  "Windshield Protection Film": { emoji: "🪟", color: "#f59e0b" },
};



export default function BrandPage() {
  const { brand: brandSlug } = useParams();
  const brand = brands[brandSlug];

  if (!brand) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: GRADIENT }}>
        <SEO title="Brand Not Found | Tint Tek Plus" description="This brand page does not exist." robots="noindex, nofollow" />
        <Typography sx={{ color: "#fff" }}>
          Brand not found.{" "}
          <RouterLink to="/services" style={{ color: "#2794d2" }}>
            View Our Services
          </RouterLink>
        </Typography>
      </Box>
    );
  }

  const url = `${SITE}/brands/${brand.slug}`;
  const typeInfo = TYPE_LABELS[brand.type] || { emoji: "⭐", color: "#2794d2" };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brand.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.fullName} Installation in Dallas, TX`,
    description: brand.metaDescription,
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
      { "@type": "ListItem", position: 2, name: "Brands", item: `${SITE}/brands` },
      { "@type": "ListItem", position: 3, name: brand.name, item: url },
    ],
  };

  const otherBrands = Object.values(brands).filter((b) => b.slug !== brand.slug);

  return (
    <>
      <SEO
        title={brand.metaTitle}
        description={brand.metaDescription}
        keywords={brand.keywords}
        canonical={url}
        type="website"
        jsonLd={[serviceSchema, breadcrumbSchema, faqSchema]}
      />

      <GlobalStyles
        styles={{
          ".BrandPageRoot::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: GRADIENT,
          },
        }}
      />

      <Box className="BrandPageRoot" sx={{ minHeight: "100vh", background: GRADIENT }}>
        {/* ── Hero ── */}
        <Box sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 6, md: 10 }, textAlign: "center", px: 2 }}>
          <BusinessInfo />
          <Box
            sx={{
              display: "inline-block",
              px: 2.5,
              py: 0.75,
              borderRadius: "100px",
              border: `1px solid ${typeInfo.color}40`,
              background: `${typeInfo.color}14`,
              mb: 3,
            }}
          >
            <Typography sx={{ color: typeInfo.color, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {typeInfo.emoji} {brand.type} · Garland, TX · DFW
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.8rem" },
              lineHeight: 1.15,
              mb: 2,
              letterSpacing: "-0.5px",
            }}
          >
            {brand.h1}
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: { xs: "1rem", md: "1.25rem" },
              maxWidth: 700,
              mx: "auto",
              mb: 5,
              lineHeight: 1.6,
            }}
          >
            {brand.heroSubtitle}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              component="a"
              href="tel:+19723628468"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#2794d2",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "100px",
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: "#1a7bb0" },
              }}
            >
              Call (972) 362-8468
            </Button>
            <Button
              component={RouterLink}
              to="/support"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "100px",
                px: 4,
                py: 1.5,
                "&:hover": { borderColor: "#2794d2", color: "#2794d2" },
              }}
            >
              Get a Free Quote
            </Button>
          </Box>
        </Box>

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
              {brand.intro}
            </Typography>
          </Box>
        </Container>

        {/* ── Why This Brand ── */}
        <InViewMount>
          <Box sx={{ background: "rgba(255,255,255,0.02)", py: { xs: 8, md: 10 } }}>
            <Container maxWidth="lg">
              <Typography
                component="h2"
                sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 2 }}
              >
                Why We Choose {brand.name}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 6, lineHeight: 1.6 }}>
                We've tested and compared the leading brands in the industry. Here's why {brand.name} earned a place in our shop.
              </Typography>
              <Grid container spacing={3}>
                {brand.whyThisBrand.map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          p: 3.5,
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          transition: "border-color 0.2s",
                          "&:hover": { borderColor: "rgba(39,148,210,0.35)" },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                          <CheckCircleIcon sx={{ color: "#2794d2", fontSize: "1.25rem", flexShrink: 0 }} />
                          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                            {item.title}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.93rem", lineHeight: 1.7 }}>
                          {item.body}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </InViewMount>

        {/* ── Products ── */}
        <InViewMount>
          <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
            <Typography
              component="h2"
              sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 2 }}
            >
              {brand.name} Products We Install
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 6, lineHeight: 1.6 }}>
              We carry the full {brand.name} lineup. During your consultation, we'll recommend the right product for your vehicle and goals.
            </Typography>
            <Grid container spacing={3}>
              {brand.products.map((product, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    style={{ height: "100%" }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        p: 3,
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        transition: "border-color 0.2s",
                        "&:hover": { borderColor: "rgba(39,148,210,0.35)" },
                      }}
                    >
                      <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                        {product.name}
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.65, flexGrow: 1 }}>
                        {product.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 1,
                          px: 2,
                          py: 0.6,
                          borderRadius: "100px",
                          background: "rgba(39,148,210,0.1)",
                          border: "1px solid rgba(39,148,210,0.25)",
                          alignSelf: "flex-start",
                        }}
                      >
                        <Typography sx={{ color: "#2794d2", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.05em" }}>
                          Best for: {product.bestFor}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </InViewMount>

        {/* ── Trust bar ── */}
        <InViewMount>
          <Box sx={{ background: "rgba(39,148,210,0.05)", borderTop: "1px solid rgba(39,148,210,0.1)", borderBottom: "1px solid rgba(39,148,210,0.1)", py: { xs: 5, md: 6 } }}>
            <Container maxWidth="lg">
              <Grid container spacing={3} justifyContent="center">
                {[
                  { label: "Authorized Dealer", value: "Certified" },
                  { label: "DFW Service Area", value: "All 12 Cities" },
                  { label: "Location", value: "Garland, TX" },
                  { label: "Phone", value: "(972) 362-8468" },
                ].map((item, i) => (
                  <Grid item xs={6} sm={3} key={i} sx={{ textAlign: "center" }}>
                    <Typography sx={{ color: "#2794d2", fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.4rem" } }}>
                      {item.value}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", mt: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {item.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </InViewMount>

        {/* ── FAQ ── */}
        <InViewMount>
          <Box sx={{ background: "rgba(255,255,255,0.02)", py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
              <Typography
                component="h2"
                sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 6, textAlign: "center" }}
              >
                {brand.name} — Frequently Asked Questions
              </Typography>
              {brand.faqs.map((faq, i) => (
                <Accordion
                  key={i}
                  disableGutters
                  square={false}
                  sx={{
                    my: 2,
                    borderRadius: "14px !important",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "none",
                    "&::before": { display: "none" },
                    "&:hover": { border: "1px solid rgba(39,148,210,0.3)" },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} sx={{ px: 3, py: 1.5 }}>
                    <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "1rem", md: "1.1rem" } }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 2.5 }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.97rem", lineHeight: 1.75 }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Container>
          </Box>
        </InViewMount>

        {/* ── Other Brands ── */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", mb: 3, textAlign: "center" }}>
            Other Premium Brands We Install
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1.5 }}>
            {otherBrands.map((b) => (
              <Button
                key={b.slug}
                component={RouterLink}
                to={`/brands/${b.slug}`}
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
                {b.name}
              </Button>
            ))}
          </Box>
        </Container>

        {/* ── Bottom CTA ── */}
        <Box sx={{ py: { xs: 8, md: 10 }, textAlign: "center", background: "rgba(39,148,210,0.05)", borderTop: "1px solid rgba(39,148,210,0.1)" }}>
          <Container maxWidth="sm">
            <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: { xs: "1.8rem", md: "2.5rem" }, mb: 2, lineHeight: 1.2 }}>
              Book Your {brand.name} Installation
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4, fontSize: "1rem" }}>
              2518 W Kingsley Rd, Garland, TX 75041 · Mon–Sat 9am–6pm
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                component="a"
                href="tel:+19723628468"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#2794d2",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: "100px",
                  px: 5,
                  py: 1.75,
                  fontSize: "1.05rem",
                  "&:hover": { backgroundColor: "#1a7bb0" },
                }}
              >
                (972) 362-8468
              </Button>
              <Button
                component={RouterLink}
                to="/support"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: "100px",
                  px: 5,
                  py: 1.75,
                  fontSize: "1.05rem",
                  "&:hover": { borderColor: "#2794d2", color: "#2794d2" },
                }}
              >
                Get a Free Quote
              </Button>
            </Box>
          </Container>
        </Box>

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
