// src/components/ImageCTA.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import QuoteForm from "./QuoteForm";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const callToActionData = {
  "vehicle-paint-correction": {
    title: "Restore Your Vehicle's Shine with Professional Paint Correction",
    description: `At Tint Tek Plus, we specialize in restoring and enhancing your vehicle's paint, bringing back its original shine and clarity. Whether you're dealing with swirl marks, scratches, oxidation, or just want to boost the appearance of your car, our professional paint correction services will restore your vehicle's exterior to a showroom-quality finish..
    Our commercial films are smart, sleek, and built to last. Perfect for offices, retail spaces, and buildings looking to improve energy efficiency.`,
    images: [],
    formUrl: "https://app.tintwiz.com/web/ce/ossbvx1pgf73ldzcej0iw4iryailzpad",
  },
};

const defaultFormUrl =
  "https://app.tintwiz.com/web/cs/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t?service=default";

const ImageCTA = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { serviceId } = useParams();

  const currentData =
    callToActionData[serviceId] || callToActionData["vehicle-paint-correction"];

  const { title, description, images = [], formUrl } = currentData;
  const effectiveFormUrl = formUrl || defaultFormUrl;

  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const showCarousel =
    serviceId !== "vehicle-paint-correction" &&
    serviceId !== "vehicle-paint-protection" &&
    images.length > 0;

  return (
    <Box
      sx={{
        position: "relative",
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#000",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        {/* Mobile-only CTA at the very top */}
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            width: "90%",
            mx: "auto",
            mb: 3,
          }}
        >
          <Button
            onClick={handleOpenForm}
            variant="contained"
            aria-label="Open quote form"
            sx={{
              backgroundColor: "#2794d2 !important",
              color: "#fff",
              fontWeight: "bold",
              py: 1.2,
              borderRadius: "30px",
              textTransform: "uppercase",
              width: "100%",
            }}
          >
            Get a Free Quote
          </Button>
        </Box>

        {/* Image Carousel */}
        {showCarousel && (
          <Box sx={{ mb: 4, overflow: "hidden" }}>
            <Swiper
              modules={[Navigation]}
              centeredSlides={true}
              navigation={true}
              loop={images.length > 1}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                960: { slidesPerView: 3, spaceBetween: 24 },
              }}
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <Box sx={{ px: 1 }}>
                    <Box
                      component="img"
                      src={src}
                      alt={`Slide ${index + 1}`}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: isMobile ? "250px" : "350px",
                        objectFit: "cover",
                        borderRadius: "24px",
                        transition: "transform 0.4s ease, box-shadow 0.4s ease",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                        "&:hover": {
                          cursor: "pointer",
                          transform: "scale(1.02)",
                        },
                      }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}

        <Box sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component="h3"
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 2,
              px: { xs: 2, sm: 2, md: 3 },
              fontSize: isMobile ? "1rem" : "1.2rem",
              lineHeight: "1.6",
              opacity: 0.9,
              color: "#fff",
            }}
          >
            {description}
          </Typography>

          <Button
            component={motion.button}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              mt: 3,
              backgroundColor: "#2794d2 !important",
              color: "#fff",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: "30px",
              textTransform: "uppercase",
              fontSize: "1.1rem",
            }}
            onClick={handleOpenForm}
            aria-label="Open quote form"
          >
            Get a Free Quote
          </Button>
        </Box>
      </Box>

      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="lg"
        BackdropProps={{
          sx: {
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.45)",
          },
        }}
      >
        <DialogContent sx={{ position: "relative", p: 0 }}>
          <IconButton
            onClick={handleCloseForm}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
            aria-label="Close quote dialog"
          >
            <CloseIcon />
          </IconButton>

          <QuoteForm
            src={effectiveFormUrl}
            width="100%"
            height="800"
            style={{ border: "none" }}
            title={`${title} – Quote Form`}
            loading="lazy"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ImageCTA;
