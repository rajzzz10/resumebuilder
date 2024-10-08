const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Resume= require('./models/Resume.js')
const resumeRoutes = require('./routes/resumeRoutes.js');
require('dotenv').config();

const app = express();

// Middleware
const corOptions = {
    origin: ["http://localhost:5173"]
};
app.use(cors(corOptions));
app.use(express.json());


// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`)
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


app.listen(5000,(req,res)=>{
    console.log("app is listening")
})

