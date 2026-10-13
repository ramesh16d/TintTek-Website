import React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

/* ------------------------------ Data ------------------------------ */
const quickLinksData = [
  {
    title: "Services",
    ariaLabel: "Tint Tek Plus service pages",
    links: [
      {
        text: "Vehicle Window Tinting",
        to: "/services/vehicle-window-tinting",
        title: "Vehicle window tinting service in Dallas TX — Tint Tek Plus",
        ariaLabel: "Vehicle window tinting Dallas TX",
      },
      {
        text: "Tesla Window Tinting",
        to: "/services/tesla-window-tinting",
        title: "Tesla window tinting service in Dallas TX — Tint Tek Plus",
        ariaLabel: "Tesla window tinting Dallas TX",
      },
      {
        text: "Commercial Window Tinting",
        to: "/services/commercial-window-tinting",
        title: "Commercial window tinting for offices and storefronts in Dallas TX",
        ariaLabel: "Commercial window tinting Dallas TX",
      },
      {
        text: "Residential Window Tinting",
        to: "/services/residential-window-tinting",
        title: "Residential home window tinting in Dallas Fort Worth",
        ariaLabel: "Residential window tinting Dallas Fort Worth",
      },
      {
        text: "Vehicle Paint Correction",
        to: "/services/vehicle-paint-correction",
        title: "Paint correction service to remove swirls and restore shine Dallas TX",
        ariaLabel: "Vehicle paint correction Dallas TX",
      },
      {
        text: "Vehicle Paint Protection Film",
        to: "/services/vehicle-paint-protection",
        title: "STEK paint protection film PPF installation Dallas TX",
        ariaLabel: "Paint protection film PPF Dallas TX",
      },
      {
        text: "Headlight & Taillight Services",
        to: "/services/headlight-services",
        title: "Headlight and taillight tinting service Dallas TX — Tint Tek Plus",
        ariaLabel: "Headlight and taillight tinting Dallas TX",
      },
      {
        text: "Ceramic Coating",
        to: "/services/ceramic-coating",
        title: "Professional ceramic and graphene coating service Dallas TX",
        ariaLabel: "Ceramic coating Dallas TX",
      },
      {
        text: "Windshield Protection Film",
        to: "/services/windshield-protection-film",
        title: "ExoShield windshield protection film against chips and cracks Dallas TX",
        ariaLabel: "Windshield protection film Dallas TX",
      },
    ],
  },
  {
    title: "Quick Links",
    ariaLabel: "Quick links to Tint Tek Plus tools and resources",
    links: [
      {
        text: "Frequently Asked Questions",
        to: "/support",
        title: "Window tinting and automotive FAQ — Tint Tek Plus Dallas TX",
        ariaLabel: "Frequently asked questions about window tinting",
      },
      {
        text: "Gallery",
        to: "/gallery",
        title: "Window tinting and PPF photo gallery — Tint Tek Plus Dallas TX",
        ariaLabel: "Tint Tek Plus service photo gallery",
      },
      {
        text: "Blog & Insights",
        to: "/blogs",
        title: "Expert window tinting tips and automotive guides — Tint Tek Plus blog",
        ariaLabel: "Tint Tek Plus blog — window tinting tips and guides",
      },
      {
        text: "Vehicle Window Tint Viewer",
        to: "/simulators/vehicle-window-tinting",
        title: "Try our interactive vehicle window tint visualizer",
        ariaLabel: "Vehicle window tint simulator tool",
      },
      {
        text: "Tesla Window Tint Viewer",
        to: "/simulators/tesla-window-tinting",
        title: "Visualize window tint shades on your Tesla model",
        ariaLabel: "Tesla window tint simulator tool",
      },
      {
        text: "Paint Protection Film Viewer",
        to: "/simulators/vehicle-paint-protection",
        title: "Interactive paint protection film PPF visualizer",
        ariaLabel: "Paint protection film simulator tool",
      },
      {
        text: "Commercial Window Film Viewer",
        to: "/simulators/commercial-window-tinting",
        title: "Preview commercial window film shades for your building",
        ariaLabel: "Commercial window film simulator tool",
      },
      {
        text: "Residential Window Film Viewer",
        to: "/simulators/residential-window-tinting",
        title: "Preview residential window film shades for your home",
        ariaLabel: "Residential window film simulator tool",
      },
      {
        text: "Home",
        to: "/",
        title: "Tint Tek Plus — Window Tinting & Auto Services in Dallas TX",
        ariaLabel: "Tint Tek Plus homepage",
      },
    ],
  },
  {
    title: "Areas We Serve",
    ariaLabel: "Areas served from our Garland shop",
    links: [
      ["addison", "Addison"], ["allen", "Allen"],
      ["carrollton", "Carrollton"], ["frisco", "Frisco"],
      ["mckinney", "McKinney"], ["mesquite", "Mesquite"],
      ["murphy", "Murphy"], ["plano", "Plano"],
      ["richardson", "Richardson"], ["rowlett", "Rowlett"],
      ["sachse", "Sachse"], ["wylie", "Wylie"],
    ].map(([slug, name]) => ({
      text: `${name}, TX`,
      to: `/locations/${slug}`,
      title: `Window tinting and protection for ${name} drivers at our Garland shop`,
      ariaLabel: `Services for ${name}, Texas`,
    })),
  },
  {
    title: "Our Brands",
    ariaLabel: "Window film and vehicle protection brands",
    links: [
      ["llumar", "LLumar"], ["stek", "STEK"],
      ["gtechniq", "Gtechniq"], ["exoshield", "ExoShield"],
    ].map(([slug, name]) => ({
      text: name,
      to: `/brands/${slug}`,
      title: `${name} products at Tint Tek Plus`,
      ariaLabel: `Explore ${name} products`,
    })),
  },
  {
    title: "Tesla Models",
    ariaLabel: "Tesla window tinting and protection by model",
    links: [
      ["model-3", "Model 3"], ["model-y", "Model Y"],
      ["model-s", "Model S"], ["model-x", "Model X"],
      ["cybertruck", "Cybertruck"],
    ].map(([slug, name]) => ({
      text: `Tesla ${name}`,
      to: `/tesla/${slug}`,
      title: `Window tinting and protection for Tesla ${name}`,
      ariaLabel: `Tesla ${name} services`,
    })),
  },
];

/* JSON-LD: SiteNavigationElement schema — tells Google these are nav links */
const navJsonLd = {
  "@context": "https://schema.org",
  "@graph": quickLinksData.flatMap((col) =>
    col.links.map((link) => ({
      "@type": "SiteNavigationElement",
      name: link.text,
      description: link.title,
      url: `https://tinttekplus.com${link.to}`,
    }))
  ),
};

/* ----------------------------- Motion ----------------------------- */
const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* --------------------------- Component ---------------------------- */
const QuickLinks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {/* JSON-LD navigation schema for Googlebot */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navJsonLd) }}
      />

      <Box
        component="section"
        aria-labelledby="quicklinks-heading"
        id="quick-links"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          color: "#fff !important",
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 3 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
          {/* Header */}
          <Box sx={{ mb: { xs: 3, md: 5 }, textAlign: "center" }}>
            <Typography
              id="quicklinks-heading"
              component="h2"
              variant={isMobile ? "h5" : "h4"}
              sx={{
                fontWeight: 800,
                letterSpacing: 0.4,
                lineHeight: 1.15,
                color: "#fff",
              }}
            >
              Explore Tint Tek +
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                color: "rgba(255,255,255,0.65)",
                maxWidth: 720,
                mx: "auto",
              }}
            >
              Fast access to our most-visited services and tools.
            </Typography>
          </Box>

          {/* Columns */}
          <Grid container spacing={{ xs: 2, md: 4 }} alignItems="stretch">
            {quickLinksData.map((column, index) => (
              <Grid key={index} item xs={12} md={6}>
                <motion.div
                  variants={containerVariants}
                  initial={false}
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={index}
                >
                  {/* Column heading */}
                  <Box sx={{ mb: 1.5, px: { xs: 0.5, md: 0 } }}>
                    <Typography
                      component="h3"
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.92)",
                        position: "relative",
                        pb: 0.75,
                        display: "inline-flex",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          bottom: 0,
                          width: "100%",
                          height: 2,
                          borderRadius: 2,
                          background:
                            "linear-gradient(90deg, #2794d2, rgba(39,148,210,0.1))",
                          opacity: 0.9,
                        },
                      }}
                    >
                      {column.title}
                    </Typography>
                  </Box>

                  {/*
                    <nav> landmark with descriptive aria-label.
                    Googlebot treats <nav> links as high-value structural signals.
                    Each <a> rendered by RouterLink has a real href attribute,
                    so crawlers can follow without executing JS.
                  */}
                  <Box
                    component="nav"
                    aria-label={column.ariaLabel}
                    sx={{
                      borderRadius: 2.5,
                      border: "1px solid rgba(255,255,255,0.08)",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                      overflow: "hidden",
                    }}
                  >
                    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                      {column.links.map((link, linkIndex) => {
                        const last = linkIndex === column.links.length - 1;
                        return (
                          <Box component="li" key={linkIndex}>
                            {/*
                              NOTE: The hover animation is applied to the <a> itself
                              via CSS transitions rather than wrapping it in
                              motion.div — this keeps the anchor tag directly
                              in the DOM so Googlebot can index it without JS.
                            */}
                            <Box
                              component={RouterLink}
                              to={link.to}
                              title={link.title}
                              aria-label={link.ariaLabel}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                                px: { xs: 1.5, md: 2 },
                                py: { xs: 1.25, md: 1.5 },
                                fontSize: { xs: "0.975rem", md: "1.025rem" },
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.88)",
                                lineHeight: 1.4,
                                textDecoration: "none",
                                transition:
                                  "color 220ms ease, background 220ms ease, transform 220ms ease",
                                position: "relative",
                                // Slide arrow on hover via CSS — no JS required
                                "& .arrow-icon": {
                                  transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)",
                                },
                                "&:hover": {
                                  color: "#fff",
                                  background:
                                    "linear-gradient(90deg, rgba(39,148,210,0.10), transparent)",
                                  "& .arrow-icon": {
                                    transform: "translateX(5px)",
                                  },
                                  "& .link-text": {
                                    transform: "translateX(4px)",
                                  },
                                },
                                "&:focus-visible": {
                                  outline: "none",
                                  boxShadow:
                                    "0 0 0 3px rgba(39,148,210,0.35), inset 0 0 0 1px rgba(255,255,255,0.12)",
                                  borderRadius: "10px",
                                  background: "rgba(255,255,255,0.04)",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  minWidth: 0,
                                }}
                              >
                                {/* Blue dot accent */}
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 999,
                                    background:
                                      "linear-gradient(180deg, #2794d2, #1f79ab)",
                                    boxShadow:
                                      "0 0 14px rgba(39,148,210,0.55), 0 0 2px rgba(39,148,210,0.9)",
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography
                                  component="span"
                                  className="link-text"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)",
                                  }}
                                >
                                  {link.text}
                                </Typography>
                              </Box>

                              <ArrowRightAltIcon
                                fontSize="small"
                                className="arrow-icon"
                                sx={{ opacity: 0.9, flexShrink: 0 }}
                              />
                            </Box>

                            {!last && (
                              <Divider
                                component="div"
                                sx={{
                                  mx: { xs: 1.5, md: 2 },
                                  borderColor: "rgba(255,255,255,0.08)",
                                }}
                              />
                            )}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default QuickLinks;
