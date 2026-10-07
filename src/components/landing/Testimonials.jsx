import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Container,
  Button,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Google Reviews URL and logo
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/oUyTRQm7dfdzJmvy9";
const GOOGLE_LOGO = "/google-logo.webp";



const Testimonials = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // const response = await axios.get("http://localhost:5001/api/google-reviews");
        const response = await axios.get("https://tinttek-website-server.onrender.com/api/google-reviews");
        const formattedReviews = response.data.map((review) => ({
          author_name: review.author_name,
          profile_photo_url: review.profile_photo_url,
          rating: review.rating,
          time: review.time, // Google returns unix timestamp
          text: review.text,
        }));
        // If we get reviews, use them. Otherwise fallback or keep empty.
        // We'll just slice to take the top 5 most useful or recent if needed, 
        // but Google API usually returns 5 most helpful.
        if (formattedReviews.length > 0) {
          setReviews(formattedReviews);
        }
      } catch (error) {
        console.error("Failed to fetch Google reviews:", error);
        // Fallback to hardcoded reviews if API fails? 
        // For now, let's just keep the state empty or maybe initialize with hardcoded?
        // Let's initialize with hardcoded reviews as fallback implicitly if we don't set state.
      }
    };

    fetchReviews();
  }, []);




  // Parent container variant to stagger children animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // Adjust delay between each card's animation
      },
    },
  };

  // Individual card animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Box
      id="reviews"
      sx={{ py: isMobile ? 4 : 8, textAlign: "center", backgroundColor: "transparent" }}
    >
      {reviews.length > 0 && (
        <Container maxWidth="xl">
          <Typography
            variant={isMobile ? "h4" : "h2"}
            sx={{ mb: 4, fontWeight: "bold", color: "#fff" }}
          >
            User Reviews
          </Typography>

          {isMobile ? (
            // Mobile View - Swiper carousel
            <Swiper
              modules={[Pagination]}
              slidesPerView={1.1}
              centeredSlides={true}
              spaceBetween={16}
              pagination={{ clickable: true }}
              grabCursor={true}
              loop={false}
              style={{
                paddingBottom: "44px",
                "--swiper-pagination-color": "#2794d2",
                "--swiper-pagination-bullet-inactive-color": "rgba(255,255,255,0.35)",
                "--swiper-pagination-bullet-inactive-opacity": "1",
              }}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index} style={{ height: "auto" }}>
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    <CardContent
                      sx={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        "&:last-child": { pb: 2 },
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          width: 22,
                          height: 22,
                        }}
                      >
                        <img src={GOOGLE_LOGO} alt="Google" width="100%" loading="lazy" />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          sx={{ width: 40, height: 40, flexShrink: 0 }}
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          imgProps={{ loading: "lazy" }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{ fontWeight: "bold", fontSize: "0.9rem", lineHeight: 1.2 }}
                          >
                            {review.author_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                            {new Date(review.time * 1000).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Rating value={review.rating} precision={0.5} readOnly size="small" />

                      <Typography
                        variant="body2"
                        sx={{
                          fontStyle: "italic",
                          fontSize: "0.88rem",
                          lineHeight: 1.6,
                          display: "-webkit-box",
                          WebkitLineClamp: 7,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        "{review.text}"
                      </Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // Desktop View - Grid Layout with staggered animations
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "stretch",
                }}
              >
                {reviews.map((review, index) => (
                  <motion.div key={index} variants={cardVariants}>
                    <Card
                      sx={{
                        p: 3,
                        borderRadius: 6,
                        boxShadow: 3,
                        textAlign: "left",
                        height: 350, // Fixed height
                        maxHeight: 350, // Ensure it doesn't grow
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        backgroundColor: "#EEEEFF",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-10px) scale(1.03)",
                          boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          flex: "1 1 auto",
                          display: "flex",
                          flexDirection: "column",
                          pb: "24px !important", // Increase bottom padding
                          overflow: "hidden", // Constrain content
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            width: 25,
                            height: 25,
                          }}
                        >
                          <img src={GOOGLE_LOGO} alt="Google" width="100%" loading="lazy" />
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Avatar
                            sx={{ width: 40, height: 40, mr: 2 }}
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            imgProps={{ loading: "lazy" }}
                          />
                          <Box>
                            <Typography
                              variant="h6"
                              component="h3"
                              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                            >
                              {review.author_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(review.time * 1000).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>

                        <Rating
                          value={review.rating}
                          precision={0.5}
                          readOnly
                          sx={{ mb: 1 }}
                        />

                        <Typography
                          variant="body2"
                          sx={{
                            fontStyle: "italic",
                            fontSize: "0.9rem",
                            lineHeight: 1.5,
                            flex: 1, // Take remaining space
                            minHeight: 0, // Allow shrinking for scroll
                            overflowY: "auto",
                            pr: 1,
                            "&::-webkit-scrollbar": {
                              width: "6px",
                            },
                            "&::-webkit-scrollbar-track": {
                              background: "#f1f1f1",
                              borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              background: "#888",
                              borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                              background: "#555",
                            },
                          }}
                        >
                          "{review.text}"
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          )}
          <Button
            component={motion.a}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            sx={{
              mt: 5,
              backgroundColor: "#2794d2",
              color: "#000",
              fontWeight: "bold",
              px: isMobile ? 3 : 4,
              py: isMobile ? 1.2 : 1.5,
              borderRadius: "30px",
              textTransform: "uppercase",
              fontSize: isMobile ? "1rem" : "1.1rem",
              width: isMobile ? "80%" : "auto",
            }}
            href={GOOGLE_REVIEWS_URL}
            target="_blank" rel="noopener noreferrer"
          >
            VIEW MORE REVIEWS
          </Button>
        </Container>
      )}
      {reviews.length === 0 && (
        <Container maxWidth="xl">
          <Typography variant="body1" sx={{ color: "white" }}>
            Loading reviews...
          </Typography>
        </Container>
      )}
    </Box>
  );
};

export default Testimonials;
