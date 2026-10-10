import QuoteForm from "./QuoteForm";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const tintPackages = [
  {
    title: "Window Strip",
    price: "Starting at $50",
    image: "/v-window-tint/v-visor-strip.webp",
    description:
      "A narrow strip across the top of the windshield to block excessive glare.",
  },
  {
    title: "Front 2 Window Match",
    price: "Starting at $85",
    image: "/v-window-tint/v-front-two.webp",
    description:
      "Match the front windows to the factory tint of the rear windows.",
  },
  {
    title: "Full Windshield",
    price: "Starting at $249",
    image: "/v-window-tint/v-windshield.webp",
    description:
      "A full-tint windshield package for optimal UV and heat rejection.",
  },
  {
    title: "Single Pane Sunroof",
    price: "Starting at $100",
    image: "/v-window-tint/v-sunroof.webp",
    description:
      "A full-tint sunroof package for optimal UV and heat rejection.",
  },
];

const TintPackages = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const cardSx = {
    position: "relative",
    overflow: "hidden",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    borderRadius: 5,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
      borderColor: "rgba(255,255,255,0.30)",
    },
  };


  return (
    <Box sx={{ py: 6, px: 1, background: "transparent" }}>
      {/* Section Title */}
      <Typography
        variant={isMobile ? "h4" : "h2"}
        align="center"
        sx={{
          color: "#fff",
          mb: 4,
          fontWeight: "bold",
          background: "transparent",
        }}
      >
        Additional Vehicle Window Tinting Services
      </Typography>

      {/* Content wrapper (transparent) */}
      <Box sx={{ maxWidth: 1200, mx: "auto", background: "transparent" }}>
        {isMobile ? (
          // 📱 MOBILE CAROUSEL (transparent track)
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              gap: 2,
              pb: 3,
              background: "transparent",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {tintPackages.map((pkg, index) => (
              <Box
                key={index}
                sx={{ flex: "0 0 85%", scrollSnapAlign: "center", background: "transparent" }}
              >
                <Card sx={cardSx}>
                  <CardMedia
                    component="img"
                    image={pkg.image}
                    alt={pkg.title}
                    sx={{ height: 200, objectFit: "contain", background: "transparent" }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      background: "transparent",
                    }}
                  >
                    <Box sx={{ background: "transparent" }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          textTransform: "uppercase",
                          background: "transparent",
                          fontSize: "1.5rem"
                        }}
                      >
                        {pkg.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#00FF99", mb: 1, background: "transparent" }}
                      >
                        {pkg.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#ccc", lineHeight: 1.5, background: "transparent" }}
                      >
                        {pkg.description}
                      </Typography>
                    </Box>

                    <Button
                      component={motion.a}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      sx={{
                        mt: 3,
                        backgroundColor: "#2794d2 !important",
                        color: "#fff",
                        fontWeight: "bold",
                        px: 3,
                        py: 1.2,
                        borderRadius: "30px",
                        textTransform: "uppercase",
                        fontSize: "1rem",
                        width: "100%",
                      }}
                      onClick={handleOpenModal}
                    >
                      Get an Estimate
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        ) : (
          // 🖥️ DESKTOP GRID (transparent grid)
          <Grid container spacing={3} justifyContent="center" sx={{ background: "transparent" }}>
            {tintPackages.map((pkg, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={cardSx}>
                  <CardMedia
                    component="img"
                    image={pkg.image}
                    alt={pkg.title}
                    sx={{ height: 250, objectFit: "contain", background: "transparent" }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      background: "transparent",
                    }}
                  >
                    <Box sx={{ background: "transparent" }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          textTransform: "uppercase",
                          background: "transparent",
                          fontSize: "1.5rem",
                        }}
                      >
                        {pkg.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#00FF99", mb: 1, background: "transparent" }}
                      >
                        {pkg.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#ccc", lineHeight: 1.5, background: "transparent" }}
                      >
                        {pkg.description}
                      </Typography>
                    </Box>

                    <Button
                      component={motion.a}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      sx={{
                        mt: 3,
                        backgroundColor: "#2794d2 !important",
                        color: "#fff",
                        fontWeight: "bold",
                        px: 3,
                        py: 1.2,
                        borderRadius: "30px",
                        textTransform: "uppercase",
                        fontSize: "1rem",
                        width: "100%",
                      }}
                      onClick={handleOpenModal}
                    >
                      Get an Estimate
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Dialog with transparent/glassy paper */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            background:
              "linear-gradient(180deg, rgba(20,20,20,0.85), rgba(12,12,12,0.85))",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "#fff",
            borderRadius: 3,
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
            overflow: "hidden",
          },
        }}
      >
        <Box sx={{ position: "relative", background: "transparent" }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.45)",
              zIndex: 1,
              "&:hover": { backgroundColor: "rgba(0,0,0,0.65)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <QuoteForm
            src="https://app.tintwiz.com/web/cs/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t"
            width="100%"
            height="800px"
            style={{ border: "none", background: "transparent" }}
            title="Fast Quote"
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default TintPackages;
