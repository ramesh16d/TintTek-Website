import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";

// ─── Service data ─────────────────────────────────────────────────────────────
// Keyword-rich titles & descriptions help Googlebot understand page topics
const servicesData = [
  {
    id: "vehicle-window-tinting",
    title: "Vehicle Window Tinting",
    displayTitle: "VEHICLE WINDOW TINTING",
    description:
      "Professional car window tinting in Dallas, TX — heat rejection, UV protection & privacy film.",
    image: "/v-window-tint/vehicle-window-tint.webp",
    imageSm: "/v-window-tint/vehicle-window-tint-480.webp",
    alt: "Vehicle window tinting service in Dallas TX by Tint Tek Plus",
  },
  {
    id: "tesla-window-tinting",
    title: "Tesla Window Tinting",
    displayTitle: "TESLA WINDOW TINTING",
    description:
      "Specialized Tesla window tint — extend battery life, reduce cabin heat, and enhance privacy.",
    image: "/gallery/Tint Tek-181-2.webp",
    imageSm: "/gallery/Tint Tek-181-2-480.webp",
    alt: "Tesla window tinting service Dallas TX — Tint Tek Plus",
  },
  {
    id: "commercial-window-tinting",
    title: "Commercial Window Tinting",
    displayTitle: "COMMERCIAL WINDOW TINTING",
    description:
      "LLumar commercial window film for offices & storefronts — energy savings, glare control & security.",
    image: "/gallery/Tint Tek-146-2.webp",
    imageSm: "/gallery/Tint Tek-146-2-480.webp",
    alt: "Commercial window tinting for offices and businesses in Dallas TX",
  },
  {
    id: "residential-window-tinting",
    title: "Residential Window Tinting",
    displayTitle: "RESIDENTIAL WINDOW TINTING",
    description:
      "Home window tinting in DFW — lower energy costs, block 99% UV, add privacy and security.",
    image: "/residential/residential-house.webp",
    imageSm: "/residential/residential-house-480.webp",
    alt: "Residential window tinting Dallas Fort Worth — Tint Tek Plus",
  },
  {
    id: "vehicle-paint-correction",
    title: "Vehicle Paint Correction",
    displayTitle: "VEHICLE PAINT CORRECTION",
    description:
      "Paint correction services in Dallas TX — remove swirls, scratches & restore showroom shine.",
    image: "/paint-correction/paint-correction1.webp",
    imageSm: "/paint-correction/paint-correction1-480.webp",
    alt: "Vehicle paint correction service Dallas TX by Tint Tek Plus",
  },
  {
    id: "vehicle-paint-protection",
    title: "Vehicle Paint Protection Film (PPF)",
    displayTitle: "VEHICLE PAINT PROTECTION",
    description:
      "STEK Paint Protection Film installation — self-healing clear bra shields from chips & UV damage.",
    image: "/ppf/ppf-service.webp",
    imageSm: "/ppf/ppf-service-480.webp",
    alt: "Paint protection film PPF installation Dallas TX — Tint Tek Plus",
  },
  {
    id: "headlight-services",
    title: "Headlight & Taillight Tinting Services",
    displayTitle: "HEADLIGHT & TAILLIGHT SERVICES",
    description:
      "Tinted headlights & taillights in Dallas TX — STEK film for style and light protection.",
    image: "/headlight/taillight1.webp",
    imageSm: "/headlight/taillight1-480.webp",
    alt: "Headlight and taillight tinting service Dallas TX — Tint Tek Plus",
  },
  {
    id: "windshield-protection-film",
    title: "Windshield Protection Film",
    displayTitle: "WINDSHIELD PROTECTION FILM",
    description:
      "ExoShield GT3 windshield film — protect glass from rock chips, cracks & road debris in Dallas TX.",
    image: "/windshield/windshield-service.webp",
    imageSm: "/windshield/windshield-service-480.webp",
    alt: "Windshield protection film installation Dallas TX — Tint Tek Plus",
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    displayTitle: "CERAMIC COATING",
    description:
      "Professional ceramic & graphene coating in Dallas TX — long-lasting paint protection and deep gloss.",
    image: "/ceramic/Tint Tek-111.webp",
    imageSm: "/ceramic/Tint Tek-111-480.webp",
    alt: "Ceramic coating service Dallas TX by Tint Tek Plus",
  },
];

// ─── JSON-LD for the services list (helps Google understand the nav structure)
const serviceListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tint Tek Plus Services",
  url: "https://tinttekplus.com/#services",
  numberOfItems: servicesData.length,
  itemListElement: servicesData.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `https://tinttekplus.com/services/${s.id}`,
  })),
};

// ─── Card (defined outside component to avoid re-creation on each render) ────
const ServiceCard = React.memo(({ service, isMobile }) => (
  <Card
    component={RouterLink}
    to={`/services/${service.id}`}
    // Descriptive aria-label helps screen readers & Google understand the link
    aria-label={`Learn more about ${service.title} in Dallas TX`}
    title={`${service.title} — Tint Tek Plus Dallas TX`}
    sx={{
      textDecoration: "none",
      display: "block",
      width: isMobile ? "80vw" : "100%",
      height: 400,
      borderRadius: 5,
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      backgroundColor: isMobile ? "#1C1C1E" : "black",
      margin: isMobile ? "0 auto" : "inherit",
      transition: "all 0.3s ease",
      "&:hover": {
        border: isMobile ? "none" : "5px solid #2794d2",
        boxShadow: isMobile ? "none" : "0 10px 20px rgba(0, 0, 0, 0.3)",
        transform: isMobile ? "none" : "scale(1.05)",
      },
    }}
  >
    <CardMedia
      component="img"
      image={service.image}
      srcSet={`${encodeURI(service.imageSm)} 480w, ${encodeURI(service.image)} 1200w`}
      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 400px"
      alt={service.alt}
      loading="lazy"
      decoding="async"
      sx={{
        height: "100%",
        width: "100%",
        objectFit: "cover",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: isMobile ? "none" : "scale(1.05)",
        },
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isMobile ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.55)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-end" : "center",
        textAlign: "center",
        padding: 0,
        "&:hover": {
          background: isMobile ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "transparent",
        }}
      >
        {/*
          h3 here is correct — the page h1 is the site/section heading.
          Google reads this text as the service name for this link.
        */}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h3"
          fontWeight="bold"
        >
          {service.displayTitle}
        </Typography>
        <Typography variant="body1">{service.description}</Typography>
        {isMobile && (
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              width: "90%",
              borderRadius: 50,
            }}
          >
            See Details
          </Button>
        )}
      </Box>
    </Box>
  </Card>
));

ServiceCard.displayName = "ServiceCard";

// ─── Section ──────────────────────────────────────────────────────────────────
const Services = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <>
      {/* Inline JSON-LD — tells Google this is a navigable list of service pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd) }}
      />

      {/*
        <section> with aria-labelledby ties the heading to the landmark,
        which both assistive tech and Google use for page structure.
      */}
      <Box
        component="section"
        aria-labelledby="services-heading"
        id="services"
        sx={{
          py: 6,
          textAlign: "center",
          backgroundColor: "transparent",
          color: "#EEEEFF",
          paddingBottom: "80px",
        }}
      >
        <Typography
          id="services-heading"
          variant={isMobile ? "h4" : "h2"}
          component="h2"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Our Services
        </Typography>

        {/*
          <nav> with aria-label makes this a named landmark.
          Googlebot treates <nav> links as important site structure.
          <ul>/<li> communicate list semantics to crawlers.
        */}
        <nav aria-label="Tint Tek Plus service pages">
          {isMobile ? (
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                m: 0,
                p: 0,
                display: "flex",
                flexDirection: "row",
                overflowX: "auto",
                gap: 2,
                px: 2,
                scrollSnapType: "x mandatory",
              }}
            >
              {servicesData.map((service) => (
                <Box
                  key={service.id}
                  component="li"
                  sx={{ flex: "0 0 80%", scrollSnapAlign: "center" }}
                >
                  <ServiceCard service={service} isMobile={isMobile} />
                </Box>
              ))}
            </Box>
          ) : (
            <Container maxWidth="lg">
              <Grid
                container
                spacing={2}
                justifyContent="center"
                component="ul"
                sx={{ listStyle: "none", m: 0, p: 0 }}
              >
                {servicesData.map((service) => (
                  <Grid
                    item
                    key={service.id}
                    xs={12}
                    sm={6}
                    md={4}
                    component="li"
                  >
                    <ServiceCard service={service} isMobile={isMobile} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}
        </nav>
      </Box>
    </>
  );
};

export default Services;
