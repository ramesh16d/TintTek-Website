// src/components/TeslaFilmLineup.jsx
import React from "react";
import { Box, Typography, Container } from "@mui/material";

const ACCENT = "#2794d2";
const ACCENT_LIGHT = "#4db8f0";
// Looking out through a Tesla window toward the bright bay doors — tint darkens this view.
const PREVIEW_PHOTO = "/tesla/Tint Tek-195.webp";

// "20% rear / 35% front" -> [{ vlt: 20, label: "Rear" }, { vlt: 35, label: "Front" }]
// "35% (legal on all windows)" -> [{ vlt: 35, label: null }]
// "N/A — paint protection" / "Optically clear" -> []
function parseShades(vlt = "") {
  const shades = [];
  const re = /(\d{1,3})%\s*(front|rear)?/gi;
  let m;
  while ((m = re.exec(vlt)) && shades.length < 2) {
    const label = m[2] ? m[2][0].toUpperCase() + m[2].slice(1).toLowerCase() : null;
    shades.push({ vlt: Math.min(100, Number(m[1])), label });
  }
  return shades;
}

function parsePercent(text = "") {
  const m = /(\d{1,3})%/.exec(text);
  return m ? Math.min(100, Number(m[1])) : null;
}

// "LLumar IRX Nano-Ceramic (Roof)" -> { base: "LLumar IRX Nano-Ceramic", placement: "Roof" }
function splitName(name = "") {
  const m = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(name);
  return m ? { base: m[1], placement: m[2] } : { base: name, placement: null };
}

function ShadePane({ vlt, label, showDivider }) {
  // Approximate: overlay darkness scales with the light the film blocks.
  const darkness = vlt == null ? 0 : ((100 - vlt) / 100) * 0.88;
  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        borderLeft: showDivider ? "1px solid rgba(255,255,255,0.35)" : "none",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, background: `rgba(5,8,12,${darkness})` }} />
      {/* Bottom fade keeps the label readable on light (high-VLT) shades */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "60%",
          background: "linear-gradient(to top, rgba(5,8,12,0.6), rgba(5,8,12,0))",
        }}
      />
      {vlt == null && (
        // Non-tint products (PPF, windshield film) are optically clear
        <Typography
          sx={{
            position: "absolute",
            left: 14,
            bottom: 12,
            color: "#fff",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            px: 1.25,
            py: 0.5,
            borderRadius: 1,
            background: "rgba(5,8,12,0.55)",
          }}
        >
          Clear film
        </Typography>
      )}
      {vlt != null && (
        <Box sx={{ position: "absolute", left: 14, bottom: 12, color: "#fff" }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.9rem", lineHeight: 1 }}>
            {vlt}%
          </Typography>
          <Typography
            sx={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.85,
              mt: 0.5,
            }}
          >
            {label ? `${label} · VLT` : "VLT"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function FilmCard({ film, index }) {
  const shades = parseShades(film.vlt);
  const heat = parsePercent(film.heatRejection);
  const { base, placement } = splitName(film.name);

  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.03)",
        transition: "border-color .25s",
        "&:hover": { borderColor: "rgba(39,148,210,0.45)" },
      }}
    >
      {/* Shade preview */}
      <Box
        role="img"
        aria-label={`Approximate shade preview: ${film.vlt}`}
        sx={{
          position: "relative",
          height: 170,
          display: "flex",
          backgroundImage: `url("${PREVIEW_PHOTO}")`,
          backgroundSize: "cover",
          backgroundPosition: "72% 35%",
        }}
      >
        {shades.length > 0 ? (
          shades.map((s, i) => (
            <ShadePane key={i} vlt={s.vlt} label={s.label} showDivider={i > 0} />
          ))
        ) : (
          <ShadePane vlt={null} />
        )}
        <Typography
          sx={{
            position: "absolute",
            top: 12,
            right: 14,
            color: "rgba(255,255,255,0.9)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </Typography>
      </Box>

      {/* Details */}
      <Box sx={{ p: { xs: 2.5, md: 3 }, display: "flex", flexDirection: "column", flex: 1 }}>
        {placement && (
          <Typography
            sx={{
              alignSelf: "flex-start",
              color: ACCENT_LIGHT,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            {placement}
          </Typography>
        )}
        <Typography
          component="h3"
          sx={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", lineHeight: 1.3, mb: 1.5 }}
        >
          {base}
        </Typography>
        <Typography
          sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.65, mb: 3 }}
        >
          {film.highlight}
        </Typography>

        {/* Specs pinned to the bottom so cards line up */}
        <Box sx={{ mt: "auto", borderTop: "1px solid rgba(255,255,255,0.08)", pt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1 }}>
            <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem" }}>
              Heat rejection
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600, textAlign: "right" }}
            >
              {film.heatRejection}
            </Typography>
          </Box>
          {heat != null && (
            <Box
              sx={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)", mb: 2 }}
              aria-hidden="true"
            >
              <Box
                sx={{
                  width: `${heat}%`,
                  height: "100%",
                  borderRadius: 3,
                  background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                }}
              />
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem" }}>
              Shade (VLT)
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.85rem",
                textAlign: "right",
              }}
            >
              {film.vlt}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function TeslaFilmLineup({ model }) {
  const films = model.filmRecommendations || [];
  if (films.length === 0) return null;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "flex-end" },
            justifyContent: "space-between",
            gap: { xs: 2, md: 6 },
            mb: { xs: 4, md: 5 },
          }}
        >
          <Box sx={{ maxWidth: 640 }}>
            <Typography
              sx={{
                color: ACCENT,
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Film lineup
            </Typography>
            <Typography
              component="h2"
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: { xs: "1.8rem", md: "2.4rem" },
                lineHeight: 1.15,
              }}
            >
              Recommended Films for the {model.displayName}
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
              maxWidth: 380,
              fontSize: "0.95rem",
            }}
          >
            We tailor the film to your {model.name}&apos;s configuration, how you drive, and
            how much privacy you want. Shade previews are approximate.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 2.5, md: 3 },
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: `repeat(${Math.min(films.length, 3)}, 1fr)`,
            },
          }}
        >
          {films.map((film, i) => (
            <FilmCard key={film.name} film={film} index={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
