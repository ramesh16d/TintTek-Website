import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa"; // ✅ Import Icons
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import logo from "../../../public/tinttek-logo1.webp";
import logoSm from "../../../public/tinttek-logo1-400.webp";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const NavbarContainer = styled(Box)({
  width: "100%",
  maxWidth: "1200px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0 auto",
});

// Real hrefs (not click handlers) so crawlers can follow the navigation.
const SERVICE_LINKS = [
  { label: "Vehicle Window Tinting", path: "vehicle-window-tinting" },
  { label: "Tesla Window Tinting", path: "tesla-window-tinting" },
  { label: "Commercial Window Tinting", path: "commercial-window-tinting" },
  { label: "Residential Window Tinting", path: "residential-window-tinting" },
  { label: "Vehicle Paint Correction", path: "vehicle-paint-correction" },
  { label: "Vehicle Paint Protection", path: "vehicle-paint-protection" },
  { label: "Headlight & Taillight Services", path: "headlight-services" },
  { label: "Ceramic Coating", path: "ceramic-coating" },
  { label: "Windshield Protection Film", path: "windshield-protection-film" },
];

// Homepage sections (Reviews, Contact) link to "/#id" and scroll in-page on click.
const NAV_LINKS = [
  { label: "Gallery", to: "/gallery" },
  { label: "Support", to: "/support" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact", to: "/#contact", section: "contact" },
];
const MOBILE_NAV_LINKS = [{ label: "Reviews", to: "/#reviews", section: "reviews" }, ...NAV_LINKS];

const Topbar = ({ notFound, handleOpenChatbot }) => {
  // Accepting `notFound` prop
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1300px)");
  const navigate = useNavigate();
  const location = useLocation();

  // Detect Scroll Position
  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const subPages = ["gallery", "privacy-policy", "blogs", "support",]; // Add more subpages here if needed

    if (subPages.includes(sectionId)) {
      // Navigate to the subpage instead of scrolling
      navigate(`/${sectionId}`);
      setDrawerOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      // If not on the homepage, navigate to home and scroll to the section
      navigate("/", { state: { scrollTo: sectionId } });
      setDrawerOpen(false);
      return;
    }

    // Scroll to section on the homepage
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    const offset = 80; // Adjust offset based on your Topbar height
    const targetPosition =
      targetSection.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: targetPosition, behavior: "smooth" });
    setDrawerOpen(false);
  };

  // Remove duplicate scroll listener
  // useEffect(() => {
  //   const handleScroll = () => setScrolling(window.scrollY > 50);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Section links ("/#contact") scroll in-page instead of navigating
  const handleNavLinkClick = (e, link) => {
    if (link.section) {
      e.preventDefault();
      scrollToSection(link.section);
    } else {
      setDrawerOpen(false);
    }
  };

  // 🏆 Handlers for Modal
  const handleOpenQuote = () => {
    setQuoteOpen(true);
    setDrawerOpen(false); // Close the mobile menu when opening the modal
  };

  const handleCloseQuote = () => {
    setQuoteOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: notFound
            ? "#000"
            : scrolling
            ? "#000"
            : "transparent",
          backdropFilter: scrolling && !notFound ? "blur(10px)" : "none",
          color: notFound || scrolling ? "#EEEEFF" : "#EEEEFF",
          boxShadow:
            scrolling && !notFound ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none",
          transition: "all 0.3s ease-in-out",
          width: "100vw",
          left: 0,
          top: 0,
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ justifyContent: "center", padding: "0 20px" }}>
          <NavbarContainer>
            <Box
              component={RouterLink}
              to="/"
              aria-label="Tint Tek Plus home"
              display="flex"
              alignItems="center"
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Scroll to top
                }
              }}
            >
              <img
                src={logo}
                srcSet={`${logoSm} 400w, ${logo} 1200w`}
                sizes="200px"
                alt="Tint Tek Plus"
                style={{
                  height: "50px",
                  marginRight: "10px",
                  borderRadius: "8px",
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box display="flex" gap={2} alignItems="center">
                {/* Wrap the Services button and Menu in a container */}
                <Box
                  onMouseEnter={() => setServicesMenuOpen(true)}
                  onMouseLeave={() => setServicesMenuOpen(false)}
                  onFocus={() => setServicesMenuOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setServicesMenuOpen(false);
                  }}
                  onKeyDown={(e) => e.key === "Escape" && setServicesMenuOpen(false)}
                  sx={{ position: "relative" }}
                >
                  <Button
                    color="inherit"
                    aria-haspopup="true"
                    aria-expanded={servicesMenuOpen}
                    aria-controls="services-menu"
                    onClick={() => setServicesMenuOpen((open) => !open)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                      fontSize: "27px",
                      fontWeight: 600,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      padding: "10px 2px",
                      paddingLeft: "20px",
                      color: scrolling ? "#fff" : "#fff",
                      transition: "all 0.3s ease-in-out",
                      ...(servicesMenuOpen && {
                        color: "#2794d2",
                        textShadow: "0 0 8px rgba(0, 198, 255, 0.8)",
                      }),
                      "&:hover": {
                        color: "#2794d2",
                        textShadow: "0 0 8px rgba(0, 198, 255, 0.8)",
                        "&:after": { width: "100%" },
                      },
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        width: "0%",
                        height: "3px",
                        bottom: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#2794d2",
                        transition: "width 0.4s ease-in-out",
                        borderRadius: "2px",
                      },
                    }}
                  >
                    Services <span style={{ fontSize: "14px" }}>▾</span>
                  </Button>

                  {/* Services dropdown: always rendered (hidden until hover/focus) so the
                      service links are in the page HTML for search engines */}
                  <Box
                    id="services-menu"
                    component="nav"
                    aria-label="Services"
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      pt: "10px", // hover bridge between the button and the panel
                      zIndex: 1300,
                      visibility: servicesMenuOpen ? "visible" : "hidden",
                      opacity: servicesMenuOpen ? 1 : 0,
                      transform: servicesMenuOpen ? "none" : "translateY(-4px)",
                      transition: "opacity 150ms ease, transform 150ms ease, visibility 150ms",
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          "linear-gradient(180deg, rgba(20,20,22,0.98) 0%, rgba(10,10,11,0.98) 100%)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "16px",
                        minWidth: "260px",
                        py: 1,
                        boxShadow:
                          "0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(39,148,210,0.08)",
                      }}
                    >
                      <Box
                        sx={{
                          px: "22px",
                          pt: "10px",
                          pb: "8px",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#2794d2",
                        }}
                      >
                        Our Services
                      </Box>
                      {SERVICE_LINKS.map(({ label, path }) => (
                        <Box
                          key={path}
                          component={RouterLink}
                          to={`/services/${path}`}
                          onClick={() => setServicesMenuOpen(false)}
                          sx={{
                            display: "block",
                            fontWeight: 500,
                            fontSize: "14.5px",
                            letterSpacing: "0.2px",
                            padding: "11px 18px",
                            margin: "1px 8px",
                            borderRadius: "10px",
                            color: "rgba(255,255,255,0.85)",
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                            transition: "background-color 0.18s ease, color 0.18s ease",
                            "&:hover, &:focus-visible": {
                              background: "rgba(39,148,210,0.14)",
                              color: "#5fb8ec",
                              outline: "none",
                            },
                          }}
                        >
                          {label}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                {/* Other Navigation Links */}
                {NAV_LINKS.map((link) => (
                  <Button
                    key={link.label}
                    color="inherit"
                    component={RouterLink}
                    to={link.to}
                    onClick={(e) => handleNavLinkClick(e, link)}
                    sx={{
                      fontSize: "27px",
                      fontWeight: 600,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      position: "relative",
                      padding: "10px 20px",
                      color: scrolling ? "#fff" : "#fff",
                      transition: "all 0.3s ease-in-out",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        width: "0%",
                        height: "3px",
                        bottom: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#2794d2",
                        transition: "width 0.4s ease-in-out",
                        borderRadius: "2px",
                      },
                      "&:hover": {
                        color: "#2794d2",
                        textShadow: "0 0 8px rgba(0, 198, 255, 0.8)",
                        "&:after": { width: "100%" },
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            )}
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ fontSize: 30 }}
              >
                <FaBars />
              </IconButton>
            )}
          </NavbarContainer>
        </Toolbar>
      </AppBar>

      {/* 🏆 Mobile Drawer */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        transitionDuration={500}
        keepMounted // keep the nav links in the DOM for crawlers while closed
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "black",
            color: "white",
            width: "100%",
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            padding: "5vh 0",
            fontFamily: "NoizeSport, sans-serif !important",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "#000 !important",
          },
        }}
      >
        {/* 🔹 Close Button (Fixed at the Top-Right) */}
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              color: "white",
              fontSize: "30px",
              "&:hover": { color: "#2794d2" },
            }}
          >
            <FaTimes />
          </IconButton>
        </Box>

        {/* 🔹 Navigation Links (Now fully expanding) */}
        <List
          sx={{
            textAlign: "center",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          {/* Services with dropdown */}
          <ListItemButton
            disableGutters
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen(!servicesOpen)}
            sx={{
              py: "10px",
              px: "24px",
              marginLeft: "5px",
              minHeight: "70px",
              width: "100%",
              display: "flex",
              justifyContent: "center", // center the container
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                maxWidth: "175px", // 👈 keeps layout from stretching edge to edge
              }}
            >
              <Box
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "clamp(30px, 4vw, 50px)",
                  lineHeight: 1,
                }}
              >
                Services
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px", // 👈 fixed width so icon stays in place
                }}
              >
                {servicesOpen ? (
                  <ExpandLess sx={{ color: "white", fontSize: "32px" }} />
                ) : (
                  <ExpandMore sx={{ color: "white", fontSize: "32px" }} />
                )}
              </Box>
            </Box>
          </ListItemButton>

          <Collapse in={servicesOpen} timeout="auto">
            <List component="div" disablePadding>
              {SERVICE_LINKS.map(({ label, path }) => (
                <ListItem
                  key={label}
                  component={RouterLink}
                  to={`/services/${path}`}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    paddingLeft: "20px",
                    "& .MuiListItemText-primary": {
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#fff",
                      textTransform: "none",
                      textAlign: "center",
                    },
                    "&:hover": {
                      backgroundColor: "#2794d2",
                    },
                  }}
                >
                  <ListItemText primary={label} />
                </ListItem>
              ))}
            </List>
          </Collapse>

          {MOBILE_NAV_LINKS.map((link) => (
            <ListItem
              key={link.label}
              component={RouterLink}
              to={link.to}
              onClick={(e) => handleNavLinkClick(e, link)}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "uppercase",
                    textAlign: "center",
                    fontSize: "clamp(30px, 4vw, 50px)",
                    lineHeight: "1.2",
                    "&:hover": { color: "#2794d2", cursor: "pointer" },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Buttons & Social Icons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            paddingBottom: "calc(env(safe-area-inset-bottom, 10px) + 10px)",
          }}
        >
          {/* Get a Quote Button */}
          <Button
            variant="contained"
            onClick={handleOpenQuote}
            sx={{
              backgroundColor: "#2794d2",
              color: "black",
              fontSize: "22px",
              fontWeight: "bold",
              borderRadius: "40px",
              minWidth: "90%",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#000",
                border: "3px solid #fff",
                color: "#fff",
              },
            }}
          >
            GET A QUOTE
          </Button>

          {/* Ask a Question Button */}
          <Button
            variant="contained"
            onClick={() => {
              if (handleOpenChatbot) handleOpenChatbot();
              setDrawerOpen(false); // Close drawer
            }}
            sx={{
              backgroundColor: "#222",
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              borderRadius: "40px",
              minWidth: "90%",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#000",
                border: "3px solid #fff",
                color: "#fff",
              },
            }}
          >
            ASK A QUESTION
          </Button>

          {/* Social Media Icons */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              mt: "5px",
              mb: "calc(env(safe-area-inset-bottom, 10px) + 5px)",
            }}
          >
            {[FaFacebook, FaInstagram].map((Icon, index) => (
              <IconButton
                key={index}
                sx={{
                  color: "white",
                  fontSize: "36px",
                  "&:hover": {
                    color: "#2794d2",
                  },
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Drawer>

      {/* 🏆 Quote Form Modal */}
      <Dialog
        open={quoteOpen}
        onClose={handleCloseQuote}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ position: "relative", padding: 0 }}>
          {/* Close Button */}
          <IconButton
            onClick={handleCloseQuote}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "white",
              "&:hover": { backgroundColor: "lightgray" },
            }}
          >
            <FaTimes />
          </IconButton>

          {/* Embedded Quote Form */}
          <iframe
            src="https://app.tintwiz.com/web/cs/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t"
            width="100%"
            height="800px"
            loading="lazy"
            style={{ border: "none" }}
            title="Fast Quote"
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Topbar;
