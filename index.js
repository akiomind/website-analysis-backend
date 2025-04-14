const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define the /analyze route
app.post('/analyze', async (req, res) => {
  const { url } = req.body;
  console.log(`Received URL: ${url}`);

  if (!url) {
    return res.status(400).json({ error: 'Missing URL in request body.' });
  }

  try {
    const browserFetcher = puppeteer.createBrowserFetcher();
    const revisionInfo = await browserFetcher.download('135.0.7049.84');

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: revisionInfo.executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const title = await page.title();

    await browser.close();

    res.json({
      message: 'Analysis successful',
      title,
      issues: [],
    });
  } catch (error) {
    console.error('Analysis failed:', error.message);
    res.status(500).json({ error: 'Failed to analyze the URL.' });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend is running on port ${port}`);
});