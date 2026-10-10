import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getQuoteFormUrl, getQuoteService, getThankYouPath } from "../data/quoteServices";
import { pushDataLayerEvent, setLastPageVisited } from "../utils/analytics";

const localTest = import.meta.env.DEV && import.meta.env.MODE === "quote-test";

// Every service's popup and bottom form goes through the same configuration.
// Production success redirects are owned by TintWiz, not iframe load events.
// eslint-disable-next-line react/prop-types
export default function QuoteForm({ src, title, ...iframeProps }) {
  const params = useParams();
  const { pathname } = useLocation();
  // The shared header sits outside the service route's parameter context.
  const serviceId = params.serviceId || pathname.match(/^\/services\/([^/]+)\/?$/)?.[1];
  const navigate = useNavigate();
  const service = getQuoteService(serviceId);

  if (!localTest) {
    return <iframe {...iframeProps} title={title} src={getQuoteFormUrl(serviceId, src, import.meta.env)} />;
  }

  const submit = (event) => {
    event.preventDefault();
    // Native required/email validation runs first. No input values are stored
    // or sent anywhere; this is only a local success-navigation simulation.
    setLastPageVisited(window.location.pathname);
    pushDataLayerEvent("quote_test_submit", { service: service?.eventService || "general", test_mode: true });
    navigate(getThankYouPath(serviceId));
  };

  return (
    <Box component="form" onSubmit={submit} data-testid="quote-test-form"
      sx={{ p: 4, pt: 6, bgcolor: "#fff", color: "#17212b", display: "grid", gap: 2, minHeight: 420 }}>
      <Typography variant="h5" component="h2">Local test: {service?.label || "General quote"}</Typography>
      <Typography>This simulates a successful form submission. No lead is sent to TintWiz and no conversion is sent to Google.</Typography>
      <TextField label="Test name" name="testName" required autoComplete="off" />
      <TextField label="Test email" name="testEmail" type="email" required autoComplete="off" />
      <Button type="submit" variant="contained">Simulate successful submission</Button>
      <Typography variant="body2">Expected destination: {getThankYouPath(serviceId)}</Typography>
    </Box>
  );
}
