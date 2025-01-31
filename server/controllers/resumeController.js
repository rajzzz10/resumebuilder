const Resume = require("../models/Resume");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, "yourSecretKey", { expiresIn: "1h" });

        res.status(201).json({ token, user: { id: user.id, name, email } , message : "Registration Successful"});
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "No User Found" });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Password Incorrect" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, "yourSecretKey", { expiresIn: "1h" });

      res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email }, message : "Login Successful"});
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
};