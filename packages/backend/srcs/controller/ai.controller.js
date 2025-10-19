import { asyncHandler } from "../utils/asyncHandler.js";
import { AIChatSession } from "../Services/AiModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateResumeSuggestion = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    throw new ApiError(400, "Prompt is required.");
  }

  try {
    const result = await AIChatSession.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { suggestion: text },
          "Suggestion generated successfully."
        )
      );
  } catch (error) {
    throw new ApiError(500, "Failed to generate suggestion from AI.", [], error.stack);
  }
});

export { generateResumeSuggestion };
