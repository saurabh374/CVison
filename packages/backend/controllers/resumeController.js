const asyncHandler = require('express-async-handler');
const Resume = require('../models/resumeModel');

// @desc    Get all resumes for a user
// @route   GET /api/resumes
// @access  Private
const getResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id });
  res.json(resumes);
});

// @desc    Get a single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (resume && resume.user.toString() === req.user._id.toString()) {
    res.json(resume);
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
const createResume = asyncHandler(async (req, res) => {
  const resume = new Resume({
    user: req.user._id,
  });

  const createdResume = await resume.save();
  res.status(201).json(createdResume);
});

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = asyncHandler(async (req, res) => {
  const { title, personalDetails, summary, experience, education, skills } = req.body;

  const resume = await Resume.findById(req.params.id);

  if (resume && resume.user.toString() === req.user._id.toString()) {
    resume.title = title || resume.title;
    resume.personalDetails = personalDetails || resume.personalDetails;
    resume.summary = summary || resume.summary;
    resume.experience = experience || resume.experience;
    resume.education = education || resume.education;
    resume.skills = skills || resume.skills;

    const updatedResume = await resume.save();
    res.json(updatedResume);
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (resume && resume.user.toString() === req.user._id.toString()) {
    await resume.remove();
    res.json({ message: 'Resume removed' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
};
