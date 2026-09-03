import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Helper for lazy Gemini initialization
  const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "StrideIQ" });
  });

  // AI Coach API Route
  app.post("/api/gemini/coach", async (req, res) => {
    try {
      const { prompt, userProfile, currentWorkout, conversationHistory } = req.body;
      const ai = getAI();

      const systemInstruction = `You are StrideIQ AI Coach, an elite endurance running and HYROX physical race performance strategist.
Your expertise covers periodized training, VDOT pacing, lactate threshold development, HYROX station efficiency (Sled Push, Sled Pull, Burpee Broad Jumps, Rowing, Farmers Carry, Sandbag Lunges, Wall Balls, Roxzone pacing), recovery optimization, and race day execution.
Keep advice direct, encouraging, precise, and actionable. Use bullet points when suggesting workouts or plan adjustments.
User profile context: ${JSON.stringify(userProfile || {})}
Current active workout context: ${JSON.stringify(currentWorkout || {})}`;

      let contents: any[] = [];
      if (conversationHistory && conversationHistory.length > 0) {
        contents = conversationHistory.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));
        if (prompt) {
          contents.push({ role: 'user', parts: [{ text: prompt }] });
        }
      } else {
        contents = [{ parts: [{ text: prompt || "Give me a quick status analysis of my current training plan and advice for my next workout." }] }];
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Coach API Error:", error);
      res.status(500).json({ 
        error: error.message || "Failed to reach StrideIQ AI Coach.",
        fallback: "Keep your consistency high! Aim to keep easy runs under 75% max HR to preserve energy for quality threshold and station workouts."
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`StrideIQ full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
