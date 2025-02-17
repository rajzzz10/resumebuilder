const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController.js');

// POST route to create a new resume
router.post('/resume', resumeController.createResume);

module.exports = router;
