const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Untitled Resume',
    },
    personalDetails: {
      fullName: { type: String, trim: true },
      email: { type: String, trim: true },
      phoneNumber: { type: String, trim: true },
      website: { type: String, trim: true },
    },
    summary: { type: String },
    experience: [
      {
        company: { type: String, trim: true },
        role: { type: String, trim: true },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String, trim: true },
        degree: { type: String, trim: true },
        startDate: { type: String },
        endDate: { type: String },
      },
    ],
    skills: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', resumeSchema);
