import express from "express";
import { chromium } from "playwright";
const cors = require('cors');

const app = express();
// Allow all origins (for testing)
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/api/gold-rate", async (req, res) => {
  try {
    // Launch headless browser
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Go to the gold rate page
    await page.goto("https://www.angelone.in/gold-rates-today", {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    // Wait for the price element to appear
    await page.waitForSelector("._7_GedP", { timeout: 15000 });

    // Extract the text content
    const goldRate = await page.$eval("._7_GedP", el => el.innerText.trim());

    await browser.close();

    res.json({ success: true, goldRate });
  } catch (err) {
    console.error("Error fetching gold rate:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
