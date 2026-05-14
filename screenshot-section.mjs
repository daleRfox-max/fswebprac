import puppeteer from 'puppeteer';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readdirSync } from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const screenshotDir = join(__dirname, 'temporary screenshots');
if (!existsSync(screenshotDir)) mkdirSync(screenshotDir, { recursive: true });
const n = readdirSync(screenshotDir).filter(f => f.endsWith('.png')).length + 1;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

// Scroll through entire page to trigger all IntersectionObservers
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
  window.scrollTo(0, 0);
});
await new Promise(r => setTimeout(r, 1200));

// Get positions dynamically from the real DOM
const pos = await page.evaluate(() => {
  const q = sel => { const el = document.querySelector(sel); return el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY - 70) : null; };
  return {
    hero:        0,
    mission:     q('.mission'),
    feature:     q('.feature-photo-section'),
    cards:       q('.projects-section'),
    welcome:     q('.welcome-section'),
    pillar1:     q('.pillar:nth-child(1)'),
    pillar2:     q('.pillar:nth-child(2)'),
    pillar3:     q('.pillar:nth-child(3)'),
    journey:     q('.journey-section'),
    servicesgrid:q('.services-section'),
    visionaries: q('.visionaries-section'),
    areas:       q('.areas-section'),
    faq:         q('.faq-section'),
    contact:     q('#contact'),
    cta:         q('.cta-section'),
  };
});

console.log('Positions:', pos);

const shots = Object.entries(pos).filter(([,y]) => y !== null);

for (let i = 0; i < shots.length; i++) {
  const [label, y] = shots[i];
  await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
  await new Promise(r => setTimeout(r, 280));
  const file = join(screenshotDir, `screenshot-${n + i}-${label}.png`);
  await page.screenshot({ path: file });
  console.log(`Saved: ${label}`);
}

await browser.close();
