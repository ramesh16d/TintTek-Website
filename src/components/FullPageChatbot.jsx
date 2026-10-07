import { useRef, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Paper,
  useMediaQuery
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function FullPageChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hi there! How can I assist you today?",
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    try {
      const { data } = await axios.post("https://tinttek-website-server.onrender.com/chat", {
        // const { data } = await axios.post("http://localhost:5001/chat", {
        message: input,
      });

      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.reply },
        ]);
      }, 1200);
    } catch (error) {
      console.error("Error fetching response:", error);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ Sorry, there was a connection error." },
        ]);
      }, 1200);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: "#0f0f13"
      }}
    >
    <Box
      sx={{
        width: isMobile ? "100%" : "70%",
        height: isMobile ? "90vh" : "100vh",
        pt: "64px",
        backgroundColor: "#0f0f13",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins, sans-serif",
        m: "0 auto"
      }}
    >
      {/* Header */}
      {/* <Box
        sx={{
          p: 2,
          bgcolor: "#000",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      > */}
        {/* <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Tint Tek + Virtual Assistant
        </Typography> */}
      {/* </Box> */}

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Typography
                sx={{
                  maxWidth: "70%",
                  p: 2,
                  borderRadius: "20px",
                  fontSize: "1rem",
                  background:
                    msg.sender === "user"
                      ? "linear-gradient(135deg, #007AFF, #0056D2)"
                      : "#e0e0e0",
                  color: msg.sender === "user" ? "white" : "black",
                  whiteSpace: "pre-line",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: msg.text.replace(/\n/g, "<br>"),
                  }}
                />
              </Typography>
            </motion.div>
          ))}

          {/* Typing animation */}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography
                sx={{
                  background: "#E5E5EA",
                  color: "black",
                  borderRadius: "20px",
                  p: 1.5,
                  fontSize: "1rem",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  display: "inline-block",
                }}
              >
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Typing...
                </motion.span>
              </Typography>
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
          p: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundColor: "rgba(255,255,255,0.05)",
        }}
      >
        <TextField
          fullWidth
          size="medium"
          variant="outlined"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          sx={{
            input: {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: "12px",
            },
          }}
        />
        <IconButton onClick={sendMessage} sx={{ color: "#2794d2", ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
    </Box>
  );
}
