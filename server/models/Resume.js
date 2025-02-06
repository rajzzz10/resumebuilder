const mongoose = require('mongoose');

// Define the main Resume Schema
const ResumeSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String , required: true},
    email: { type: String , required: true},
    phone: { type: String , required: true},
    title : { type: String , required: true},
    image: { type: String } // Add this to store image as Base64 string
  },
  profSummary: {
    summary: { type: String , required: true}
  },
  education: [{
    degree: { type: String , required: true},
    institution: { type: String , required: true},
    stYear: { type: Date , required: true},
    endYear: { type:Date }
  }],
  experience: [{
    role: { type: String , required: true},
    company: { type: String , required: true},
    stDate: { type: Date , required: true},
    endDate: { type: Date }
  }],
  certificate: {
    certification: { type: String },
    placeOfCert: { type: String }
  },
  skills: [{ type: String }]
});

module.exports = mongoose.model('Resume', ResumeSchema);
