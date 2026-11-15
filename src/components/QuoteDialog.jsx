// src/components/QuoteDialog.jsx
// Apple-style dialog that hosts a Tint Wiz quote form. The iframe is only
// mounted while the dialog is open.
import PropTypes from "prop-types";
import { Box, Dialog, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function QuoteDialog({ open, onClose, formUrl, title = "Fast Quote" }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      aria-label={title}
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
        onClick={onClose}
        aria-label="Close quote form"
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
        src={formUrl}
        title={title}
        sx={{ display: "block", width: "100%", height: { xs: "80vh", md: 800 }, border: 0 }}
      />
    </Dialog>
  );
}

QuoteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
};
