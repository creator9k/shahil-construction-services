/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body Parsing parsing
  app.use(express.json());

  // API router FIRST
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI chat endpoint using GEMINI_API_KEY
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      // Handle unconfigured/missing credentials gracefully
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        return res.status(401).json({
          error: 'Gemini API Key is not configured.',
          isFallback: true
        });
      }

      // Initialize the modern @google/genai SDK
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'shahil-construction-services',
          }
        }
      });

      // System instructions for the AI consultant
      const systemInstruction = `You are "Shahil", an expert construction materials consultant and founding supervisor for "Shahil Construction Services" based in Ambikapur, Surguja Chhattisgarh, India. 

Your material inventory details:
1. River Sand (Balu): Premium natural grain from clean river basins, triple-washed to eliminate silt cracks. Price is ₹2,800 per brass (100 CFT).
2. Red Clay Bricks (Eeta): Class-A baked chimney bricks with high load bearing, fine edges, weight ~3.2 kg. Price of ₹7 per piece.
3. Crushed Granite Aggregate (Gitti): Machine-crushed dense black gitti, sizes 10mm, 20mm, and 40mm. Price is ₹3,200 per brass.
4. Cemented Fencing poles: Steel precast posts with TMT reinforcement wire strands, length 6-8 ft. Price is ₹220 per pole.
5. Precast Boundary Walls (cement slabs): Modular interlocking concrete planks and column pillars. Price is ₹95 per square foot (fitting/installation labor included!).

Your Service Rules:
- Deliveries are processed using local hydraulic dumpers and tractor-trolleys.
- Core dispatch depot: Ring Road Bypass, Ambikapur, Chhattisgarh.
- Shipping area: Ambikapur city, Lakhanpur, Udaipur, Rajpur, Ramanujganj, and Surguja Division. Travel charges apply.
- Contacts: +91 62630 63245 (Click to call or chat).

Communication Tone:
- Speak politely in clear English, pure Hindi, or Hinglish (transcribed Hindi).
- Help builders with direct quantity calculation rules. (E.g. A 9-inch wall takes 10 bricks/sqft. Concrete slab volume = Length * Width * depth).
- IMPORTANT: Answer ONLY construction, renovation, sand, bricks, cement, aggregate, or fencing queries. Refuse any unrelated coding, finance, food, or general knowledge questions, and remind them you are Shahil's materials assistant. Speak with humble respect.`;

      const chatHistoryParts: any[] = [];
      if (history && Array.isArray(history)) {
        for (const item of history) {
          chatHistoryParts.push({
            role: item.role === 'model' ? 'model' : 'user',
            parts: [{ text: item.text }]
          });
        }
      }

      // Push latest input active text
      chatHistoryParts.push({
        role: 'user',
        parts: [{ text: message }]
      });

      // Call modern content generation model
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: chatHistoryParts,
        config: {
          systemInstruction,
          temperature: 0.75,
        }
      });

      const replyText = response.text || 'I analyzed the query, but was unable to compute a response. Please call +91 62630 63245 directly.';
      res.json({ reply: replyText });

    } catch (error: any) {
      console.error('Core Gemini API Server error:', error);
      res.status(500).json({ error: error.message || 'Unable to connect to AI server.' });
    }
  });

  // Handle Vite middleware routing for dev / production static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shahil Construction Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
