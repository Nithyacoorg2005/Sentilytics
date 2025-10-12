// File: /backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same email
  },
  password: {
    type: String,
    required: true,
  },
  googleId: { // We will use this later for Google Sign-In
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// This creates a model named "User" based on the schema.
// Mongoose will automatically create a collection named "users" in MongoDB.
module.exports = mongoose.model('User', UserSchema);