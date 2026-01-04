
import { GoogleGenAI } from "@google/genai";
import { Review, GroundingChunk } from "../types.ts";

/**
 * Robust fetch for real customer reviews using Google Search Grounding.
 * Strictly adheres to the requirement of using process.env.API_KEY.
 */
export const fetchRealReviews = async (): Promise<{ reviews: Review[], sources: GroundingChunk[] }> => {
  // Access the API key strictly from the environment variable as per guidelines
  const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) 
    ? process.env.API_KEY 
    : (import.meta as any).env?.VITE_API_KEY;

  if (!apiKey) {
    console.warn("Gemini API_KEY not found in environment. Reviews feature disabled.");
    return { reviews: [], sources: [] };
  }

  try {
    // Initialize AI strictly with named parameter from process.env string
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for real, recent customer reviews of 'Fire Place Café & Restaurant' in Kenitra, Morocco. Provide a JSON array of 4 reviews: id, name, rating (1-5), comment, and date. Return ONLY the JSON array.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
    
    let reviews: Review[] = [];
    try {
      // Clean potential markdown or extra text from AI response
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonStr = text.substring(jsonStart, jsonEnd + 1);
        reviews = JSON.parse(jsonStr);
      }
    } catch (e) {
      console.error("Failed to parse Gemini JSON output:", e);
    }

    return { reviews, sources };
  } catch (error) {
    console.error("Gemini API communication failed:", error);
    return { reviews: [], sources: [] };
  }
};
