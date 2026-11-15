// src/components/BlogDetail.jsx
import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "./SEO";
import { Helmet } from "react-helmet-async";
import {
  Typography,
  Container,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  GlobalStyles,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SubCTA from "./SubCTA";
import SubContact from "./SubContact";
import Footer from "./key-components/Footer";
import { blogPosts } from "../data/blogData";

const SITE = "https://tinttekplus.com";

const GRADIENT = `radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
   radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
   linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)`;



// Blog post data is imported from "../data/blogData"


// ── Table of contents ────────────────────────────────────────────────────────
const TableOfContents = ({ toc, activeSection }) => (
  <Box component="nav" aria-label="Article sections">
    <Typography
      sx={{
        fontSize: "0.6rem",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.28)",
        mb: 2.5,
        display: "block",
      }}
    >
      In this article
    </Typography>
    {toc.map((item) => (
      <Box
        key={item.id}
        component="a"
        href={`#${item.id}`}
        sx={{
          display: "block",
          py: 0.65,
          textDecoration: "none",
          fontSize: "0.8rem",
          lineHeight: 1.45,
          color: activeSection === item.id ? "#2794d2" : "rgba(255,255,255,0.38)",
          borderLeft: `1.5px solid ${activeSection === item.id ? "#2794d2" : "transparent"}`,
          pl: activeSection === item.id ? 1.5 : 0,
          transition: "color 0.18s, padding-left 0.18s, border-color 0.18s",
          "&:hover": { color: "rgba(255,255,255,0.8)" },
        }}
      >
        {item.title}
      </Box>
    ))}
  </Box>
);

// ── Related posts ────────────────────────────────────────────────────────────
const RelatedPosts = ({ currentPost }) => {
  const related = blogPosts.filter((p) => currentPost.relatedIds?.includes(p.id));
  if (!related.length) return null;

  return (
    <Box sx={{ mt: 10 }}>
      <Typography
        sx={{
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          mb: 3,
          display: "block",
        }}
      >
        Continue Reading
      </Typography>
      <Grid container spacing={3}>
        {related.map((post) => (
          <Grid item xs={12} sm={6} key={post.id}>
            <Box
              component={Link}
              to={`/blog/${post.slug}`}
              sx={{
                display: "flex",
                gap: 2,
                textDecoration: "none",
                pt: 2.5,
                borderTop: "1px solid rgba(255,255,255,0.07)",
                transition: "opacity 0.2s",
                "&:hover": { opacity: 0.72 },
              }}
            >
              <Box
                component="img"
                src={post.image}
                alt={post.title}
                sx={{
                  width: 72,
                  height: 54,
                  flexShrink: 0,
                  borderRadius: 1,
                  objectFit: "cover",
                  objectPosition: post.imagePosition || "center",
                  opacity: 0.82,
                }}
              />
              <Box>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 600,
                    fontSize: "0.83rem",
                    lineHeight: 1.4,
                    mb: 0.5,
                  }}
                >
                  {post.title}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.32)", fontSize: "0.73rem" }}>
                  {post.readTime} · {post.date}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // TOC active-section tracking
  useEffect(() => {
    if (!post?.toc?.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-15% 0% -70% 0%" }
    );
    post.toc.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [post]);

  // SEO
  const seo = useMemo(() => {
    if (!post) {
      return {
        title: "Post Not Found | Tint Tek Plus",
        description: "The blog post you're looking for doesn't exist.",
        canonical: `${SITE}/blog/${slug || ""}`,
        robots: "noindex, nofollow",
        schemas: null,
        imageAbs: null,
      };
    }
    const url = `${SITE}/blog/${post.slug}`;
    // encodeURI: some image paths contain spaces ("/ceramic/Tint Tek-111.webp"),
    // which social scrapers and crawlers reject as invalid URLs.
    const imageAbs = encodeURI(`${SITE}${post.image.startsWith("/") ? post.image : `/${post.image}`}`);
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.summary,
        image: imageAbs,
        url,
        datePublished: post.dateIso,
        dateModified: post.dateIso,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        keywords: post.keywords,
        articleSection: post.category,
        inLanguage: "en-US",
        author: { "@type": "Organization", name: "Tint Tek Plus", url: SITE },
        publisher: { "@type": "Organization", name: "Tint Tek Plus", logo: { "@type": "ImageObject", url: `${SITE}/logo.webp` } },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blogs` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ];
    if (post.faqs?.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answerText || faq.question },
        })),
      });
    }
    return {
      // Keep titles within ~60 chars so Google doesn't truncate them; long post
      // titles drop the brand suffix (Google shows the site name anyway).
      // A post can override with `metaTitle`.
      title: (() => {
        const base = post.metaTitle || post.title;
        const branded = `${base} | Tint Tek Plus`;
        return branded.length <= 60 ? branded : base;
      })(),
      description: post.summary,
      canonical: url,
      robots: "index, follow",
      schemas,
      imageAbs,
      keywords: post.keywords,
    };
  }, [post, slug]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: post?.title ?? "Tint Tek Plus Blog",
      text: post?.summary ?? "Check out this article from Tint Tek Plus",
      url: typeof window !== "undefined" ? window.location.href : undefined,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && shareData.url) {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      } else {
        window.open(shareData.url, "_blank");
      }
    } catch { /* no-op */ }
  }, [post]);

  if (!post) {
    return (
      <>
        <SEO title={seo.title} description={seo.description} canonical={seo.canonical} robots={seo.robots} />
        <Container maxWidth="sm" sx={{ textAlign: "center", py: 14 }}>
          <Typography sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, mb: 1.5 }}>
            Article not found
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.45)", mb: 4, fontSize: "0.95rem" }}>
            This article may have moved or no longer exists.
          </Typography>
          <Box
            component="button"
            onClick={() => navigate("/blogs")}
            sx={{
              all: "unset",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "#2794d2",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            <ArrowBackIcon sx={{ fontSize: "1rem" }} />
            Back to Blog
          </Box>
        </Container>
      </>
    );
  }

  return (
    <Box 
      className="BlogDetailPageRoot"
      sx={{ bgcolor: "transparent", minHeight: "100vh", position: "relative" }}
    >
      <GlobalStyles
        styles={{
          ".BlogDetailPageRoot": { position: "relative" },
          ".BlogDetailPageRoot::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: GRADIENT,
          },
        }}
      />

      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        robots={seo.robots}
        type="article"
        image={seo.imageAbs}
        keywords={seo.keywords}
        jsonLd={seo.schemas}
      />
      <Helmet>
        <meta property="og:site_name" content="Tint Tek Plus" />
        <meta property="article:published_time" content={post.dateIso} />
        <meta property="article:modified_time" content={post.dateIso} />
        <meta property="article:section" content={post.category} />
        <meta property="article:author" content="Tint Tek Plus" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "60vh", md: "82vh" },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={post.image}
          alt={post.title}
          loading="eager"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: post.imagePosition || "center",
            filter: "brightness(0.28)",
          }}
        />
        {/* Bottom fade to page bg */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, transparent 0%, rgba(8,8,8,0.6) 45%, transparent 100%)",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            pt: { xs: 3.5, md: 5 },
            pb: { xs: 5, md: 9 },
          }}
        >
          {/* Breadcrumb */}
          <Box
            component="nav"
            aria-label="Breadcrumb"
            sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 5 }}
          >
            {[{ label: "Home", to: "/" }, { label: "Blog", to: "/blogs" }].map(({ label, to }) => (
              <React.Fragment key={to}>
                <Link
                  to={to}
                  style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none", fontSize: "0.72rem" }}
                >
                  {label}
                </Link>
                <NavigateNextIcon sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)" }} />
              </React.Fragment>
            ))}
            <Typography
              sx={{
                color: "rgba(255,255,255,0.52)",
                fontSize: "0.72rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: { xs: 160, sm: 420 },
              }}
            >
              {post.title}
            </Typography>
          </Box>

          {/* Title block */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{ maxWidth: { xs: "100%", md: "72%" } }}
          >
            <Typography
              sx={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#2794d2",
                mb: 2,
              }}
            >
              {post.category}
            </Typography>
            <Typography
              component="h1"
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: { xs: "2rem", sm: "2.8rem", md: "3.8rem" },
                lineHeight: 1.08,
                letterSpacing: { xs: "-0.01em", md: "-0.025em" },
                mb: 3,
              }}
            >
              {post.title}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.38)",
                fontSize: "0.8rem",
                letterSpacing: "0.03em",
              }}
            >
              {post.date} &nbsp;·&nbsp; {post.readTime}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Content + Sidebar ───────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 11 } }}>
        <Grid container spacing={{ xs: 0, md: 9 }} alignItems="flex-start">

          {/* Article body */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                color: "rgba(255,255,255,0.65)",
                // Section headings
                "& .blog-section-title": {
                  fontWeight: 700,
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                  letterSpacing: "-0.01em",
                  color: "#fff",
                  mt: 5.5,
                  mb: 2,
                  scrollMarginTop: "100px",
                },

                // Body paragraphs
                "& .blog-paragraph": {
                  fontSize: { xs: "0.97rem", md: "1.04rem" },
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,0.65)",
                  mb: 2,
                  fontWeight: 400,
                },

                // General bold tags
                "& strong": {
                  color: "#fff",
                  fontWeight: 700,
                },

                // Inline accent
                "& .highlight": { color: "#2794d2" },

                // Pull-quote
                "& .blog-highlight": {
                  borderLeft: "2px solid rgba(39,148,210,0.5)",
                  pl: 2.5,
                  py: 0.5,
                  my: 5,
                  color: "rgba(255,255,255,0.82)",
                  fontStyle: "italic",
                  fontSize: { xs: "1.02rem", md: "1.08rem" },
                  lineHeight: 1.72,
                },

                // Stats row (borderless, clean dividers)
                "& .feature-box": {
                  display: "flex",
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                  my: 6,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                },
                "& .feature-item": {
                  flex: 1,
                  minWidth: { xs: "50%", sm: 0 },
                  py: 4,
                  px: 3,
                  textAlign: "center",
                  "&:not(:last-child)": {
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                  },
                  "& h6": {
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.04em",
                    mb: 0.4,
                    lineHeight: 1,
                  },
                  "& .MuiTypography-body2": {
                    color: "rgba(255,255,255,0.32)",
                    fontSize: "0.68rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  },
                },

                // Check list
                "& .benefit-list": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.25,
                  my: 3,
                },
                "& .benefit-item": {
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.75,
                  "& .MuiTypography-root, & p, & span": {
                    color: "rgba(255,255,255,0.7)",
                    fontSize: { xs: "0.97rem", md: "1.04rem" },
                    lineHeight: 1.6,
                    fontWeight: 400,
                  },
                },
                "& .benefit-icon": {
                  color: "#2794d2",
                  fontSize: "0.78rem",
                  mt: "7px",
                  flexShrink: 0,
                },

                // Lists
                "& ul, & ol": {
                  color: "rgba(255,255,255,0.65)",
                  "& li": { mb: 0.55, lineHeight: 1.78, fontSize: { xs: "0.97rem", md: "1.04rem" } },
                },
              }}
            >
              {post.content}

              {/* FAQ */}
              {post.faqs && (
                <Box sx={{ mt: 9 }}>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: { xs: "1.2rem", md: "1.4rem" }, color: "#fff", mb: 3 }}
                  >
                    Frequently Asked Questions
                  </Typography>
                  {post.faqs.map((faq, i) => (
                    <Accordion
                      key={i}
                      disableGutters
                      elevation={0}
                      sx={{
                        bgcolor: "transparent",
                        boxShadow: "none",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        "&:last-child": { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                        "&:before": { display: "none" },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.35)", fontSize: "1.1rem" }} />}
                        aria-controls={`faq-${i}-content`}
                        id={`faq-${i}-header`}
                        sx={{ px: 0, py: 0.5, minHeight: 0, "& .MuiAccordionSummary-content": { my: 1.75 } }}
                      >
                        <Typography sx={{ fontWeight: 500, fontSize: "0.93rem", color: "rgba(255,255,255,0.82)", pr: 2 }}>
                          {faq.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ px: 0, pt: 0, pb: 2.5 }}>
                        {faq.answer}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}
            </Box>

            {/* Bottom meta */}
            <Box
              sx={{
                mt: 9,
                pt: 4,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", fontWeight: 600 }}>
                  Tint Tek Plus Team
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", mt: 0.3 }}>
                  Garland, TX &nbsp;·&nbsp; 972-362-8468
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Box
                  component="button"
                  onClick={() => navigate("/blogs")}
                  sx={{
                    all: "unset",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    color: "rgba(255,255,255,0.38)",
                    fontSize: "0.8rem",
                    transition: "color 0.2s",
                    "&:hover": { color: "rgba(255,255,255,0.85)" },
                  }}
                >
                  <ArrowBackIcon sx={{ fontSize: "0.88rem" }} />
                  All articles
                </Box>
                <Box
                  component="button"
                  onClick={handleShare}
                  sx={{
                    all: "unset",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    color: "rgba(255,255,255,0.38)",
                    fontSize: "0.8rem",
                    transition: "color 0.2s",
                    "&:hover": { color: "#2794d2" },
                  }}
                >
                  <ShareIcon sx={{ fontSize: "0.88rem" }} />
                  Share
                </Box>
              </Box>
            </Box>

            <RelatedPosts currentPost={post} />
          </Grid>

          {/* Sidebar — desktop only */}
          <Grid item md={4} sx={{ display: { xs: "none", md: "block" } }}>
            <Box
              sx={{
                position: "sticky",
                top: 96,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <TableOfContents toc={post.toc} activeSection={activeSection} />

              {/* Thin divider */}
              <Box sx={{ height: "1px", bgcolor: "rgba(255,255,255,0.05)" }} />

              {/* Service links */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                    mb: 2.5,
                    display: "block",
                  }}
                >
                  Our Services
                </Typography>
                {[
                  { label: "Vehicle Window Tinting", to: "/services/vehicle-window-tinting" },
                  { label: "Paint Protection Film", to: "/services/vehicle-paint-protection" },
                  { label: "Ceramic Coating", to: "/services/ceramic-coating" },
                  { label: "Residential Window Tinting", to: "/services/residential-window-tinting" },
                  { label: "Tesla Window Tinting", to: "/services/tesla-window-tinting" },
                  { label: "Paint Correction", to: "/services/vehicle-paint-correction" },
                  { label: "Headlight Services", to: "/services/headlight-services" },
                ].map(({ label, to }) => (
                  <Box
                    key={to}
                    component={Link}
                    to={to}
                    sx={{
                      display: "block",
                      py: 0.65,
                      textDecoration: "none",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.38)",
                      transition: "color 0.18s",
                      "&:hover": { color: "rgba(255,255,255,0.82)" },
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Box>

              {/* Thin divider */}
              <Box sx={{ height: "1px", bgcolor: "rgba(255,255,255,0.05)" }} />

              {/* CTA */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid rgba(39,148,210,0.2)",
                  bgcolor: "rgba(39,148,210,0.06)",
                }}
              >
                <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.92rem", mb: 0.75 }}>
                  Get a Free Quote
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", lineHeight: 1.6, mb: 2.5 }}>
                  Serving Dallas, Garland, Plano &amp; all of DFW. Fast installs, lifetime warranties.
                </Typography>
                <Box
                  component="a"
                  href="#contact"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    py: 1.1,
                    borderRadius: 1.5,
                    bgcolor: "#2794d2",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    transition: "background-color 0.2s",
                    "&:hover": { bgcolor: "#1a7bb0" },
                  }}
                >
                  Book an Appointment
                </Box>
                <Typography
                  sx={{ textAlign: "center", mt: 1.5, color: "rgba(255,255,255,0.28)", fontSize: "0.72rem" }}
                >
                  972-362-8468
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <SubCTA />
      <SubContact />
      <Footer />
    </Box>
  );
};

export default BlogDetail;
