const express = require('express');
const JobSeeker = require('../models/JobSeeker');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ');
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

// Get all job seekers (for authenticated users)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const seekers = await JobSeeker.find();
        res.json(seekers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search for job seekers by criteria (optional)
router.get('/search', authenticateToken, async (req, res) => {
    const { workType } = req.query; // Example search parameter
    try {
        const seekers = await JobSeeker.find({ workType });
        res.json(seekers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;