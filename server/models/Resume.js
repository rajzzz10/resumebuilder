const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    adress: { type: String, required: true },
    image: { type: String } // Base64 string for profile picture
  },
  profSummary: {
    summary: { type: String, required: true }
  },
  education: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true } // Single year as a string (e.g., "2024")
  }],
  experience: [{
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    years: { type: String, required: true } // Example: "2020-2023"
  }],
  certificate: [{
    title: { type: String, required: true },
    issuedBy: { type: String, required: true }
  }],
  skills: [{ type: String }],
  otherDetails: {
    languages: [{ type: String }], // Array of languages
    hobbies: [{ type: String }] // Array of hobbies
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);
