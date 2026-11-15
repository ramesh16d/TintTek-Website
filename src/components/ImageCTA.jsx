// src/components/ImageCTA.jsx
// Thin wrapper — the layout and copy live in the shared ServiceCTA component.
import { useParams } from "react-router-dom";
import ServiceCTA from "./ServiceCTA";

export default function ImageCTA() {
  const { serviceId } = useParams();
  return <ServiceCTA serviceId={serviceId} fallback="vehicle-paint-correction" />;
}
