
import { GoogleGenAI } from "@google/genai";
import { Review, GroundingChunk } from "../types.ts";

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

export const fetchRealReviews = async (): Promise<{ reviews: Review[], sources: GroundingChunk[] }> => {
  const apiKey = getApiKey();
  if (!apiKey) return { reviews: [], sources: [] };

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for real customer reviews of 'Fire Place Café & Restaurant' in Kenitra, Morocco. Provide a JSON array containing 3 reviews with these fields: id, name, rating (number), comment, and date. Do not include markdown code blocks, just the raw JSON array.",
      config: { tools: [{ googleSearch: {} }] },
    });

    const text = response.text || "";
    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
    
    let reviews: Review[] = [];
    try {
      const start = text.indexOf('[');
      const end = text.lastIndexOf(']');
      if (start !== -1 && end !== -1) {
        const jsonStr = text.substring(start, end + 1);
        const parsed = JSON.parse(jsonStr);
        if (Array.isArray(parsed)) reviews = parsed;
      }
    } catch (e) {}
    return { reviews, sources };
  } catch (error) {
    return { reviews: [], sources: [] };
  }
};
