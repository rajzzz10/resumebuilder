const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require("multer");
const fs = require("fs");
const { Buffer } = require("buffer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyDdP9mo8Q9dx_r8sCKwT-JM9BWN8pyd2HU');

const Resume = require('./models/Resume.js')
const resumeRoutes = require('./routes/resumeRoutes.js');
require('dotenv').config();

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Increase the size limit for JSON payloads
app.use(express.json({ limit: '10mb' }));  // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware
const corOptions = {
    origin: ["http://localhost:5173"]
    // origin: "*",  Allow all origins (for testing)
};
app.use(cors(corOptions));
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb+srv://rajkumarmohanty949:CziuOf59FxnLUNjM@cluster0.czm2m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Database connection error:', err));


app.use('/api', resumeRoutes);


app.post('/api/form', async (req, res) => {
    console.log("form")
    try {
        const newResume = new Resume(req.body);
        await newResume.save();
        res.status(200).json({ message: 'Form data saved successfully!' });
    } catch (err) {
        console.error('Error saving form data:', err);
        res.status(500).json({ message: 'Failed to save form data', error: err });
    }
});

//Resume Scanner

app.post("/scan", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      // Convert file to Base64
      const base64String = Buffer.from(req.file.buffer).toString("base64");
  
      const prompt = `
        Analyze this resume document and extract the following information in JSON format:
        - Full Name
        - Email
        - Phone Number
        - Address (if available)
        - Education (list degrees, institutions, and year of graduation)
        - Work Experience (list job titles, companies, years, and descriptions)
        - Skills (list all mentioned skills)
        - Certifications (title and issued by)
        - Projects (name, start date, end date, description)
        - Languages (if mentioned)
        - Hobbies (if mentioned)
  
        Return the output **only** in this JSON format:
        {
          "personalInfo": { "name": "string", "title": "", "email": "string", "phone": "string", "adress": "string" },
          "profSummary": { "summary": "" },
          "education": [{ "degree": "string", "institution": "string", "year": "string" }],
          "projects": [{ "name": "string", "startDate": "string", "endDate": "string", "description": "string" }],
          "experience": [{ "jobTitle": "string", "company": "string", "years": "string", "description": "string" }],
          "certificate": { "title": "string", "issuedBy": "string" },
          "skills": ["string"],
          "otherDetails": { "languages": ["string"], "hobbies": ["string"] }
        }
  
        If any field is missing, return it as an empty array, empty object, or empty string.
      `;
  
      const result = await model.generateContent([
        { inlineData: { data: base64String, mimeType: req.file.mimetype } },
        prompt,
      ]);
  
      const response = await result.response;
      const text = response.text();
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
  
      try {
        const extractedData = JSON.parse(cleanedText);
  
        res.json({
          personalInfo: extractedData.personalInfo || { name: "", title: "", email: "", phone: "", adress: "" },
          profSummary: extractedData.profSummary || { summary: "" },
          education: extractedData.education || [],
          projects: extractedData.projects || [],
          experience: extractedData.experience || [],
          certificate: extractedData.certificate || { title: "", issuedBy: "" },
          skills: extractedData.skills || [],
          otherDetails: extractedData.otherDetails || { languages: [], hobbies: [] },
        });
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        res.status(500).json({ error: "Invalid response format from Gemini" });
      }
    } catch (error) {
      console.error("Error scanning resume:", error);
      res.status(500).json({ error: "Failed to scan resume" });
    }
  });
  


app.listen(5000, (req, res) => {
    console.log("app is listening in 5000")
})

