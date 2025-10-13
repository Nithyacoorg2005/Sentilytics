// File: /backend/routes/analyze.js

const router = require('express').Router();
const axios = require('axios'); // Import axios
const authMiddleware = require('../middleware/authMiddleware');

// This route is protected. It receives the request from the frontend,
// then calls the Python server to do the actual work.
router.post('/sentiment', authMiddleware, async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Text is required.' });
    }

    try {
        // Make an API call to the Python ML server
        const pythonServerUrl = 'http://127.0.0.1:5001/predict';
        const response = await axios.post(pythonServerUrl, { text });

        // Forward the result from the Python server back to the frontend
        res.json(response.data);

    } catch (error) {
        console.error("Error calling ML server:", error.message);
        res.status(500).json({ message: "Error communicating with the analysis service." });
    }
});

module.exports = router;