import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import StarIcon from "@mui/icons-material/Star";
import SEO from "./SEO";
import Footer from "./key-components/Footer";
import SubQuickLinks from "./SubQuickLinks";
import {
  getLastPageVisited,
  getCityFromPath,
  pushDataLayerEvent,
  trackEvent,
} from "../utils/analytics";
import { getThankYouService } from "../data/quoteServices";

const steps = [
  {
    icon: <FactCheckIcon sx={{ fontSize: 32, color: "#2794d2" }} />,
    title: "We Review Your Request",
    description:
      "Our team takes a look at the details you submitted so we can prepare the right recommendations for your vehicle, home, or business.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 32, color: "#2794d2" }} />,
    title: "We Reach Out To You",
    description:
      "A Tint Tek Plus specialist will call, text, or email you within 1 business day to confirm details and answer any questions.",
  },
  {
    icon: <EventAvailableIcon sx={{ fontSize: 32, color: "#2794d2" }} />,
    title: "We Get You Scheduled",
    description:
      "Once everything is confirmed, we'll lock in an appointment time that works for you at our Garland shop.",
  },
];

const badges = [
  { icon: <VerifiedUserIcon sx={{ fontSize: 22, color: "#2794d2" }} />, label: "Certified Technicians" },
  { icon: <WorkspacePremiumIcon sx={{ fontSize: 22, color: "#2794d2" }} />, label: "Lifetime Warranty" },
  { icon: <StarIcon sx={{ fontSize: 22, color: "#2794d2" }} />, label: "LLumar Window Films" },
];

const ThankYou = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();
  const service = getThankYouService(location.pathname);
  const trackedVisit = useRef(null);

  useEffect(() => {
    const visitKey = `${location.key}:${location.pathname}`;
    if (trackedVisit.current === visitKey) return;
    trackedVisit.current = visitKey;

    const sourcePage = getLastPageVisited();
    const city = getCityFromPath(sourcePage);
    pushDataLayerEvent("thank_you_page_view", {
      source_page: sourcePage || "unknown",
      city: city || "unknown",
      service: service?.service || "general",
      page_path: location.pathname,
      submission_confirmed: false,
    });
  }, [location.key, location.pathname, service]);

  const handlePhoneClick = () => {
    const sourcePage = getLastPageVisited();
    const city = getCityFromPath(sourcePage);
    trackEvent("Contact", "Lead", "Phone Click - Thank You Page", undefined, {
      source_page: sourcePage || "unknown",
      ...(city ? { city } : {}),
    });
    window.location.href = "tel:+19723628468";
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
          radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
          linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)
        `,
        color: "#fff",
      }}
    >
      <SEO
        title={service ? `Thank You — ${service.label} | Tint Tek Plus` : "Thank You | Tint Tek Plus"}
        description="Thanks for reaching out to Tint Tek Plus. We've received your request and will be in touch shortly."
        robots="noindex, follow"
      />

      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          px: { xs: 3, md: 4 },
          pt: { xs: "120px", md: "160px" },
          pb: { xs: 8, md: 10 },
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              mx: "auto",
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(39, 148, 210, 0.12)",
              border: "1px solid rgba(39, 148, 210, 0.4)",
              boxShadow: "0 0 60px rgba(39,148,210,0.35)",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 56, color: "#2794d2" }} />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component="h1"
            sx={{ fontWeight: 700, mb: 2, letterSpacing: "-0.5px" }}
          >
            {service ? `Thank You for Your ${service.label} Request!` : "Thank You!"}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.75)",
              maxWidth: "560px",
              mx: "auto",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Your request has been received. A Tint Tek Plus specialist will
            reach out within 1 business day to confirm your appointment
            details.
          </Typography>
        </motion.div>

        {/* What happens next */}
        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            {steps.map((step, index) => (
              <Box sx={{ flex: 1, minWidth: 0 }} key={step.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + index * 0.1, ease: "easeOut" }}
                  style={{ height: "100%" }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      p: 3,
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
                      transition: "transform 0.3s ease-in-out, border-color 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: "rgba(255,255,255,0.30)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        backgroundColor: "rgba(39, 148, 210, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Box>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              href="/"
              sx={{
                backgroundColor: "#2794d2",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: "#1a7bb0" },
              }}
            >
              Back to Home
            </Button>
            <Button
              variant="outlined"
              onClick={handlePhoneClick}
              startIcon={<PhoneIcon />}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.3)",
                fontWeight: "bold",
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                "&:hover": {
                  borderColor: "#2794d2",
                  backgroundColor: "rgba(39, 148, 210, 0.08)",
                },
              }}
            >
              Call (972) 362-8468
            </Button>
            <Button
              variant="text"
              href="/gallery"
              sx={{
                color: "rgba(255,255,255,0.75)",
                fontWeight: 600,
                px: 2,
                "&:hover": { color: "#fff" },
              }}
            >
              See Our Work →
            </Button>
          </Box>
        </motion.div>

        {/* Trust badges */}
        <Box
          sx={{
            mt: { xs: 6, md: 7 },
            pt: { xs: 4, md: 5 },
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 3, md: 5 },
          }}
        >
          {badges.map((badge) => (
            <Box
              key={badge.label}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {badge.icon}
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                {badge.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <SubQuickLinks />
      <Footer />
    </Box>
  );
};

export default ThankYou;
