// src/components/TeslaTintPackages.jsx
// Package data only — layout lives in the shared AdditionalServices component.
import AdditionalServices from "./AdditionalServices";

const tintPackages = [
  {
    title: "Window Strip",
    price: "Starting at $50",
    image: "/t-window-tint/t-visor-strip.webp",
    description:
      "A narrow strip across the top of the windshield to block excessive glare.",
  },
  {
    title: "Front 2 Window Match",
    price: "Starting at $119",
    image: "/t-window-tint/t-front-two.webp",
    description:
      "Match the front windows to the factory tint of the rear windows.",
  },
  {
    title: "Full Windshield",
    price: "Starting at $249",
    image: "/t-window-tint/t-windshield.webp",
    description:
      "A full-tint windshield package for optimal UV and heat rejection.",
  },
  // {
  //   title: "Full Vehicle Surround",
  //   price: "Starting at $399",
  //   image: "/t-window-tint/tesla-full.webp",
  //   description:
  //     "Complete tint coverage for maximum privacy, comfort, and style.",
  // },
  {
    title: "Full Sunroof",
    price: "Starting at $200",
    image: "/t-window-tint/t-sunroof.webp",
    description:
      "Complete tint coverage for maximum privacy, comfort, and style.",
  },
];

const TeslaTintPackages = () => (
  <AdditionalServices
    heading="Additional Tesla Window Tinting Services"
    packages={tintPackages}
    imageSize={{ w: 900, h: 448 }}
  />
);

export default TeslaTintPackages;
