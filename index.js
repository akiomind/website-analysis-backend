const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Allow all origins for now
app.use(express.json()); // Parse incoming JSON

// Define the /analyze route
app.post('/analyze', async (req, res) => {
    const { url } = req.body;
    console.log(`Received URL: ${url}`);

    if (!url) {
        return res.status(400).json({ error: 'Missing URL in request body.' });
    }

    try {
        // Launch Puppeteer with Render-compatible settings
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Sample analysis: get page title
        const title = await page.title();

        await browser.close();

        res.json({ message: 'Analysis successful', title });
    } catch (error) {
        console.error('Analysis failed:', error.message);
        res.status(500).json({ error: 'Failed to analyze the URL.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`✅ Backend is running on port ${port}`);
});