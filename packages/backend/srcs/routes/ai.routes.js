import { Router } from "express";
import { generateResumeSuggestion } from "../controller/ai.controller.js";
import { isUserAvailable } from "../middleware/auth.js";

const router = Router();

router.post("/generate-suggestion", isUserAvailable, generateResumeSuggestion);

export default router;
