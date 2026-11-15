// src/components/TeslaGlassZones.jsx
import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";

const ACCENT = "#2794d2";
const ACCENT_LIGHT = "#4db8f0";

// Map a glassDetails line to a zone on the top-down diagram.
function zoneFor(label) {
  const t = label.toLowerCase();
  if (/roof|sunroof/.test(t)) return "roof";
  if (/rear windshield|liftgate|rear cab|rear window/.test(t)) return "rear";
  if (/windshield/.test(t)) return "windshield";
  if (/front side/.test(t)) return "frontSide";
  if (/rear side|falcon wing|row/.test(t)) return "rearSide";
  return null;
}

// "Optional full-glass roof (panoramic) — dual-pane laminated glass"
// -> { label: "Full-glass roof (panoramic)", detail: "dual-pane laminated glass", optional: true }
function parseLine(line) {
  const [rawLabel, ...rest] = line.split(" — ");
  const optional = /^optional\s+/i.test(rawLabel);
  const cleaned = rawLabel.replace(/^optional\s+/i, "");
  const label = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return { label, detail: rest.join(" — "), optional, zone: zoneFor(rawLabel) };
}

// Top-down car schematic (front at the top). Left/right paths share a zone.
const ZONE_PATHS = {
  windshield: ["M58 128 Q110 104 162 128 L154 168 Q110 156 66 168 Z"],
  roof: ["M68 174 H152 Q156 174 156 178 V298 Q156 302 152 302 H68 Q64 302 64 298 V178 Q64 174 68 174 Z"],
  frontSide: ["M46 160 L58 172 L58 228 L44 228 Z", "M174 160 L162 172 L162 228 L176 228 Z"],
  rearSide: ["M44 234 L58 234 L58 290 L47 300 Z", "M176 234 L162 234 L162 290 L173 300 Z"],
  rear: ["M66 308 Q110 318 154 308 L162 342 Q110 360 58 342 Z"],
};

function CarDiagram({ presentZones, activeZone, onSelect, modelName }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 220 440"
      role="img"
      aria-label={`Top-down diagram of the ${modelName} glass zones`}
      sx={{ width: "100%", maxWidth: { xs: 220, md: 300 }, height: "auto", display: "block", mx: "auto" }}
    >
      <text
        x="110"
        y="12"
        textAnchor="middle"
        fill="rgba(255,255,255,0.45)"
        fontSize="9"
        fontWeight="700"
        letterSpacing="2"
      >
        FRONT
      </text>
      {/* Wheels */}
      {[
        [22, 78],
        [186, 78],
        [22, 330],
        [186, 330],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="12" height="52" rx="5" fill="#07090c" />
      ))}
      {/* Body */}
      <path
        d="M110 22 C160 22 186 40 188 90 L190 360 C190 400 160 418 110 418 C60 418 30 400 30 360 L32 90 C34 40 60 22 110 22 Z"
        fill="#1b2129"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
      />
      {/* Mirrors */}
      <ellipse cx="25" cy="166" rx="8" ry="5" fill="#1b2129" stroke="rgba(255,255,255,0.18)" />
      <ellipse cx="195" cy="166" rx="8" ry="5" fill="#1b2129" stroke="rgba(255,255,255,0.18)" />

      {Object.entries(ZONE_PATHS).map(([zone, paths]) => {
        const present = presentZones.has(zone);
        const active = activeZone === zone;
        const fill = active
          ? "rgba(77,184,240,0.75)"
          : present
            ? "rgba(39,148,210,0.28)"
            : "rgba(255,255,255,0.04)";
        const stroke = active || present ? "rgba(77,184,240,0.75)" : "rgba(255,255,255,0.12)";
        return (
          <g
            key={zone}
            onClick={present ? () => onSelect(zone) : undefined}
            style={{ cursor: present ? "pointer" : "default", transition: "fill .2s" }}
          >
            {paths.map((d) => (
              <path
                key={d}
                d={d}
                fill={fill}
                stroke={stroke}
                strokeWidth="1.2"
                strokeDasharray={present ? undefined : "3 3"}
                style={{ transition: "fill .2s, stroke .2s" }}
              />
            ))}
          </g>
        );
      })}
    </Box>
  );
}

export default function TeslaGlassZones({ model }) {
  const [activeZone, setActiveZone] = useState(null);
  const lines = model.glassDetails || [];
  if (lines.length === 0) return null;

  const notes = lines.filter((l) => /^note:/i.test(l)).map((l) => l.replace(/^note:\s*/i, ""));
  const zones = lines.filter((l) => !/^note:/i.test(l)).map(parseLine);
  const presentZones = new Set(zones.map((z) => z.zone).filter(Boolean));

  return (
    <Box component="section" sx={{ pb: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
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
          Glass map
        </Typography>
        <Typography
          component="h2"
          sx={{
            color: "#fff",
            fontWeight: 800,
            fontSize: { xs: "1.8rem", md: "2.4rem" },
            lineHeight: 1.15,
            mb: 1.5,
          }}
        >
          {model.displayName} Glass Configuration
        </Typography>
        <Typography
          sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: 620, mb: { xs: 4, md: 6 } }}
        >
          Every pane on the {model.name} is a different shape and glass type, and each one gets its
          own film and technique. Tap a zone to see where it sits.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(240px, 5fr) 7fr" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
          }}
        >
          <CarDiagram
            presentZones={presentZones}
            activeZone={activeZone}
            onSelect={setActiveZone}
            modelName={model.displayName}
          />

          <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0 }}>
            {zones.map((z, i) => {
              const active = z.zone && activeZone === z.zone;
              return (
                <Box
                  component="li"
                  key={z.label}
                  tabIndex={z.zone ? 0 : -1}
                  onMouseEnter={() => z.zone && setActiveZone(z.zone)}
                  onFocus={() => z.zone && setActiveZone(z.zone)}
                  onClick={() => z.zone && setActiveZone(z.zone)}
                  sx={{
                    display: "flex",
                    gap: 2.5,
                    py: 2.25,
                    pl: 2,
                    pr: 1,
                    borderTop: i === 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    borderLeft: `3px solid ${active ? ACCENT_LIGHT : "transparent"}`,
                    background: active ? "rgba(39,148,210,0.08)" : "transparent",
                    cursor: z.zone ? "pointer" : "default",
                    outline: "none",
                    transition: "background .2s, border-color .2s",
                    "&:focus-visible": { boxShadow: `inset 0 0 0 2px ${ACCENT}` },
                  }}
                >
                  <Typography
                    sx={{
                      color: active ? ACCENT_LIGHT : "rgba(255,255,255,0.4)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      fontVariantNumeric: "tabular-nums",
                      pt: 0.4,
                      minWidth: 22,
                      transition: "color .2s",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
                      <Typography
                        component="h3"
                        sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "1rem", md: "1.08rem" } }}
                      >
                        {z.label}
                      </Typography>
                      {z.optional && (
                        <Typography
                          component="span"
                          sx={{
                            color: ACCENT_LIGHT,
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            border: "1px solid rgba(77,184,240,0.45)",
                            borderRadius: 1,
                            px: 0.75,
                            py: 0.15,
                          }}
                        >
                          Optional
                        </Typography>
                      )}
                    </Box>
                    {z.detail && (
                      <Typography
                        sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.93rem", lineHeight: 1.6, mt: 0.5 }}
                      >
                        {z.detail.charAt(0).toUpperCase() + z.detail.slice(1)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {notes.map((note) => (
          <Typography
            key={note}
            sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", mt: 3, fontStyle: "italic" }}
          >
            Note: {note}
          </Typography>
        ))}
      </Container>
    </Box>
  );
}
