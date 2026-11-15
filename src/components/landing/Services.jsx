// src/components/landing/Services.jsx
// Apple-style "Our Services" on the home page: tall photo tiles with the title,
// description and a "Learn more" cue over a soft bottom gradient. Pure-CSS
// responsive layout (no JS media query → no hydration swap/layout jump),
// keeping the SEO structure: JSON-LD ItemList, <nav> + <ul>/<li>, descriptive
// link labels and responsive srcset images.
import { memo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const EASE = "cubic-bezier(.25,.1,.25,1)";

// ─── Service data ─────────────────────────────────────────────────────────────
// Keyword-rich titles & descriptions help Googlebot understand page topics
const servicesData = [
  {
    id: "vehicle-window-tinting",
    title: "Vehicle Window Tinting",
    displayTitle: "Vehicle Window Tinting",
    description:
      "Professional car window tinting in Dallas, TX — heat rejection, UV protection & privacy film.",
    image: "/v-window-tint/vehicle-window-tint.webp",
    imageSm: "/v-window-tint/vehicle-window-tint-480.webp",
    alt: "Vehicle window tinting service in Dallas TX by Tint Tek Plus",
  },
  {
    id: "tesla-window-tinting",
    title: "Tesla Window Tinting",
    displayTitle: "Tesla Window Tinting",
    description:
      "Specialized Tesla window tint — extend battery life, reduce cabin heat, and enhance privacy.",
    image: "/gallery/Tint Tek-181-2.webp",
    imageSm: "/gallery/Tint Tek-181-2-480.webp",
    alt: "Tesla window tinting service Dallas TX — Tint Tek Plus",
  },
  {
    id: "commercial-window-tinting",
    title: "Commercial Window Tinting",
    displayTitle: "Commercial Window Tinting",
    description:
      "LLumar commercial window film for offices & storefronts — energy savings, glare control & security.",
    image: "/gallery/Tint Tek-146-2.webp",
    imageSm: "/gallery/Tint Tek-146-2-480.webp",
    alt: "Commercial window tinting for offices and businesses in Dallas TX",
  },
  {
    id: "residential-window-tinting",
    title: "Residential Window Tinting",
    displayTitle: "Residential Window Tinting",
    description:
      "Home window tinting in DFW — lower energy costs, block 99% UV, add privacy and security.",
    image: "/residential/residential-house.webp",
    imageSm: "/residential/residential-house-480.webp",
    alt: "Residential window tinting Dallas Fort Worth — Tint Tek Plus",
  },
  {
    id: "vehicle-paint-correction",
    title: "Vehicle Paint Correction",
    displayTitle: "Vehicle Paint Correction",
    description:
      "Paint correction services in Dallas TX — remove swirls, scratches & restore showroom shine.",
    image: "/paint-correction/paint-correction1.webp",
    imageSm: "/paint-correction/paint-correction1-480.webp",
    alt: "Vehicle paint correction service Dallas TX by Tint Tek Plus",
  },
  {
    id: "vehicle-paint-protection",
    title: "Vehicle Paint Protection Film (PPF)",
    displayTitle: "Vehicle Paint Protection",
    description:
      "STEK Paint Protection Film installation — self-healing clear bra shields from chips & UV damage.",
    image: "/ppf/ppf-service.webp",
    imageSm: "/ppf/ppf-service-480.webp",
    alt: "Paint protection film PPF installation Dallas TX — Tint Tek Plus",
  },
  {
    id: "headlight-services",
    title: "Headlight & Taillight Tinting Services",
    displayTitle: "Headlight & Taillight Services",
    description:
      "Tinted headlights & taillights in Dallas TX — STEK film for style and light protection.",
    image: "/headlight/taillight1.webp",
    imageSm: "/headlight/taillight1-480.webp",
    alt: "Headlight and taillight tinting service Dallas TX — Tint Tek Plus",
  },
  {
    id: "windshield-protection-film",
    title: "Windshield Protection Film",
    displayTitle: "Windshield Protection Film",
    description:
      "ExoShield GT3 windshield film — protect glass from rock chips, cracks & road debris in Dallas TX.",
    image: "/windshield/windshield-service.webp",
    imageSm: "/windshield/windshield-service-480.webp",
    alt: "Windshield protection film installation Dallas TX — Tint Tek Plus",
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    displayTitle: "Ceramic Coating",
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

// ─── Tile ─────────────────────────────────────────────────────────────────────
const ServiceCard = memo(function ServiceCard({ service, eager }) {
  return (
    <Box
      component={RouterLink}
      to={`/services/${service.id}`}
      // Descriptive aria-label helps screen readers & Google understand the link
      aria-label={`Learn more about ${service.title} in Dallas TX`}
      title={`${service.title} — Tint Tek Plus Dallas TX`}
      sx={{
        position: "relative",
        display: "block",
        height: "100%",
        aspectRatio: { xs: "4 / 5", md: "3 / 4" },
        borderRadius: { xs: "24px", md: "28px" },
        overflow: "hidden",
        textDecoration: "none",
        color: "#f5f5f7",
        backgroundColor: "#111",
        isolation: "isolate",
        "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 3 },
        "@media (hover: hover)": {
          "&:hover img": { transform: "scale(1.04)" },
          "&:hover .learn-more": { gap: "6px" },
        },
      }}
    >
      <Box
        component="img"
        src={service.image}
        srcSet={`${encodeURI(service.imageSm)} 480w, ${encodeURI(service.image)} 1200w`}
        sizes="(max-width: 600px) 82vw, (max-width: 900px) 46vw, 380px"
        alt={service.alt}
        width={1200}
        height={1600}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: `transform .7s ${EASE}`,
          zIndex: -2,
        }}
      />
      {/* Legibility gradient — only behind the text, photo stays bright above */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 32%, rgba(0,0,0,0) 62%)",
        }}
      />
      <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, p: { xs: 3, md: 3.5 } }}>
        {/* h3 under the section h2 — Google reads this as the linked service name */}
        <Typography
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.45rem", md: "1.55rem" },
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            mb: 1,
          }}
        >
          {service.displayTitle}
        </Typography>
        <Typography sx={{ color: "rgba(245,245,247,0.78)", fontSize: "0.97rem", lineHeight: 1.5 }}>
          {service.description}
        </Typography>
        <Box
          className="learn-more"
          aria-hidden="true"
          sx={{
            mt: 1.75,
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
            color: "#4db8f0",
            fontWeight: 500,
            fontSize: "1rem",
            transition: `gap .3s ${EASE}`,
          }}
        >
          Learn more
          <ChevronRightRoundedIcon sx={{ fontSize: 20 }} />
        </Box>
      </Box>
    </Box>
  );
});

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    displayTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageSm: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  eager: PropTypes.bool,
};

// ─── Section ──────────────────────────────────────────────────────────────────
const Services = () => (
  <>
    {/* Inline JSON-LD — tells Google this is a navigable list of service pages */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd) }}
    />

    <Box
      component="section"
      aria-labelledby="services-heading"
      id="services"
      sx={{ py: { xs: 8, md: 14 } }}
    >
      <Container maxWidth="lg">
        <Typography
          id="services-heading"
          component="h2"
          sx={{
            color: "#f5f5f7",
            fontWeight: 700,
            fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4rem" },
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            textAlign: "center",
            mb: { xs: 5, md: 8 },
          }}
        >
          Our Services
        </Typography>

        {/* Named <nav> landmark + list semantics for crawlers and assistive tech */}
        <nav aria-label="Tint Tek Plus service pages">
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              m: 0,
              p: 0,
              // Phones: swipe row with a peek; tablet: 2 columns; desktop: 3×3
              display: { xs: "flex", sm: "grid" },
              gridTemplateColumns: { sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: { xs: 1.5, md: 2.5 },
              overflowX: { xs: "auto", sm: "visible" },
              scrollSnapType: { xs: "x mandatory", sm: "none" },
              scrollPaddingInline: { xs: "16px", sm: 0 },
              mx: { xs: -2, sm: 0 },
              px: { xs: 2, sm: 0 },
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {servicesData.map((service, i) => (
              <Box
                key={service.id}
                component="li"
                sx={{ flex: { xs: "0 0 82%", sm: "initial" }, scrollSnapAlign: { xs: "start", sm: "none" } }}
              >
                {/* First row is near the fold — load it right away */}
                <ServiceCard service={service} eager={i < 3} />
              </Box>
            ))}
          </Box>
        </nav>
      </Container>
    </Box>
  </>
);

export default Services;
