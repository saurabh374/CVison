import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new ApiError(
      500,
      "Database connection failed",
      [],
      "MONGODB_URI environment variable is not defined"
    );
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      // dbName: "ai_resume_builder",
      // serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    throw new ApiError(500, "Database connection failed", [], err.stack);
  }
};

export { connectDB };
