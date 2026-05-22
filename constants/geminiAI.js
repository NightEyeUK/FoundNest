import { GoogleGenAI, Type } from "@google/genai";
import { category } from "./category";

const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY
});

export async function DescribeItem({ base64Data, mimeType }) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash", 
      contents: [
        {
          text: `Analyze this lost item image. Fill out the schema fields based on your observations. 
          For the category field, choose the best match strictly from this list: ${category.join(", ")}.Return only an object, Stop being chatty`,
        },
        {
          inlineData: {
            mimeType: mimeType || "image/jpeg",
            data: base64Data,
          },
        },
      ],
      config: {
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itemName: { type: Type.STRING, description: "Short title of the item found" },
            detailedDescription: { type: Type.STRING, description: "Brand, model, colors, materials, unique features" },
            contents: { type: Type.STRING, description: "If a bag or wallet, list notable contents inside" },
            category: { type: Type.STRING, description: "The single best matching category category from the provided list" },
          },
          required: ["itemName", "detailedDescription", "category"],
        },
      },
    });
  
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}