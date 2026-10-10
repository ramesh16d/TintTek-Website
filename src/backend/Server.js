require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const mongoose = require("mongoose");
const { OpenAI } = require("openai");
const Message = require("./models/Message"); // Message model

const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Security headers
app.use((req, res, next) => {
  // Force HTTPS for 1 year, include subdomains, allow preload list submission
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  // Prevent MIME-type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Block clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  // Control referrer information
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Cache-Control tiers for static assets
app.use((req, res, next) => {
  const p = req.path;
  if (/^\/assets\//.test(p)) {
    // Hashed filenames — safe to cache forever
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else if (/\.(webp|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|otf)$/i.test(p)) {
    // Images and fonts — 30 days
    res.setHeader("Cache-Control", "public, max-age=2592000");
  } else if (/\.(mp4|webm|mov)$/i.test(p)) {
    // Videos — 7 days
    res.setHeader("Cache-Control", "public, max-age=604800");
  } else if (/\.html$/i.test(p) || p === "/" || !p.includes(".")) {
    // HTML and SPA routes — 1 hour, must revalidate
    res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
  }
  next();
});

// Serve prerendered static files from dist/
const distDir = path.resolve(__dirname, "../../dist");
app.use(express.static(distDir));

const PORT = process.env.PORT || 5001;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ File paths
const FAQ_PATH = __dirname + "/data/training_data.json";
const USER_MESSAGES_PATH = __dirname + "/data/user_messages.json";
const conversationHistory = []; // Stores an array of messages [{ role: "user", content: "..." }, ...]

// ✅ Store in JSON file (optional local backup)
const storeUserMessageToFile = (userMessage, botReply) => {
  const newEntry = {
    timestamp: new Date().toISOString(),
    userMessage,
    botReply,
  };

  let currentData = [];

  try {
    if (fs.existsSync(USER_MESSAGES_PATH)) {
      const raw = fs.readFileSync(USER_MESSAGES_PATH, "utf8");
      currentData = JSON.parse(raw);
    }
  } catch (err) {
    console.error("❌ Error reading user messages file:", err);
  }

  currentData.push(newEntry);

  try {
    fs.writeFileSync(USER_MESSAGES_PATH, JSON.stringify(currentData, null, 2));
    console.log("📝 Stored user message to file.");
  } catch (err) {
    console.error("❌ Error writing user message file:", err);
  }
};

// ✅ Load FAQ JSON
let faqData = [];
let faqEmbeddings = [];

const loadFAQData = () => {
  try {
    const data = fs.readFileSync(FAQ_PATH, "utf8");
    faqData = JSON.parse(data);
    console.log("✅ Loaded FAQ Data:", faqData.length, "entries");
  } catch (error) {
    console.error("❌ Error loading FAQ data:", error);
  }
};

// ✅ Get Embedding
const getEmbedding = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("❌ Error generating embedding:", error);
    return null;
  }
};

// ✅ Preload all FAQ Embeddings
const preloadEmbeddings = async () => {
  for (const faq of faqData) {
    const embedding = await getEmbedding(faq.question);
    if (embedding) {
      faqEmbeddings.push({ ...faq, embedding });
    }
  }
  console.log("✅ Preloaded FAQ Embeddings");
};

// ✅ Cosine Similarity
const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

// ✅ Find Best Match
const findBestMatchAI = async (userMessage) => {
  const userEmbedding = await getEmbedding(userMessage);
  if (!userEmbedding) return null;

  let bestMatch = null;
  let highestSimilarity = -1;

  for (const faq of faqEmbeddings) {
    const similarity = cosineSimilarity(userEmbedding, faq.embedding);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = faq;
    }
  }

  return { bestMatch, similarityScore: highestSimilarity };
};

const tintPricing = {
  tesla_model_s: {
    ctx: "$329",
    pinnacle: "$529",
  },
  tesla_model_3: {
    ctx: "$449",
    pinnacle: "$589",
  },
  tesla_model_x: {
    ctx: "$589",
    pinnacle: "$749",
  },
  tesla_model_y: {
    ctx: "$389",
    pinnacle: "$589",
  },
  tesla_cybertruck: {
    ctx: "$485",
    pinnacle: "$685",
  },
  truck: {
    classic: "$249",
    ctx: "$349",
    pinnacle: "$549",
    stratos: "$769",
  },
  full_suv: {
    classic: "$289",
    ctx: "$389",
    pinnacle: "$589",
    stratos: "$849",
  },
  mid_suv: {
    classic: "$249",
    ctx: "$349",
    pinnacle: "$549",
    stratos: "$769",
  },
  sedan: {
    classic: "$229",
    ctx: "$329",
    pinnacle: "$529",
    stratos: "$729",
  },
  coupe: {
    classic: "$199",
    ctx: "$289",
    pinnacle: "$389",
    stratos: "$689",
  },
  two_windows: {
    classic: "$85",
    ctx: "$119",
    pinnacle: "$149",
    stratos: "$199",
  },
};

// ✅ Generate Response
// const generateAIResponse = async (userMessage, history = []) => {
//   try {
//     const { bestMatch, similarityScore } = await findBestMatchAI(userMessage);

//     const systemMessage = {
//       role: "system",
//       content:
//         "You are a helpful assistant for a tinting business. Use the FAQ when available. If there's no FAQ match, do your best to respond and include a warm suggestion to contact our tinting experts at (972) 362-8468.",
//     };

//     const messages = [systemMessage, ...history];

//     if (bestMatch && similarityScore >= 0.5) {
//       messages.push({
//         role: "assistant",
//         content: `Here is a FAQ that might help:\nQ: ${bestMatch.question}\nA: ${bestMatch.answer}`,
//       });
//     }

//     messages.push({ role: "user", content: userMessage });

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages,
//       max_tokens: 300,
//     });

//     return completion.choices[0].message.content.trim();
//   } catch (error) {
//     console.error("❌ Error generating AI response:", error);
//     return "Oops! Something went wrong. Please try again later or contact us directly.";
//   }
// };

const generateAIResponse = async (userMessage, history = []) => {
  try {
    const isPriceQuestion =
      /price|cost|how much/i.test(userMessage) && /tint/i.test(userMessage);

    if (isPriceQuestion) {
      const categorizationPrompt = `
        You are a car expert working for a tinting business. From the following user input, extract:
        1. The full vehicle description (e.g., "2022 Ford F-150")
        2. The vehicle category for pricing purposes. Valid categories are:
           - coupe, sedan, full_suv, mid_suv, truck, two_windows
           - tesla_model_s, tesla_model_3, tesla_model_x, tesla_model_y, tesla_cybertruck

        Respond in the format:
        Vehicle: <description>
        Category: <one of the categories above>

        User: "${userMessage}"
      `;

      const categoryResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You categorize vehicles and extract their names for pricing purposes.",
          },
          { role: "user", content: categorizationPrompt },
        ],
        max_tokens: 100,
      });

      const replyText = categoryResponse.choices[0].message.content.trim();
      const vehicleMatch = replyText.match(/Vehicle:\s*(.*)/i);
      const categoryMatch = replyText.match(/Category:\s*(.*)/i);

      const vehicleDescription = vehicleMatch
        ? vehicleMatch[1].trim()
        : "your vehicle";
      const carCategory = categoryMatch
        ? categoryMatch[1].trim().toLowerCase()
        : null;

      if (tintPricing[carCategory]) {
        const prices = tintPricing[carCategory];
        const readableCategory = carCategory.replace(/_/g, " ").toUpperCase();
        // Build price message without showing unavailable films
        const buildPriceMessage = (vehicleDescription, prices) => {
          const lines = [];

          // Only include Classic if it's actually offered for this category
          if (
            Object.prototype.hasOwnProperty.call(prices, "classic") &&
            prices.classic
          ) {
            lines.push(`• F1 Classic Series: ${prices.classic}`);
          }

          if (prices.ctx) lines.push(`• Llumar CTX: ${prices.ctx}`);
          if (prices.pinnacle) lines.push(`• F1 Pinnacle Series:: ${prices.pinnacle}`);
          if (prices.stratos) lines.push(`• Llumar Stratos: ${prices.stratos}`);

          // If somehow nothing is available, fall back to a friendly note
          const body = lines.length
            ? lines.join("\n")
            : "Pricing for this configuration is custom. Please call us for a quick quote.";

          return (
            `Based on your ${vehicleDescription}, here are the following tinting prices for all side windows and back glass:\n\n` +
            `${body}\n\n` +
            `Need help choosing? Call us at (972) 362-8468!`
          );
        };

        return buildPriceMessage(vehicleDescription, prices);
      }
    }

    // ✅ Fallback to FAQ
    const { bestMatch, similarityScore } = await findBestMatchAI(userMessage);

    const systemMessage = {
      role: "system",
      content:
        "You are a helpful assistant for a tinting business. Use the FAQ when available. If there's no FAQ match, do your best to respond and include a warm suggestion to contact our tinting experts at (972) 362-8468.",
    };

    const messages = [systemMessage, ...history];

    if (bestMatch && similarityScore >= 0.5) {
      messages.push({
        role: "assistant",
        content: `Here is a FAQ that might help:\nQ: ${bestMatch.question}\nA: ${bestMatch.answer}`,
      });
    }

    messages.push({ role: "user", content: userMessage });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 300,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("❌ Error generating AI response:", error);
    return "Oops! Something went wrong. Please try again later or contact us directly.";
  }
};

// ✅ Load and Start Server
loadFAQData();

preloadEmbeddings().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

// ✅ Google Reviews Endpoint
app.get("/api/google-reviews", async (req, res) => {
  try {
    const { GOOGLE_PLACE_ID, GOOGLE_PLACES_API_KEY } = process.env;

    if (!GOOGLE_PLACE_ID || !GOOGLE_PLACES_API_KEY) {
      return res.status(500).json({ error: "Missing Google Places configuration" });
    }

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: GOOGLE_PLACE_ID,
          fields: "reviews",
          key: GOOGLE_PLACES_API_KEY,
        },
      }
    );

    if (!response.data || !response.data.result || !response.data.result.reviews) {
      return res.status(404).json({ error: "No reviews found" });
    }

    // Sort by time (most recent first) and take top 4
    const reviews = response.data.result.reviews
      .sort((a, b) => b.time - a.time)
      .slice(0, 4);

    res.json(reviews);
  } catch (error) {
    console.error("❌ Error fetching Google reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// ✅ Chat Endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("📩 User Input:", message);

    // Add user message to memory
    conversationHistory.push({ role: "user", content: message });

    // Get AI reply using previous conversation context
    const botReply = await generateAIResponse(message, conversationHistory);

    // Add assistant reply to memory
    conversationHistory.push({ role: "assistant", content: botReply });

    // Store message
    await Message.create({ userMessage: message, botReply });
    storeUserMessageToFile(message, botReply);

    res.json({ reply: botReply });
  } catch (error) {
    console.error("❌ Error in /chat endpoint:", error);
    res.status(500).json({
      reply: "Oops! Something went wrong. Please contact us at (972) 362-8468.",
    });
  }
});

// Known SPA routes — anything not in this list gets a 404 status (but still serves
// index.html so React Router can render the custom NotFound component client-side).
const knownRoutes = [
  /^\/$/,
  /^\/services\/[^/]+$/,
  /^\/blogs$/,
  /^\/blog\/[^/]+$/,
  /^\/gallery$/,
  /^\/support$/,
  /^\/privacy-policy$/,
  /^\/chat$/,
  /^\/mockup$/,
  /^\/simulators\/commercial-window-tinting$/,
  /^\/simulators\/residential-window-tinting$/,
  /^\/simulators\/tesla-window-tinting$/,
  /^\/simulators\/vehicle-window-tinting$/,
  /^\/simulators\/vehicle-paint-protection$/,
];

app.get("*", (req, res) => {
  const isKnownRoute = knownRoutes.some((pattern) => pattern.test(req.path));
  if (!isKnownRoute) {
    return res.status(404).sendFile(path.join(distDir, "index.html"));
  }
  res.sendFile(path.join(distDir, "index.html"));
});
