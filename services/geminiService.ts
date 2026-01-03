
import { GoogleGenAI } from "@google/genai";
import { Review, GroundingChunk } from "../types";

/**
 * Safely retrieves the API key from the environment.
 */
const getApiKey = (): string => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      // @ts-ignore
      return process.env.API_KEY;
    }
    // @ts-ignore
    if (import.meta.env?.API_KEY) {
      // @ts-ignore
      return import.meta.env.API_KEY;
    }
  } catch (e) {}
  return "";
};

/**
 * Fetches real customer reviews using Google Search Grounding.
 */
export const fetchRealReviews = async (): Promise<{ reviews: Review[], sources: GroundingChunk[] }> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Gemini API key is missing. Skipping real reviews fetch.");
    return { reviews: [], sources: [] };
  }

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for real customer reviews of 'Fire Place Café & Restaurant' in Kenitra, Morocco. Provide a JSON array containing 3 reviews with these fields: id, name, rating (number), comment, and date. Do not include markdown code blocks, just the raw JSON array.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
    
    let reviews: Review[] = [];
    try {
      // Robust extraction: look for the first [ and last ] to find the JSON array
      const start = text.indexOf('[');
      const end = text.lastIndexOf(']');
      if (start !== -1 && end !== -1) {
        const jsonStr = text.substring(start, end + 1);
        const parsed = JSON.parse(jsonStr);
        if (Array.isArray(parsed)) {
          reviews = parsed.filter(r => r && typeof r.name === 'string');
        }
      }
    } catch (e) {
      console.warn("Failed to parse grounded reviews:", e);
    }

    return { reviews, sources };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { reviews: [], sources: [] };
  }
};

export const fetchKenitraInsights = async () => ({ text: "", sources: [] });
export const fetchLocationDetails = async () => ({ text: "", sources: [] });
