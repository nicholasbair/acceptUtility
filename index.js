const express = require('express');
const app = express();
const port = 3000;
const puppeteer = require('puppeteer');

app.use(express.json());

// Use Puppeteer to accept the invite
app.post('/accept', async (req, res) => {
  // Note - launching in headless = false for demo purposes
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(req.body.url);

  // Wait for the confirmation page to load
  const resultsSelector = '.checkmark';
  await page.waitForSelector(resultsSelector);

  await browser.close();

  res.send();
});

app.listen(port, () => {
  console.log(`Accept Utility listening on port ${port}`)
});