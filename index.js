// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS so frontend can access backend
app.use(cors());
app.use(express.json());

// Test route to check if backend is working
app.get('/', (req, res) => {
  res.send('🟢 Backend is working!');
});

// Dummy analysis route
app.post('/analyze', (req, res) => {
  const { url } = req.body;

  // Basic validation
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Simulate dummy response
  const dummyResults = {
    uxScore: 80,
    speedScore: 70,
    accessibilityScore: 90,
    securityScore: 75,
    issues: ['Dummy issue for testing'],
  };

  res.json(dummyResults);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});