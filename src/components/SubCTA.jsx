import QuoteForm from "./QuoteForm";
import React, {useState} from "react";
import { useParams } from "react-router-dom"; // 👈 Add this
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Dialog, 
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

const CallToAction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { serviceId } = useParams(); // 👈 Get serviceId
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const headlineText =
  serviceId === "commercial-window-tinting"
    ? "Professional Installation for Seamless Results"
    : serviceId === "windshield-protection-film"
    ? "Get Started Today!"
    : serviceId === "headlight-services"
    ? "ENHANCE AND PROTECT YOUR VEHICLE TODAY!"
    : serviceId === "vehicle-paint-protection"
    ? "GET STARTED TODAY!"
    : serviceId === "ceramic-coating"
    ? "GET IN TOUCH TODAY"
    : serviceId === "vehicle-paint-correction"
    ? "Ready to Restore Your Car’s Paint?"
    : "DO YOU NEED WINDOW TINT?";


  const paragraphText =
    serviceId === "commercial-window-tinting"
      ? "At Tint Tek Plus, our certified professionals are experts in recommending and installing the right LLumar® film for your glass type and design preferences. We ensure a smooth, efficient installation with minimal disruption to your daily operations. Contact Tint Tek Plus today to discover how LLumar® window films can transform your commercial or residential space, combining energy efficiency, comfort, and style."
      : serviceId === "windshield-protection-film"
      ? "Don't let the harsh Texas roads take a toll on your windshield. Choose ExoShield GT3 at Tint Tek Plus to protect your vehicle from chips, cracks, and other damage caused by road debris. Contact us today to schedule your installation and experience the ultimate in windshield protection."
      : serviceId === "headlight-services"
      ? "Contact Tint Tek Plus to schedule an appointment or consultation. Let us help you customize your vehicle's lighting with STEK Light Protection Films, combining style and protection in one seamless solution."
      : serviceId === "vehicle-paint-protection"
      ? "Ready to protect your vehicle with the best in paint protection? At Tint Tek Plus, we specialize in Stek PPF installations designed to keep your vehicle looking new and protected for years to come. Contact us today to schedule your consultation or request a personalized quote. Protect your car, preserve its beauty, and enjoy the peace of mind that comes with Stek PPF!"
      : serviceId === "ceramic-coating"
      ? "Ready to take your vehicle’s protection to the next level? At Tint Tek Plus, we offer premium ceramic and graphene coating services designed to keep your car looking its best for years to come. Contact us today to schedule your service and give your car the protection it deserves!"
      : serviceId === "vehicle-paint-correction"
      ? "Contact Tint Tek Plus today to schedule your paint correction service and experience the difference in your vehicle’s appearance. Let us bring out the true beauty of your car!"
      : "Looking to block out intense heat, protect your car’s interior from UV damage, or add some extra privacy? Window tinting is the solution! At TintTek+, we offer top-tier heat and UV protection, including tinting for windshields and sunroofs, to keep you comfortable and shielded from the harsh Dallas heat. With our advanced tinting options, you can enjoy cooler temperatures, a more private ride, and longer-lasting protection for your vehicle’s interior.";

  // Animation variants...
  const containerVariants = {
    hidden: {}, 
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeSlideVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <Box
        sx={{
          position: "relative",
          py: 5,
          px: { xs: 1, sm: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#2794d2 !important",
          borderRadius: isMobile ? 10 : 20 ,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          mt: 5,
          mb: 5,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1100px",
            width: "100%",
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component={motion.h3}
            variants={fadeSlideVariant}
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            {headlineText}
          </Typography>

          <Typography
            variant="body1"
            component={motion.p}
            variants={fadeSlideVariant}
            transition={{ delay: 0.3 }}
            sx={{
              mt: 2,
              fontSize: isMobile ? "1rem" : "1.2rem",
              lineHeight: "1.6",
              opacity: 0.9,
            }}
          >
            {paragraphText}
          </Typography>

          <Button
            component={motion.button}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            sx={{
              mt: 3,
              backgroundColor: "#000 !important",
              color: "#fff",
              fontWeight: "bold",
              px: isMobile ? 3 : 4,
              py: isMobile ? 1.2 : 1.5,
              borderRadius: "30px",
              textTransform: "uppercase",
              fontSize: isMobile ? "1rem" : "1.1rem",
              width: isMobile ? "100%" : "auto",
            }}
            onClick={handleOpenModal}
            aria-label="Open footer quote form"
          >
            Get a Free Quote
          </Button>
        </Box>
         {/* Modal Dialog with the Iframe */}
              <Dialog
                open={openModal}
                onClose={handleCloseModal}
                fullWidth
                maxWidth="lg"
              >
                <Box sx={{ position: "relative" }}>
                  {/* Close Button */}
                  <IconButton
                    onClick={handleCloseModal}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "#fff",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      zIndex: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <QuoteForm
                    src="https://app.tintwiz.com/web/cs/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t"
                    width="100%"
                    height="800px"
                    loading="lazy"
                    style={{ border: "none" }}
                    title="Fast Quote"
                  ></QuoteForm>
                </Box>
              </Dialog>
      </Box>
    </motion.div>

    
  );
};

export default CallToAction;
