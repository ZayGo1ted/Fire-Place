import { GoogleGenAI } from "@google/genai";
import { Review, GroundingChunk } from "../types";

/**
 * Fetch real customer reviews using Gemini + Google Search grounding.
 * SAFE for Vite frontend (no process.env).
 */
export const fetchRealReviews = async (): Promise<{
  reviews: Review[];
  sources: GroundingChunk[];
}> => {
  // ✅ Correct way for Vite
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // ✅ Prevent black screen if key is missing
  if (!apiKey) {
    console.warn("Gemini API key missing. Reviews feature disabled.");
    return { reviews: [], sources: [] };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents:
        "Search for real, recent customer reviews of 'Fire Place Café & Restaurant' in Kenitra, Morocco. Provide a JSON array of 4 reviews with: id, name, rating (1-5), comment, and date. Return ONLY the JSON array.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";

    const sources =
      (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) ||
      [];

    let reviews: Review[] = [];

    // ✅ Safe JSON extraction
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");

    if (start !== -1 && end !== -1) {
      reviews = JSON.parse(text.slice(start, end + 1));
    } else {
      console.warn("Gemini response did not contain valid JSON.");
    }

    return { reviews, sources };
  } catch (error) {
    console.error("Gemini API failed:", error);
    return { reviews: [], sources: [] };
  }
};
