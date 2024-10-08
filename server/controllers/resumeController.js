const Resume = require("../models/Resume");

// Create a new resume
exports.createResume = async (req, res) => {
  try {
    console.log(req.body)
    const resume = await new Resume(req.body);
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resume', error });
  }
};
