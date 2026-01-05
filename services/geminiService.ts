
import { GoogleGenAI } from "@google/genai";
import { Review, GroundingChunk, GalleryImage } from "../types.ts";

/**
 * Fetch real customer reviews using Google Search Grounding.
 */
export const fetchRealReviews = async (): Promise<{ reviews: Review[], sources: GroundingChunk[] }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for real, recent customer reviews of 'Fire Place Café & Restaurant' in Kenitra, Morocco. Return a JSON array of 4 reviews with these fields: id, name, rating (number 1-5), comment, and date. Provide ONLY the JSON array.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    if (!text) return { reviews: [], sources: [] };

    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
    let reviews: Review[] = [];
    try {
      const match = text.match(/\[[\s\S]*\]/);
      if (match) reviews = JSON.parse(match[0]);
    } catch (e) {
      console.warn("Gemini output parsing failed for reviews", e);
    }
    return { reviews, sources };
  } catch (error) {
    console.error("Gemini reviews fetch failed:", error);
    return { reviews: [], sources: [] };
  }
};

/**
 * Fetch gallery images showcasing the restaurant using Google Search Grounding.
 */
// Added fetchGalleryImages implementation to fix the missing export error in Gallery.tsx
export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for public image URLs or direct photo links showcasing the interior, food, and riverside view of 'Fire Place Café & Restaurant' in Kenitra, Morocco. Return a JSON array of up to 5 objects with fields: url, alt (short description), and source (e.g., 'Instagram', 'TripAdvisor'). Provide ONLY the JSON array.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    if (!text) return [];

    try {
      const match = text.match(/\[[\s\S]*\]/);
      if (match) return JSON.parse(match[0]);
    } catch (e) {
      console.warn("Gemini output parsing failed for gallery images", e);
    }
    return [];
  } catch (error) {
    console.error("Gemini gallery images fetch failed:", error);
    return [];
  }
};
