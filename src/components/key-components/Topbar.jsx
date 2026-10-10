import QuoteForm from "../QuoteForm";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogContent,
  Menu,
  MenuItem,
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

const Topbar = ({ notFound, handleOpenChatbot }) => {
  // Accepting `notFound` prop
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1300px)");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setQuoteOpen(false);
  }, [location.pathname]);

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

  // Handlers for hover-only dropdown (desktop)
  const handleServicesMouseEnter = (e) => {
    if (!isMobile) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleServicesMouseLeave = () => {
    if (!isMobile) {
      setAnchorEl(null);
    }
  };

  const handleServiceSelect = (servicePath) => {
    navigate(`/services/${servicePath}`);
    setAnchorEl(null);
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
              display="flex"
              alignItems="center"
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
              onClick={() => {
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Scroll to top
                } else {
                  navigate("/"); // ✅ Navigate to homepage if on another page
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
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                  sx={{ position: "relative" }}
                >
                  <Button
                    color="inherit"
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
                      ...(anchorEl && {
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

                  {/* Dropdown Menu for Services */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{
                      onMouseLeave: () => setAnchorEl(null),
                      sx: { py: 1 },
                    }}
                    transitionDuration={150}
                    sx={{
                      "& .MuiPaper-root": {
                        background:
                          "linear-gradient(180deg, rgba(20,20,22,0.98) 0%, rgba(10,10,11,0.98) 100%)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "16px",
                        minWidth: "260px",
                        mt: "10px",
                        boxShadow:
                          "0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(39,148,210,0.08)",
                      },
                      "& .MuiMenuItem-root": {
                        fontWeight: 500,
                        fontSize: "14.5px",
                        letterSpacing: "0.2px",
                        padding: "11px 18px",
                        margin: "1px 8px",
                        borderRadius: "10px",
                        color: "rgba(255,255,255,0.85)",
                        transition: "background-color 0.18s ease, color 0.18s ease",
                        "&:hover": {
                          background: "rgba(39,148,210,0.14)",
                          color: "#5fb8ec",
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        px: "22px",
                        pt: "10px",
                        pb: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#2794d2",
                        }}
                      >
                        Our Services
                      </Box>
                    </Box>
                    <MenuItem
                      onClick={() =>
                        handleServiceSelect("vehicle-window-tinting")
                      }
                    >
                      Vehicle Window Tinting
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleServiceSelect("tesla-window-tinting")
                      }
                    >
                      Tesla Window Tinting
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleServiceSelect("commercial-window-tinting")
                      }
                    >
                      Commercial Window Tinting
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleServiceSelect("residential-window-tinting")
                      }
                    >
                      Residential Window Tinting
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleServiceSelect("vehicle-paint-correction")
                      }
                    >
                      Vehicle Paint Correction
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleServiceSelect("vehicle-paint-protection")
                      }
                    >
                      Vehicle Paint Protection
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleServiceSelect("headlight-services")}
                    >
                      Headlight & Taillight Services
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleServiceSelect("ceramic-coating")}
                    >
                      Ceramic Coating
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleServiceSelect("windshield-protection-film")
                      }
                    >
                      Windshield Protection Film
                    </MenuItem>
                  </Menu>
                </Box>

                {/* Other Navigation Links */}
                {["Gallery", "Support", "Blogs", "Contact"].map((item) => (
                  <Button
                    key={item}
                    color="inherit"
                    onClick={() => scrollToSection(item.toLowerCase())}
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
                    {item}
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
          <ListItem
            button
            disableGutters
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
          </ListItem>

          <Collapse in={servicesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                {
                  label: "Vehicle Window Tinting",
                  path: "vehicle-window-tinting",
                },
                { label: "Tesla Window Tinting", path: "tesla-window-tinting" },
                {
                  label: "Commercial Window Tinting",
                  path: "commercial-window-tinting",
                },
                {
                  label: "Residential Window Tinting",
                  path: "residential-window-tinting",
                },
                {
                  label: "Vehicle Paint Correction",
                  path: "vehicle-paint-correction",
                },
                {
                  label: "Vehicle Paint Protection",
                  path: "vehicle-paint-protection",
                },
                {
                  label: "Headlight & Taillight Services",
                  path: "headlight-services",
                },
                { label: "Ceramic Coating", path: "ceramic-coating" },
                {
                  label: "Windshield Protection Film",
                  path: "windshield-protection-film",
                },
              ].map(({ label, path }) => (
                <ListItem
                  key={label}
                  button
                  onClick={() => {
                    handleServiceSelect(path);
                    setDrawerOpen(false);
                  }}
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

          {["Reviews", "Gallery", "Support", "Blogs", "Contact"].map((item) => (
            <ListItem
              button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              <ListItemText
                primary={item}
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
          <QuoteForm
            src="https://app.tintwiz.com/web/cs/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t"
            width="100%"
            height="800px"
            loading="lazy"
            style={{ border: "none" }}
            title="Fast Quote"
          ></QuoteForm>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Topbar;
