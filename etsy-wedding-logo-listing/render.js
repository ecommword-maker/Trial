// Renders every <section data-name> in an HTML file to a 2000x2000 PNG.
// Usage: node render.js src/listing.html images
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const [file, out] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 2000, height: 2000 } });
  await page.goto('file://' + path.resolve(file));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const names = await page.$$eval('section[data-name]', (s) => s.map((e) => e.dataset.name));
  for (const n of names) {
    await page.locator(`section[data-name="${n}"]`).screenshot({ path: path.join(out, n + '.png') });
    console.log('rendered', n);
  }
  await browser.close();
})();
