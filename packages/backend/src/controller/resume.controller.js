import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Resume from "../models/resume.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const start = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Welcome to Resume Builder API"));
});

const createResume = asyncHandler(async (req, res) => {
  const { title, themeColor } = req.body;

  if (!title || !themeColor) {
    throw new ApiError(400, "Title and themeColor are required.");
  }

  const resume = await Resume.create({
    title,
    themeColor,
    user: req.user._id,
    firstName: "",
    lastName: "",
    email: "",
    summary: "",
    jobTitle: "",
    phone: "",
    address: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { resume }, "Resume created successfully"));
});

const getALLResume = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user });
  return res
    .status(200)
    .json(new ApiResponse(200, resumes, "Resumes fetched successfully"));
});

const getResume = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    throw new ApiError(400, "Resume ID is required.");
  }

  const resume = await Resume.findById(id);

  if (!resume) {
    throw new ApiError(404, "Resume not found.");
  }

  if (resume.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to access this resume.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, resume, "Resume fetched successfully"));
});

const updateResume = asyncHandler(async (req, res) => {
  const id = req.query.id;

  const updatedResume = await Resume.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { $set: req.body, $currentDate: { updatedAt: true } },
    { new: true }
  );

  if (!updatedResume) {
    throw new ApiError(404, "Resume not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedResume, "Resume updated successfully"));
});

const removeResume = asyncHandler(async (req, res) => {
  const id = req.query.id;

  const resume = await Resume.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!resume) {
    throw new ApiError(
      404,
      "Resume not found or not authorized to delete this resume"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Resume deleted successfully"));
});

export {
  start,
  createResume,
  getALLResume,
  getResume,
  updateResume,
  removeResume,
};
