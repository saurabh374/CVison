import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMENI_API_KEY } from "../config/config";

const genAI = new GoogleGenerativeAI(GEMENI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function sendAIMessage(prompt) {
  try {
    const result = await model.generateContent(prompt, generationConfig);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("AI API error:", error);
    throw error;
  }
}
