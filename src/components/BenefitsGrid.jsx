// src/components/BenefitsGrid.jsx
// Apple-style benefits tiles for the services pages. Layout is pure CSS
// (no JS media queries), so the prerendered HTML matches what phones and
// desktops show — no re-render or layout jump after hydration.
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Container, Typography } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SecurityIcon from "@mui/icons-material/Security";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GppGoodIcon from "@mui/icons-material/GppGood";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import LightModeIcon from "@mui/icons-material/LightMode";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ShieldIcon from "@mui/icons-material/Shield";
import ScienceIcon from "@mui/icons-material/Science";
import PaletteIcon from "@mui/icons-material/Palette";

/* -------------------------------- Data --------------------------------- */
const benefitsData = {
  "vehicle-window-tinting": [
    {
      title: "Blocks 99% of Harmful UV Rays",
      Icon: GppGoodIcon,
      description:
        "Window tinting provides a powerful shield against ultraviolet (UV) radiation, blocking up to 99% of harmful UV rays. This not only protects your skin from potential damage during extended drives but also safeguards your vehicle’s interior by preventing the fading and deterioration of upholstery, leather, dashboards, and other surfaces.",
    },
    {
      title: "Heat Rejection",
      Icon: LocalFireDepartmentIcon,
      description:
        "High-quality window film significantly reduces the amount of solar heat that enters your vehicle, helping to maintain a cooler cabin environment. This makes your driving experience more comfortable, especially during hot summer months, while also reducing the need for excessive air conditioning—improving fuel efficiency or battery range in electric vehicles.",
    },
    {
      title: "Improved Privacy & Security",
      Icon: PrivacyTipIcon,
      description:
        "Tinted windows add a layer of privacy by making it more difficult for outsiders to see inside your vehicle. This helps protect valuables from theft, offers greater peace of mind, and enhances the security of your car whether parked or in motion.",
    },
    {
      title: "Reduces Glare from the Sun & Headlights",
      Icon: LightModeIcon,
      description:
        "Window tinting reduces the harsh glare caused by direct sunlight and bright headlights at night. This not only improves your visibility and comfort while driving but also reduces eye strain and fatigue during long trips, making driving safer and more enjoyable.",
    },
    {
      title: "Protects Interior from Fading",
      Icon: ShieldIcon,
      description:
        "Direct sunlight can cause your vehicle’s interior materials to fade, crack, or deteriorate over time. Window film acts as a barrier against this damage by filtering out the sun’s harmful rays, helping preserve the color, texture, and quality of your seats, dash, and interior trim for years to come.",
    },
    {
      title: "Elevate Overall Appearannce",
      Icon: PaletteIcon,
      description:
        "Tinted windows provide a sleek, professional, and stylish finish to any vehicle. It enhances the exterior aesthetics, giving your car a refined and modern look while complementing the overall design. This subtle upgrade adds a touch of sophistication and boosts your car’s visual appeal.",
    },
  ],
  "tesla-window-tinting": [
    {
      title: "Increased mileage per battery charge",
      Icon: BatteryChargingFullIcon,
      description:
        "By reducing the amount of heat entering the cabin, tinted windows decrease the need for constant air conditioning use. This lowers the strain on the battery, ultimately helping to conserve energy and extend your driving range—giving you more miles per charge and better overall efficiency.",
    },
    {
      title: "Heat reduction in cabin",
      Icon: LocalFireDepartmentIcon,
      description:
        "Tesla window tinting offers advanced solar heat rejection technology that significantly reduces interior temperatures, even on the hottest days. This results in a cooler, more comfortable driving experience for both the driver and passengers, without over-reliance on climate control systems.",
    },
    {
      title: "Blocks 99% of harmful UV rays",
      Icon: GppGoodIcon,
      description:
        "Tinted film acts as a powerful barrier against UV radiation, blocking up to 99% of harmful rays. This not only helps protect your skin but also prevents long-term damage to your Tesla’s premium interior surfaces, including leather seats, dashboard, and trim.",
    },
    {
      title: "Reduces glare from the sun & headlights",
      Icon: LightModeIcon,
      description:
        "Tinting helps minimize disruptive glare from the sun and headlights, enhancing visibility and reducing strain on your eyes. Whether you're driving in broad daylight or at night, this added clarity ensures a safer, more relaxed driving experience.",
    },
    {
      title: "Provides increased privacy",
      Icon: VisibilityIcon,
      description:
        "Tesla window tinting enhances your personal privacy by making it more difficult for outsiders to see inside the cabin. It not only deters unwanted attention but also protects any belongings stored in your vehicle from curious eyes.",
    },
    {
      title: "Prevents unnecessary battery drainage",
      Icon: FlashOnIcon,
      description:
        "By lowering the interior temperature and reducing the use of air conditioning, window tinting minimizes battery consumption caused by climate control systems. This contributes to better battery health and improved long-term energy management for your Tesla.",
    },
  ],
  "commercial-window-tinting": [
    {
      title: "Energy Efficiency & Cost Savings",
      Icon: HomeWorkIcon,
      description:
        "Window tinting with LLumar® helps reduce heat and light, allowing your HVAC system to work less and resulting in significant energy savings. It can lower cooling costs by up to 50%, making your space more energy-efficient.",
    },
    {
      title: "Enhanced Privacy & Security",
      Icon: SecurityIcon,
      description:
        "LLumar® films improve privacy while still letting natural light filter in. They also strengthen your windows, reducing the risk of break-ins and vandalism, with studies showing a 20% reduction in break-ins.",
    },
    {
      title: "Glare Reduction & Comfort",
      Icon: LightModeIcon,
      description:
        "Tinted windows with LLumar® reduce glare by up to 80%, making spaces more comfortable for employees and customers, especially in areas with screens or displays.",
    },
    {
      title: "UV Protection & Preservation of Interiors",
      Icon: WbSunnyIcon,
      description:
        "Our LLumar® films block up to 99% of UV rays, protecting your furnishings, artwork, and flooring from fading and deterioration, helping them last longer and stay looking new.",
    },
    {
      title: "Custom Solutions & Aesthetic Appeal",
      Icon: ColorLensIcon,
      description:
        "We offer a variety of LLumar® films for different needs, from solar control to privacy-enhancing and security films, all tailored to enhance the look and performance of your space.",
    },
  ],
  "residential-window-tinting": [
    {
      title: "Energy Efficiency & Cost Savings",
      Icon: HomeWorkIcon,
      description:
        "Window tinting is an easy and effective way to reduce your energy costs. By blocking a significant amount of heat from entering your home, it helps maintain a more comfortable indoor temperature year-round.",
    },
    {
      title: "UV Protection & Skin Health",
      Icon: GppGoodIcon,
      description:
        "Window tints block up to 99% of harmful ultraviolet (UV) rays that contribute to skin damage, aging, and even skin cancer, protecting your health while indoors.",
    },
    {
      title: "Improved Comfort & Glare Reduction",
      Icon: LightModeIcon,
      description:
        "With tinted windows, you can enjoy natural sunlight without the uncomfortable glare from the sun, which is especially important near TVs, computers, or workstations. It creates a more comfortable and pleasant living space.",
    },
    {
      title: "Enhanced Privacy & Security",
      Icon: PrivacyTipIcon,
      description:
        "Tinted windows make it more difficult for people to see inside your home, offering you increased privacy while still letting natural light in. They also make your home a less attractive target for burglars.",
    },
    {
      title: "Protection for Furnishings & Interiors",
      Icon: ShieldIcon,
      description:
        "Window tinting helps preserve the beauty of your home by preventing sun damage to furniture, flooring, and artwork. It acts as a protective shield, reducing fading and wear from UV rays and solar heat.",
    },
  ],
  "windshield-protection-film": [
    {
      title: "Impact Resistance",
      Icon: ShieldIcon,
      description:
        "ExoShield GT3 is engineered to deliver superior abrasion resistance, durability, and weatherability. It boasts a thickness of five mils—about 2.5 times that of a human hair—providing robust protection against chips and cracks caused by road debris. Designed to give you 6X more impact protection, GT3+ is truly made to save your glass.",
    },
    {
      title: "Advanced Nanocoating Technology",
      Icon: ScienceIcon,
      description:
        "Incorporating second-generation Endurance Class nanocoatings, ExoShield GT3 ensures a strong bond between layers, preventing delamination and extending the film's lifespan.",
    },
    {
      title: "Optical Clarity",
      Icon: BlurOnIcon,
      description:
        "As one of the most optically clear films on the market, ExoShield GT3 is virtually invisible once installed, maintaining the natural appearance of your vehicle while providing robust protection.",
    },
    {
      title: "UV & Heat Rejection",
      Icon: WbSunnyIcon,
      description:
        "The film blocks up to 99% of harmful UV rays, reducing interior heat buildup and protecting your vehicle's interior from sun damage. ",
    },
    {
      title: "Long Term Durability",
      Icon: FlashOnIcon,
      description:
        "Designed to withstand various driving conditions, ExoShield GT3 is weather-resistant and maintains its protective qualities over time, ensuring lasting windshield protection. ",
    },
    {
      title: "Made in The USA",
      Icon: HomeWorkIcon,
      description:
        "Your windshield protection film is only as good as the materials it's made with. We use the highest quality PET (Polyethylene Terephthalate) combined with our own proprietary coatings tech to deliver you the best quality.",
    },
  ],
  "vehicle-paint-correction": [
    {
      title: "Restores Paint to Its Original Beauty",
      Icon: PaletteIcon,
      description:
        "Revitalize your vehicle’s paint, bringing back its glossy, vibrant finish. Paint correction removes imperfections that dull your car’s look, giving it a smooth, polished surface that looks brand new.",
    },
    {
      title: "Eliminates Swirl Marks & Scratches",
      Icon: SecurityIcon,
      description:
        "Over time, swirl marks and scratches can make your car’s paint look worn. Our specialized process targets and eliminates these imperfections, leaving a flawless, smooth finish.",
    },
    {
      title: "Enhances Gloss & Clarity",
      Icon: VisibilityIcon,
      description:
        "Achieve a high-gloss, mirror-like shine that enhances the depth and clarity of your car's color. Paint correction brings out the natural brilliance of your vehicle’s paint, making it look fresh and polished.",
    },
    {
      title: "Prepares Your Car for Protective Coatings",
      Icon: HomeWorkIcon,
      description:
        "After the paint is corrected, the surface is ready for protective coatings like ceramic coatings or sealants. This ensures a longer-lasting finish and adds an extra layer of protection against environmental elements.",
    },
    {
      title: "Boosts Resale Value",
      Icon: DirectionsCarIcon,
      description:
        "A well-maintained exterior can increase the resale value of your vehicle. Paint correction not only improves the appearance of your car but also preserves its value, making it more attractive to potential buyers.",
    },
  ],
  "vehicle-paint-protection": [
    {
      title: "Exceptional Durability",
      Icon: ShieldIcon,
      description:
        "Stek PPF is engineered to withstand the toughest conditions, including road debris, gravel, and weathering elements. It prevents chips, scratches, and swirl marks that can diminish your vehicle's paintwork.",
    },
    {
      title: "Self-Healing Technology",
      Icon: ScienceIcon,
      description:
        "Stek PPF features advanced self-healing properties. Light scratches and swirl marks disappear when exposed to heat, keeping your car looking as fresh as the day it was protected.",
    },
    {
      title: "Hydrophobic Properties",
      Icon: WbSunnyIcon,
      description:
        "Stek PPF is designed to repel water, dirt, and contaminants. This makes cleaning easier and reduces the frequency of washes, helping to maintain your vehicle's pristine appearance longer.",
    },
    {
      title: "Invisible Shield",
      Icon: ShieldIcon,
      description:
        "The film is nearly invisible and doesn’t alter your car’s color or finish. You get all the protection with none of the visual compromise, maintaining that flawless, high-gloss or matte finish.",
    },
    {
      title: "UV Protection",
      Icon: WbSunnyIcon,
      description:
        "Stek PPF shields your vehicle’s paint from harmful UV rays, which helps prevent fading and oxidation, ensuring that your car’s color stays vibrant for years.",
    },
    {
      title: "Scratch & Impact Protection",
      Icon: SecurityIcon,
      description:
        "Protect your vehicle from minor abrasions, stone chips, and scratches caused by road debris. Stek PPF is tough enough to absorb impacts, keeping your car looking like new.",
    },
  ],
  "headlight-services": [
    {
      title: "Durable Protection",
      Icon: ShieldIcon,
      description:
        "Safeguards against rock chips, cracks, scratches, and other road hazards.",
    },
    {
      title: "Enhanced Aesthetics",
      Icon: PaletteIcon,
      description:
        "Over time, swirl marks and scratches can make your car’s paint look worn. Our specialized process targets and eliminates these imperfections, leaving a flawless, smooth finish.",
    },
    {
      title: "Hydrophobic Properties",
      Icon: SecurityIcon,
      description:
        "Repels water, making your lights easier to clean and maintain.",
    },
    {
      title: "Self-Healing",
      Icon: ScienceIcon,
      description:
        "The film's advanced technology allows minor scratches to heal with heat, maintaining a smooth surface.",
    },
  ],
  "ceramic-coating": [
    {
      title: "Hydrophobic Protection",
      Icon: SecurityIcon,
      description:
        "Our ceramic coatings are designed to repel water like never before. Water beads up and rolls off the surface, reducing water spots and keeping your car cleaner for longer.",
    },
    {
      title: "Scratch & Swirl Resistance",
      Icon: ShieldIcon,
      description:
        "The protective layer helps guard against light scratches and swirl marks, ensuring your paint stays smooth and free of imperfections.",
    },
    {
      title: "UV Protection",
      Icon: WbSunnyIcon,
      description:
        "Ceramic coatings create a barrier that protects your paint from harmful UV rays, preventing oxidation and fading over time. Keep your car looking new for years!",
    },
    {
      title: "Enhanced Gloss",
      Icon: PaletteIcon,
      description:
        "Enjoy a brilliant, glossy finish that makes your vehicle shine with a depth and clarity that traditional waxes simply can’t match.",
    },
    {
      title: "Low Maintenance",
      Icon: HomeWorkIcon,
      description:
        "With ceramic protection, dirt, water, and other contaminants have a harder time sticking to the surface, making your car much easier to clean.",
    },
  ],
};

/* ---------------------------- Titles / Colors ---------------------------- */
const titles = {
  "vehicle-window-tinting": "Benefits of Vehicle Window Tinting",
  "tesla-window-tinting": "Benefits of Tesla Window Tinting",
  "commercial-window-tinting": "Why Choose LLumar® Window Films?",
  "residential-window-tinting": "Why Choose LLumar® Window Films?",
  "windshield-protection-film": "Why Choose ExoShield GT3?",
  "ceramic-coating": "Why Choose Ceramic Coating?",
  "vehicle-paint-correction": "Top Benefits",
  "vehicle-paint-protection": "Why Choose Stek PPF? ",
  "headlight-services": "Benefits of STEK Light Protection Film",
};


const ACCENT = "#4db8f0";

// Bento layout on desktop: decide which tiles span two columns so the grid
// never ends with a half-empty row.
//   6 → 3 + 3   5 → (2-wide + 1) + 3   4 → 2 + 2 (two-column grid)
const layoutFor = (count) => ({
  columns: count === 4 ? 2 : 3,
  wideFirst: count % 3 === 2 && count !== 2,
});

const BenefitTile = ({ benefit, wide }) => {
  const { Icon } = benefit;
  return (
    <Box
      component="article"
      sx={{
        // Phones: horizontal swipe row; tablet+: grid cell
        flex: { xs: "0 0 82%", sm: "initial" },
        scrollSnapAlign: { xs: "start", sm: "none" },
        gridColumn: { md: wide ? "span 2" : "auto" },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: { xs: 3.5, md: wide ? 5 : 4 },
        minHeight: { md: 300 },
        borderRadius: { xs: "24px", md: "28px" },
        backgroundColor: "rgba(255,255,255,0.045)",
        transition: "background-color .3s ease",
        "@media (hover: hover)": {
          "&:hover": { backgroundColor: "rgba(255,255,255,0.07)" },
        },
      }}
    >
      {Icon && <Icon aria-hidden="true" sx={{ fontSize: { xs: 34, md: 40 }, color: ACCENT }} />}
      <Typography
        component="h3"
        sx={{
          color: "#f5f5f7",
          fontWeight: 700,
          fontSize: { xs: "1.3rem", md: wide ? "1.85rem" : "1.45rem" },
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
          maxWidth: wide ? 520 : "none",
        }}
      >
        {benefit.title}
      </Typography>
      <Typography
        sx={{
          color: "rgba(245,245,247,0.62)",
          fontSize: { xs: "0.98rem", md: "1.02rem" },
          lineHeight: 1.6,
          fontWeight: 400,
          maxWidth: wide ? 620 : "none",
        }}
      >
        {benefit.description}
      </Typography>
    </Box>
  );
};

BenefitTile.propTypes = {
  benefit: PropTypes.shape({
    Icon: PropTypes.elementType,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  wide: PropTypes.bool,
};

const BenefitsGrid = () => {
  const { serviceId } = useParams();
  const benefits = benefitsData[serviceId] || [];
  const title = (titles[serviceId] || "Our Benefits").trim();

  if (benefits.length === 0) return null;

  const { columns, wideFirst } = layoutFor(benefits.length);

  return (
    <Box
      component="section"
      aria-labelledby="benefits-heading"
      sx={{ py: { xs: 8, md: 14 } }}
    >
      <Container maxWidth="lg">
        <Typography
          id="benefits-heading"
          component="h2"
          sx={{
            color: "#f5f5f7",
            fontWeight: 700,
            fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.5rem" },
            lineHeight: 1.07,
            letterSpacing: "-0.025em",
            textAlign: "center",
            maxWidth: 820,
            mx: "auto",
            mb: { xs: 5, md: 8 },
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: { xs: "flex", sm: "grid" },
            // Every tile the same height, across all rows
            gridAutoRows: { sm: "1fr" },
            alignItems: "stretch",
            gridTemplateColumns: {
              sm: "repeat(2, 1fr)",
              md: `repeat(${columns}, 1fr)`,
            },
            gap: { xs: 1.5, md: 2.5 },
            // Phones: swipe row that keeps the page gutter
            overflowX: { xs: "auto", sm: "visible" },
            scrollSnapType: { xs: "x mandatory", sm: "none" },
            scrollPaddingInline: { xs: "16px", sm: 0 },
            mx: { xs: -2, sm: 0 },
            px: { xs: 2, sm: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {benefits.map((b, i) => (
            <BenefitTile key={b.title} benefit={b} wide={wideFirst && i === 0} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default BenefitsGrid;
