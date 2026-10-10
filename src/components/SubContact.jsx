import React from "react";
import { Box, Typography, Card, Grid, useMediaQuery } from "@mui/material";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import ObfuscatedEmail from "./ObfuscatedEmail";
import QuoteForm from "./QuoteForm";
import { trackEvent } from "../utils/analytics";

const Contact = ({ city }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handlePhoneClick = () => {
    trackEvent("Contact", "Lead", "Phone Click", undefined, city ? { city: city.slug } : {});
    window.location.href = "tel:+19723628468";
  };

  const handleEmailClick = () => {
    trackEvent("Contact", "Lead", "Email Click", undefined, city ? { city: city.slug } : {});
    window.location.href = "mailto:info@tinttekplus.com";
  };

  const handleAddressClick = () => {
    window.open(
      "https://www.google.com/maps/place/Tint+Tek+Plus/@32.8783221,-96.6691041,17z/data=!3m1!4b1!4m6!3m5!1s0x864ea153db5dd237:0xe54143946793a9e6!8m2!3d32.8783221!4d-96.6665292!16s%2Fg%2F11w46vds7d?entry=ttu&g_ep=EgoyMDI1MDMxOS4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
      "_blank"
    );
  };

  return (
    <Box
      id="contact"
      sx={{
        width: "100%",
        py: 3,
        scrollMarginTop: "90px",
      }}
    >
      <Box
        sx={{
          padding: { xs: "20px", md: "40px" },
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {/* Contact Header */}
        <Typography
          variant={isMobile ? "h4" : "h2"}
          sx={{
            mb: 1,
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
            letterSpacing: "-0.5px",
          }}
        >
          Contact Us
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "#fff",
            maxWidth: "600px",
            mx: "auto",
            fontSize: "1.1rem",
          }}
        >
          Let us know how we can help by sending us a message below
        </Typography>

        <Grid container spacing={4} alignItems="stretch">
          {/* Left Side - Contact Info */}
          <Grid item xs={12} md={5} sx={{ display: "flex" }}>
            <Card
              elevation={0}
              sx={{
                position: "relative",
                overflow: "hidden",
                // glassmorphism base
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
                borderRadius: 8,
                padding: { xs: "20px", md: "30px" },
                flexGrow: 1,
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease, border-color 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.45)",
                  borderColor: "rgba(255,255,255,0.30)",
                },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      fontWeight: 600,
                      color: "#fff",
                      position: "relative",
                      paddingBottom: "10px",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "130px",
                        height: "3px",
                        background: "#2794d2",
                        borderRadius: "3px",
                      },
                    }}
                  >
                    Get In Touch
                  </Typography>

                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "rgba(39, 148, 210, 0.1)",
                        p: 1.5,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        color: "#2794d2",
                      }}
                    >
                      <FaMapMarkerAlt size={20} />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 0.5, color: "#fff" }}
                      >
                        Location
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#fff" }}>
                        2518 West Kingsley Rd
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#fff" }}>
                        Garland, TX
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "rgba(39, 148, 210, 0.1)",
                        p: 1.5,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        color: "#2794d2",
                      }}
                    >
                      <FaPhone size={20} />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 0.5, color: "#fff" }}
                      >
                        Call Us
                      </Typography>
                      <Typography
                        variant="body2"
                        onClick={handlePhoneClick}
                        sx={{
                          color: "#fff",
                          "&:hover": {
                            cursor: "pointer",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        +1 (972) 362-8468
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 4 }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "rgba(39, 148, 210, 0.1)",
                        p: 1.5,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        color: "#2794d2",
                      }}
                    >
                      <FaEnvelope size={20} />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 0.5, color: "#fff" }}
                      >
                        Email Us
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          color: "#fff",
                          "&:hover": {
                            cursor: "pointer",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        <ObfuscatedEmail style={{ color: "inherit" }} />
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Google Map Embed with rounded corners and subtle shadow */}
                <Box
                  sx={{
                    mt: 2,
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    height: "250px",
                  }}
                >
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3350.75026088151!2d-96.6714001!3d32.8783265!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864ea153db5dd237%3A0xe54143946793a9e6!2sTint%20Tek%20Plus!5e0!3m2!1sen!2sus!4v1738297786523!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Right Side - Embedded External Form */}
          <Grid item xs={12} md={7} sx={{ display: "flex" }}>
            <Box
              sx={{
                flexGrow: 1,
                backgroundColor: "#fff",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                },
              }}
            >
              <QuoteForm
                title="TintWiz Contact Form"
                src="https://app.tintwiz.com/web/ce/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t"
                loading="lazy"
                style={{
                  width: "100%",
                  height: isMobile ? "650px" : "650px",
                  border: 0,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Contact;
