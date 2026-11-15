// src/components/TintPackages.jsx
// Package data only — layout lives in the shared AdditionalServices component.
import AdditionalServices from "./AdditionalServices";

const tintPackages = [
  {
    title: "Window Strip",
    price: "Starting at $50",
    image: "/v-window-tint/v-visor-strip.webp",
    description:
      "A narrow strip across the top of the windshield to block excessive glare.",
  },
  {
    title: "Front 2 Window Match",
    price: "Starting at $85",
    image: "/v-window-tint/v-front-two.webp",
    description:
      "Match the front windows to the factory tint of the rear windows.",
  },
  {
    title: "Full Windshield",
    price: "Starting at $249",
    image: "/v-window-tint/v-windshield.webp",
    description:
      "A full-tint windshield package for optimal UV and heat rejection.",
  },
  {
    title: "Single Pane Sunroof",
    price: "Starting at $100",
    image: "/v-window-tint/v-sunroof.webp",
    description:
      "A full-tint sunroof package for optimal UV and heat rejection.",
  },
];

const TintPackages = () => (
  <AdditionalServices
    heading="Additional Vehicle Window Tinting Services"
    packages={tintPackages}
    imageSize={{ w: 1100, h: 768 }}
  />
);

export default TintPackages;
