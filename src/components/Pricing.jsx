// src/components/Pricing.jsx
// Apple-style pricing for the services pages: a pill segmented control for the
// vehicle / size options and equal-height tier cards. Pure-CSS responsive
// layout (no JS media queries); all prices stay in the HTML for SEO.
import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Container, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useLocation } from "react-router-dom";

// Pricing Data Configuration
const pricingConfig = {
  "vehicle-window-tinting": {
    title: "Vehicle Window Tinting Pricing",
    pricingData: {
      COUPE: {
        CLASSIC: "$199.00",
        CTX: "$289.00",
        PINNACLE: "$389.00",
        STRATOS: "$689.00",
      },
      SEDAN: {
        CLASSIC: "$229.00",
        CTX: "$329.00",
        PINNACLE: "$529.00",
        STRATOS: "$729.00",
      },
      TRUCK: {
        CLASSIC: "$249.00",
        CTX: "$349.00",
        PINNACLE: "$549.00",
        STRATOS: "$769.00",
      },
      "FULL SUV": {
        CLASSIC: "$289.00",
        CTX: "$389.00",
        PINNACLE: "$589.00",
        STRATOS: "$849.00",
      },
      "2 WINDOWS": {
        CLASSIC: "$85.00",
        CTX: "$119.00",
        PINNACLE: "$149.00",
        STRATOS: "$199.00",
      },
    },
    pricingOptions: ["COUPE", "SEDAN", "TRUCK", "FULL SUV", "2 WINDOWS"],
    descriptions: {
      CLASSIC: [
        "Budget-friendly dyed tint",
        "Blocks 99% of UV rays",
        "Adds privacy & reduces glare",
      ],
      CTX: [
        "Ceramic automotive tint",
        "99% UV ray block",
        "Reduces heat from sun",
      ],
      PINNACLE: [
        "Nano-ceramic construction",
        "Best heat reduction",
        "Superior clarity & comfort",
      ],
      STRATOS: [
        "Flagship nano-ceramic tint",
        "Maximum heat & IR rejection",
        "Darkest clarity-first finish",
      ],
    },
  },
  "tesla-window-tinting": {
    title: "Tesla Window Tinting Pricing",
    pricingData: {
      "MODEL S": { CTX: "$329.00", PINNACLE: "$529.00" },
      "MODEL 3": { CTX: "$449.00", PINNACLE: "$589.00" },
      "MODEL X": { CTX: "$589.00", PINNACLE: "$749.00" },
      "MODEL Y": { CTX: "$389.00", PINNACLE: "$589.00" },
      "CYBER TRUCK": { CTX: "$485.00", PINNACLE: "$685.00" },
    },
    pricingOptions: ["MODEL S", "MODEL 3", "MODEL X", "MODEL Y", "CYBER TRUCK"],
    descriptions: {
      CTX: [
        "Mid-range ceramic tint",
        "Superior heat rejection",
        "99% UV ray protection",
      ],
      PINNACLE: [
        "Premium nano-ceramic tint",
        "Best clarity & heat reduction",
        "Advanced infrared blocking",
      ],
    },
  },
  "commercial-window-tinting": {
    title: "Commercial Window Tinting Pricing",
    pricingData: {
      "SMALL OFFICE": { BASIC: "$299.00", PRO: "$399.00", ULTRA: "$499.00" },
      "LARGE BUILDING": { BASIC: "$499.00", PRO: "$699.00", ULTRA: "$899.00" },
    },
    pricingOptions: ["SMALL OFFICE", "LARGE BUILDING"],
    descriptions: {
      BASIC: [
        "Standard tinting for offices",
        "Blocks UV rays & reduces glare",
        "Affordable pricing",
      ],
      PRO: [
        "Improved heat rejection",
        "Enhanced privacy & security",
        "Energy-efficient",
      ],
      ULTRA: [
        "High-end commercial film",
        "Best sun protection",
        "Long-lasting durability",
      ],
    },
  },
  "residential-window-tinting": {
    title: "Residential Window Tinting Pricing",
    pricingData: {
      "1-5 WINDOWS": { BASIC: "$199.00", PRO: "$299.00", ULTRA: "$399.00" },
      "6+ WINDOWS": { BASIC: "$349.00", PRO: "$499.00", ULTRA: "$649.00" },
    },
    pricingOptions: ["1-5 WINDOWS", "6+ WINDOWS"],
    descriptions: {
      BASIC: ["Basic home tinting", "Blocks harmful UV rays", "Reduces glare"],
      PRO: ["Better heat rejection", "Improved privacy", "3-year warranty"],
      ULTRA: [
        "Premium tint with superior clarity",
        "Highest heat & glare reduction",
        "Lifetime warranty",
      ],
    },
  },
  "vehicle-paint-correction": {
    title: "Paint Correction Pricing",
    pricingData: {
      "STAGE 1": { BASIC: "$249.00", PRO: "$349.00", ULTRA: "$449.00" },
      "STAGE 2": { BASIC: "$349.00", PRO: "$449.00", ULTRA: "$549.00" },
    },
    pricingOptions: ["STAGE 1", "STAGE 2"],
    descriptions: {
      BASIC: [
        "Light paint correction",
        "Removes minor scrCLASSIChes",
        "Enhances gloss",
      ],
      PRO: [
        "Moderate paint correction",
        "Eliminates swirl marks",
        "Deep shine restoration",
      ],
      ULTRA: [
        "Advanced correction",
        "Removes heavy imperfections",
        "Superior clarity & shine",
      ],
    },
  },
  "vehicle-paint-protection": {
    title: "Paint Protection Pricing",
    pricingData: {
      HOOD: { BASIC: "$199.00", PRO: "$299.00", ULTRA: "$399.00" },
      "FULL BODY": { BASIC: "$999.00", PRO: "$1299.00", ULTRA: "$1599.00" },
    },
    pricingOptions: ["HOOD", "FULL BODY"],
    descriptions: {
      BASIC: [
        "Basic paint protection film",
        "Prevents minor scrCLASSIChes",
        "1-year warranty",
      ],
      PRO: [
        "Mid-tier protection film",
        "Better durability & shine",
        "3-year warranty",
      ],
      ULTRA: [
        "Premium self-healing PPF",
        "Best scrCLASSICh resistance",
        "5-year warranty",
      ],
    },
  },
};

const ACCENT = "#4db8f0";
const EASE = "cubic-bezier(.25,.1,.25,1)";

// "FULL SUV" → "Full SUV", "MODEL 3" → "Model 3", "PINNACLE" → "Pinnacle", "CTX" stays "CTX"
const pretty = (label) =>
  label
    .split(" ")
    .map((w) => (w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");

/**
 * Reusable pricing block. `service` = { title, pricingOptions, pricingData,
 * descriptions }. The option selector only shows when there is more than one
 * option (e.g. a single Tesla model page shows just its tiers). `resetKey`
 * resets the selection when the page/route changes.
 */
export function PricingSection({ service, resetKey = "" }) {
  const path = resetKey;
  const [selected, setSelected] = useState({ path, option: service.pricingOptions[0] });
  // Reset to the first option when navigating to another page
  const selectedOption =
    selected.path === path && service.pricingOptions.includes(selected.option)
      ? selected.option
      : service.pricingOptions[0];
  const showSelector = service.pricingOptions.length > 1;

  const tiers = Object.keys(service.descriptions);
  const tierCols = Math.min(tiers.length, 4);

  return (
    <Box
      component="section"
      id="pricing"
      aria-labelledby="pricing-heading"
      sx={{ py: { xs: 8, md: 14 } }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: "center", maxWidth: 860, mx: "auto", mb: { xs: 4, md: 5 } }}>
          <Typography
            id="pricing-heading"
            component="h2"
            sx={{
              color: "#f5f5f7",
              fontWeight: 700,
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.5rem" },
              lineHeight: 1.07,
              letterSpacing: "-0.025em",
              mb: { xs: 1.5, md: 2 },
            }}
          >
            {service.title}
          </Typography>
          <Typography
            sx={{ color: "rgba(245,245,247,0.62)", fontSize: { xs: "1rem", md: "1.15rem" }, lineHeight: 1.5 }}
          >
            All Side Windows and Back Glass are Included in Standard Package
          </Typography>
        </Box>

        {showSelector && (
          /* Segmented control — scrolls sideways on narrow phones */
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "center" },
            overflowX: "auto",
            mx: { xs: -2, sm: 0 },
            px: { xs: 2, sm: 0 },
            mb: { xs: 3, md: 5 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box
            role="group"
            aria-label="Choose your vehicle"
            sx={{
              display: "inline-flex",
              flexShrink: 0,
              gap: 0.5,
              p: 0.5,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            {service.pricingOptions.map((option) => {
              const active = option === selectedOption;
              return (
                <Box
                  key={option}
                  component="button"
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected({ path, option })}
                  sx={{
                    border: 0,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    px: { xs: 2, md: 2.75 },
                    py: 1.1,
                    borderRadius: 999,
                    fontFamily: "inherit",
                    fontSize: { xs: "0.92rem", md: "0.98rem" },
                    fontWeight: active ? 600 : 500,
                    color: active ? "#0b0b0c" : "rgba(245,245,247,0.8)",
                    backgroundColor: active ? "#f5f5f7" : "transparent",
                    transition: `background-color .3s ${EASE}, color .3s ${EASE}`,
                    "&:hover": { color: active ? "#0b0b0c" : "#fff" },
                    "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 2 },
                  }}
                >
                  {pretty(option)}
                </Box>
              );
            })}
          </Box>
        </Box>
        )}

        {/* Tier cards: swipe row on phones; equal-height grid on tablet+ */}
        <Box
          aria-live="polite"
          sx={{
            display: { xs: "flex", sm: "grid" },
            gridTemplateColumns: {
              sm: `repeat(${Math.min(tierCols, 2)}, 1fr)`,
              md: `repeat(${tierCols}, 1fr)`,
            },
            gridAutoRows: { sm: "1fr" },
            alignItems: "stretch",
            maxWidth: tierCols <= 2 ? 820 : "none",
            mx: { xs: -2, sm: "auto" },
            px: { xs: 2, sm: 0 },
            gap: { xs: 1.5, md: 2.5 },
            overflowX: { xs: "auto", sm: "visible" },
            scrollSnapType: { xs: "x mandatory", sm: "none" },
            scrollPaddingInline: { xs: "16px", sm: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {tiers.map((tier) => (
            <Box
              key={tier}
              component="article"
              sx={{
                flex: { xs: "0 0 78%", sm: "initial" },
                scrollSnapAlign: { xs: "start", sm: "none" },
                display: "flex",
                flexDirection: "column",
                p: { xs: 3.5, md: 4 },
                borderRadius: { xs: "24px", md: "28px" },
                backgroundColor: "rgba(255,255,255,0.045)",
              }}
            >
              <Typography
                component="h3"
                sx={{
                  color: "#f5f5f7",
                  fontWeight: 700,
                  fontSize: { xs: "1.35rem", md: "1.45rem" },
                  letterSpacing: "-0.015em",
                }}
              >
                {pretty(tier)}
              </Typography>

              {/* Re-keyed on change so the new price fades in */}
              <Typography
                key={selectedOption}
                sx={{
                  mt: 1.5,
                  color: "#f5f5f7",
                  fontWeight: 600,
                  fontSize: { xs: "2.2rem", md: "2.6rem" },
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  fontVariantNumeric: "tabular-nums",
                  "@keyframes priceIn": {
                    from: { opacity: 0, transform: "translateY(6px)" },
                    to: { opacity: 1, transform: "none" },
                  },
                  animation: `priceIn .45s ${EASE}`,
                  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                }}
              >
                {service.pricingData[selectedOption]?.[tier] || "N/A"}
              </Typography>

              <Box sx={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", my: 3 }} />

              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "grid", gap: 1.5 }}>
                {service.descriptions[tier].map((feature) => (
                  <Box
                    component="li"
                    key={feature}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.25,
                      color: "rgba(245,245,247,0.78)",
                      fontSize: "0.98rem",
                      lineHeight: 1.45,
                    }}
                  >
                    <CheckRoundedIcon aria-hidden="true" sx={{ fontSize: 20, color: ACCENT, mt: "1px" }} />
                    {feature}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

PricingSection.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.node.isRequired,
    pricingOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    pricingData: PropTypes.object.isRequired,
    descriptions: PropTypes.object.isRequired,
  }).isRequired,
  resetKey: PropTypes.string,
};

// Tesla model pages (/tesla/:model): one model's CTX / Pinnacle prices with the
// same tier features as the Tesla services page — no selector (single option).
export function TeslaModelPricing({ model }) {
  if (!model.pricing) return null;
  const service = {
    title: `${model.displayName} Window Tinting Pricing`,
    pricingOptions: [model.displayName],
    pricingData: { [model.displayName]: model.pricing },
    descriptions: pricingConfig["tesla-window-tinting"].descriptions,
  };
  return <PricingSection service={service} resetKey={model.slug} />;
}

TeslaModelPricing.propTypes = {
  model: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    pricing: PropTypes.object,
  }).isRequired,
};

// Services pages: pick the config from the URL (/services/<id>)
const PricingComponent = () => {
  const location = useLocation();
  const path = location.pathname.split("/").pop();
  const service = pricingConfig[path] || pricingConfig["vehicle-window-tinting"];
  return <PricingSection service={service} resetKey={path} />;
};

export default PricingComponent;
