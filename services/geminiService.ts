
import { GoogleGenAI } from "@google/genai";
import { Review, GroundingChunk } from "../types.ts";

/**
 * Fetch real customer reviews using Google Search Grounding.
 * Adheres strictly to the requirement of using process.env.API_KEY directly.
 */
export const fetchRealReviews = async (): Promise<{ reviews: Review[], sources: GroundingChunk[] }> => {
  try {
    // Strictly follow initialization rules: use process.env.API_KEY directly in a named parameter.
    // Assume this variable is pre-configured and accessible.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-3-flash-preview as per 'Basic Text Tasks' guidelines.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for real, recent customer reviews of 'Fire Place Café & Restaurant' in Kenitra, Morocco on the web. Return a JSON array of 4 reviews with these fields: id, name, rating (number 1-5), comment, and date. Provide ONLY the JSON array in your text response.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Access .text property directly as per guidelines (not a method).
    const text = response.text;
    if (!text) return { reviews: [], sources: [] };

    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]) || [];
    
    let reviews: Review[] = [];
    try {
      // Find JSON array in the response text using regex for safety
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        reviews = JSON.parse(match[0]);
      }
    } catch (e) {
      console.warn("Gemini output was not valid JSON, skipping automated parsing:", e);
    }

    return { reviews, sources };
  } catch (error) {
    // Catch the 500 Rpc error gracefully to prevent app crash.
    // This can occur if grounding tools are temporarily unavailable or restricted.
    console.error("Gemini API communication failed:", error);
    return { reviews: [], sources: [] };
  }
};
