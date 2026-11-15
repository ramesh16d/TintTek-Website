// src/components/PaintCorrectionServices.jsx
// Apple-style "compare the models" layout for the paint correction stages:
// all three stages side by side in equal-height columns (swipe row on
// phones), so every stage's copy is visible and in the HTML. No tabs,
// dropdowns, or JS media queries.
import PropTypes from "prop-types";
import { Box, Container, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const stages = [
  {
    label: "Single-Stage Correction",
    Icon: BuildCircleIcon,
    description:
      "Involves polishing the paint with a single level of abrasiveness to remove light imperfections.",
    whatToExpect: [
      "Removes light swirl marks, water spots, and minor scratches.",
      "Restores 60-70% of your car's original clarity and gloss, leaving a sleek, refreshed look.",
      "Ideal for newer cars or those with only minor imperfections.",
    ],
    perfectFor: [
      "Quick, budget-friendly improvements without the need for an intensive restoration.",
    ],
    color: "#2794d2",
    gradientColor: "linear-gradient(90deg, #1976d2 0%, #2794d2 100%)",
    intensity: 1,
  },
  {
    label: "Two-Stage Correction",
    Icon: SettingsIcon,
    description:
      "Combines compounding and polishing to address moderate imperfections, offering a balance between effectiveness and efficiency.",
    whatToExpect: [
      "Erases moderate swirl marks, scratches, and oxidation.",
      "Restores 80-90% of your vehicle's original finish, with a deep, glossy appearance.",
      "Ideal for cars with clear coat damage or slightly worn finishes.",
    ],
    perfectFor: [
      "Drivers who want a significant improvement, with enhanced clarity and shine, without a complete overhaul.",
    ],
    color: "#2794d2",
    gradientColor: "linear-gradient(90deg, #1976d2 0%, #2794d2 100%)",
    intensity: 2,
  },
  {
    label: "Three-Stage Correction",
    Icon: WorkspacePremiumIcon,
    description:
      "Incorporates compounding, polishing, and finishing to tackle severe paint defects, resulting in a pristine finish.",
    whatToExpect: [
      "Completely removes deep scratches, swirl marks, oxidation, and other severe imperfections.",
      "Restores 95-100% of your car's original paintwork, delivering a flawless, showroom-quality finish.",
      "Perfect for vehicles that have suffered from long-term damage or heavy wear.",
    ],
    perfectFor: [
      "Car enthusiasts and those looking for a premium, high-end finish that turns heads wherever you go. Ideally for show cars, we do not recommend this for everyday vehicles.",
    ],
    color: "#2794d2",
    gradientColor: "linear-gradient(90deg, #1976d2 0%, #2794d2 100%)",
    intensity: 3,
  },
];

const ACCENT = "#4db8f0";
const MAX_INTENSITY = 3;

const IntensityMeter = ({ level }) => (
  <Box
    role="img"
    aria-label={`Correction intensity ${level} of ${MAX_INTENSITY}`}
    sx={{ display: "flex", gap: 0.75 }}
  >
    {Array.from({ length: MAX_INTENSITY }, (_, i) => (
      <Box
        key={i}
        sx={{
          width: 28,
          height: 4,
          borderRadius: 999,
          backgroundColor: i < level ? ACCENT : "rgba(255,255,255,0.14)",
        }}
      />
    ))}
  </Box>
);

IntensityMeter.propTypes = { level: PropTypes.number.isRequired };

const FeatureList = ({ heading, items }) => (
  <Box>
    <Typography
      component="h4"
      sx={{
        color: "rgba(245,245,247,0.5)",
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        mb: 1.5,
      }}
    >
      {heading}
    </Typography>
    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "grid", gap: 1.5 }}>
      {items.map((item) => (
        <Box
          component="li"
          key={item}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.25,
            color: "rgba(245,245,247,0.78)",
            fontSize: "0.98rem",
            lineHeight: 1.5,
          }}
        >
          <CheckRoundedIcon aria-hidden="true" sx={{ fontSize: 20, color: ACCENT, mt: "1px", flexShrink: 0 }} />
          {item}
        </Box>
      ))}
    </Box>
  </Box>
);

FeatureList.propTypes = {
  heading: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function PaintCorrectionTabs() {
  return (
    <Box component="section" aria-labelledby="pc-stages-heading" sx={{ py: { xs: 8, md: 14 } }}>
      <Container maxWidth="lg">
        <Typography
          id="pc-stages-heading"
          component="h2"
          sx={{
            color: "#f5f5f7",
            fontWeight: 700,
            fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.5rem" },
            lineHeight: 1.07,
            letterSpacing: "-0.025em",
            textAlign: "center",
            mb: { xs: 5, md: 8 },
          }}
        >
          Paint Correction Stages
        </Typography>

        {/* Swipe row on phones/tablets; equal-height 3-column comparison on desktop */}
        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: { md: `repeat(${stages.length}, 1fr)` },
            alignItems: "stretch",
            gap: { xs: 1.5, md: 2.5 },
            overflowX: { xs: "auto", md: "visible" },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            scrollPaddingInline: { xs: "16px", sm: "24px", md: 0 },
            mx: { xs: -2, sm: -3, md: 0 },
            px: { xs: 2, sm: 3, md: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {stages.map((stage) => {
            const { Icon } = stage;
            return (
              <Box
                key={stage.label}
                component="article"
                sx={{
                  flex: { xs: "0 0 84%", sm: "0 0 58%", md: "initial" },
                  scrollSnapAlign: { xs: "start", md: "none" },
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  p: { xs: 3.5, md: 4 },
                  borderRadius: { xs: "24px", md: "28px" },
                  backgroundColor: "rgba(255,255,255,0.045)",
                }}
              >
                {/* Header */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <IntensityMeter level={stage.intensity} />
                    {Icon && <Icon aria-hidden="true" sx={{ fontSize: 30, color: "rgba(245,245,247,0.55)" }} />}
                  </Box>
                  <Typography
                    component="h3"
                    sx={{
                      color: "#f5f5f7",
                      fontWeight: 700,
                      fontSize: { xs: "1.5rem", md: "1.65rem" },
                      lineHeight: 1.12,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stage.label}
                  </Typography>
                  <Typography sx={{ color: "rgba(245,245,247,0.62)", fontSize: "1rem", lineHeight: 1.6 }}>
                    {stage.description}
                  </Typography>
                </Box>

                <Box sx={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />

                <FeatureList heading="What to Expect" items={stage.whatToExpect} />

                {/* Pinned to the bottom so "Perfect For" lines up across columns */}
                <Box sx={{ mt: "auto" }}>
                  <FeatureList heading="Perfect For" items={stage.perfectFor} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
