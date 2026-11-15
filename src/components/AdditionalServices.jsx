// src/components/AdditionalServices.jsx
// Apple-style "Additional ... Services" package tiles, shared by
// TintPackages (vehicle), TeslaTintPackages (Tesla) and HeadlightPackages. Equal-height tiles,
// pure-CSS responsive layout, one shared quote dialog (iframe mounts only
// when opened).
import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Container, Dialog, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const EASE = "cubic-bezier(.25,.1,.25,1)";
const QUOTE_URL = "https://app.tintwiz.com/web/cs/gwnvrcfde7mplcffmgqi7sfqo8pcyt1t";

const PackageTile = ({ pkg, imageSize, imageFit, altSuffix, onQuote }) => {
  const size = pkg.imageSize || imageSize;
  const isPhoto = imageFit === "cover";
  return (

  <Box
    component="article"
    sx={{
      flex: { xs: "0 0 82%", sm: "initial" },
      scrollSnapAlign: { xs: "start", sm: "none" },
      display: "flex",
      flexDirection: "column",
      borderRadius: { xs: "24px", md: "28px" },
      overflow: "hidden",
      backgroundColor: "rgba(255,255,255,0.045)",
      transition: `background-color .3s ${EASE}`,
      "@media (hover: hover)": {
        "&:hover": { backgroundColor: "rgba(255,255,255,0.07)" },
        "&:hover img": { transform: "scale(1.04)" },
      },
    }}
  >
    {/* Cut-out render on a lighter stage ("contain") or full-bleed photo ("cover") */}
    <Box
      sx={{
        position: "relative",
        // Photos get a square frame so mixed portrait/landscape shots crop less
        aspectRatio: isPhoto ? "1 / 1" : "4 / 3",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        p: isPhoto ? 0 : { xs: 2, md: 2.5 },
        background: isPhoto
          ? "rgba(255,255,255,0.03)"
          : "radial-gradient(90% 80% at 50% 40%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 70%)",
        // Soft fade so bright photos don't end in a hard edge against the dark tile
        ...(isPhoto && {
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 62%, rgba(10,12,14,0.55) 100%)",
          },
        }),
      }}
    >
      <Box
        component="img"
        src={pkg.image}
        alt={`${pkg.title}${altSuffix}`}
        width={size.w}
        height={size.h}
        loading="lazy"
        decoding="async"
        sx={{
          // Photos are pinned to all four edges: a % height doesn't resolve
          // inside an aspect-ratio grid, so the img would keep its own tall
          // shape instead of filling the frame.
          ...(isPhoto && { position: "absolute", inset: 0 }),
          width: "100%",
          height: "100%",
          objectFit: isPhoto ? "cover" : "contain",
          // Per-photo focal point so the product stays in frame
          objectPosition: pkg.imagePosition || "center",
          transition: `transform .6s ${EASE}`,
        }}
      />
    </Box>

    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: 1, p: { xs: 3, md: 3.5 }, pt: { xs: 2.5, md: 3 } }}>
      <Typography
        component="h3"
        sx={{
          color: "#f5f5f7",
          fontWeight: 700,
          fontSize: { xs: "1.3rem", md: "1.35rem" },
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
        }}
      >
        {pkg.title}
      </Typography>
      <Typography sx={{ color: "#f5f5f7", fontSize: "1rem", fontWeight: 500 }}>
        {pkg.price}
      </Typography>
      {pkg.description && (
        <Typography sx={{ color: "rgba(245,245,247,0.62)", fontSize: "0.98rem", lineHeight: 1.55 }}>
          {pkg.description}
        </Typography>
      )}

      {/* Pinned to the bottom so buttons line up across tiles */}
      <Box sx={{ mt: "auto", pt: 2.5 }}>
        <Box
          component="button"
          type="button"
          onClick={onQuote}
          aria-haspopup="dialog"
          sx={{
            border: 0,
            cursor: "pointer",
            px: 2.75,
            py: 1.1,
            borderRadius: 999,
            fontFamily: "inherit",
            fontSize: "0.98rem",
            fontWeight: 500,
            color: "#fff",
            backgroundColor: "#2794d2",
            transition: `background-color .25s ${EASE}`,
            "&:hover": { backgroundColor: "#1f86c1" },
            "&:focus-visible": { outline: "2px solid #fff", outlineOffset: 3 },
          }}
        >
          Get an Estimate
        </Box>
      </Box>
    </Box>
  </Box>
  );
};

PackageTile.propTypes = {
  pkg: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageSize: PropTypes.shape({ w: PropTypes.number, h: PropTypes.number }),
    imagePosition: PropTypes.string,
  }).isRequired,
  imageSize: PropTypes.shape({ w: PropTypes.number, h: PropTypes.number }).isRequired,
  imageFit: PropTypes.oneOf(["contain", "cover"]).isRequired,
  altSuffix: PropTypes.string.isRequired,
  onQuote: PropTypes.func.isRequired,
};

export default function AdditionalServices({
  heading,
  packages,
  imageSize = { w: 1100, h: 768 },
  imageFit = "contain",
  altSuffix = " window tint",
}) {
  const [open, setOpen] = useState(false);
  const count = packages.length;

  return (
    <Box component="section" aria-labelledby="additional-services-heading" sx={{ py: { xs: 8, md: 14 } }}>
      <Container maxWidth="lg">
        <Typography
          id="additional-services-heading"
          component="h2"
          sx={{
            color: "#f5f5f7",
            fontWeight: 700,
            fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.5rem" },
            lineHeight: 1.07,
            letterSpacing: "-0.025em",
            textAlign: "center",
            maxWidth: 860,
            mx: "auto",
            mb: { xs: 5, md: 8 },
          }}
        >
          {heading}
        </Typography>

        {/* Swipe row on phones; equal-height grid on tablet+ */}
        <Box
          sx={{
            display: { xs: "flex", sm: "grid" },
            gridTemplateColumns: {
              sm: "repeat(2, 1fr)",
              md: `repeat(${count >= 4 ? 4 : count}, 1fr)`,
            },
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
          {packages.map((pkg) => (
            <PackageTile
              key={pkg.title}
              pkg={pkg}
              imageSize={imageSize}
              imageFit={imageFit}
              altSuffix={altSuffix}
              onQuote={() => setOpen(true)}
            />
          ))}
        </Box>
      </Container>

      {/* Quote form — iframe only loads once the dialog opens */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
        aria-label="Get an estimate"
        PaperProps={{
          sx: {
            position: "relative",
            backgroundColor: "#1d1d1f",
            backgroundImage: "none",
            color: "#fff",
            borderRadius: { xs: "20px", md: "28px" },
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            overflow: "hidden",
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            },
          },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          aria-label="Close"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 1,
            width: 36,
            height: 36,
            color: "rgba(255,255,255,0.85)",
            backgroundColor: "rgba(255,255,255,0.14)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.24)" },
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
        <Box
          component="iframe"
          src={QUOTE_URL}
          title="Fast Quote"
          sx={{ display: "block", width: "100%", height: { xs: "80vh", md: 800 }, border: 0 }}
        />
      </Dialog>
    </Box>
  );
}

AdditionalServices.propTypes = {
  heading: PropTypes.string.isRequired,
  packages: PropTypes.arrayOf(PropTypes.object).isRequired,
  imageSize: PropTypes.shape({ w: PropTypes.number, h: PropTypes.number }),
  imageFit: PropTypes.oneOf(["contain", "cover"]),
  altSuffix: PropTypes.string,
};
