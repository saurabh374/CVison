import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const start = asyncHandler(async (req, res) => {
  if (req.user) {
    return res.status(200).json(new ApiResponse(200, req.user, "User Found"));
  } else {
    return res.status(404).json(new ApiResponse(404, null, "User Not Found"));
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(
      400,
      "Please provide all required fields: fullName, email, and password."
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already registered.");
  }

  const newUser = await User.create({
    fullName,
    email,
    password,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      {
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      },
      "User successfully registered."
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(
      400,
      "Please provide all required fields: email and password."
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(406, "Invalid credentials.");
  }

  const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    sameSite: process.env.NODE_ENV === "Dev" ? "lax" : "none",
    secure: process.env.NODE_ENV !== "Dev",
  };

  res
    .cookie("token", jwtToken, cookieOptions)
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
          },
        },
        "User logged in successfully."
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  if (req.user) {
    return res
      .clearCookie("token")
      .status(200)
      .json(new ApiResponse(200, null, "User logged out successfully."));
  } else {
    throw new ApiError(404, "User not found.");
  }
});

export { start, loginUser, logoutUser, registerUser };
