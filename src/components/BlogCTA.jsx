import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// ─── Sample teasers ──────────────────────────────────────────────────────────
const TEASERS = [
  {
    slug: "llumar-vs-xpel-window-tint-dallas",
    label: "Tinting",
    title: "LLumar vs. XPEL: Why LLumar Comes Out Ahead",
    image: "/llumar-logo.webp",
  },
  {
    slug: "5-reasons-tint-car-windows-dallas-tx",
    label: "Tinting",
    title: "5 Reasons to Tint Your Car Windows in Dallas, TX",
    image: "/blog2-min.webp",
  },
  {
    slug: "paint-protection-film-dallas-texas",
    label: "Paint Protection",
    title: "Why PPF Is a MUST in Dallas, Texas",
    image: "/ppf-installation.webp",
  },
];

// ─── Motion helpers ──────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Component ───────────────────────────────────────────────────────────────
const BlogCTA = () => {

  return (
    <Box
      component={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      sx={{
        mx: "auto",
        maxWidth: "1200px",
        px: { xs: 2.5, sm: 4, md: 6 },
        py: { xs: 6, md: 9 },
      }}
    >
      {/* ── Top rule + overline ─────────────────────────────────────────── */}
      <motion.div variants={rise}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(39,148,210,0.6) 0%, rgba(39,148,210,0.08) 100%)",
            }}
          />
          <Typography
            sx={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2794d2",
              whiteSpace: "nowrap",
            }}
          >
            From the Blog
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(39,148,210,0.08) 0%, rgba(39,148,210,0.6) 100%)",
            }}
          />
        </Box>
      </motion.div>

      {/* ── Headline row ────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "flex-end" },
          justifyContent: "space-between",
          gap: 2,
          mb: { xs: 5, md: 6 },
        }}
      >
        <motion.div variants={rise}>
          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.9rem", md: "2.6rem" },
              lineHeight: 1.1,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Expert Tips &{" "}
            <Box
              component="span"
              sx={{ color: "#2794d2" }}
            >
              Insights
            </Box>
          </Typography>
        </motion.div>

        {/* "See all" link */}
        <motion.div variants={rise}>
          <Box
            component={RouterLink}
            to="/blogs"
            sx={{
              all: "unset",
              cursor: "pointer",
              "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 3 },
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition: "color 0.2s ease",
              "&:hover": { color: "#2794d2" },
              "&:hover .arrow-icon": { transform: "translateX(4px)" },
            }}
          >
            See all articles
            <ArrowForwardIcon
              className="arrow-icon"
              sx={{ fontSize: "0.95rem", transition: "transform 0.2s ease" }}
            />
          </Box>
        </motion.div>
      </Box>

      {/* ── Cards ───────────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {TEASERS.map((post) => (
          <motion.div
            key={post.slug}
            variants={rise}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{ height: "100%" }}
          >
            {/* Real <a href> so crawlers can follow the teaser (was an onClick div) */}
            <Box
              component={RouterLink}
              to={`/blog/${post.slug}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 3 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.025)",
                transition: "border-color 0.25s ease",
                "&:hover": {
                  borderColor: "rgba(39,148,210,0.3)",
                },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: "100%",
                  height: "180px",
                  backgroundImage: `url("${post.image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: post.imagePosition || "center",
                  position: "relative",
                }}
              >
                {/* bottom fade */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
              </Box>

              {/* Body */}
              <Box sx={{ px: 2.5, pt: 2.5, pb: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                {/* label */}
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#2794d2",
                    mb: 1,
                  }}
                >
                  {post.label}
                </Typography>

                {/* title */}
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    lineHeight: 1.45,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 2,
                    flex: 1,
                  }}
                >
                  {post.title}
                </Typography>

                {/* read link */}
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.4)",
                    transition: "color 0.2s ease",
                    "& .card-arrow": {
                      transition: "transform 0.2s ease",
                    },
                    "&:hover": { color: "#2794d2" },
                    "&:hover .card-arrow": { transform: "translateX(3px)" },
                  }}
                >
                  Read article
                  <ArrowForwardIcon
                    className="card-arrow"
                    sx={{ fontSize: "0.75rem" }}
                  />
                </Box>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default BlogCTA;
