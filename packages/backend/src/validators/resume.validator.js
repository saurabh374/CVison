import { body } from "express-validator";

const validateResumeCreation = [
  body("title").notEmpty().withMessage("Title is required."),
  body("themeColor").notEmpty().withMessage("Theme color is required."),
];

export { validateResumeCreation };
