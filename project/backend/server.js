// File: /backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- THIS LINE IS NOW UNCOMMENTED AND ACTIVE ---
app.use('/api/auth', require('./routes/auth'));

// It starts the server and keeps it running.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});