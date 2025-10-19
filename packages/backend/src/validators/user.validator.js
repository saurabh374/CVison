import { body } from "express-validator";

const validateUserRegistration = [
  body("fullName").notEmpty().withMessage("Full name is required."),
  body("email").isEmail().withMessage("Please provide a valid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

const validateUserLogin = [
  body("email").isEmail().withMessage("Please provide a valid email address."),
  body("password").notEmpty().withMessage("Password is required."),
];

export { validateUserRegistration, validateUserLogin };
