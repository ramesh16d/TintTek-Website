import React from "react";
import { Box, Typography, Button, GlobalStyles } from "@mui/material";
import Topbar from "./key-components/Topbar";
import CallToAction from "./key-components/CallToAction";
import Footer from "./key-components/Footer";
import QuickLinks from "./key-components/QuickLinks";

import SubCTA from "./SubCTA";
import SubContact from "./SubContact";
import SubQuickLinks from "./SubQuickLinks";
import SEO from "./SEO";

const GRADIENT = `radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
   radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
   linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)`;

const NotFound = () => {
  return (
    <Box
      className="NotFoundPageRoot"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "transparent",
        color: "#fff",
      }}
    >
      <GlobalStyles
        styles={{
          ".NotFoundPageRoot": { position: "relative" },
          ".NotFoundPageRoot::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: GRADIENT,
          },
        }}
      />
      <SEO
        title="Page Not Found | Tint Tek Plus"
        description="The page you're looking for doesn't exist."
        robots="noindex, follow"
        canonical={false}
      />
      <Topbar notFound={true} />

      {/* Main 404 Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          // backgroundColor: "transparent",
          padding: { xs: 4, md: 8 },
          mt: { xs: "56px", md: "64px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          {/* Text Section */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 4, md: 0 },
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#2794d2", fontWeight: "bold", mb: 1 }}
            >
              404
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}>
              Oops! I may have chewed up the power cord.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: "rgba(255,255,255,0.7)" }}>
              Go back to our main page to continue your visit.
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2794d2",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#1a7bb0",
                },
              }}
              href="/"
            >
              Back to main page
            </Button>
          </Box>

          {/* Image Section */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img
              src="/dog.png"
              alt="Funny Dog"
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))",
              }}
            />
          </Box>
        </Box>
      </Box>


      <Box>
        <SubCTA />
      </Box>
      {/* Contact Section */}
      <SubContact />

      <SubQuickLinks />

      <Footer />
    </Box>
  );
};

export default NotFound;
