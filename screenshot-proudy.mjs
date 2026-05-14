import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless: 'new'});
const page = await browser.newPage();
await page.setViewport({width: 1200, height: 800});
await page.goto('http://localhost:3000', {waitUntil: 'networkidle2'});

await page.evaluate(() => {
  const elem = document.getElementById('proudy-showcase');
  elem.scrollIntoView();
});
await new Promise(r => setTimeout(r, 800));

const elem = await page.$('#proudy-showcase');
const box = await elem.boundingBox();
await page.screenshot({
  path: './temporary screenshots/screenshot-proudy-section.png',
  clip: {x: 0, y: box.y - 50, width: 1200, height: box.height + 100}
});

await browser.close();
console.log('✓ Proudy section screenshot captured');
