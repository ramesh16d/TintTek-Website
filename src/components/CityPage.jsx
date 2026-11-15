// src/components/CityPage.jsx
import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import QuickLinks from "./SubQuickLinks";
import Footer from "./key-components/Footer";
import CallToAction from "./SubCTA";
import Testimonials from "./landing-pages/Testimonials";
import Contact from "./SubContact";
import SEO from "./SEO";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VideoCTA from "./landing-pages/VideoCTA";
import VideoCTA2 from "./landing-pages/VideoCTA2";
import LandingHero from "./landing-pages/LandingHero";
import { brandSeoContent } from "../data/brandSeoContent";
import { BenefitsSection, InstallationCTA } from "./landing-pages/LandingSections";
import CityFAQ from "./CityFAQ";
import { cities } from "../data/cityData";
import CitySEOContent from "./CitySEOContent";
import { citySeoContent } from "../data/citySeoContent";

/** —— SITE SETTINGS —— */
const SITE = "https://tinttekplus.com";

const FloatingElement = styled(motion.div)(() => ({
  position: "absolute",
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(39, 148, 210, 0.1) 0%, transparent 70%)",
  filter: "blur(1px)",
  pointerEvents: "none",
}));

const handleScrollTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export default function CityPage() {
  const { city: citySlug } = useParams();
  const city = cities[citySlug];

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };


  if (!city) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        <SEO
          title="Location Not Found | Tint Tek Plus"
          description="This location page does not exist."
          robots="noindex, nofollow"
          canonical={false}
        />
        <Typography sx={{ color: "#fff", fontSize: "1.5rem" }}>
          Location not found.{" "}
          <RouterLink to="/" style={{ color: "#2794d2" }}>
            Go home
          </RouterLink>
        </Typography>
      </Box>
    );
  }

  // —— SEO: Helmet + JSON-LD —— //
  const canonical = `${SITE}/locations/${city.slug}`;
  const ogImage = `${SITE}/gallery/Tint%20Tek-85.webp`;
  const cityLd = {
    "@type": "City",
    name: city.name,
    sameAs: `https://en.wikipedia.org/wiki/${city.name},_Texas`,
    containedInPlace: { "@type": "State", name: "Texas" },
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    name: city.metaTitle,
    url: canonical,
    description: city.metaDescription,
    inLanguage: "en-US",
    primaryImageOfPage: ogImage,
    about: cityLd,
    isPartOf: { "@type": "WebSite", name: "Tint Tek Plus", url: SITE },
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Window Tinting in ${city.name}, TX`,
    serviceType: "Window Tinting",
    description: city.metaDescription,
    url: canonical,
    image: ogImage,
    areaServed: cityLd,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Vehicle protection services in ${city.name}, TX`,
      itemListElement: [
        "Vehicle Window Tinting",
        "Paint Protection Film",
        "Ceramic Coating",
        "Windshield Protection Film",
        "Residential Window Tinting",
        "Commercial Window Tinting",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
    provider: {
      "@type": ["LocalBusiness", "AutoRepair"],
      "@id": `${SITE}/#business`,
      name: "Tint Tek Plus",
      priceRange: "$$",
      image: `${SITE}/logo.webp`,
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

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: `Window Tinting ${city.name}, TX`,
        item: canonical,
      },
    ],
  };

  const faqLd = city.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: city.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      {/* HEAD */}
      <SEO
        title={city.metaTitle}
        description={city.metaDescription}
        keywords={city.keywords}
        canonical={canonical}
        image={ogImage}
        jsonLd={[webPageLd, serviceLd, breadcrumbsLd, faqLd].filter(Boolean)}
        type="website"
      />

      {/* ===== Landing content ===== */}
      <Box
        sx={{
          background: `
      radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
      radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
      linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)
    `,
          color: "#fff",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating Background Elements */}
        <FloatingElement
          variants={floatVariants}
          animate="animate"
          sx={{ top: "10%", right: "10%", width: "200px", height: "200px" }}
        />
        <FloatingElement
          variants={floatVariants}
          animate="animate"
          sx={{ bottom: "20%", left: "5%", width: "150px", height: "150px" }}
          transition={{ delay: 2 }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          {/* Same hero as the brand pages. City pages are window-tint landing
              pages, so the trust row shows the LLumar badge + LLumar warranty
              (taken from the LLumar brand data, not duplicated here). */}
          <LandingHero
            eyebrow={citySeoContent[city.slug]?.eyebrow}
            headline={city.h1}
            subtitle={city.heroSubtitle}
            points={city.whyUs}
            pointsLabel={`Why ${city.name} drivers choose Tint Tek Plus`}
            trust={{ ...brandSeoContent.llumar.warranty, showBadge: true }}
          />

          {/* City-specific SEO copy directly under the hero */}
          <Box sx={{ pt: { xs: 2, md: 4 } }}>
            <CitySEOContent city={city} content={citySeoContent[city.slug]} />
          </Box>

          <Testimonials />
          <VideoCTA />
          <VideoCTA2 />

          {/* Benefits Section (Why Choose Us) */}
          <BenefitsSection
            eyebrow={`WHY ${city.name.toUpperCase()} CHOOSES US`}
            title={`Premium Window Tint Results in ${city.name}`}
            subtitle={`Our expert team delivers exceptional results for ${city.name} drivers with industry-leading materials and techniques`}
            onQuoteClick={handleScrollTop}
            items={[
              {
                icon: <WbSunnyOutlinedIcon sx={{ fontSize: 44 }} />,
                title: "Heat & UV Rejection",
                body: `Advanced ceramic technology blocks up to 99% of harmful UV rays and reduces interior heat by 60% — built for ${city.name}'s long Texas summers.`,
              },
              {
                icon: <LockOutlinedIcon sx={{ fontSize: 44 }} />,
                title: "Enhanced Privacy & Security",
                body: "Premium tinting provides discretion and protection while maintaining optimal visibility.",
              },
              {
                icon: <GradeOutlinedIcon sx={{ fontSize: 44 }} />,
                title: "Improved Aesthetic Appeal",
                body: "Transform your vehicle with a sleek, sophisticated look that turns heads everywhere.",
              },
              {
                icon: <ShieldOutlinedIcon sx={{ fontSize: 44 }} />,
                title: "Lifetime Warranty",
                body: "Comprehensive lifetime warranty on all installations with professional service guarantee.",
              },
            ]}
          />

          {/* CTA Section */}
          <InstallationCTA
            eyebrow={`SERVING ${city.name.toUpperCase()}, TX`}
            title={`Professional Installation for ${city.name} Drivers`}
            intro={city.intro}
            image="/gallery/Tint Tek-85.webp"
            imageAlt={`Technician performing professional window tint installation near ${city.name}, TX`}
            onQuoteClick={handleScrollTop}
            bullets={[
              {
                title: "Certified & experienced technicians",
                body: "Trained for precision installs using pro-grade tools and methods.",
              },
              {
                title: "Dust-free, climate-controlled environment",
                body: "Clean room prep reduces contamination for a flawless finish.",
              },
              {
                title: "Lifetime warranty on all services",
                body: `Backed by clear, written coverage — trusted by ${city.name} drivers for long-term peace of mind.`,
              },
            ]}
          />

          <CityFAQ
            cityName={city.name}
            faqs={city.faqs}
            onQuoteClick={handleScrollTop}
          />

          <Contact city={city} />
        </Container>
        <CallToAction />
        <QuickLinks />
        <Footer />
      </Box>
    </>
  );
}
