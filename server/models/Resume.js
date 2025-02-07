const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String },
    title: { type: String },
    email: { type: String },
    phone: { type: String },
    adress: { type: String },
    image: { type: String } // Base64 string for profile picture
  }, 
  profSummary: {
    summary: { type: String }
  },
  education: [{
    degree: { type: String },
    institution: { type: String },
    year: { type: String } // Single year as a string (e.g., "2024")
  }],
  projects: [{
    name: { type: String },
    startDate: { type: String }, // Example: "2023-01"
    endDate: { type: String }, // Example: "2023-12"
    description: { type: String }
  }],
  experience: [{
    jobTitle: { type: String },
    company: { type: String },
    years: { type: String } ,// Example: "2020-2023"
    description: { type: String }
  }],
  certificate: [{
    title: { type: String },
    issuedBy: { type: String }
  }],
  skills: [{ type: String }],
  otherDetails: {
    languages: [{ type: String }], // Array of languages
    hobbies: [{ type: String }] // Array of hobbies
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);
