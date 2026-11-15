// src/components/BrandPage.jsx
// /brands/:brand — same structure as the city landing pages (CityPage.jsx):
// Hero → SEO content → Testimonials → Videos → Why this brand → Products →
// Installation CTA → FAQ → Other brands → Contact → CTA → Quick links → Footer.
import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import SEO from "./SEO";
import BrandHero from "./landing-pages/BrandHero";
import Testimonials from "./landing-pages/Testimonials";
import VideoCTA from "./landing-pages/VideoCTA";
import VideoCTA2 from "./landing-pages/VideoCTA2";
import { BenefitsSection, InstallationCTA } from "./landing-pages/LandingSections";
import CitySEOContent from "./CitySEOContent";
import CityFAQ from "./CityFAQ";
import LinkGridPanel from "./LinkGridPanel";
import Contact from "./SubContact";
import CallToAction from "./SubCTA";
import QuickLinks from "./SubQuickLinks";
import Footer from "./key-components/Footer";
import { brands } from "../data/brandData";
import { brandSeoContent } from "../data/brandSeoContent";
import { cityList } from "../data/cityData";

const SITE = "https://tinttekplus.com";
const BENEFIT_ICONS = [
  VerifiedOutlinedIcon,
  AutoAwesomeOutlinedIcon,
  GradeOutlinedIcon,
  ShieldOutlinedIcon,
];

const FloatingElement = styled(motion.div)(() => ({
  position: "absolute",
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(39, 148, 210, 0.1) 0%, transparent 70%)",
  filter: "blur(1px)",
  pointerEvents: "none",
}));

const floatVariants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const handleScrollTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export default function BrandPage() {
  const { brand: brandSlug } = useParams();
  const brand = brands[brandSlug];
  const extra = brand ? brandSeoContent[brand.slug] : null;

  if (!brand || !extra) {
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
          title="Brand Not Found | Tint Tek Plus"
          description="This brand page does not exist."
          robots="noindex, nofollow"
          canonical={false}
        />
        <Typography sx={{ color: "#fff", fontSize: "1.5rem" }}>
          Brand not found.{" "}
          <RouterLink to="/" style={{ color: "#2794d2" }}>
            Go home
          </RouterLink>
        </Typography>
      </Box>
    );
  }

  // —— SEO: Helmet + JSON-LD —— //
  const canonical = `${SITE}/brands/${brand.slug}`;
  const ogImage = `${SITE}${encodeURI(extra.image)}`;
  const brandLd = { "@type": "Brand", name: brand.name, url: extra.manufacturerUrl };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    name: brand.metaTitle,
    url: canonical,
    description: brand.metaDescription,
    inLanguage: "en-US",
    primaryImageOfPage: ogImage,
    about: brandLd,
    isPartOf: { "@type": "WebSite", name: "Tint Tek Plus", url: SITE },
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.fullName} Installation in Dallas, TX`,
    serviceType: brand.type,
    description: brand.metaDescription,
    url: canonical,
    image: ogImage,
    brand: brandLd,
    areaServed: [
      { "@type": "City", name: "Garland" },
      { "@type": "City", name: "Dallas" },
      ...cityList.map((c) => ({ "@type": "City", name: c.name })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${brand.name} products installed by Tint Tek Plus`,
      itemListElement: brand.products.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: p.name,
          description: p.description,
          brand: { "@type": "Brand", name: brand.name },
        },
      })),
    },
    provider: {
      "@type": ["LocalBusiness", "AutoRepair"],
      "@id": `${SITE}/#business`,
      name: "Tint Tek Plus",
      url: SITE,
      telephone: "+1-972-362-8468",
      priceRange: "$$",
      image: `${SITE}/logo.webp`,
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
      { "@type": "ListItem", position: 2, name: brand.fullName, item: canonical },
    ],
  };

  const faqLd = brand.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: brand.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const otherBrands = Object.values(brands).filter((b) => b.slug !== brand.slug);

  return (
    <>
      {/* HEAD */}
      <SEO
        title={brand.metaTitle}
        description={brand.metaDescription}
        keywords={brand.keywords}
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
          <BrandHero brand={brand} extra={extra} />

          {/* Brand-specific SEO copy directly under the hero */}
          <Box sx={{ pt: { xs: 2, md: 4 } }}>
            <CitySEOContent
              content={extra.seo}
              highlightsTitle={`Popular ${brand.name} services`}
            />
          </Box>

          <Testimonials />
          <VideoCTA />
          <VideoCTA2 />

          {/* Why this brand */}
          <BenefitsSection
            eyebrow={`WHY WE CHOOSE ${brand.name.toUpperCase()}`}
            title={`${brand.name} ${brand.type}, Done Right`}
            subtitle={`We've tested and compared the leading brands in the industry. Here's why ${brand.name} earned a place in our Garland shop.`}
            onQuoteClick={handleScrollTop}
            items={brand.whyThisBrand.map((item, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return { ...item, icon: <Icon sx={{ fontSize: 44 }} /> };
            })}
          />

          {/* Products */}
          <Box
            component="section"
            aria-labelledby="brand-products-heading"
            sx={{ py: { xs: 6, md: 10 } }}
          >
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
              <Typography
                variant="overline"
                sx={{
                  color: "#2794d2",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  mb: 2,
                  display: "block",
                }}
              >
                THE {brand.name.toUpperCase()} LINEUP
              </Typography>
              <Typography
                id="brand-products-heading"
                component="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  lineHeight: 1.1,
                  mb: 2,
                }}
              >
                {brand.name} Products{" "}
                <Box component="span" sx={{ color: "#4db8f0" }}>
                  We Install
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: 760,
                  mx: "auto",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.7,
                }}
              >
                During your consultation, we&apos;ll recommend the right{" "}
                {brand.name} product for your vehicle, goals, and budget.
              </Typography>
            </Box>

            <Grid container spacing={3} justifyContent="center">
              {brand.products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.name}>
                  <Box
                    sx={{
                      height: "100%",
                      p: { xs: 3, md: 3.5 },
                      borderRadius: 4,
                      border: "1px solid rgba(77,184,240,0.25)",
                      background:
                        "linear-gradient(135deg, rgba(39,148,210,0.10), rgba(255,255,255,0.02))",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      transition: "border-color 0.2s",
                      "&:hover": { borderColor: "rgba(77,184,240,0.6)" },
                    }}
                  >
                    <Typography
                      component="h3"
                      sx={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        flexGrow: 1,
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      sx={{ color: "#4db8f0", fontWeight: 600, fontSize: "0.85rem" }}
                    >
                      Best for: {product.bestFor}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Installation CTA */}
          <InstallationCTA
            eyebrow={`AUTHORIZED ${brand.name.toUpperCase()} INSTALLER · GARLAND, TX`}
            title={`Professional ${brand.name} Installation`}
            intro={brand.intro}
            image={extra.image}
            imageAlt={extra.imageAlt}
            onQuoteClick={handleScrollTop}
            bullets={[
              {
                title: `Trained on ${brand.name} installation standards`,
                body: "Our technicians follow the manufacturer's process for fit, finish, and warranty compliance.",
              },
              {
                title: "Dust-free, climate-controlled environment",
                body: "Clean room prep reduces contamination for a flawless finish.",
              },
              extra.warranty,
            ]}
          />

          <CityFAQ
            cityName={brand.name}
            faqs={brand.faqs}
            onQuoteClick={handleScrollTop}
            eyebrow={`${brand.name} FAQ`}
            title={
              <>
                Questions about{" "}
                <Box component="span" sx={{ color: "#4db8f0" }}>
                  {brand.name}
                </Box>
              </>
            }
            description={`Straight answers about ${brand.fullName}, pricing, and warranties from our Garland, TX shop.`}
          />

          {/* Other brands */}
          <Box sx={{ py: { xs: 4, md: 6 } }}>
            <LinkGridPanel
              eyebrow="Other Premium Brands We Install"
              title="Complete protection."
              highlight="From one trusted shop."
              headingId="other-brands-heading"
              headingComponent="h2"
              navLabel="Other premium brands we install"
              columns={{ xs: 1, sm: 3 }}
              links={otherBrands.map((b) => ({
                name: b.fullName,
                to: `/brands/${b.slug}`,
                title: `${b.fullName} installation in Dallas, TX — Tint Tek Plus`,
                ariaLabel: `${b.fullName} installation`,
              }))}
            />
          </Box>

          <Contact />
        </Container>
        <CallToAction />
        <QuickLinks />
        <Footer />
      </Box>
    </>
  );
}
