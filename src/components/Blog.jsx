import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Grid,
  Container,
  Chip,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  CardActionArea,
  GlobalStyles,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "./key-components/Footer";
import Contact from "./SubContact";
import CallToAction from "./SubCTA";
import QuickLinks from "./SubQuickLinks";
import SEO from "./SEO";
import { blogPosts } from "../data/blogData";

// ---- SITE SETTINGS ----
const SITE = "https://tinttekplus.com"; // use your live domain

const GRADIENT = `radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
   radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
   linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)`;



// Extract all unique categories
const allCategories = Array.from(
  new Set(blogPosts.flatMap((post) => post.categories || []))
);

const Blog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [featuredPost, setFeaturedPost] = useState(
    blogPosts.find((post) => post.featured)
  );

  // Derived / filtered posts
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query) ||
          (post.categories || []).some((cat) => cat.toLowerCase().includes(query))
      );
    }
    /*
    if (activeTab !== "all") {
      filtered = filtered.filter((post) => (post.categories || []).includes(activeTab));
    }
    */
    return filtered;
  }, [searchTerm, activeTab]);

  const handleTabChange = (_e, newValue) => setActiveTab(newValue);

  // Animate cards on appear
  useEffect(() => {
    const cards = document.querySelectorAll(".blog-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, [filteredPosts]);

  // -------- Helmet (SEO) --------
  const { title, description, canonical, blogLd } = useMemo(() => {
    const url = `${SITE}/blogs`;
    const metaTitle = "Blog | Window Tinting Tips & PPF Guides | Tint Tek Plus";
    const metaDesc =
      "Expert articles on window tinting, paint protection film (PPF), ceramic coatings, and automotive care—written by the Tint Tek Plus team in Dallas–Fort Worth.";
    const blogPostLd = blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.summary,
      image: `${SITE}${p.image.startsWith("/") ? p.image : `/${p.image}`}`,
      datePublished: p.date,
      url: `${SITE}/blog/${p.slug}`,
    }));
    const ld = {
      "@context": "https://schema.org",
      "@type": "Blog",
      url,
      name: "Tint Tek + Insights",
      description: metaDesc,
      blogPost: blogPostLd,
      inLanguage: "en-US",
      publisher: {
        "@type": "Organization",
        name: "Tint Tek Plus",
        url: SITE,
        telephone: "+1-972-362-8468",
      },
    };
    return {
      title: metaTitle,
      description: metaDesc,
      canonical: url,
      blogLd: ld,
    };
  }, []);

  return (
    <Box 
      className="BlogPageRoot"
      sx={{ background: "transparent", color: "#FFFFFF", minHeight: "100vh", position: "relative" }}
    >
      <GlobalStyles
        styles={{
          ".BlogPageRoot": { position: "relative" },
          ".BlogPageRoot::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: GRADIENT,
          },
        }}
      />
      {/* HEAD */}
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        jsonLd={blogLd}
        image="https://tinttekplus.com/v-window-tint/vehicle-window-tint.webp"
        type="website"
      />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "50vh", md: "60vh" },
          overflow: "hidden",
          background: "transparent",
        }}
      >
        {/* Background Pattern */}
        {/* <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        /> */}
        {/* Animated Gradient Overlay */}
        {/* <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(39, 148, 210, 0.2) 0%, rgba(35, 10, 89, 0.2) 100%)",
            animation: "gradientShift 10s ease infinite",
            "@keyframes gradientShift": {
              "0%": { opacity: 0.4 },
              "50%": { opacity: 0.7 },
              "100%": { opacity: 0.4 },
            },
          }}
        /> */}
        {/* Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", md: "70%" },
              animation: "fadeInUp 1s ease-out",
              "@keyframes fadeInUp": {
                "0%": { opacity: 0, transform: "translateY(20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#2794d2",
                fontWeight: 600,
                letterSpacing: 2,
                mb: 1,
                display: "block",
              }}
            >
              TINT TEK + INSIGHTS
            </Typography>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                color: "#fff",
                mb: 2,
                fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3.5rem" },
                lineHeight: 1.1,
              }}
            >
              Automotive <span style={{ color: "#2794d2" }}>Expertise</span> &
              Insights
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.8)",
                maxWidth: "600px",
                mb: 4,
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Stay updated with the latest trends in window tinting, paint
              protection, and automotive care from our expert team.
            </Typography>
            <Box
              sx={{
                mt: 5,
                width: { xs: 120, sm: 120 },
                height: 5,
                borderRadius: 999,
                background:
                  "linear-gradient(90deg, #1e90ff 0%, #2794d2 50%, #1e90ff 100%)",
                boxShadow: "0 0 16px rgba(39,148,210,0.35)",
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Category Filter — simple dark glass with blue active (Commented out)
      <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 4 }, position: "relative", zIndex: 10 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 12,
            background: "rgba(8, 8, 10, 0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Filter by category"
            sx={{
              minHeight: 0,
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTab-root": {
                minHeight: 36,
                px: 1.6,
                borderRadius: 9999,
                textTransform: "none",
                fontWeight: 600,
                fontSize: 14,
                color: "rgba(255,255,255,0.72)",
                transition: "background-color .2s ease, color .2s ease",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
                "&.Mui-selected": {
                  color: "#fff",
                  backgroundColor: "#2794d2",        // ← company blue
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#1a7bb0",        // slight darken on hover (optional)
                },
                "&.Mui-focusVisible": {
                  boxShadow: "0 0 0 2px rgba(39,148,210,0.35)",
                },
              },
            }}
          >
            <Tab disableRipple value="all" label="All Posts" />
            {allCategories.map((category) => (
              <Tab disableRipple key={category} value={category} label={category} />
            ))}
          </Tabs>
        </Box>
      </Container>
      */}




      {/* Featured Post (kept as fully clickable card) */}
      {featuredPost && (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
              position: "relative",
              display: "inline-block",
              "&:after": {
                content: "''",
                position: "absolute",
                bottom: "-6px",
                left: "0",
                width: "60px",
                height: "3px",
                backgroundColor: "#2794d2",
              },
            }}
          >
            Featured Article
          </Typography>

          <Card
            className="blog-card featured-card"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "rgba(20, 20, 30, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
              },
              textDecoration: "none",
            }}
          >
            <CardActionArea
              component={Link}
              to={`/blog/${featuredPost.slug}`}
              aria-label={`Read article: ${featuredPost.title}`}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "stretch",
              }}
            >
              {/* Featured Image */}
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" },
                  height: { xs: "250px", md: "auto" },
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  role="img"
                  aria-label={featuredPost.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url("${featuredPost.image}")`,
                    backgroundSize: "cover",
                    backgroundPosition: featuredPost.imagePosition || "center",
                    transition: "transform 0.5s ease",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    backgroundColor: "#2794d2",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Featured
                </Box>
              </Box>

              {/* Content */}
              <Box sx={{ width: { xs: "100%", md: "50%" }, p: 4, display: "flex", flexDirection: "column" }}>
                {/* Categories */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {(featuredPost.categories || []).map((cat) => (
                    <Chip
                      key={cat}
                      label={cat}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(39, 148, 210, 0.1)",
                        color: "#2794d2",
                        fontWeight: 500,
                        borderRadius: "4px",
                      }}
                    />
                  ))}
                </Box>

                {/* Title */}
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#fff",
                    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                    lineHeight: 1.3,
                    textDecoration: "none",
                  }}
                >
                  {featuredPost.title}
                </Typography>

                {/* Summary */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    mb: 3,
                    lineHeight: 1.6,
                    fontSize: "1rem",
                    flex: 1,
                  }}
                >
                  {featuredPost.summary}
                </Typography>

                {/* Meta */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "auto",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarTodayIcon sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        {featuredPost.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }} />
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        {featuredPost.estimate} Read
                      </Typography>
                    </Box>
                  </Box>

                  {/* Chevron to indicate clickability (optional) */}
                  <ArrowForwardIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Container>
      )}

      {/* Blog Listing — entire card clickable, no Read button */}
      <Container maxWidth="lg" sx={{ py: 4, mb: 8 }}>
        {filteredPosts.length > 0 ? (
          <>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
                position: "relative",
                display: "inline-block",
                "&:after": {
                  content: "''",
                  position: "absolute",
                  bottom: "-6px",
                  left: "0",
                  width: "60px",
                  height: "3px",
                  backgroundColor: "#2794d2",
                },
              }}
            >
              {activeTab === "all" ? "All Articles" : `${activeTab} Articles`}
            </Typography>

            <Grid container spacing={3}>
              {filteredPosts.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card
                    className="blog-card"
                    component="article"
                    sx={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "rgba(20, 20, 30, 0.5)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": { transform: "translateY(-5px)", boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)" },
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`/blog/${post.slug}`}
                      aria-label={`Read article: ${post.title}`}
                      sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
                    >
                      {/* Image */}
                      <Box sx={{ position: "relative", height: "200px", width: "100%", overflow: "hidden" }}>
                        <Box
                          className="blog-image"
                          role="img"
                          aria-label={post.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url("${post.image}")`,
                            backgroundSize: "cover",
                            backgroundPosition: post.imagePosition || "center",
                            transition: "transform 0.5s ease-in-out",
                          }}
                        />
                        {post.categories && post.categories[0] && (
                          <Chip
                            label={post.categories[0]}
                            size="small"
                            sx={{
                              position: "absolute",
                              top: "12px",
                              left: "12px",
                              backgroundColor: "rgba(39, 148, 210, 0.9)",
                              color: "white",
                              fontWeight: 500,
                              fontSize: "0.7rem",
                            }}
                          />
                        )}
                      </Box>

                      {/* Content */}
                      <Box sx={{ p: 3, display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
                        {/* Title */}
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{ fontWeight: 700, mb: 1.5, color: "#fff", lineHeight: 1.3 }}
                        >
                          {post.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            mb: 2,
                            flex: 1,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {post.summary}
                        </Typography>

                        {/* Meta */}
                        <Box
                          sx={{
                            mt: "auto",
                            pt: 2,
                            borderTop: "1px solid rgba(255,255,255,0.05)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 0.5 }}
                          >
                            <AccessTimeIcon sx={{ fontSize: "0.9rem" }} />
                            {post.estimate}
                          </Typography>

                          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                            {post.date}
                          </Typography>

                          {/* Optional visual affordance */}
                          <ArrowForwardIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              backgroundColor: "rgba(20, 20, 30, 0.5)",
              borderRadius: 4,
              p: 4,
            }}
          >
            <Typography variant="h5" sx={{ color: "#fff", mb: 2 }}>
              No articles found
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
              Try adjusting your search criteria or browse all articles.
            </Typography>
            <Box
              component={Link}
              to="/blogs"
              sx={{
                display: "inline-block",
                px: 3,
                py: 1.25,
                borderRadius: "8px",
                backgroundColor: "#2794d2",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#1a7bb0" },
              }}
            >
              View All Articles
            </Box>
          </Box>
        )}
      </Container>

      {/* Call to Action & Footer */}
      <CallToAction />
      <Contact />
      <QuickLinks />
      <Footer />
    </Box>
  );
};

export default Blog;
