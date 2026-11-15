// src/components/landing-pages/BrandHero.jsx
// Brand-page hero: maps brand data onto the shared LandingHero.
// Everything shown comes from the brand's own data (brandData.js /
// brandSeoContent.js) — e.g. each brand's real warranty, not the window-tint
// "89% heat rejection / lifetime warranty" stat images the old Hero showed on
// every brand page.
import PropTypes from "prop-types";
import LandingHero from "./LandingHero";

export default function BrandHero({ brand, extra }) {
  return (
    <LandingHero
      eyebrow={extra.seo.eyebrow}
      headline={brand.h1}
      subtitle={brand.heroSubtitle}
      points={extra.heroPoints}
      pointsLabel={`Why ${brand.name}`}
      trust={{ ...extra.warranty, showBadge: extra.showBadge }}
    />
  );
}

BrandHero.propTypes = {
  brand: PropTypes.shape({
    name: PropTypes.string.isRequired,
    h1: PropTypes.string.isRequired,
    heroSubtitle: PropTypes.string.isRequired,
  }).isRequired,
  extra: PropTypes.shape({
    showBadge: PropTypes.bool,
    seo: PropTypes.shape({ eyebrow: PropTypes.string }).isRequired,
    heroPoints: PropTypes.array.isRequired,
    warranty: PropTypes.shape({ title: PropTypes.string, body: PropTypes.string }).isRequired,
  }).isRequired,
};
