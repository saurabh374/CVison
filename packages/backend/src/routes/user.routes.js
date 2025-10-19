import {
  start,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";
import { Router } from "express";
import { isUserAvailable } from "../middleware/auth.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../validators/user.validator.js";
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

router.get("/", isUserAvailable, start);
router.post(
  "/register",
  validateUserRegistration,
  handleValidationErrors,
  registerUser
);
router.post("/login", validateUserLogin, handleValidationErrors, loginUser);
router.get("/logout", isUserAvailable, logoutUser);

export default router;
