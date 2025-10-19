import { Router } from "express";
import {
  start,
  createResume,
  getALLResume,
  getResume,
  updateResume,
  removeResume,
} from "../controller/resume.controller.js";
import { isUserAvailable } from "../middleware/auth.js";
import { validateResumeCreation } from "../validators/resume.validator.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const router = Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(new ApiError(400, "Validation failed", errors.array()));
  }
  next();
};

router.get("/", start);
router.post(
  "/createResume",
  isUserAvailable,
  validateResumeCreation,
  handleValidationErrors,
  createResume
);
router.get("/getAllResume", isUserAvailable, getALLResume);
router.get("/getResume", isUserAvailable, getResume);
router.put("/updateResume", isUserAvailable, updateResume);
router.delete("/removeResume", isUserAvailable, removeResume);

export default router;
