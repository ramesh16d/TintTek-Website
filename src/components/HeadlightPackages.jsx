// src/components/HeadlightPackages.jsx
// Package data only — layout lives in the shared AdditionalServices component.
import AdditionalServices from "./AdditionalServices";

const headlightPackages = [
  {
    title: "Headlight Tint (2 Pair)",
    price: "$175",
    // Resized from the 4105×5340 (3.2 MB) original, which is still used as the OG image
    image: "/headlight/headlight-900.webp",
    imageSize: { w: 900, h: 1171 },
    imagePosition: "center 30%", // keep the headlight + grille in frame
  },
  {
    title: "Taillight Tint (2 Pair)",
    price: "$175",
    image: "/headlight/taillight.webp",
    imageSize: { w: 735, h: 519 },
    imagePosition: "58% center", // centre on the tinted taillight
  },
  {
    title: "Reflectors (2 Pair)",
    price: "$75",
    image: "/headlight/reflector.webp",
    imageSize: { w: 1200, h: 1200 },
  },
];

const HeadlightPackages = () => (
  <AdditionalServices
    heading="Headlight Services & Pricing"
    packages={headlightPackages}
    imageFit="cover"
    altSuffix=""
  />
);

export default HeadlightPackages;
