
import { GoogleGenAI } from "@google/genai";
import { Review, GroundingChunk } from "../types.ts";

/**
 * Fetches real customer reviews using Google Search Grounding.
 * Safeguarded against environment variable access errors.
 */
export const fetchRealReviews = async (): Promise<{ reviews: Review[], sources: GroundingChunk[] }> => {
  const getApiKey = () => {
    try {
      // Check for process.env first (System required)
      // @ts-ignore
      if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        // @ts-ignore
        return process.env.API_KEY;
      }
      // Fallback to Vite meta env
      // @ts-ignore
      if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
        // @ts-ignore
        return import.meta.env.VITE_API_KEY;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Gemini API Key not found in process.env.API_KEY. Feature disabled.");
    return { reviews: [], sources: [] };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for real, recent customer reviews (last 6 months) of 'Fire Place Café & Restaurant' on the Corniche in Kenitra, Morocco. Provide a JSON array of 4 reviews with fields: id, name, rating (1-5), comment, and date. Return ONLY JSON.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
    
    let reviews: Review[] = [];
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        reviews = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Failed to parse Gemini JSON:", e);
    }

    return { reviews, sources };
  } catch (error) {
    console.error("Gemini service error:", error);
    return { reviews: [], sources: [] };
  }
};