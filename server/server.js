const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Resume = require('./models/Resume.js')
const resumeRoutes = require('./routes/resumeRoutes.js');
require('dotenv').config();

const app = express();


// Increase the size limit for JSON payloads
app.use(express.json({ limit: '10mb' }));  // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware
const corOptions = {
    origin: ["http://localhost:5173"]
};
app.use(cors(corOptions));
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb+srv://rajkumarmohanty949:CziuOf59FxnLUNjM@cluster0.czm2m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Database connection error:', err));


app.use('/api', resumeRoutes);


app.post('/api/form', async (req, res) => {
    try {
        const newResume = new Resume(req.body);
        await newResume.save();
        res.status(200).json({ message: 'Form data saved successfully!' });
    } catch (err) {
        console.error('Error saving form data:', err);
        res.status(500).json({ message: 'Failed to save form data', error: err });
    }
});



app.listen(5000, (req, res) => {
    console.log("app is listening in 5000")
})

