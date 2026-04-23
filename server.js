const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '')));

// --- Basic API Routes ---

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Online Scrap Portal Backend is Running!' });
});

// Auth Routes Mockup
app.post('/api/auth/login', (req, res) => {
    // In a real application, check against the database
    res.json({ message: 'Login endpoint reached' });
});

// Fallback removed for simplicity

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/index.html to view the site.`);
});
