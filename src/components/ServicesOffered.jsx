// src/components/ServicesOffered.jsx
// Apple-style "types / options" section for the services pages: brand-marked
// film tiles (all the same height), pill list of coverage areas, and a
// simulator call-to-action tile. Layout is pure CSS — no JS media queries.
import PropTypes from "prop-types";
import { Box, Container, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link } from "react-router-dom";

// Define service-specific content
const serviceOptions = {
  "vehicle-window-tinting": {
    title: "Vehicle Window Tinting Services",
    list: ["Front Windsheield", "Sunroof / Panoramic Roof", "Visor Strips"],
    filmTypes: [
      {
        name: "FormulaOne Classic Series",
        description:
          "FormulaOne Classic is a premium dyed film that delivers a sleek, factory-tinted charcoal appearance—perfect for drivers who want style, privacy, and essential UV protection without breaking the bank. It reduces glare and helps keep your interior cooler, all while preserving the clean, understated look many drivers love.",
      },
      {
        name: "Llumar CTX",
        description:
          "CTX film combines advanced ceramic technology with excellent heat and UV protection. It blocks up to 60% of infrared heat while maintaining a clear, non-reflective appearance. Perfect for those seeking superior comfort and privacy without darkening windows too much, CTX is ideal for moderate climates where effective heat rejection and UV protection are key.",
      },
      {
        name: "FormulaOne Pinnacle Series",
        description:
          "FormulaOne Pinnacle takes things further with advanced nano-ceramic technology. Unlike dyed films, it offers excellent infrared heat rejection—helping to keep your vehicle cooler, even on the hottest days. Pinnacle also significantly reduces glare and provides the same 99%+ UV protection, protecting both your passengers and interior.",
      },
    ],
  },
  "tesla-window-tinting": {
    title: "Tesla Window Tinting Services",
    list: [
      "Full Model S window tinting, windshield, pano sunroof, single sunroof",
      "Full Model 3 window tinting, windshield, sunroof",
      "Full Model X window tinting, windshield",
      "Full Model Y window tinting, windshield, pano sunroof, single sunroof",
      "Full Cybertruck window tinting, windshield",
    ],
    filmTypes: [
      {
        name: "Llumar CTX Series",
        description:
          "FormulaOne Classic is a premium dyed film that delivers a sleek, factory-tinted charcoal appearance—perfect for drivers who want style, privacy, and essential UV protection without breaking the bank. It reduces glare and helps keep your interior cooler, all while preserving the clean, understated look many drivers love.",
      },
      {
        name: "FormulaOne Pinnacle Series",
        description:
          "FormulaOne Pinnacle takes things further with advanced nano-ceramic technology. Unlike dyed films, it offers excellent infrared heat rejection—helping to keep your vehicle cooler, even on the hottest days. Pinnacle also significantly reduces glare and provides the same 99%+ UV protection, protecting both your passengers and interior.",
      },
    ],
  },
  "commercial-window-tinting": {
    title: "Commercial Window Tinting Services",
    list: [
      "Office Window Tinting",
      "Storefront Window Tinting",
      "Skyscraper Window Tinting",
      "Conference Room Tinting",
      "Custom Business Tinting Solutions",
    ],
    filmTypes: [
      {
        name: "Solar Control Film",
        description:
          "Reduces heat and glare while allowing natural light to enter, improving energy efficiency.",
      },
      {
        name: "Decorative Film",
        description: "Offers privacy and style while reducing glare and heat.",
      },
      {
        name: "Security Film (Coming Soon!)",
        description:
          "Strengthens windows, offering protection against break-ins and accidents by preventing shattering.",
      },
    ],
  },
  "residential-window-tinting": {
    title: "Residential Window Tinting Services",
    list: [
      "Full Home Window Tinting",
      "Single Room Window Tinting",
      "Sunroom Tinting",
      "Patio Door Tinting",
      "Custom Home Tinting Solutions",
    ],
    filmTypes: [
      {
        name: "Reflective Window Film",
        description:
          "This film offers a sleek, mirrored finish that enhances privacy by reflecting light. It reduces heat and glare while providing excellent UV protection and increasing the overall comfort inside your vehicle.",
      },
      {
        name: "Dual-Reflective Window Film",
        description:
          "Designed for both exterior and interior benefits, this film offers a reflective finish on the outside for heat rejection and privacy, while maintaining a more neutral appearance on the inside to reduce mirror-like reflections.",
      },
      {
        name: "Neutral Window Film",
        description:
          "Neutral Window Film provides a balanced look without changing the color of your vehicle’s windows. It effectively blocks heat and UV rays while maintaining a natural, true-to-life view.",
      },
      {
        name: "Specialty Window Film",
        description:
          "Tailored for unique needs, this film offers specialized features like anti-graffiti, anti-scratch, or decorative options. It’s perfect for specific applications that require additional protection or aesthetic appeal.",
      },
      {
        name: "Ceramic Window Film",
        description:
          "Using advanced ceramic technology, this film provides superior heat rejection and UV protection without compromising visibility. It’s non-metallic, ensuring no interference with electronic devices, and offers long-lasting durability.",
      },
      {
        name: "Harmony Window Film",
        description:
          "Designed for a more uniform look, Harmony Window Film balances heat and glare rejection while maintaining a consistent tint throughout the vehicle. It enhances privacy and comfort without drastically altering the vehicle's appearance.",
      },
    ],
  },
  "vehicle-paint-correction": {
    title: "Vehicle Paint Correction Services",
    list: [
      "Single-Stage Paint Correction",
      "Multi-Stage Paint Correction",
      "Swirl Mark Removal",
      "Scratch Removal",
      "Gloss Enhancement",
    ],
    filmTypes: [
      {
        name: "Stage 1 Correction",
        description:
          "Removes light swirls and scratches to restore your car's shine.",
      },
      {
        name: "Stage 2 Correction",
        description:
          "A more intensive process to eliminate deeper scratches and imperfections.",
      },
      {
        name: "Stage 3 Correction",
        description:
          "Comprehensive restoration for severely damaged paint, returning a showroom-quality finish.",
      },
    ],
  },
  "vehicle-paint-protection": {
    title: "Vehicle Paint Protection Services",
    list: [
      "Front End PPF",
      "Extended PPF",
      "Track Package PPF",
      "Full Car PPF",
      "Color Change PPF",
      "Stealth/Matte PPF",
    ],
    filmTypes: [
      {
        name: "DYNOshield",
        description:
          "The most popular option for high-gloss finishes. It provides exceptional durability, hydrophobic protection, and a sleek shine, backed by a 10-year warranty.",
      },
      {
        name: "DYNOmatte",
        description:
          "Perfect for matte and satin finishes. It preserves the subtle beauty of matte paint while providing excellent protection and a smooth, self-healing surface.",
      },
      {
        name: "DYNOmight",
        description:
          "For those who demand extra durability, DYNOmight is 25% thicker than regular PPF, offering superior protection for off-road vehicles and high-performance sports cars.",
      },
      {
        name: "Color Change PPF",
        description:
          "Premium paint protection film that not only protects your vehicle's paint but also allows you to change its color or finish. This innovative product offers a unique combination of style and protection, making it an ideal solution for those who want to personalize their car’s look while safeguarding its paint from damage",
      },
    ],
  },
  "headlight-services": {
    title: "Headlight Services",
    list: ["Headlight Tint", "Taillight Tint", "Reflectors"],
    filmTypes: [
      {
        name: "DYNOshade",
        description:
          "Provides a subtle shaded effect, offering 45% light transmittance.",
      },
      {
        name: "DYNOshadow",
        description:
          "Delivers a medium charcoal tone with 34% light transmittance.",
      },
      {
        name: "DYNOsmoke",
        description:
          "The darkest option at 30% light transmittance, ideal for a stealthy look.",
      },
      {
        name: "DYNOstorm",
        description:
          "A neutral gray with 50% light transmittance, giving a sleek appearance.",
      },
      {
        name: "DYNOyellow",
        description:
          "Inspired by racing culture, offering a classic yellow tint.",
      },
    ],
  },
  "windshield-protection-film": {
    title: "Windshield Protection Film Services",
    list: ["Windshield Protection", "ExoShield GT3", "Stek DYNOtop"],
    filmTypes: [
      {
        name: "DYNOtop",
        description:
          "DYNOtop is an exterior Windshield Protection film designed to significantly reduce the risk of replacing windshields on track cars and off-road vehicles. It can also protect expensive windshields from damage like high-end exotic and hypercars with Advanced Driving Assistance Systems cameras and sensors (ADAS).",
        warrantyUrl:
          "https://dfmm8fty2renf.cloudfront.net/wp-content/uploads/2023/06/DYNOflex-USA-Warranty-2021.pdf",
      },
      {
        name: "GT3 Exo Shield",
        description:
          "ExoShield GT3 Windshield Protection offers top-tier protection for your vehicle’s windshield. This clear, durable film shields against chips, cracks, and road debris, ensuring your windshield stays intact longer. Designed for maximum clarity, it preserves your view while providing superior impact resistance—ideal for daily drivers and those who want to safeguard their investment.",
        warrantyUrl:
          "https://cdn.prod.website-files.com/5c870322e90205bd3137c6df/65b9089bb070e4995e0fec67_2%20-%20GT3%2B%20Limited%20Product%20Warranty%20%5BConsumer%5D.pdf",
      },
    ],
  },
};

const ACCENT = "#4db8f0";
const EASE = "cubic-bezier(.25,.1,.25,1)";

// Brand marks, sized per logo shape so they look optically balanced
const LOGOS = {
  llumar: { src: "/llumar-logo.webp", alt: "LLumar", w: 656, h: 380, height: 40 },
  formulaOne: { src: "/f1-3.webp", alt: "FormulaOne", w: 410, h: 130, height: 30 },
  stek: { src: "/stek-logo.webp", alt: "STEK", w: 485, h: 163, height: 26, invert: true },
  exo: { src: "/windshield/exo.webp", alt: "ExoShield", w: 1200, h: 141, height: 18 },
};

const getFilmLogo = (serviceId, filmName) => {
  if (serviceId === "windshield-protection-film") {
    if (/dynotop/i.test(filmName)) return LOGOS.stek; // DYNOtop → STEK
    return LOGOS.exo; // GT3 Exo Shield → ExoShield
  }
  if (serviceId === "vehicle-paint-protection" || serviceId === "headlight-services") return LOGOS.stek;
  if (/formulaone/i.test(filmName)) return LOGOS.formulaOne;
  return LOGOS.llumar;
};

const HEADINGS = {
  "commercial-window-tinting": "Commercial Window Tinting Options",
  "residential-window-tinting": "Residential Window Tinting Options",
  "vehicle-paint-protection": "Stek PPF Options",
  "headlight-services": "Available Headlight Tint Tones",
  "vehicle-paint-correction": "Paint Correction Options",
  "windshield-protection-film": "Windshield Protection Film Options",
  "tesla-window-tinting": "Types of Tesla Window Tinting Film",
};

const COLOR_CHANGE_URL = "https://www.stek-usa.com/fashion-film/";

// Desktop uses a 6-column grid so every count fills complete rows:
// 1 → full, 2 → halves, 3/6 → thirds, 4 → 2×2, 5 → 3 thirds + 2 halves
const desktopSpan = (count, i) => {
  if (count === 1) return 6;
  if (count === 2 || count === 4) return 3;
  if (count === 5) return i < 3 ? 2 : 3;
  return 2;
};

const TextLink = ({ href, children }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 0.25,
      color: ACCENT,
      fontWeight: 500,
      fontSize: "1.02rem",
      textDecoration: "none",
      "&:hover": { textDecoration: "underline" },
      "&:focus-visible": { outline: "2px solid #2794d2", outlineOffset: 3, borderRadius: 1 },
    }}
  >
    {children}
    <ChevronRightRoundedIcon aria-hidden="true" sx={{ fontSize: 20 }} />
  </Box>
);

TextLink.propTypes = { href: PropTypes.string.isRequired, children: PropTypes.node };

const FilmTile = ({ film, serviceId, count, index }) => {
  const logo = getFilmLogo(serviceId, film.name);
  const isColorChangePPF = serviceId === "vehicle-paint-protection" && film.name === "Color Change PPF";
  const span = desktopSpan(count, index);
  // Tablet: two per row; an odd last tile spans the full row
  const tabletFull = count === 1 || (count % 2 === 1 && index === count - 1);

  return (
    <Box
      component="article"
      sx={{
        flex: { xs: "0 0 82%", sm: "initial" },
        scrollSnapAlign: { xs: "start", sm: "none" },
        gridColumn: { sm: tabletFull ? "span 6" : "span 3", md: `span ${span}` },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: { xs: 3.5, md: 4 },
        borderRadius: { xs: "24px", md: "28px" },
        backgroundColor: "rgba(255,255,255,0.045)",
        transition: `background-color .3s ${EASE}`,
        "@media (hover: hover)": {
          "&:hover": { backgroundColor: "rgba(255,255,255,0.07)" },
        },
      }}
    >
      <Box sx={{ height: 40, display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src={logo.src}
          alt={logo.alt}
          width={logo.w}
          height={logo.h}
          loading="lazy"
          decoding="async"
          sx={{
            height: logo.height,
            width: "auto",
            maxWidth: 160,
            objectFit: "contain",
            filter: logo.invert ? "invert(1)" : "none",
            opacity: 0.92,
          }}
        />
      </Box>

      <Typography
        component="h4"
        sx={{
          color: "#f5f5f7",
          fontWeight: 700,
          fontSize: { xs: "1.35rem", md: "1.5rem" },
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
        }}
      >
        {film.name}
      </Typography>

      <Typography sx={{ color: "rgba(245,245,247,0.62)", fontSize: "1rem", lineHeight: 1.6 }}>
        {film.description}
      </Typography>

      {/* Links pinned to the bottom so tiles line up */}
      {(isColorChangePPF || film.warrantyUrl) && (
        <Box sx={{ mt: "auto", pt: 1, display: "flex", flexWrap: "wrap", gap: 2.5 }}>
          {isColorChangePPF && <TextLink href={COLOR_CHANGE_URL}>Explore Color Options</TextLink>}
          {film.warrantyUrl && <TextLink href={film.warrantyUrl}>See Warranty Coverage</TextLink>}
        </Box>
      )}
    </Box>
  );
};

FilmTile.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    warrantyUrl: PropTypes.string,
  }).isRequired,
  serviceId: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const ServicesOffered = ({ serviceId }) => {
  const service = serviceOptions[serviceId];
  if (!service) return null;

  const films = service.filmTypes || [];
  const heading = HEADINGS[serviceId] || "Types of Vehicle Window Tinting Film";
  const showList =
    serviceId === "commercial-window-tinting" || serviceId === "residential-window-tinting";
  const showSimulator = serviceId !== "headlight-services" && serviceId !== "windshield-protection-film";
  const isPPF = serviceId === "vehicle-paint-protection";

  return (
    <Box component="section" aria-labelledby="types-heading" sx={{ py: { xs: 8, md: 14 } }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: "center", maxWidth: 860, mx: "auto", mb: { xs: 4, md: 6 } }}>
          <Typography
            id="types-heading"
            component="h2"
            sx={{
              color: "#f5f5f7",
              fontWeight: 700,
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.5rem" },
              lineHeight: 1.07,
              letterSpacing: "-0.025em",
            }}
          >
            {heading}
          </Typography>

          {showList && service.list?.length > 0 && (
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                mt: { xs: 3, md: 4 },
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1.25,
              }}
            >
              {service.list.map((item) => (
                <Box
                  component="li"
                  key={item}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 2,
                    py: 1,
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "rgba(245,245,247,0.88)",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                  }}
                >
                  <CheckRoundedIcon aria-hidden="true" sx={{ fontSize: 18, color: ACCENT }} />
                  {item}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {films.length > 0 && (
          <>
            <Typography
              component="h3"
              sx={{
                color: "rgba(245,245,247,0.62)",
                fontSize: { xs: "1.15rem", md: "1.35rem" },
                fontWeight: 600,
                letterSpacing: "-0.01em",
                textAlign: "center",
                mb: { xs: 3, md: 4 },
                "& strong": { color: "#f5f5f7", fontWeight: 700 },
              }}
            >
              The <strong>main types of film</strong> we use:
            </Typography>

            {/* Tiles: swipe row on phones; equal-height 6-col grid on tablet+ */}
            <Box
              sx={{
                display: { xs: "flex", sm: "grid" },
                gridTemplateColumns: { sm: "repeat(6, 1fr)" },
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
              {films.map((film, i) => (
                <FilmTile
                  key={film.name}
                  film={film}
                  serviceId={serviceId}
                  count={films.length}
                  index={i}
                />
              ))}
            </Box>
          </>
        )}

        {/* Simulator call-to-action */}
        {showSimulator && (
          <Box
            sx={{
              mt: { xs: 3, md: 5 },
              px: { xs: 3, md: 6 },
              py: { xs: 6, md: 8 },
              borderRadius: { xs: "24px", md: "28px" },
              textAlign: "center",
              background:
                "radial-gradient(120% 140% at 50% 0%, rgba(39,148,210,0.22) 0%, rgba(255,255,255,0.045) 60%)",
            }}
          >
            <Typography
              component="h3"
              sx={{
                color: "#f5f5f7",
                fontWeight: 700,
                fontSize: { xs: "1.7rem", md: "2.4rem" },
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                maxWidth: 720,
                mx: "auto",
                mb: 1.5,
              }}
            >
              {isPPF
                ? "See how each paint protection film package covers your vehicle!"
                : "Experience Your Tints Before Installation"}
            </Typography>
            <Typography
              sx={{
                color: "rgba(245,245,247,0.62)",
                fontSize: { xs: "1.02rem", md: "1.15rem" },
                lineHeight: 1.5,
                maxWidth: 560,
                mx: "auto",
                mb: 4,
              }}
            >
              {isPPF
                ? "From bumpers to full body, our simulator shows what’s protected."
                : "Our interactive simulator shows you exactly how each shade will transform your view."}
            </Typography>
            <Box
              component={Link}
              to={`/simulators/${serviceId}`}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 3.5,
                py: 1.5,
                borderRadius: 999,
                fontSize: "1.05rem",
                fontWeight: 500,
                color: "#fff",
                backgroundColor: "#2794d2",
                textDecoration: "none",
                transition: `background-color .25s ${EASE}`,
                "&:hover": { backgroundColor: "#1f86c1" },
                "&:focus-visible": { outline: "2px solid #fff", outlineOffset: 3 },
              }}
            >
              {isPPF ? "Launch PPF Viewer" : "Launch Tint Viewer"}
              <ChevronRightRoundedIcon aria-hidden="true" sx={{ fontSize: 22 }} />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

ServicesOffered.propTypes = { serviceId: PropTypes.string };

export default ServicesOffered;
