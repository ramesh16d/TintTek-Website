import InViewMount from "./InViewMount";
// src/components/TintLaws.jsx
// Texas Window Tint Laws 2026 — highest-volume informational page
import React, { lazy, Suspense } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  GlobalStyles,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "./SEO";
import BusinessInfo from "./hero/BusinessInfo";

const SubContact = lazy(() => import("./SubContact"));
const SubCTA = lazy(() => import("./SubCTA"));
const SubQuickLinks = lazy(() => import("./SubQuickLinks"));
const BlogCTA = lazy(() => import("./BlogCTA"));
const Footer = lazy(() => import("./key-components/Footer"));

const SITE = "https://tinttekplus.com";
const GRADIENT = `radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
  radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
  linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)`;



const VLT_RULES = [
  {
    window: "Windshield",
    requirement: "Non-reflective tint on top 5 inches only",
    vlt: "—",
    note: "No tint below the AS-1 line",
  },
  {
    window: "Front Side Windows (Driver & Passenger)",
    requirement: "Must allow 25%+ light in",
    vlt: "25% minimum VLT",
    note: "Applies to both sedans and SUVs/trucks",
  },
  {
    window: "Rear Side Windows",
    requirement: "Any darkness allowed",
    vlt: "No restriction",
    note: "Dual side mirrors required if rear window is tinted",
  },
  {
    window: "Rear Windshield",
    requirement: "Any darkness allowed",
    vlt: "No restriction",
    note: "Dual side mirrors required",
  },
];

const REFLECTIVITY_RULES = [
  {
    window: "Front Side Windows",
    rule: "Must not be more reflective than a standard window",
    limit: "25% max reflection",
  },
  {
    window: "Rear Side Windows",
    rule: "Must not be more reflective than a standard window",
    limit: "25% max reflection",
  },
];

const FAQS = [
  {
    question: "What is the legal tint limit in Texas in 2026?",
    answer:
      "Texas requires at least 25% VLT (Visible Light Transmission) on front side windows — meaning at least 25% of outside light must pass through. Rear side windows and the rear windshield can be any darkness. The windshield can only have non-reflective tint on the top 5 inches (above the AS-1 line).",
  },
  {
    question: "Is 20% tint legal in Texas?",
    answer:
      "No — 20% tint on front side windows (driver and passenger) is not legal in Texas. Texas requires at least 25% VLT on front side windows. However, 20% tint is perfectly legal on rear side windows and the rear windshield.",
  },
  {
    question: "Is 15% tint legal in Texas?",
    answer:
      "Not on front side windows. 15% VLT tint allows only 15% of light through, which is below the 25% minimum required by Texas law for front windows. On rear windows and the rear windshield, 15% tint is legal.",
  },
  {
    question: "Can I get a medical exemption for darker front window tint in Texas?",
    answer:
      "Yes. Texas Transportation Code Section 547.613 allows a medical exemption for window tint darker than 25% VLT on front side windows. You must obtain a signed statement from a licensed physician or optometrist citing the specific medical condition (such as lupus, albinism, photosensitivity, or melanoma). The statement must be kept in the vehicle and presented to law enforcement if stopped. Our installers can work with your medical documentation to ensure proper installation.",
  },
  {
    question: "Do tint laws in Texas apply to SUVs and trucks differently?",
    answer:
      "No — the 25% VLT minimum on front side windows applies to all passenger vehicles including SUVs, trucks, and vans. The rear windows (behind the driver) on SUVs and trucks can be any darkness. Some confusion arises because SUVs often have factory-tinted rear glass, but the front windows still must meet the 25% standard.",
  },
  {
    question: "What happens if my window tint is too dark in Texas?",
    answer:
      "An officer can issue a fix-it ticket requiring you to remove or replace the non-compliant tint. Fines vary by municipality but typically range from $25–$200. The main issue is your vehicle will fail the annual Texas safety inspection if tint is measured below the 25% VLT threshold on front windows.",
  },
  {
    question: "What VLT is best for front windows in Texas while staying legal?",
    answer:
      "Most Texas drivers choose 35% VLT on front windows — legal, provides noticeable heat and glare reduction, and still looks great. Combined with a high-quality ceramic film like LLumar CTX, 35% tint provides 88% infrared heat rejection while maintaining safety and legality.",
  },
  {
    question: "Do tinted windows affect my Texas vehicle inspection?",
    answer:
      "Yes. During a Texas safety inspection, the inspector may measure tint darkness using a photometer. If front side windows test below 25% VLT, the vehicle fails inspection and the tint must be removed or replaced before passing. Tint Tek Plus ensures every front window installation is 25% VLT or above to guarantee inspection compliance.",
  },
  {
    question: "Are factory-tinted windows subject to Texas tint laws?",
    answer:
      "Yes and no. Factory-applied tint must meet Texas standards when sold, and most factory glass on front windows is 70%+ VLT. However, if you add aftermarket tint on top of factory glass, the combined VLT must still meet the 25% minimum. Our tint meters measure the combined result to ensure compliance.",
  },
  {
    question: "Can I tint my windshield in Texas?",
    answer:
      "Only the top portion. Texas allows non-reflective tint on the top 5 inches of the windshield (above the AS-1 line) — typically used for a sun visor strip. No tint is permitted on the main viewing area of the windshield. Instead, many Texas drivers choose ExoShield GT3 windshield protection film, which is optically clear and fully legal.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Texas Window Tint Laws 2026: Complete Guide to Legal VLT Limits, Exemptions & Penalties",
  description:
    "Complete 2026 guide to Texas window tint laws covering VLT limits by window, medical exemptions, reflectivity rules, inspection requirements, and penalties for non-compliance.",
  url: `${SITE}/texas-window-tint-laws`,
  author: { "@type": "Organization", name: "Tint Tek Plus" },
  publisher: {
    "@type": "Organization",
    name: "Tint Tek Plus",
    logo: { "@type": "ImageObject", url: `${SITE}/logo.webp` },
  },
  datePublished: "2026-05-01",
  dateModified: "2026-05-01",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Texas Window Tint Laws", item: `${SITE}/texas-window-tint-laws` },
  ],
};

export default function TintLaws() {
  return (
    <>
      <SEO
        title="Texas Window Tint Laws 2026: Complete Guide | VLT Limits, Exemptions & More"
        description="Texas tint law 2026: front windows require 25% minimum VLT. Learn legal limits for all windows, medical exemptions, reflectivity rules, penalties, and what passes Texas inspection. Updated guide from LLumar-certified Tint Tek Plus in Garland, TX."
        keywords="texas window tint law, texas tint laws 2026, window tint legal texas, texas vlt limit, texas tint law front windows, tint medical exemption texas, texas window tint percentage, is 20 percent tint legal in texas, texas tint inspection"
        canonical={`${SITE}/texas-window-tint-laws`}
        image={`${SITE}/v-window-tint/vehicle-window-tint.webp`}
        type="article"
        jsonLd={[articleSchema, breadcrumbSchema, faqSchema]}
      />

      <GlobalStyles
        styles={{
          ".TintLawsRoot::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: GRADIENT,
          },
        }}
      />

      <Box
        className="TintLawsRoot"
        sx={{ minHeight: "100vh", background: GRADIENT, color: "#fff" }}
      >
        {/* ── Hero ── */}
        <Box sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 6, md: 10 }, textAlign: "center", px: 2 }}>
          <BusinessInfo />
          <Box
            sx={{
              display: "inline-block",
              px: 2.5,
              py: 0.75,
              borderRadius: "100px",
              border: "1px solid rgba(39,148,210,0.4)",
              background: "rgba(39,148,210,0.08)",
              mb: 3,
            }}
          >
            <Typography
              sx={{ color: "#2794d2", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              Updated for 2026 · Garland, TX · DFW
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.2rem", sm: "3rem", md: "4rem" },
              lineHeight: 1.1,
              mb: 3,
              letterSpacing: "-0.5px",
              maxWidth: 900,
              mx: "auto",
            }}
          >
            Texas Window Tint Laws 2026:{" "}
            <Box component="span" sx={{ color: "#2794d2" }}>
              Complete Legal Guide
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: { xs: "1rem", md: "1.2rem" },
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.7,
              mb: 5,
            }}
          >
            Everything Texas drivers need to know about window tint VLT limits, medical
            exemptions, reflectivity rules, inspection requirements, and legal penalties — from
            Tint Tek Plus, Garland's LLumar-certified tint specialists.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              component={RouterLink}
              to="/services/vehicle-window-tinting"
              variant="contained"
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
              Get Legal Tint Installed
            </Button>
            <Button
              component="a"
              href="tel:+19723628468"
              variant="outlined"
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
              Call (972) 362-8468
            </Button>
          </Box>
        </Box>

        {/* ── Quick Summary Box ── */}
        <Container maxWidth="md" sx={{ pb: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              background: "rgba(39,148,210,0.08)",
              border: "1px solid rgba(39,148,210,0.3)",
              borderRadius: 4,
              p: { xs: 3, md: 5 },
            }}
          >
            <Typography sx={{ color: "#2794d2", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", mb: 2 }}>
              Texas Tint Law — Quick Reference
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { label: "Front Side Windows", value: "25% minimum VLT required", ok: true },
                { label: "Rear Side Windows", value: "Any darkness allowed", ok: true },
                { label: "Rear Windshield", value: "Any darkness allowed (dual mirrors required)", ok: true },
                { label: "Windshield", value: "Non-reflective tint on top 5 inches only", ok: true },
                { label: "Reflectivity (all windows)", value: "No more reflective than standard glass", ok: true },
                { label: "Medical Exemption", value: "Available — physician/optometrist statement required", ok: true },
              ].map((item, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <CheckCircleIcon sx={{ color: "#2794d2", fontSize: "1.2rem", mt: 0.2, flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{item.label}:</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>{item.value}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>

        {/* ── VLT Table ── */}
        <InViewMount>
          <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
            <Typography
              component="h2"
              sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 1 }}
            >
              Texas Tint Law: VLT Requirements by Window
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4, fontSize: "1rem", lineHeight: 1.6 }}>
              VLT (Visible Light Transmission) is the percentage of visible light that passes
              through your window film. Lower VLT = darker tint. Texas law sets a minimum VLT
              threshold of 25% for front side windows.
            </Typography>
            <TableContainer
              sx={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "rgba(39,148,210,0.15)" }}>
                    {["Window", "Texas Legal Requirement", "VLT Limit", "Notes"].map((h) => (
                      <TableCell key={h} sx={{ color: "#2794d2", fontWeight: 700, borderColor: "rgba(255,255,255,0.08)", fontSize: "0.85rem", py: 2 }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {VLT_RULES.map((row, i) => (
                    <TableRow key={i} sx={{ "&:hover": { background: "rgba(255,255,255,0.03)" } }}>
                      <TableCell sx={{ color: "#fff", fontWeight: 600, borderColor: "rgba(255,255,255,0.06)", py: 2 }}>
                        {row.window}
                      </TableCell>
                      <TableCell sx={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.06)", py: 2 }}>
                        {row.requirement}
                      </TableCell>
                      <TableCell sx={{ borderColor: "rgba(255,255,255,0.06)", py: 2 }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            px: 2,
                            py: 0.5,
                            borderRadius: "100px",
                            background: row.vlt.includes("25%") ? "rgba(255,80,80,0.15)" : "rgba(39,148,210,0.15)",
                            border: `1px solid ${row.vlt.includes("25%") ? "rgba(255,80,80,0.4)" : "rgba(39,148,210,0.4)"}`,
                          }}
                        >
                          <Typography
                            sx={{
                              color: row.vlt.includes("25%") ? "#ff6b6b" : "#2794d2",
                              fontWeight: 700,
                              fontSize: "0.85rem",
                            }}
                          >
                            {row.vlt}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.06)", py: 2, fontSize: "0.85rem" }}>
                        {row.note}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </InViewMount>

        {/* ── Reflectivity ── */}
        <InViewMount>
          <Box sx={{ background: "rgba(255,255,255,0.02)", py: { xs: 8, md: 10 } }}>
            <Container maxWidth="lg">
              <Typography
                component="h2"
                sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 2 }}
              >
                Tint Reflectivity Rules in Texas
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 5, fontSize: "1rem", maxWidth: 700, lineHeight: 1.6 }}>
                In addition to VLT requirements, Texas law restricts how reflective window
                tint can be. Highly reflective (mirror-like) films are not permitted on any
                window of a passenger vehicle.
              </Typography>
              <Grid container spacing={3}>
                {REFLECTIVITY_RULES.map((r, i) => (
                  <Grid item xs={12} md={6} key={i}>
                    <Box
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", mb: 1.5 }}>
                        {r.window}
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 2, lineHeight: 1.6 }}>
                        {r.rule}
                      </Typography>
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 2.5,
                          py: 0.5,
                          borderRadius: "100px",
                          background: "rgba(255,180,0,0.1)",
                          border: "1px solid rgba(255,180,0,0.3)",
                        }}
                      >
                        <Typography sx={{ color: "#ffd700", fontWeight: 700, fontSize: "0.85rem" }}>
                          Limit: {r.limit}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </InViewMount>

        {/* ── Medical Exemption ── */}
        <InViewMount>
          <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
            <Typography
              component="h2"
              sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 3 }}
            >
              Texas Window Tint Medical Exemption
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Typography sx={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.8, fontSize: "1rem", mb: 3 }}>
                  Texas Transportation Code §547.613 allows individuals with certain medical
                  conditions to apply window tint darker than the standard 25% VLT limit on
                  front side windows. This exemption requires written documentation from a
                  licensed physician or optometrist.
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.8, fontSize: "1rem", mb: 4 }}>
                  The statement must be kept inside the vehicle and presented to law
                  enforcement upon request. Qualifying medical conditions typically include
                  photosensitivity disorders, melanoma, lupus, albinism, and other conditions
                  causing light sensitivity.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    "Physician or optometrist must sign the exemption statement",
                    "Statement must identify the specific medical condition",
                    "Document must be kept in the vehicle at all times",
                    "Officers may verify the document during traffic stops",
                    "The exemption applies only to the specific registered vehicle",
                  ].map((point, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: "#2794d2", fontSize: "1.1rem", mt: 0.2, flexShrink: 0 }} />
                      <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                        {point}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: "rgba(255,180,0,0.05)",
                    border: "1px solid rgba(255,180,0,0.2)",
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                    <WarningAmberIcon sx={{ color: "#ffd700", fontSize: "1.5rem" }} />
                    <Typography sx={{ color: "#ffd700", fontWeight: 700, fontSize: "1rem" }}>
                      Important Notice
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: "0.95rem", mb: 3 }}>
                    A medical exemption does not guarantee you will never be stopped for dark
                    tint. Law enforcement may still inspect your vehicle and will want to see
                    the exemption documentation.
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                    At Tint Tek Plus, we can work with your medical exemption documentation
                    to install the appropriate tint shade and provide a certificate of
                    installation for your records.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </InViewMount>

        {/* ── Penalties & Inspection ── */}
        <InViewMount>
          <Box sx={{ background: "rgba(255,255,255,0.02)", py: { xs: 8, md: 10 } }}>
            <Container maxWidth="lg">
              <Typography
                component="h2"
                sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 2 }}
              >
                Penalties for Illegal Tint in Texas
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 5, maxWidth: 700, lineHeight: 1.6 }}>
                Non-compliant window tint in Texas can result in traffic fines and a failed
                annual vehicle inspection. Here's what you need to know.
              </Typography>
              <Grid container spacing={3}>
                {[
                  {
                    title: "Traffic Stop Fine",
                    body: "Officers can issue a citation for window tint that appears to violate VLT limits. Fines typically range from $25 to $200 depending on the municipality, plus court costs.",
                    icon: "⚠️",
                  },
                  {
                    title: "Fix-It Ticket",
                    body: "Most tint violations in Texas result in a fix-it ticket (correction notice) rather than a regular fine. You must remove or replace the non-compliant tint and have the vehicle re-inspected.",
                    icon: "🔧",
                  },
                  {
                    title: "Texas Annual Inspection Failure",
                    body: "During your mandatory annual vehicle safety inspection, inspectors may measure front window VLT. If below 25%, your vehicle fails inspection and cannot be re-registered until the tint is corrected.",
                    icon: "📋",
                  },
                  {
                    title: "No Tint Sticker Required",
                    body: "Unlike some states, Texas does not require a manufacturer's sticker or certificate to be displayed on tinted windows. However, keeping your installation certificate on hand is always a good practice.",
                    icon: "📎",
                  },
                ].map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        height: "100%",
                      }}
                    >
                      <Typography sx={{ fontSize: "2rem", mb: 2 }}>{item.icon}</Typography>
                      <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", mb: 1.5 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                        {item.body}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </InViewMount>

        {/* ── Why Choose Tint Tek Plus CTA ── */}
        <InViewMount>
          <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
            <Box
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                background: "rgba(39,148,210,0.08)",
                border: "1px solid rgba(39,148,210,0.25)",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{ color: "#2794d2", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", mb: 2 }}
              >
                Garland's LLumar-Certified Tint Specialists
              </Typography>
              <Typography
                sx={{ color: "#fff", fontWeight: 900, fontSize: { xs: "1.8rem", md: "2.5rem" }, mb: 2, lineHeight: 1.2 }}
              >
                Get Legal Tint Installed Right the First Time
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 4, fontSize: "1.05rem", maxWidth: 600, mx: "auto", lineHeight: 1.7 }}>
                At Tint Tek Plus, every installation is guaranteed to meet Texas tint law
                requirements. We use LLumar-certified films with verified VLT ratings and provide
                a certificate of installation for your records. If it's not legal, we won't install it.
              </Typography>
              <Grid container spacing={3} sx={{ mb: 5 }} justifyContent="center">
                {[
                  "100% Texas-legal installations guaranteed",
                  "LLumar films with verified NFRC-tested VLT ratings",
                  "Certificate of installation provided",
                  "Lifetime warranty on all tint films",
                  "5.0 stars across 600+ reviews",
                  "Non-metallic ceramic films safe for GPS & sensors",
                ].map((point, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: "#2794d2", fontSize: "1.1rem", flexShrink: 0 }} />
                      <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem" }}>
                        {point}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  component={RouterLink}
                  to="/services/vehicle-window-tinting"
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
                  Book Window Tinting
                </Button>
                <Button
                  component="a"
                  href="tel:+19723628468"
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
                  (972) 362-8468
                </Button>
              </Box>
            </Box>
          </Container>
        </InViewMount>

        {/* ── FAQ Section ── */}
        <InViewMount>
          <Box sx={{ background: "rgba(255,255,255,0.02)", py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
              <Typography
                component="h2"
                sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 6, textAlign: "center" }}
              >
                Texas Window Tint Law — Frequently Asked Questions
              </Typography>
              {FAQS.map((faq, i) => (
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

        {/* ── Related services ── */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Typography
            sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", mb: 3, textAlign: "center" }}
          >
            Related Services
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {[
              { to: "/services/vehicle-window-tinting", label: "Vehicle Window Tinting" },
              { to: "/services/tesla-window-tinting", label: "Tesla Window Tinting" },
              { to: "/services/residential-window-tinting", label: "Residential Tinting" },
              { to: "/services/commercial-window-tinting", label: "Commercial Tinting" },
              { to: "/services/windshield-protection-film", label: "Windshield Protection Film" },
            ].map((link) => (
              <Grid item key={link.to}>
                <Button
                  component={RouterLink}
                  to={link.to}
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.7)",
                    borderRadius: "100px",
                    px: 3,
                    py: 1,
                    fontSize: "0.85rem",
                    "&:hover": { borderColor: "#2794d2", color: "#2794d2" },
                  }}
                >
                  {link.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>

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
