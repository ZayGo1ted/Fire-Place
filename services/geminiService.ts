
import { GoogleGenAI } from "@google/genai";
import { Review, GroundingChunk } from "../types.ts";

/**
 * Fetches real customer reviews using Google Search Grounding to provide up-to-date feedback.
 */
export const fetchRealReviews = async (): Promise<{ reviews: Review[], sources: GroundingChunk[] }> => {
  // Safe environment variable access for browser contexts
  const getApiKey = () => {
    try {
      // @ts-ignore
      if (typeof process !== 'undefined' && process.env) {
        // @ts-ignore
        return process.env.API_KEY;
      }
    } catch (e) {}
    return null;
  };

  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key missing. Gemini features disabled.");
    return { reviews: [], sources: [] };
  }

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for real, recent customer reviews of 'Fire Place Café & Restaurant' located on the Corniche in Kenitra, Morocco. Provide a JSON array containing up to 4 reviews. Each review object must have: id, name, rating (1-5), comment (in the reviewer's original language if possible), and date. Return ONLY the JSON array, no markdown.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
    
    let reviews: Review[] = [];
    try {
      const start = text.indexOf('[');
      const end = text.lastIndexOf(']');
      if (start !== -1 && end !== -1) {
        reviews = JSON.parse(text.substring(start, end + 1));
      } else {
        reviews = JSON.parse(text);
      }
    } catch (e) {
      console.warn("Failed to parse reviews from Gemini output:", e);
    }

    return { reviews, sources };
  } catch (error) {
    console.error("Gemini fetch error:", error);
    return { reviews: [], sources: [] };
  }
};
