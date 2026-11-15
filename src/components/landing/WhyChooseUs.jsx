// src/components/landing/WhyChooseUs.jsx
// Apple-style "Why Choose Us?" for the home page: large heading, muted intro,
// and six equal-height feature tiles with every explanation visible (and in
// the prerendered HTML) instead of hidden behind hover. Pure-CSS layout.
import PropTypes from "prop-types";
import { Box, Container, Typography } from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

const ACCENT = "#4db8f0";
const EASE = "cubic-bezier(.25,.1,.25,1)";

const features = [
  { Icon: WbSunnyOutlinedIcon, text: "UV Protection", details: "Our top-quality window films block up to 99% of harmful UV rays, providing crucial protection against skin damage and reducing the risk of skin cancer. Not only does this safeguard you and your passengers, but it also helps preserve your car's interior by preventing fading, cracking, and deterioration." },
  { Icon: ThermostatOutlinedIcon, text: "Heat & Glare Reduction", details: "Enjoy a more comfortable drive with our heat-rejecting films. By significantly reducing solar heat, we help keep your car cooler, even on the hottest Texas days. Our films also reduce glare from the sun and headlights, improving visibility and reducing eye strain, making every drive safer and more enjoyable." },
  { Icon: VerifiedOutlinedIcon, text: "Certified Technicians", details: "Our team of certified technicians brings years of experience to every job. We adhere to the highest industry standards to ensure each installation is flawless, with a seamless finish that prevents bubbles, peeling, or imperfections. Your satisfaction and the durability of the tint are our top priorities." },
  { Icon: WorkspacePremiumOutlinedIcon, text: "Premium Quality", details: "We offer premium films made in the USA, which are rigorously tested by third-party organizations to guarantee the highest levels of clarity, performance, and durability. Our films deliver the heat rejection and UV protection we promise, ensuring that you get exactly what you expect." },
  { Icon: TuneOutlinedIcon, text: "Custom Tint Options", details: "Choose from a variety of tint shades and finishes to suit your style. Whether you prefer a subtle, sleek look or a bold, dark tint, we provide the flexibility to achieve the perfect aesthetic for your vehicle." },
  { Icon: ShieldOutlinedIcon, text: "Privacy & Security", details: "Tinting your windows adds an extra layer of privacy and security, blocking prying eyes and protecting your valuables. Our films also help strengthen your glass, providing additional protection against break-ins and enhancing your overall safety." },
];

function FeatureTile({ feature }) {
  const { Icon } = feature;
  return (
    <Box
      component="article"
      sx={{
        // Phones: swipe row with a peek of the next tile; tablet+: grid cell
        flex: { xs: "0 0 82%", sm: "initial" },
        scrollSnapAlign: { xs: "start", sm: "none" },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: { xs: 3.5, md: 4 },
        borderRadius: { xs: "24px", md: "28px" },
        backgroundColor: "rgba(255,255,255,0.045)",
        textAlign: "left",
        transition: `background-color .3s ${EASE}`,
        "@media (hover: hover)": {
          "&:hover": { backgroundColor: "rgba(255,255,255,0.07)" },
        },
      }}
    >
      <Icon aria-hidden="true" sx={{ fontSize: { xs: 34, md: 40 }, color: ACCENT }} />
      <Typography
        component="h3"
        sx={{
          color: "#f5f5f7",
          fontWeight: 700,
          fontSize: { xs: "1.3rem", md: "1.45rem" },
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
        }}
      >
        {feature.text}
      </Typography>
      <Typography sx={{ color: "rgba(245,245,247,0.62)", fontSize: { xs: "0.98rem", md: "1.02rem" }, lineHeight: 1.6 }}>
        {feature.details}
      </Typography>
    </Box>
  );
}

FeatureTile.propTypes = {
  feature: PropTypes.shape({
    Icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
};

export default function WhyChooseUs() {
  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="why-choose-us-heading"
      sx={{ py: { xs: 8, md: 14 }, isolation: "isolate" }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: "center", maxWidth: 860, mx: "auto", mb: { xs: 5, md: 8 } }}>
          <Typography
            id="why-choose-us-heading"
            component="h2"
            sx={{
              color: "#f5f5f7",
              fontWeight: 700,
              fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4rem" },
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              mb: { xs: 2, md: 3 },
            }}
          >
            Why Choose Us?
          </Typography>
          <Typography
            sx={{
              color: "rgba(245,245,247,0.62)",
              fontSize: { xs: "1.05rem", md: "1.25rem" },
              lineHeight: 1.55,
              textWrap: "pretty",
            }}
          >
            At Tint Tek Plus, we are committed to offering premium window tinting that combines style, comfort, and superior protection.
            Our expert-grade films are designed to block 99% of harmful UV rays, reduce glare, and keep your car cooler, ensuring an unmatched driving experience.
            With certified technicians and a lifetime warranty, we promise top-tier quality and service every time, giving you peace of mind and confidence on the road.
          </Typography>
        </Box>

        {/* Tiles: swipe row on phones; equal-height grid (2 cols tablet, 3 desktop) */}
        <Box
          sx={{
            display: { xs: "flex", sm: "grid" },
            gridTemplateColumns: { sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gridAutoRows: { sm: "1fr" },
            alignItems: "stretch",
            gap: { xs: 1.5, md: 2.5 },
            overflowX: { xs: "auto", sm: "visible" },
            scrollSnapType: { xs: "x mandatory", sm: "none" },
            scrollPaddingInline: { xs: "16px", sm: 0 },
            mx: { xs: -2, sm: 0 },
            px: { xs: 2, sm: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {features.map((f) => (
            <FeatureTile key={f.text} feature={f} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
