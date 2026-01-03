
import { GoogleGenAI } from "@google/genai";
import { Review, GroundingChunk } from "../types.ts";

export const fetchRealReviews = async (): Promise<{ reviews: Review[], sources: GroundingChunk[] }> => {
  const getApiKey = () => {
    try {
      // @ts-ignore
      return process.env.API_KEY || import.meta.env.VITE_API_KEY || null;
    } catch (e) {
      return null;
    }
  };

  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key not found. Gemini features disabled.");
    return { reviews: [], sources: [] };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for real, recent customer reviews of 'Fire Place Café & Restaurant' in Kenitra, Morocco. Provide a JSON array of 4 reviews: id, name, rating, comment, date. Return ONLY JSON.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
    
    let reviews: Review[] = [];
    try {
      const match = text.match(/\[[\s\S]*\]/);
      if (match) reviews = JSON.parse(match[0]);
    } catch (e) {
      console.error("JSON Parse error:", e);
    }

    return { reviews, sources };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { reviews: [], sources: [] };
  }
};
