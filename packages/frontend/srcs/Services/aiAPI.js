import axios from "axios";

const API_URL = "/api/ai";

export const generateSuggestion = async (prompt) => {
  try {
    const response = await axios.post(`${API_URL}/generate-suggestion`, {
      prompt,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to generate suggestion.");
  }
};
