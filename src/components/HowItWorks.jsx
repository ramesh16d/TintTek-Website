// src/components/HowItWorks.jsx
// Apple-style "How it works" for the services pages: numbered step tiles with
// a "+" disclosure for the longer explanation (kept in the HTML for SEO),
// followed by rounded process photos. Layout is pure CSS — no JS media
// queries, no dialog, no GlobalStyles overrides.
import { useId, useState } from "react";
import PropTypes from "prop-types";
import { Box, Container, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GppGoodIcon from "@mui/icons-material/GppGood";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import LayersIcon from "@mui/icons-material/Layers";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

/* --------------------------------- Data --------------------------------- */
const serviceSteps = {
  "vehicle-window-tinting": {
    title: "Vehicle Window Tinting",
    steps: [
      {
        title: "Consultation & Customization",
        description: "We clean the car windows to remove any dirt, dust, or debris.",
        detailedDescription:
          "We start with a quick consultation to understand your specific needs and recommend the best tinting solutions for your vehicle, home, or business. Whether you're looking to reduce heat, enhance privacy, or protect your investment, we tailor our services to meet your goals.",
        Icon: BuildIcon,
      },
      {
        title: "Installation Process",
        description: "We measure and cut the tint film to fit perfectly.",
        detailedDescription:
          "The process begins with a thorough cleaning of your windows to remove dirt, dust, and debris, ensuring a smooth, clean surface for tint application. We protect your vehicle’s interior by covering the seats and trim. We use the latest equipment and technology to cut the tint to fit each window. The film is then carefully applied to the inside of the glass, ensuring a smooth finish.",
        Icon: ContentCutIcon,
      },
      {
        title: "Curing & Inspection",
        description: "The film is applied and smoothed with a squeegee.",
        detailedDescription:
          "After installation, we allow the tint to cure properly, ensuring it adheres securely to the glass for long-lasting results. We perform a final inspection to make sure the installation is close to flawless, minimizing bubbles and imperfections. Curing time for window tint typically takes 3-5 days.",
        Icon: LayersIcon,
      },
      {
        title: "Enjoy the Benefits",
        description: "The tint is allowed to dry for long-lasting adhesion.",
        detailedDescription:
          "Once the curing process is complete, enjoy enhanced comfort, privacy, and protection with your newly tinted windows. With long-lasting results, your vehicle will remain cooler, more comfortable, and better protected from harmful UV rays and heat.",
        Icon: CheckCircleIcon,
      },
    ],
    finalDescription:
      "Car window tinting provides many positive benefits such as protecting you from the sun, increasing privacy, and improving the look and style of your vehicle. So how exactly does car window tint get applied? There are four main steps we follow:",
    images: ["/gallery/Tint Tek-6.webp", "/gallery/Tint Tek-46.webp", "/gallery/Tint Tek-102.webp"],
  },
  "tesla-window-tinting": {
    title: "Tesla Window Tinting",
    steps: [
      {
        title: "Preparation",
        description: "We clean the car windows thoroughly to remove any dirt, dust, or debris.",
        detailedDescription:
          "We start by cleaning the windows thoroughly to remove any dirt, dust, or debris that could interfere with the tinting process. This ensures a clean surface for the film to adhere to.",
        Icon: BuildIcon,
      },
      {
        title: "Custom Cutting",
        description: "We then measure and cut the tint film to match the size and shape of each window.",
        detailedDescription:
          "Using precision plotter templates, we accurately measure and computer-cut the ceramic tint film specifically for your Tesla model's unique glass dimensions, ensuring a seamless fit without blade contact on your vehicle.",
        Icon: ContentCutIcon,
      },
      {
        title: "Precision Application",
        description: "We apply the film to the inside of the window, using a squeegee to smooth out any bubbles or wrinkles.",
        detailedDescription:
          "We carefully apply the cut film to the interior surface of the glass. Using specialized squeegees, our technicians meticulously extract the mounting solution to eliminate any air bubbles and guarantee a flush, uniform installation.",
        Icon: LayersIcon,
      },
      {
        title: "Drying and Setting",
        description: "Then we allow the film to dry and set, ensuring a secure and long-lasting bond to the window.",
        detailedDescription:
          "The newly applied film is allowed to cure and set. We wipe down the interior and perform a final quality inspection to ensure the tint perfectly adheres to the glass edges before handing the keys back to you.",
        Icon: CheckCircleIcon,
      },
    ],
    finalDescription:
      "Tinting your entire Tesla is essential to shield yourself from harmful UV rays, including applying a clear film to the windshield. Car window tinting offers numerous benefits, such as sun protection, enhanced privacy, and an improved aesthetic for your vehicle. But how is car window tint applied to your Tesla? Here are the four main steps we follow:",
    images: ["/tesla/tesla3.webp", "/gallery/Tint Tek-170-2.webp", "/tesla/tesla2.webp"],
  },
  "commercial-window-tinting": {
    title: "Commercial Window Tinting",
    steps: [
      {
        title: "Initial Consultation",
        description: "We assess your commercial space to recommend the best tinting solutions.",
        detailedDescription:
          "We start by cleaning the windows thoroughly to remove any dirt, dust, or debris that could interfere with the tinting process. This ensures a clean surface for the film to adhere to.",
        Icon: BuildIcon,
      },
      {
        title: "Surface Preparation",
        description: "All glass surfaces are thoroughly cleaned to ensure optimal adhesion.",
        detailedDescription:
          "We start by cleaning the windows thoroughly to remove any dirt, dust, or debris that could interfere with the tinting process. This ensures a clean surface for the film to adhere to.",
        Icon: ContentCutIcon,
      },
      {
        title: "Tint Installation",
        description: "We apply high-quality commercial-grade films with precision.",
        detailedDescription:
          "We start by cleaning the windows thoroughly to remove any dirt, dust, or debris that could interfere with the tinting process. This ensures a clean surface for the film to adhere to.",
        Icon: LayersIcon,
      },
      {
        title: "Inspection & Final Touches",
        description: "Final quality checks ensure a flawless, professional finish.",
        detailedDescription:
          "We start by cleaning the windows thoroughly to remove any dirt, dust, or debris that could interfere with the tinting process. This ensures a clean surface for the film to adhere to.",
        Icon: CheckCircleIcon,
      },
    ],
    finalDescription: "",
    images: ["/commercial-tint1.webp", "/commercial-tint2.webp", "/commercial-tint3.webp"],
  },
  "residential-window-tinting": {
    title: "Residential Window Tinting",
    steps: [
      {
        title: "Consultation",
        description: "We discuss your needs and recommend the right film for your home.",
        detailedDescription:
          "We start by cleaning the windows thoroughly to remove any dirt, dust, or debris that could interfere with the tinting process. This ensures a clean surface for the film to adhere to.",
        Icon: BuildIcon,
      },
      {
        title: "Measurement & Cutting",
        description: "Window measurements are taken, and films are custom cut for a perfect fit.",
        detailedDescription:
          "We start by cleaning the windows thoroughly to remove any dirt, dust, or debris that could interfere with the tinting process. This ensures a clean surface for the film to adhere to.",
        Icon: ContentCutIcon,
      },
      {
        title: "Film Application",
        description: "We apply the tint smoothly to avoid bubbles and creases.",
        detailedDescription:
          "We start by cleaning the windows thoroughly to remove any dirt, dust, or debris that could interfere with the tinting process. This ensures a clean surface for the film to adhere to.",
        Icon: LayersIcon,
      },
      {
        title: "Final Inspection",
        description: "We ensure all windows meet our high-quality standards before completion.",
        detailedDescription:
          "We start by cleaning the windows thoroughly to remove any dirt, dust, or debris that could interfere with the tinting process. This ensures a clean surface for the film to adhere to.",
        Icon: CheckCircleIcon,
      },
    ],
    finalDescription: "",
    images: ["/residential-tint1.webp", "/residential-tint2.webp", "/residential-tint3.webp"],
  },
  "vehicle-paint-correction": {
    title: "Vehicle Paint Correction",
    steps: [
      {
        title: "Decontamination",
        description:
          "Removing surface contaminants allows us to safely polish the paint without scratching or further damaging the clear coat.",
        detailedDescription:
          "We begin by thoroughly washing and claying your vehicle to remove any dirt, dust, tar, or other contaminants on the surface. This ensures that the paint is clean and smooth before we begin the correction process.",
        iconSrc: "/paint-correction/decontamination.webp",
      },
      {
        title: "Compounding",
        description:
          "Compounding eliminates the top layer of damaged paint to reveal a smooth, more uniform surface.",
        detailedDescription:
          "Using a machine polisher and a specially formulated cutting compound, we remove deeper imperfections such as swirl marks, scratches, and oxidation by gently leveling the surface of the paint.",
        iconSrc: "/paint-correction/compounding.webp",
      },
      {
        title: "Polishing",
        description:
          "Polishing restores the glossy, high-shine finish your car deserves, bringing out the richness and vibrancy of the paint.",
        detailedDescription:
          "After compounding, we use a finer polishing compound with a softer pad to refine the finish. This step removes any haze left behind from the compounding process and enhances the clarity and depth of the paint.",
        iconSrc: "/paint-correction/polishing.webp",
      },
      {
        title: "Finishing",
        description:
          "This process gives the paint a deep, rich gloss, ensuring your car looks like it just rolled off the showroom floor.",
        detailedDescription:
          "For the ultimate shine, we apply a finishing polish with a soft pad. This step refines the paint even further, creating a mirror-like, flawless finish.",
        iconSrc: "/paint-correction/finishing.webp",
      },
    ],
    finalDescription:
      "Vehicle paint correction is a process used to restore and enhance the appearance of your cars paint to restore it to looking brand new. There are 4 major steps involved:",
    images: ["/paint-correction1.webp", "/paint-correction2.webp", "/paint-correction3.webp"],
  },
  "headlight-services": {
    title: "Headlight Services",
    steps: [
      {
        title: "Consultation",
        description: "Discuss your desired tint tone and assess your vehicle's lighting.",
        detailedDescription: "tbd",
        Icon: SupportAgentIcon,
      },
      {
        title: "Preparation",
        description: "Clean the headlight and taillight surfaces to ensure optimal adhesion.",
        detailedDescription: "tbd",
        Icon: CleaningServicesIcon,
      },
      {
        title: "Application",
        description: "Carefully apply the chosen STEK LPF, ensuring a smooth and bubble-free finish.",
        detailedDescription: "tbd",
        Icon: PrecisionManufacturingIcon,
      },
      {
        title: "Curing",
        description: "Allow the film to set, ensuring durability and longevity.",
        detailedDescription: "tbd",
        Icon: HourglassTopIcon,
      },
    ],
    finalDescription:
      "The PPF application process at TintTekPlus is thorough and precise to ensure optimal protection for your vehicle. Here’s how we do it:",
    images: ["/headlight/headlight1.webp", "/headlight/headlight2.webp", "/headlight/headlight3.webp"],
  },
  "vehicle-paint-protection": {
    title: "Vehicle Paint Protection",
    steps: [
      {
        title: "Consultation & Assesment",
        description:
          "We begin by cleaning and preparing your vehicle’s surface to ensure a smooth, contaminant-free application.",
        detailedDescription: "TBD",
        Icon: SupportAgentIcon,
      },
      {
        title: "Preparation",
        description:
          "Our experts apply the clear bra or vinyl wrap, creating an invisible layer that protects your car from scratches, chips, and other damages.",
        detailedDescription: "TBD",
        Icon: CleaningServicesIcon,
      },
      {
        title: "Installation",
        description:
          "We conduct a meticulous inspection to ensure every inch of the film is perfectly applied and the protection is flawless.",
        detailedDescription: "TBD",
        Icon: PrecisionManufacturingIcon,
      },
      {
        title: "Curing",
        description:
          "We conduct a meticulous inspection to ensure every inch of the film is perfectly applied and the protection is flawless.",
        detailedDescription: "TBD",
        Icon: HourglassTopIcon,
      },
      {
        title: "Final Inspection",
        description:
          "We conduct a thorough inspection to confirm that the PPF has been applied flawlessly, ensuring full protection for your vehicle.",
        detailedDescription: "TBD",
        Icon: FactCheckIcon,
      },
      {
        title: "Two-Week Check-Up",
        description:
          "Two-week complimentary check-up after your PPF installation. This allows us to inspect the film, ensuring it's securely bonded to your vehicle and that no issues arise early on.",
        detailedDescription: "TBD",
        Icon: EventAvailableIcon,
      },
    ],
    finalDescription:
      "The PPF application process at TintTekPlus is thorough and precise to ensure optimal protection for your vehicle. Here’s how we do it:",
    images: ["/paint-protection1.webp", "/paint-protection2.webp", "/paint-protection3.webp"],
  },
  "ceramic-coating": {
    steps: [
      {
        title: "Consultation & Selection ",
        description:
          "We’ll discuss your needs and help you choose the right coating for your vehicle, whether you prefer standard ceramic or cutting-edge graphene protection.",
        detailedDescription: "TBD",
        Icon: SupportAgentIcon,
      },
      {
        title: "Preparation",
        description:
          "Your vehicle is thoroughly cleaned and decontaminated to ensure the coating bonds perfectly with the surface. This step is crucial for optimal results.",
        detailedDescription: "TBD",
        iconSrc: "/ceramic/prep.webp",
      },
      {
        title: "Application",
        description:
          "Our trained experts carefully apply the coating, ensuring a flawless, even coverage across your car’s paintwork.",
        detailedDescription: "TBD",
        iconSrc: "/ceramic/application.webp",
      },
      {
        title: "Curing",
        description:
          "After application, the coating needs time to cure, forming a long-lasting, protective layer that’s as tough as it is beautiful.",
        detailedDescription: "TBD",
        Icon: HourglassTopIcon,
      },
      {
        title: "Final Inspection",
        description:
          "We inspect the vehicle to make sure the coating is perfect and your car is ready to face the elements with superior protection.",
        detailedDescription: "TBD",
        Icon: FactCheckIcon,
      },
      {
        title: "Yearly Maintenance Check",
        description:
          "For just $225, we offer an annual maintenance check to ensure the coating is performing at its best and touch-up any areas that may need attention.",
        detailedDescription: "TBD",
        iconSrc: "/ceramic/check.webp",
      },
    ],
    finalDescription: "Our Ceramic & Graphene Coating Process:",
    images: ["/paint-protection1.webp", "/paint-protection2.webp", "/paint-protection3.webp"],
  },
  "windshield-protection-film": {
    steps: [
      {
        title: "Professional Installation",
        description:
          "Our team of installers ensures precise application of ExoShield GT3, tailored to fit your vehicle's specific windshield curvature.",
        detailedDescription: "TBD",
        Icon: PrecisionManufacturingIcon,
      },
      {
        title: "Comprehensive Warranty",
        description:
          "We stand behind the quality of our products and services. ExoShield GT3 comes with a 3-year transferable warranty, providing you with peace of mind and assurance of long-term protection.",
        detailedDescription: "TBD",
        Icon: GppGoodIcon,
      },
      {
        title: "Competitive Pricing",
        description:
          "Protecting your windshield is an investment. We offer competitive pricing to ensure you receive exceptional value without compromising on quality.",
        detailedDescription: "TBD",
        Icon: AttachMoneyIcon,
      },
    ],
    finalDescription:
      "At Tint Tek Plus, we are committed to delivering exceptional value and peace of mind to our customers. In addition to our top-quality windshield protection services, we offer a $1,000 insurance coverage for your windshield protection film...",
    images: ["/windshield/windshield1.webp", "/windshield/windshield2.webp", "/windshield/windshield3.webp"],
  },
};

/* ------------------------------ Component ------------------------------ */
const ACCENT = "#4db8f0";
const EASE = "cubic-bezier(.25,.1,.25,1)";

// Placeholder copy ("TBD") is never shown to customers
const hasDetail = (step) =>
  Boolean(step.detailedDescription) && step.detailedDescription.trim().toUpperCase() !== "TBD";

// Phones: swipe row with a peek of the next tile; tablet+: CSS grid
const swipeRow = {
  display: { xs: "flex", sm: "grid" },
  overflowX: { xs: "auto", sm: "visible" },
  scrollSnapType: { xs: "x mandatory", sm: "none" },
  scrollPaddingInline: { xs: "16px", sm: 0 },
  mx: { xs: -2, sm: 0 },
  px: { xs: 2, sm: 0 },
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
};

const StepTile = ({ step, index }) => {
  const [open, setOpen] = useState(false);
  const detailId = useId();
  const { Icon } = step;
  const expandable = hasDetail(step);

  return (
    <Box
      component="article"
      sx={{
        flex: { xs: "0 0 82%", sm: "initial" },
        scrollSnapAlign: { xs: "start", sm: "none" },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 1.75,
        p: { xs: 3.5, md: 4 },
        pb: expandable ? { xs: 9, md: 10 } : { xs: 3.5, md: 4 },
        borderRadius: { xs: "24px", md: "28px" },
        backgroundColor: "rgba(255,255,255,0.045)",
        transition: `background-color .3s ${EASE}`,
        "@media (hover: hover)": {
          "&:hover": { backgroundColor: "rgba(255,255,255,0.07)" },
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography
          sx={{
            color: ACCENT,
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Step {index + 1}
        </Typography>
        {Icon ? (
          <Icon aria-hidden="true" sx={{ fontSize: 32, color: "rgba(245,245,247,0.55)" }} />
        ) : step.iconSrc ? (
          <Box
            component="img"
            src={step.iconSrc}
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            sx={{ width: 32, height: 32, opacity: 0.8 }}
          />
        ) : null}
      </Box>

      <Typography
        component="h3"
        sx={{
          color: "#f5f5f7",
          fontWeight: 700,
          fontSize: { xs: "1.3rem", md: "1.4rem" },
          lineHeight: 1.18,
          letterSpacing: "-0.015em",
        }}
      >
        {step.title.trim()}
      </Typography>

      <Typography sx={{ color: "rgba(245,245,247,0.62)", fontSize: "1rem", lineHeight: 1.6 }}>
        {step.description}
      </Typography>

      {expandable && (
        <>
          {/* Smoothly expanding detail; text stays in the DOM for search engines */}
          <Box
            id={detailId}
            aria-hidden={!open}
            sx={{
              display: "grid",
              gridTemplateRows: open ? "1fr" : "0fr",
              transition: `grid-template-rows .45s ${EASE}`,
              "@media (prefers-reduced-motion: reduce)": { transition: "none" },
            }}
          >
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                sx={{
                  color: "rgba(245,245,247,0.85)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  pt: 1.5,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  mt: 0.5,
                  opacity: open ? 1 : 0,
                  transition: `opacity .35s ${EASE}`,
                }}
              >
                {step.detailedDescription}
              </Typography>
            </Box>
          </Box>

          <Box
            component="button"
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={detailId}
            aria-label={`${open ? "Hide" : "Learn more about"} ${step.title.trim()}`}
            sx={{
              position: "absolute",
              right: { xs: 20, md: 24 },
              bottom: { xs: 20, md: 24 },
              width: 40,
              height: 40,
              p: 0,
              border: 0,
              borderRadius: "50%",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              color: open ? "#0b0b0c" : "#f5f5f7",
              backgroundColor: open ? "#f5f5f7" : "rgba(255,255,255,0.16)",
              transition: `background-color .3s ${EASE}, color .3s ${EASE}`,
              "&:hover": { backgroundColor: open ? "#fff" : "rgba(255,255,255,0.26)" },
              "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 3 },
            }}
          >
            <AddRoundedIcon
              sx={{
                fontSize: 26,
                transform: open ? "rotate(45deg)" : "none",
                transition: `transform .35s ${EASE}`,
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

StepTile.propTypes = {
  step: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    detailedDescription: PropTypes.string,
    Icon: PropTypes.elementType,
    iconSrc: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

// These services show their own visuals elsewhere on the page
const HIDE_IMAGES = new Set(["vehicle-paint-correction", "vehicle-paint-protection", "ceramic-coating"]);

const HowItWorks = ({ serviceId }) => {
  const service = serviceSteps[serviceId];
  if (!service) return null;

  const count = service.steps.length;
  // 4 steps → 2×2 on tablets, one row of 4 on desktop; 3 or 6 → rows of 3
  const desktopCols = count === 4 ? 4 : 3;
  const showImages = !HIDE_IMAGES.has(serviceId) && service.images?.length > 0;

  return (
    <Box component="section" aria-labelledby="how-it-works-heading" sx={{ py: { xs: 8, md: 14 } }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: "center", maxWidth: 860, mx: "auto", mb: { xs: 5, md: 8 } }}>
          <Typography
            id="how-it-works-heading"
            component="h2"
            sx={{
              color: "#f5f5f7",
              fontWeight: 700,
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.5rem" },
              lineHeight: 1.07,
              letterSpacing: "-0.025em",
              mb: service.finalDescription ? { xs: 2, md: 2.5 } : 0,
            }}
          >
            How {service.title ? service.title : "It"} Works
          </Typography>
          {service.finalDescription && (
            <Typography
              sx={{
                color: "rgba(245,245,247,0.62)",
                fontSize: { xs: "1.05rem", md: "1.25rem" },
                lineHeight: 1.5,
              }}
            >
              {service.finalDescription}
            </Typography>
          )}
        </Box>

        {/* Steps */}
        <Box
          sx={{
            ...swipeRow,
            gridTemplateColumns: {
              sm: "repeat(2, 1fr)",
              md: `repeat(${desktopCols === 4 ? 2 : 3}, 1fr)`,
              lg: `repeat(${desktopCols}, 1fr)`,
            },
            // Every tile in a row matches the tallest one (grid + swipe row)
            alignItems: "stretch",
            gridAutoRows: { sm: "1fr" },
            gap: { xs: 1.5, md: 2.5 },
          }}
        >
          {service.steps.map((step, i) => (
            <StepTile key={step.title} step={step} index={i} />
          ))}
        </Box>

        {/* Process photos */}
        {showImages && (
          <Box
            sx={{
              ...swipeRow,
              gridTemplateColumns: { sm: `repeat(${Math.min(service.images.length, 3)}, 1fr)` },
              gap: { xs: 1.5, md: 2.5 },
              mt: { xs: 3, md: 5 },
            }}
          >
            {service.images.map((src, index) => (
              <Box
                key={src}
                sx={{
                  flex: { xs: "0 0 82%", sm: "initial" },
                  scrollSnapAlign: { xs: "start", sm: "none" },
                  borderRadius: { xs: "24px", md: "28px" },
                  overflow: "hidden",
                  backgroundColor: "rgba(255,255,255,0.045)",
                  aspectRatio: { xs: "4 / 5", sm: "4 / 3" },
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`${service.title || "Service"} process step ${index + 1} at Tint Tek Plus`}
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

HowItWorks.propTypes = {
  serviceId: PropTypes.string,
};

export default HowItWorks;
