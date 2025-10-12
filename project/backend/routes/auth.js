// File: /backend/routes/auth.js

const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- SIGN-UP (REGISTER) ROUTE ---
router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully!", userId: savedUser._id });

  } catch (error) {
    res.status(500).json({ message: "An error occurred on the server.", error: error.message });
  }
});


// --- SIGN-IN (LOGIN) ROUTE ---
router.post('/login', async (req, res) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    
    // Create and assign a JSON Web Token (JWT)
    const token = jwt.sign(
      { id: user._id, name: user.name }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, userId: user._id, name: user.name });

  } catch (error) {
    res.status(500).json({ message: "An error occurred on the server.", error: error.message });
  }
});


module.exports = router;