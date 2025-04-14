const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 5000;

// Enable CORS so frontend can access backend
app.use(cors());
app.use(express.json());

// Test route to check if backend is working
app.get('/', (req, res) => {
  res.send('🟢 Backend is working!');
});

// Real analysis route
app.post('/analyze', async (req, res) => {
  const { url } = req.body;

  // Basic validation
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Perform analysis - replace with your real analysis functions
    const result = {
      uxScore: await analyzeUX(page),
      speedScore: await analyzeSpeed(page),
      accessibilityScore: await analyzeAccessibility(page),
      securityScore: await analyzeSecurity(page),
      issues: await findIssues(page),
    };

    // Close the browser
    await browser.close();

    // Return results
    res.json(result);
  } catch (error) {
    // Handle errors during analysis
    res.status(500).json({ error: error.message });
  }
});

// Dummy analysis functions, replace with real logic
async function analyzeUX(page) {
  // Example UX analysis (replace with actual logic)
  return 80; // Placeholder score
}

async function analyzeSpeed(page) {
  // Example Speed analysis (replace with actual logic)
  return 70; // Placeholder score
}

async function analyzeAccessibility(page) {
  // Example Accessibility analysis (replace with actual logic)
  return 90; // Placeholder score
}

async function analyzeSecurity(page) {
  // Example Security analysis (replace with actual logic)
  return 75; // Placeholder score
}

async function findIssues(page) {
  // Example issue finding (replace with actual logic)
  return ['Dummy issue for testing']; // Placeholder
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});