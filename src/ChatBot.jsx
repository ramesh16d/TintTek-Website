import { useRef, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Paper,
  Grid,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { trackEvent } from "./utils/analytics";

const BLUE = "#2794d2";

export default function Chatbot({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Welcome message when chatbot opens
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "👋 Hey there! Welcome to Tint Tek+. How can I help you with your window tinting today?",
        },
      ]);
    }
  }, [open, messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);
    trackEvent("chatbot_message_sent", "Chatbot", "User Message");

    try {
      const { data } = await axios.post(
        "https://tinttek-website-server.onrender.com/chat",
        // "http://localhost:5001/chat",
        { message: input }
      );
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      }, 700);
    } catch (error) {
      console.error("Error fetching response:", error);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "⚠️ Error connecting to AI. Please try again.",
          },
        ]);
      }, 700);
    }
  };

  if (!open) return null;

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <Paper
        elevation={0}
        component={motion.div}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 15 }}
        sx={{
          width: 360,
          height: 520,
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          // Glass background with blue sheen
          background:
            "radial-gradient(1200px 600px at 100% 100%, rgba(39,148,210,0.18), transparent 55%), rgba(10,12,16,0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(39,148,210,0.25)",
          boxShadow:
            "0 12px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            bgcolor: "rgba(8,10,14,0.75)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: "#e6f4ff",
                letterSpacing: 0.2,
              }}
            >
              Tint Tek+ Assistant
            </Typography>
          </Box>

          <Tooltip title="Close">
            <IconButton
              onClick={onClose}
              sx={{
                color: "#dbe8f5",
                "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.06)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Quick suggestions (optional) */}
        {messages.length <= 1 && (
          <Grid
            container
            spacing={1}
            sx={{ p: 1.5, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              "How much to tint Tesla Model 3?",
              "What are the benefits of window tinting?",
              "How long does install take?",
            ].map((s) => (
              <Grid item xs={12} sm="auto" key={s}>
                <Chip
                  label={s}
                  onClick={() => setInput(s)}
                  variant="outlined"
                  sx={{
                    width: "100%", // makes them align evenly
                    justifyContent: "center",
                    color: "#cfeaff",
                    borderColor: "rgba(39,148,210,0.35)",
                    bgcolor: "rgba(39,148,210,0.08)",
                    "&:hover": {
                      bgcolor: "rgba(39,148,210,0.14)",
                      borderColor: "rgba(39,148,210,0.6)",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => {
              const isUser = msg.sender === "user";
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 160, damping: 16 }}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "78%",
                      p: 1.25,
                      px: 1.75,
                      borderRadius: isUser
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                      fontSize: "0.95rem",
                      lineHeight: 1.35,
                      // Glass + brand coloring
                      background: isUser
                        ? `linear-gradient(135deg, ${BLUE}, #0f6aa6)`
                        : "rgba(255,255,255,0.08)",
                      color: isUser ? "#fff" : "#e8f4ff",
                      border: isUser
                        ? "1px solid rgba(255,255,255,0.15)"
                        : "1px solid rgba(255,255,255,0.12)",
                      boxShadow: isUser
                        ? "0 8px 20px rgba(39,148,210,0.35)"
                        : "0 8px 20px rgba(0,0,0,0.25)",
                      backdropFilter: isUser ? "none" : "blur(6px)",
                      WebkitBackdropFilter: isUser ? "none" : "blur(6px)",
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: msg.text.replace(/\n/g, "<br/>"),
                      }}
                    />
                  </Box>
                </motion.div>
              );
            })}

            {/* Typing animation */}
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Box
                  sx={{
                    p: 1,
                    px: 1.5,
                    borderRadius: "18px 18px 18px 4px",
                    background: "rgba(255,255,255,0.08)",
                    color: "#e8f4ff",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                >
                  <motion.span
                    style={{ display: "inline-flex", gap: 6 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <span>●</span>
                    <span>●</span>
                    <span>●</span>
                  </motion.span>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </Box>

        {/* Input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1.25,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background:
              "linear-gradient(180deg, rgba(8,10,14,0.6), rgba(8,10,14,0.75))",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#e6f4ff",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 999,
                px: 1,
                "& fieldset": {
                  borderColor: "rgba(39,148,210,0.35)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(39,148,210,0.6)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: BLUE,
                  boxShadow: `0 0 0 3px rgba(39,148,210,0.25)`,
                },
                "& input": { py: 1.2 },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(230,244,255,0.65)",
                opacity: 1,
              },
            }}
          />

          <Tooltip title="Send">
            <IconButton
              onClick={sendMessage}
              sx={{
                color: "#fff",
                bgcolor: BLUE,
                borderRadius: 999,
                width: 42,
                height: 42,
                boxShadow: "0 10px 22px rgba(39,148,210,0.35)",
                transition: "all .2s ease",
                "&:hover": {
                  bgcolor: "#1f86c1",
                  transform: "translateY(-1px)",
                  boxShadow: "0 14px 28px rgba(39,148,210,0.45)",
                },
                "&:active": { transform: "translateY(0px)" },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Subtle outer glow accent */}
        <Box
          aria-hidden
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            borderRadius: 4,
            boxShadow: `0 0 120px 20px rgba(39,148,210,0.18) inset`,
          }}
        />
      </Paper>
    </Box>
  );
}
