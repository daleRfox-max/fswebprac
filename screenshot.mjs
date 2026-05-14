import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const screenshotDir = join(__dirname, 'temporary screenshots');

if (!existsSync(screenshotDir)) mkdirSync(screenshotDir, { recursive: true });

const files = existsSync(screenshotDir)
  ? readdirSync(screenshotDir).filter(f => f.endsWith('.png'))
  : [];
const n = files.length + 1;
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const outputPath = join(screenshotDir, filename);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Scroll through the entire page to trigger IntersectionObservers
await page.evaluate(async () => {
  const totalHeight = document.body.scrollHeight;
  const step = 600;
  for (let y = 0; y < totalHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 400));
});

await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outputPath}`);
